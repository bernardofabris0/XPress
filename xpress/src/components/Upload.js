import React, { useState } from 'react';
import axios from 'axios';
import './Upload.css';

function Upload() {
  const [video, setVideo] = useState(null);

  const handleVideoChange = (e) => {
    setVideo(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('video', video);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Video uploaded successfully:', response.data);
    } catch (error) {
      console.error('Error uploading video:', error);
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload Video</h2>
      <form onSubmit={handleUpload}>
        <input type="file" accept="video/*" onChange={handleVideoChange} required />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default Upload;