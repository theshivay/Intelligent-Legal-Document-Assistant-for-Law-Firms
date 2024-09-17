/* eslint-disable no-unused-vars */
// frontend/src/components/DocumentUpload.js
import React, { useState } from 'react';

const DocumentUpload = ({ onUpload }) => {
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      onUpload(file);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button type="submit">Upload</button>
    </form>
  );
};

export default DocumentUpload;