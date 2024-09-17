// src/models/document.js
const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  fileType: {
    type: String,
    required: true,
    enum: ['pdf', 'docx', 'txt'] // Add more types as needed
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  blobName: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  metadata: {
    pageCount: Number,
    wordCount: Number,
    createdDate: Date,
    lastModifiedDate: Date
  }
}, {
  timestamps: true
});

// Add a text index for full-text search
documentSchema.index({ title: 'text', content: 'text', tags: 'text' });

// Virtual for document's URL
documentSchema.virtual('documentUrl').get(function() {
  return `/documents/${this._id}`;
});

// Middleware to handle pre-save operations
documentSchema.pre('save', function(next) {
  // You can add any pre-save logic here, like:
  // - Generating a summary of the document
  // - Extracting and setting metadata
  // - Validating or sanitizing content
  next();
});

// Method to generate a summary of the document
documentSchema.methods.generateSummary = async function() {
  // This is where you'd implement the logic to generate a summary
  // You might use the OpenAI service we created earlier
  // For now, we'll just return a placeholder
  return "This is a placeholder summary of the document.";
};

const Document = mongoose.model('Document', documentSchema);

module.exports = Document;