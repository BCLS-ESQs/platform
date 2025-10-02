const express = require('express');
const router = express.Router();
const { generateDocBuffer } = require('../utils/generateDoc');

// optional logger
let logger = console;
try { logger = require('../logger'); } catch (e) {}

router.post('/motion', (req, res) => {
  try {
    const data = req.body || {};
    const buf = generateDocBuffer('motion_template.docx', data);
    const filenameSafe = (data.CASE_NUMBER || 'motion').toString().replace(/[^\w\-\.]/g, '_');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    res.setHeader('Content-Disposition', `attachment; filename="motion_${filenameSafe}.docx"`);
    res.send(buf);
  } catch (err) {
    (logger && logger.error) ? logger.error('docs/motion error', err) : console.error(err);
    res.status(500).json({ error: 'Failed to generate document', message: err.message });
  }
});

module.exports = router;
