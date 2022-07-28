import React from 'react';
import './VideoItem.css';

const VideoItem = ({ video }) => {
  let title = String(video.snippet.title);
  if (title.length > 50) {
    title = title.substring(0, 50) + '...';
  }

  return (
    <div className="VideoItem">
      <div className="thumbnail">
        <img
          src={video.snippet.thumbnails.default.url}
          alt={video.snippet.title}
        />
      </div>
      <div className="info">
        <h1 className="title">{title}</h1>
        <span className="channel">{video.snippet.channelTitle}</span>
      </div>
    </div>
  );
};

export default VideoItem;
