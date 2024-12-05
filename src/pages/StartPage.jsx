import React from 'react';
import { Link } from 'react-router-dom';
import '../styling/StartPage.css';

const StartPage = () => {
  return (
    <div className="start-page">
      <div className="start-page-container">
        <img 
          src="https://raw.githubusercontent.com/sleduardo20/pokedex/0671af442dff1d8f7141e49eb83b438885bbc9e9/public/img/logo.svg" 
          alt="Pokedex" 
          className="start-page-logo"
        />
        <Link to="/search" className="start-page-open-button">
          <span>Open</span>
        </Link>
      </div>
    </div>
  );
};

export default StartPage;