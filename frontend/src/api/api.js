import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

export const searchDocuments = async (query) => {
  try {
    const response = await axios.post(`${API_URL}/query`, { query });
    return response.data;
  } catch (error) {
    console.error('Error searching documents:', error);
    throw error;
  }
};

export const uploadDocument = async (file) => {
  try {
    const formData = new FormData();
    formData.append('document', file);
    const response = await axios.post(`${API_URL}/upload`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading document:', error);
    throw error;
  }
};

export const summarizeDocument = async (text) => {
  try {
    const response = await axios.post(`${API_URL}/summarize`, { text });
    return response.data;
  } catch (error) {
    console.error('Error summarizing document:', error);
    throw error;
  }
};