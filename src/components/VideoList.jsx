import React from 'react';
import VideoItem from './VideoItem';
import './VideoList.css';

const VideoList = ({ videos }) => {
  return (
    <section className="VideoList">
      {videos.map((video) => (
        <VideoItem key={video.etag} video={video} />
      ))}
    </section>
  );
};

export default VideoList;
