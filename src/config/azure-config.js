require('dotenv').config();

module.exports = {
  blobStorage: {
    connectionString: process.env.AZURE_STORAGE_CONNECTION_STRING,
    containerName: process.env.AZURE_STORAGE_CONTAINER_NAME
  },
  cognitiveSearch: {
    endpoint: process.env.AZURE_SEARCH_ENDPOINT,
    apiKey: process.env.AZURE_SEARCH_API_KEY,
    indexName: process.env.AZURE_SEARCH_INDEX_NAME
  },
  openAI: {
    endpoint: process.env.AZURE_OPENAI_ENDPOINT,
    apiKey: process.env.AZURE_OPENAI_API_KEY,
    deploymentName: process.env.AZURE_OPENAI_DEPLOYMENT_NAME
  }
};