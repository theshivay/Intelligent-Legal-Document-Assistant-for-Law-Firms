// src/routes/api.js
const express = require('express');
const multer = require('multer');
const router = express.Router();
const blobStorage = require('../services/blobStorage');
const cognitiveSearch = require('../services/cognitiveSearch');
const openAI = require('../services/openAI');
const { queryLegalAssistant } = require('../utils/langchainSetup');

const upload = multer({ storage: multer.memoryStorage() });
const authenticateToken = require('../middleware/auth');
router.use(authenticateToken);

router.post('/upload', upload.single('document'), async (req, res) => {
  try {
    const blobName = await blobStorage.uploadDocument(req.file);
    const documentUrl = await blobStorage.getDocumentUrl(blobName);
    
    // Index the document in Cognitive Search
    await cognitiveSearch.indexDocument({
      id: blobName,
      content: req.file.buffer.toString(),
      url: documentUrl
    });
    
    res.json({ message: 'Document uploaded and indexed successfully', blobName });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/query', async (req, res) => {
  try {
    const { query } = req.body;
    const response = await queryLegalAssistant(query);
    res.json({ response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/summarize', async (req, res) => {
  try {
    const { text } = req.body;
    const summary = await openAI.summarizeDocument(text);
    res.json({ summary });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;