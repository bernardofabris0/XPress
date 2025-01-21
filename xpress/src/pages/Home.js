import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

function Home() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/videos');
        setVideos(response.data);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="home">
      <header className="home-header">
        <Link to="/" className="home-logo-btn">XPress</Link>
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
          <button>Search</button>
        </div>
        <div className="auth-buttons">
          <Link to="/login" className="auth-btn">Login</Link>
          <Link to="/signup" className="auth-btn">Sign Up</Link>
        </div>
      </header>
      <section className="recommended">
        <h2>Recommended</h2>
        <div className="video-grid">
          {videos.map((video, index) => (
            <div className="video-card" key={index}>
              <Link to={`/video/${video.title}`}>
                <img src={video.thumbnailPath || video.filePath} alt="Video Thumbnail" className="video-thumbnail" />
                <h3>{video.title}</h3>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;