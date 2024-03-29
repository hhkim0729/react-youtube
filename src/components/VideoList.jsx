import { Link } from 'react-router-dom';
import { formatDate } from 'utils';

export default function VideoList({ videos }) {
  return (
    <ul className="flex flex-wrap gap-3 justify-center">
      {videos.map((video) => {
        const { id, snippet } = video;
        const videoId = id.videoId ? id.videoId : id;
        return <VideoItem key={videoId} videoId={videoId} snippet={snippet} />;
      })}
    </ul>
  );
}

function VideoItem({ videoId, snippet }) {
  return (
    <li className={`w-80 pb-2`}>
      <Link
        to={`/watch/${videoId}`}
        state={{ videoId, channelId: snippet.channelId }}
      >
        <img
          src={snippet.thumbnails.medium.url}
          alt={snippet.title}
          className="rounded-lg"
        />
      </Link>
      <div className="p-2">
        <Link
          to={`/watch/${videoId}`}
          state={{ videoId, channelId: snippet.channelId }}
        >
          <h3 className="break-all text-lg font-medium leading-6 line-clamp-2">
            {snippet.title}
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
