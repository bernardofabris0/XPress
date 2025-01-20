import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
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
          <div className="video-card">
            <img src="thumbnail1.jpg" alt="Video Thumbnail" />
            <h3>Video Title 1</h3>
          </div>
          <div className="video-card">
            <img src="thumbnail2.jpg" alt="Video Thumbnail" />
            <h3>Video Title 2</h3>
          </div>
          <div className="video-card">
            <img src="thumbnail3.jpg" alt="Video Thumbnail" />
            <h3>Video Title 3</h3>
          </div>
          <div className="video-card">
            <img src="thumbnail4.jpg" alt="Video Thumbnail" />
            <h3>Video Title 4</h3>
          </div>
        </div>
      </section>
      <section className="trending">
        <h2>Trending</h2>
        <div className="video-grid">
          <div className="video-card">
            <img src="thumbnail5.jpg" alt="Video Thumbnail" />
            <h3>Video Title 5</h3>
          </div>
          <div className="video-card">
            <img src="thumbnail6.jpg" alt="Video Thumbnail" />
            <h3>Video Title 6</h3>
          </div>
          <div className="video-card">
            <img src="thumbnail7.jpg" alt="Video Thumbnail" />
            <h3>Video Title 7</h3>
          </div>
          <div className="video-card">
            <img src="thumbnail8.jpg" alt="Video Thumbnail" />
            <h3>Video Title 8</h3>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;