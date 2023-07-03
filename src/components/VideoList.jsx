import { Link } from 'react-router-dom';
import { truncate } from 'utils';

export default function VideoList({ videos }) {
  return (
    <ul className="flex flex-wrap gap-3 justify-center">
      {videos.map((video) => {
        return <VideoItem video={video} />;
      })}
    </ul>
  );
}

function VideoItem({ video }) {
  const { id, snippet, statistics } = video;
  const videoId = id.videoId ? id.videoId : id;
  return (
    <li key={videoId} className={`max-w-[320px] min-w-[200px] pb-2`}>
      <Link to={`/watch/${videoId}`} state={{ video }}>
        <img
          src={snippet.thumbnails.medium.url}
          alt={snippet.title}
          className="rounded-lg"
        />
      </Link>
      <div className="p-2">
        <Link to={`/watch/${videoId}`} state={{ video }}>
          <h3 className="break-all text-lg font-medium leading-6">
            {truncate(snippet.title, 63)}
          </h3>
        </Link>
        <div className="text-sm text-gray-600 mt-1">
          <span>{snippet.channelTitle}</span>
          <div>
            {statistics && (
              <>
                <span>조회수 {statistics.viewCount} </span>
                <span>·</span>
              </>
            )}
            <span> {snippet.publishedAt}</span>
          </div>
        </div>
      </div>
    </li>
  );
}
