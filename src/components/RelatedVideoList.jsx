import { Link } from 'react-router-dom';
import { formatDate } from 'utils';

export default function RelatedVideoList({ videos }) {
  return (
    <ul>
      {videos.map((video) => {
        const { id, snippet } = video;
        const videoId = id.videoId;
        return (
          <RelatedVideoItem key={videoId} videoId={videoId} snippet={snippet} />
        );
      })}
    </ul>
  );
}

function RelatedVideoItem({ videoId, snippet }) {
  return (
    <li key={videoId} className="mb-2">
      <Link
        to={`/watch/${videoId}`}
        state={{ videoId, channelId: snippet.channelId }}
        className="flex gap-2"
      >
        <img
          src={snippet.thumbnails.medium.url}
          alt={`${snippet.title} thumbnail`}
          className="w-44 rounded-lg"
        />
        <div>
          <div className="text-[0.95rem] font-medium mb-1 leading-5">
            <h3 className="md:line-clamp-2 lg:line-clamp-3">{snippet.title}</h3>
          </div>
          <div className="flex flex-col text-xs text-gray-500">
            <span>{snippet.channelTitle}</span>
            <span>{formatDate(snippet.publishTime)}</span>
          </div>
        </div>
      </Link>
    </li>
  );
}
