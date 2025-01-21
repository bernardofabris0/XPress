import React from 'react';
import { useParams } from 'react-router-dom';
import './VideoPage.css';

function VideoPage() {
  const { videoId } = useParams();

  return (
    <div className="video-page">
      <div className="video-container">
        <video controls>
          <source src={`http://localhost:5000/uploads/${videoId}`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="video-details">
        <h2>Video Title</h2>
        <p>Video description goes here...</p>
      </div>
    </div>
  );
}

export default VideoPage;