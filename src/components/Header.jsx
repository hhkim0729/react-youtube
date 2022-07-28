import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '@fortawesome/fontawesome-free/js/all';
import './Header.css';

const Header = () => {
  const [value, setValue] = useState('');

  useEffect(() => {
    document.getElementById('search').focus();
  }, []);

  const handleChange = ({ target }) => {
    setValue((value) => target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${value}&key=${process.env.REACT_APP_API_KEY}`
      )
      .then((res) => {
        console.log(res.data.items);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <header className="Header">
      <div className="logo">
        <i className="fa-solid fa-circle-play icon"></i>
        <span className="title">Youtube</span>
      </div>
      <form className="search" onSubmit={handleSubmit}>
        <input
          type="text"
          id="search"
          placeholder="Search"
          value={value}
          onChange={handleChange}
        />
        <button type="submit">
          <i className="fa-solid fa-magnifying-glass icon"></i>
        </button>
      </form>
    </header>
  );
};

export default Header;
