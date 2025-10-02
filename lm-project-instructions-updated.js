// LAW MATRIX v2.0 PROJECT INSTRUCTIONS INTEGRATION - UPDATED
// ANY DOCUMENT REFERENCED SHOULD BE SEARCHED IN CLIENT'S F: FOLDER FIRST
// Implementation for ESQs Platform Mobile
// Date: September 30, 2025

const LM_PROJECT_INSTRUCTIONS = {
    version: "2.0",
    implementationDate: "September 30, 2025",
    
    // Core Directive
    coreDirective: {
        focus: "REMAIN FOCUSED ON THE TASK AT HAND, PERIOD. DO NOT DEVIATE FROM THIS FOCUS.",
        prohibitions: [
            "NO RANDOM, FLOATING INFORMATION NOT SPECIFICALLY ABOUT THE PROJECT",
            "DO NOT EXAGGERATE, EMBELLISH, OR CREATE UNTRUE INFORMATION",
            "PHANTOM [FAKE] LAW, CASES, and FACTS WILL NOT BE TOLERATED",
            "REFER TO THE LM FOR USER INFORMATION - DO NOT MAKE UP INFORMATION"
        ]
    },
    
    // Document Storage Configuration - UPDATED FOR ANY DOCUMENT REFERENCES
    documentStorage: {
        primaryPath: "F:\\\\Dropbox\\\\Dropbox\\\\PracticePanther",
        description: "Practice Panther folder is Claude's FIRST place to look and save documents",
        priority: "PRACTICE PANTHER FIRST - NOT Google Drive",
        fallbackPath: "F:\\\\",
        storageRules: [
            "1. Always check Practice Panther folder first for existing documents",
            "2. Save new documents to Practice Panther folder by default",
            "3. Organize by client/case within Practice Panther structure",
            "4. Use F:\\\\ drive only as fallback if Practice Panther unavailable",
            "5. Never use Google Drive as primary storage location"
        ],
        documentSearchRules: [
            "1. ANY document referenced by user should be searched in client's F: folder FIRST",
            "2. Search ALL subfolders recursively in client's Practice Panther folder",
            "3. Look for documents by name, partial name, or content keywords",
            "4. NEVER search Google Drive or cloud storage for client documents",
            "5. If document not found in F: folder, ask user for clarification - don't assume cloud location",
            "6. Use PROJECT NAME to find client folder (e.g., 'Julie Stears' → 'Stears, Julie P (JWA)')"
        ]
    },
    
    // Essential Personnel Database
    personnel: {
        jwa3: {
            names: ["John William Adams III, Esq.", "JWA3", "JA", "JWA", "John", "Mr. Adams", "Sir"],
            barNumber: "#19429",
            billingRate: 390,
            role: "Always LM/Claude Chat user on this Login, unless instructed otherwise"
        },
        trc: {
            names: ["Travis R. Christiansen", "TRC", "Travis", "TC", "T", "Mr. Christiansen"],
            barNumber: "#8504",
            billingRate: 450,
            role: "Firm's Owner and Managing Partner"
        },
        jm: {
            names: ["Josephine Miller", "JM", "Jo", "Ms. Miller"],
            role: "Lead Legal Assistant"
        },
        jg: {
            names: ["Jordan Gubler", "JG", "Jordan", "Mrs. Gubler"],
            role: "Legal Assistant"
        },
        ew: {
            names: ["Emily Wilson", "EW", "Emily"],
            role: "Legal Assistant"
        },
        jb: {
            names: ["Jessica Byergo", "Jessica", "Jess", "JB", "Ms. Byergo"],
            role: "Customer Service = CSP = Client/Customer Specialist"
        }
    },
    
    // Legal Acronyms Dictionary
    acronyms: {
        "CUC": "Current Utah Code [including current law governing the Great State of Utah]",
        "URCP": "Utah Rules of Civil Procedure",
        "CP": "Utah Rules of Civil Procedure",
        "AOC": "Appearance of Counsel",
        "MTS": "Motion to Strike",
        "MTE": "Motion to Enforce",
        "OSC": "Order to Show Cause [hearing or document]",
        "MTQ": "Motion to Quash",
        "TRO": "Temporary Restraining Order",
        "EH": "Evidentiary Hearing",
        "MSA": "Motion to Set Aside",
        "MTI": "Motion to Intervene",
        "IntD": "Initial Disclosures",
        "RFP": "Request for Production",
        "NC": "New Client",
        "CIO": "Close it Out",
        "Cal": "Calendar"
    }
};

// Integration Functions for ESQs Platform
const LM_INTEGRATION = {
    
    // Initialize LM for new project/chat
    initializeProject: function(projectName) {
        console.log(`🏛️ LAW MATRIX v2.0 - Initializing Project: ${projectName}`);
        console.log("📋 Searching for existing artifact...");
        console.log("📁 Setting up F: Drive document search for client folder...");
        console.log("⚖️ Loading personnel database and legal acronyms...");
        console.log("✅ LM Project Instructions ACTIVE - NO DEVIATIONS TOLERATED");
        return {
            projectName: projectName,
            artifactName: projectName,
            status: "ACTIVE",
            compliance: "MANDATORY",
            documentSearchPath: `${LM_PROJECT_INSTRUCTIONS.documentStorage.primaryPath}\\\\${projectName}`
        };
    },
    
    // MAIN FUNCTION: Handle ANY document reference - search client's F: folder FIRST
    // ALL CLIENTS RECEIVE EQUAL TREATMENT - NO PREFERENCES
    handleDocumentReference: function(projectName, documentKeywords) {
        console.log(`📋 Document Reference Handler Activated`);
        console.log(`🎯 Client Project: ${projectName} (Equal Priority)`);
        console.log(`📄 Looking for documents containing: ${documentKeywords}`);
        console.log(`📁 Search Priority: CLIENT'S F: FOLDER (Practice Panther) FIRST`);
        console.log(`⚖️ EQUAL TREATMENT: All clients receive same search priority`);
        console.log(`🚫 AVOID: Google Drive, Cloud Storage`);
        
        const searchLocation = `${LM_PROJECT_INSTRUCTIONS.documentStorage.primaryPath}\\\\${projectName}`;
        
        return {
            searchLocation: searchLocation,
            searchTerms: documentKeywords,
            instruction: "Search recursively through ALL subfolders in client's Practice Panther folder",
            avoidLocations: ["Google Drive", "Cloud Storage", "OneDrive"],
            priority: "F: DRIVE PRACTICE PANTHER FOLDER ONLY",
            searchMethod: "Look in all subfolders and case folders within client directory",
            clientEquality: "ALL CLIENTS RECEIVE EQUAL SEARCH TREATMENT"
        };
    },

    // Search for specific document in client's F: folder
    findDocumentInClientFolder: function(projectName, documentName) {
        const basePath = LM_PROJECT_INSTRUCTIONS.documentStorage.primaryPath;
        console.log(`📄 Searching for document "${documentName}" in client folder for project: ${projectName}`);
        console.log(`🔍 Search location: ${basePath}\\\\[CLIENT_FOLDER]\\\\**\\\\${documentName}`);
        
        return {
            searchPath: `${basePath}\\\\${projectName}`,
            documentName: documentName,
            instruction: "SEARCH ALL SUBFOLDERS in client's Practice Panther folder for this document",
            priority: "PRACTICE PANTHER FOLDER FIRST - NOT Google Drive",
            recursiveSearch: true
        };
    },

    // Get personnel information
    getPersonnel: function(identifier) {
        for (let key in LM_PROJECT_INSTRUCTIONS.personnel) {
            const person = LM_PROJECT_INSTRUCTIONS.personnel[key];
            if (person.names.includes(identifier)) {
                return person;
            }
        }
        return null;
    },
    
    // Expand legal acronym
    expandAcronym: function(acronym) {
        return LM_PROJECT_INSTRUCTIONS.acronyms[acronym.toUpperCase()] || acronym;
    },

    // Get document storage path using project name
    getDocumentPath: function(projectName, documentType) {
        const basePath = LM_PROJECT_INSTRUCTIONS.documentStorage.primaryPath;
        const clientPath = `${basePath}\\\\${projectName}`;
        const documentPath = documentType ? `${clientPath}\\\\${documentType}` : clientPath;
        
        console.log(`📁 Document Path (Practice Panther Priority - Project: ${projectName}): ${documentPath}`);
        return {
            fullPath: documentPath,
            clientFolder: clientPath,
            basePath: basePath,
            priority: "PRACTICE PANTHER FIRST",
            projectName: projectName
        };
    },
    
    // Create billing entry
    createBillingEntry: function(attorney, hours, description) {
        const person = this.getPersonnel(attorney);
        if (person && person.billingRate) {
            return {
                attorney: person.names[0],
                barNumber: person.barNumber,
                hours: hours,
                rate: person.billingRate,
                total: hours * person.billingRate,
                description: description,
                timestamp: new Date().toISOString()
            };
        }
        return null;
    },
    
    // Save document with Practice Panther priority
    saveDocument: function(projectName, documentName, content, documentType = 'Documents') {
        const pathInfo = this.getDocumentPath(projectName, documentType);
        const fileName = documentName.endsWith('.docx') ? documentName : `${documentName}.docx`;
        const fullFilePath = `${pathInfo.fullPath}\\\\${fileName}`;
        
        console.log(`💾 Saving to Practice Panther: ${fullFilePath}`);
        console.log(`📋 Project: ${projectName}`);
        console.log(`📄 Document: ${fileName}`);
        console.log(`📁 Type: ${documentType}`);
        
        return {
            savedPath: fullFilePath,
            clientFolder: pathInfo.clientFolder,
            fileName: fileName,
            timestamp: new Date().toISOString(),
            storage: "PRACTICE PANTHER (PRIMARY)"
        };
    },
    
    // Validate compliance
    validateCompliance: function(content) {
        const violations = [];
        
        // Check for bullets (not allowed)
        if (content.includes('•') || content.includes('*') || content.match(/^\\s*[-*]\\s/m)) {
            violations.push("VIOLATION: Bullets detected - use numbered paragraphs only");
        }
        
        // Check for phantom law indicators
        const phantomIndicators = ['hypothetically', 'for example', 'might include', 'could be'];
        phantomIndicators.forEach(indicator => {
            if (content.toLowerCase().includes(indicator)) {
                violations.push(`POTENTIAL VIOLATION: Phantom law indicator "${indicator}" detected`);
            }
        });
        
        return {
            compliant: violations.length === 0,
            violations: violations
        };
    }
};

// Export for ESQs Platform integration
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { LM_PROJECT_INSTRUCTIONS, LM_INTEGRATION };
}

// Browser compatibility
if (typeof window !== 'undefined') {
    window.LM_PROJECT_INSTRUCTIONS = LM_PROJECT_INSTRUCTIONS;
    window.LM_INTEGRATION = LM_INTEGRATION;
}

console.log("🏛️ LAW MATRIX v2.0 PROJECT INSTRUCTIONS LOADED - UPDATED");
console.log("📋 ESQs Platform Mobile Integration Ready");
console.log("📁 PRIORITY: ANY DOCUMENT REFERENCE → SEARCH CLIENT'S F: FOLDER FIRST");
console.log("⚖️ Compliance Mode: MANDATORY - NO DEVIATIONS TOLERATED");