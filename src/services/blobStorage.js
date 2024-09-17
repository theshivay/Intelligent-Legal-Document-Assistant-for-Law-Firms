// src/services/blobStorage.js
const { BlobServiceClient } = require('@azure/storage-blob');
const config = require('../config/azure-config');

const blobServiceClient = BlobServiceClient.fromConnectionString(config.blobStorage.connectionString);
const containerClient = blobServiceClient.getContainerClient(config.blobStorage.containerName);

async function uploadDocument(file) {
  const blobName = `${Date.now()}-${file.originalname}`;
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  
  await blockBlobClient.upload(file.buffer, file.size);
  return blobName;
}

async function getDocumentUrl(blobName) {
  const blobClient = containerClient.getBlobClient(blobName);
  return blobClient.url;
}

module.exports = {
  uploadDocument,
  getDocumentUrl
};