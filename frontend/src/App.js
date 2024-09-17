import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import DocumentUpload from './components/DocumentUpload';
import ChatInterface from './components/ChatInterface';
import { searchDocuments, uploadDocument, summarizeDocument } from './api/api';

function App() {
  const [searchResults, setSearchResults] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [summary, setSummary] = useState(null);

  const handleSearch = async (query) => {
    try {
      const results = await searchDocuments(query);
      setSearchResults(results);
    } catch (error) {
      console.error('Error searching documents:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  const handleUpload = async (file) => {
    try {
      const result = await uploadDocument(file);
      setUploadStatus(result.message);
    } catch (error) {
      console.error('Error uploading document:', error);
      setUploadStatus('Upload failed');
    }
  };

  const handleSendMessage = async (message) => {
    try {
      const result = await summarizeDocument(message);
      setSummary(result.summary);
    } catch (error) {
      console.error('Error summarizing document:', error);
      setSummary('Summarization failed');
    }
  };

  return (
    <div className="App">
      <h1>Legal Document Assistant</h1>
      <SearchBar onSearch={handleSearch} />
      {searchResults && <div>Search Results: {JSON.stringify(searchResults)}</div>}
      <DocumentUpload onUpload={handleUpload} />
      {uploadStatus && <div>Upload Status: {uploadStatus}</div>}
      <ChatInterface onSendMessage={handleSendMessage} />
      {summary && <div>Summary: {summary}</div>}
    </div>
  );
}

export default App;