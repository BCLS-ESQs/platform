const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');
const Database = require('better-sqlite3');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Database connection to your LAWMatrix
const dbPath = 'F:\\LAWMatrix\\practice_panther.db';
let db;

// Initialize database connection
function initDatabase() {
    try {
        db = new Database(dbPath);
        console.log('✅ Connected to LAWMatrix database');
    } catch (error) {
        console.error('❌ Database connection failed:', error);
    }
}

// Practice Panther folder path
const PRACTICE_PANTHER_PATH = 'F:\\Dropbox\\Dropbox\\PracticePanther';

// F: Drive root path
const F_DRIVE_PATH = 'F:\\';

// Initialize server
app.listen(PORT, () => {
    console.log(`🚀 ESQs Platform Backend Server running on port ${PORT}`);
    console.log(`🌐 Access from: http://localhost:${PORT}`);
    console.log(`📁 Connected to F: Drive: ${F_DRIVE_PATH}`);
    console.log(`📋 Connected to Practice Panther: ${PRACTICE_PANTHER_PATH}`);
    initDatabase();
});

// ========================================
// PRACTICE PANTHER ACCESS ENDPOINTS
// ========================================

// Get all cases from Practice Panther
app.get('/api/practice-panther/cases', async (req, res) => {
    try {
        const cases = await getCasesFromDatabase();
        res.json({ success: true, cases });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Search cases
app.get('/api/practice-panther/search', async (req, res) => {
    try {
        const { query } = req.query;
        const results = await searchCases(query);
        res.json({ success: true, results });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Get case details
app.get('/api/practice-panther/cases/:caseId', async (req, res) => {
    try {
        const { caseId } = req.params;
        const caseDetails = await getCaseDetails(caseId);
        res.json({ success: true, case: caseDetails });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Get documents for a case
app.get('/api/practice-panther/cases/:caseId/documents', async (req, res) => {
    try {
        const { caseId } = req.params;
        const documents = await getCaseDocuments(caseId);
        res.json({ success: true, documents });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// ========================================
// F: DRIVE ACCESS ENDPOINTS
// ========================================

// Browse F: drive directories
app.get('/api/f-drive/browse', async (req, res) => {
    try {
        const { path: dirPath = '' } = req.query;
        const fullPath = path.join(F_DRIVE_PATH, dirPath);
        const contents = await browseDirectory(fullPath);
        res.json({ success: true, path: dirPath, contents });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Search F: drive files
app.get('/api/f-drive/search', async (req, res) => {
    try {
        const { query, path: searchPath = '' } = req.query;
        const results = await searchFiles(query, searchPath);
        res.json({ success: true, results });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Get file content
app.get('/api/f-drive/file', async (req, res) => {
    try {
        const { path: filePath } = req.query;
        const fullPath = path.join(F_DRIVE_PATH, filePath);
        const content = await getFileContent(fullPath);
        res.json({ success: true, content, path: filePath });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// ========================================
// DOCUMENT MANAGEMENT ENDPOINTS
// ========================================

// Save document to user workspace
app.post('/api/documents/save', async (req, res) => {
    try {
        const { userId, documentName, content, type } = req.body;
        const saved = await saveDocument(userId, documentName, content, type);
        res.json({ success: true, document: saved });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Get user documents
app.get('/api/documents/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const documents = await getUserDocuments(userId);
        res.json({ success: true, documents });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// ========================================
// HELPER FUNCTIONS
// ========================================

// Database functions
async function getCasesFromDatabase() {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM stears_case", (err, rows) => {
            if (err) reject(err);
            else resolve(rows || []);
        });
    });
}

async function searchCases(query) {
    return new Promise((resolve, reject) => {
        const searchQuery = `%${query}%`;
        db.all("SELECT * FROM stears_case WHERE item_name LIKE ? OR notes LIKE ?", 
            [searchQuery, searchQuery], (err, rows) => {
            if (err) reject(err);
            else resolve(rows || []);
        });
    });
}

async function getCaseDetails(caseId) {
    return new Promise((resolve, reject) => {
        db.get("SELECT * FROM stears_case WHERE id = ?", [caseId], (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
}

async function getCaseDocuments(caseId) {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM files WHERE is_stears_related = 1", (err, rows) => {
            if (err) reject(err);
            else resolve(rows || []);
        });
    });
}

// File system functions
async function browseDirectory(dirPath) {
    try {
        const items = await fs.readdir(dirPath, { withFileTypes: true });
        const contents = items.map(item => ({
            name: item.name,
            type: item.isDirectory() ? 'directory' : 'file',
            path: path.join(dirPath, item.name)
        }));
        return contents;
    } catch (error) {
        throw new Error(`Cannot browse directory: ${error.message}`);
    }
}

async function searchFiles(query, searchPath) {
    try {
        const fullPath = path.join(F_DRIVE_PATH, searchPath);
        const results = [];
        await searchDirectoryRecursive(fullPath, query, results);
        return results;
    } catch (error) {
        throw new Error(`Search failed: ${error.message}`);
    }
}

async function searchDirectoryRecursive(dirPath, query, results) {
    try {
        const items = await fs.readdir(dirPath, { withFileTypes: true });
        for (const item of items) {
            const fullPath = path.join(dirPath, item.name);
            if (item.name.toLowerCase().includes(query.toLowerCase())) {
                results.push({
                    name: item.name,
                    type: item.isDirectory() ? 'directory' : 'file',
                    path: fullPath
                });
            }
            if (item.isDirectory()) {
                await searchDirectoryRecursive(fullPath, query, results);
            }
        }
    } catch (error) {
        // Skip directories we can't access
    }
}

async function getFileContent(filePath) {
    try {
        const content = await fs.readFile(filePath, 'utf8');
        return content;
    } catch (error) {
        throw new Error(`Cannot read file: ${error.message}`);
    }
}

// Document management functions
async function saveDocument(userId, documentName, content, type) {
    const userDir = path.join(__dirname, 'user-workspaces', userId);
    await fs.mkdir(userDir, { recursive: true });
    
    const fileName = `${documentName}.txt`;
    const filePath = path.join(userDir, fileName);
    await fs.writeFile(filePath, content);
    
    return {
        id: Date.now(),
        name: documentName,
        type: type || 'document',
        path: filePath,
        userId: userId,
        created: new Date().toISOString()
    };
}

async function getUserDocuments(userId) {
    try {
        const userDir = path.join(__dirname, 'user-workspaces', userId);
        const files = await fs.readdir(userDir);
        const documents = [];
        
        for (const file of files) {
            const filePath = path.join(userDir, file);
            const stats = await fs.stat(filePath);
            documents.push({
                name: file.replace('.txt', ''),
                path: filePath,
                size: stats.size,
                created: stats.birthtime.toISOString()
            });
        }
        
        return documents;
    } catch (error) {
        return [];
    }
}

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        success: true, 
        status: 'running',
        timestamp: new Date().toISOString(),
        database: db ? 'connected' : 'disconnected',
        fDrive: 'accessible',
        practicePanther: 'accessible'
    });
});

console.log('🚀 ESQs Platform Backend Server loaded successfully!');
console.log('📁 Ready to connect online platforms to your local data!');
