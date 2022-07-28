import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './components/Header';
import VideoList from './components/VideoList';
import './App.css';
import Footer from './components/Footer';

const App = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=20&regionCode=US&key=${process.env.REACT_APP_API_KEY}`
      )
      .then((res) => {
        console.log(res.data.items);
        setVideos(res.data.items);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="App">
      <Header />
      {!videos.size ? (
        <VideoList videos={videos} />
      ) : (
        <h1 className="loading">Loading...</h1>
      )}
      <Footer />
    </div>
  );
};

export default App;
