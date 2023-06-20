import { Link } from 'react-router-dom';

export default function VideoList({ videos }) {
  return (
    <ul>
      {videos.map((video) => {
        const { id, snippet, statistics } = video;
        const videoId = id.videoId ? id.videoId : id;
        return (
          <li key={videoId}>
            <Link to={`/watch/${videoId}`} state={{ video }}>
              <img src={snippet.thumbnails.medium.url} alt={snippet.title} />
            </Link>
            <div>
              <Link to={`/watch/${videoId}`} sstate={{ video }}>
                <h3>{snippet.title}</h3>
              </Link>
              <div>
                <span>{snippet.channelTitle}</span>
                <div>
                  {statistics && (
                    <>
                      <span>조회수 {statistics.viewCount} </span>
                      <span>·</span>
                    </>
                  )}
                  <span> {snippet.publishedAt} </span>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
