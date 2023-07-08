import { Link } from 'react-router-dom';
import { formatDate, truncate } from 'utils';

export default function VideoList({ videos }) {
  return (
    <ul className="flex flex-wrap gap-3 justify-center">
      {videos.map((video) => {
        return <VideoItem key={video.id} video={video} />;
      })}
    </ul>
  );
}

function VideoItem({ video }) {
  const { id, snippet } = video;
  const videoId = id.videoId ? id.videoId : id;
  return (
    <li className={`max-w-[320px] min-w-[200px] pb-2`}>
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
        <div className="flex flex-col text-sm text-gray-600 mt-1">
          <span>{snippet.channelTitle}</span>
          <span>{formatDate(snippet.publishedAt)}</span>
        </div>
      </div>
    </li>
  );
}
