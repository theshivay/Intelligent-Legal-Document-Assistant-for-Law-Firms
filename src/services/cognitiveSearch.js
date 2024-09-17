// src/services/cognitiveSearch.js
const { SearchClient, AzureKeyCredential } = require('@azure/search-documents');
const config = require('../config/azure-config');

const searchClient = new SearchClient(
  config.cognitiveSearch.endpoint,
  config.cognitiveSearch.indexName,
  new AzureKeyCredential(config.cognitiveSearch.apiKey)
);

async function searchDocuments(query, top = 10) {
  const searchResults = await searchClient.search(query, { top });
  return searchResults.results.map(result => result.document);
}

async function indexDocument(document) {
  await searchClient.uploadDocuments([document]);
}

module.exports = {
  searchDocuments,
  indexDocument
};