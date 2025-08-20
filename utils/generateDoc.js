const fs = require('fs');
const path = require('path');
const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');

// Try to use project logger if available, otherwise use console
let logger;
try {
    logger = require('../logger');
} catch (e) {
    logger = console;
}

/**
 * Generate a Word document from a template and data
 * @param {string} templateName - Name of the template file (e.g., 'motion_template.docx')
 * @param {object} data - Data object with placeholder values
 * @returns {Promise<Buffer>} - Generated document as Buffer
 */
async function generateDocBuffer(templateName, data) {
    try {
        const templatePath = path.join(__dirname, '..', 'templates', templateName);
        
        if (!fs.existsSync(templatePath)) {
            throw new Error(`Template not found: ${templatePath}`);
        }
        
        // Load the template
        const templateContent = fs.readFileSync(templatePath, 'binary');
        const zip = new PizZip(templateContent);
        
        // Create document with modern API
        const doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
        });
        
        // Render the document with data using modern API
        doc.render(data);
        
        // Generate the document buffer
        const buffer = doc.getZip().generate({ 
            type: 'nodebuffer',
            compression: 'DEFLATE'
        });
        
        logger.info(`Generated document from template: ${templateName}`);
        return buffer;
        
    } catch (error) {
        logger.error('Document generation error:', error);
        throw new Error(`Failed to generate document: ${error.message}`);
    }
}

module.exports = {
    generateDocBuffer
};
