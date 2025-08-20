const http = require('http');

// Test the backend API endpoints
async function testBackend() {
    console.log('🧪 Testing ESQs Platform Backend...\n');
    
    const baseUrl = 'http://localhost:3000';
    
    // Test health endpoint
    try {
        console.log('🔍 Testing Health Check...');
        const healthResponse = await makeRequest(`${baseUrl}/api/health`);
        console.log('✅ Health Check:', healthResponse);
    } catch (error) {
        console.log('❌ Health Check Failed:', error.message);
    }
    
    // Test Practice Panther cases
    try {
        console.log('\n🔍 Testing Practice Panther Cases...');
        const casesResponse = await makeRequest(`${baseUrl}/api/practice-panther/cases`);
        console.log('✅ Practice Panther Cases:', casesResponse);
    } catch (error) {
        console.log('❌ Practice Panther Cases Failed:', error.message);
    }
    
    // Test F: Drive browse
    try {
        console.log('\n🔍 Testing F: Drive Browse...');
        const fDriveResponse = await makeRequest(`${baseUrl}/api/f-drive/browse`);
        console.log('✅ F: Drive Browse:', fDriveResponse);
    } catch (error) {
        console.log('❌ F: Drive Browse Failed:', error.message);
    }
    
    console.log('\n🎯 Backend Testing Complete!');
}

function makeRequest(url) {
    return new Promise((resolve, reject) => {
        const req = http.get(url, (res) => {
            let data = '';
            
            res.on('data', (chunk) => {
                data += chunk;
            });
            
            res.on('end', () => {
                try {
                    const jsonData = JSON.parse(data);
                    resolve(jsonData);
                } catch (error) {
                    resolve(data);
                }
            });
        });
        
        req.on('error', (error) => {
            reject(error);
        });
        
        req.setTimeout(5000, () => {
            req.destroy();
            reject(new Error('Request timeout'));
        });
    });
}

// Run the test
testBackend().catch(console.error);
