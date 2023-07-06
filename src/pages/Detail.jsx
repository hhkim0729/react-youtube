import { useRef, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { decode } from 'html-entities';
import YouTube from 'react-youtube';
import { formatDate, formatNumber, truncate } from 'utils';

export default function Detail() {
  const { state } = useLocation();
  const video = state.video;
  const [videoId, videoSnippet] = [
    video.id.videoId ? video.id.videoId : video.id,
    video.snippet,
  ];
  const [description, setDescription] = useState(
    truncate(videoSnippet.description, 30)
  );
  const [isDescriptionMore, setIsDescriptionMore] = useState(false);
  const titleRef = useRef(null);

  const { data: channel } = useQuery({
    queryKey: ['channel', videoSnippet.channelId],
    queryFn: async () =>
      fetch(`${process.env.PUBLIC_URL}/data/channel.json`).then((res) =>
        res.json()
      ),
  });
  const [channelSnippet, channelStatistics] = [
    channel?.items[0].snippet,
    channel?.items[0].statistics,
  ];

  const { data: comments } = useQuery({
    queryKey: ['comments', videoId],
    queryFn: async () =>
      fetch(`${process.env.PUBLIC_URL}/data/comments.json`).then((res) =>
        res.json()
      ),
  });

  const { data: relatedVideos } = useQuery({
    queryKey: ['relatedVideos', videoId],
    queryFn: async () =>
      fetch(`${process.env.PUBLIC_URL}/data/related.json`).then((res) =>
        res.json()
      ),
  });

  const handleClickDescription = () => {
    if (isDescriptionMore) {
      setDescription(truncate(videoSnippet.description, 30));
      setIsDescriptionMore(false);
      titleRef.current.scrollIntoView({
        behavior: 'smooth',
      });
    } else {
      setDescription(videoSnippet.description);
      setIsDescriptionMore(true);
    }
  };

  return (
    <section className="flex gap-6 flex-col lg:flex-row break-all">
      <div>
        <div className="w-full h-50">
          <YouTube
            videoId={videoId}
            opts={{
              playerVars: {
                origin: 'http://localhost:3000',
              },
            }}
            iframeClassName="w-full h-[32vw]"
          />
        </div>
        <div>
          <h1 className="text-2xl font-medium py-2" ref={titleRef}>
            {videoSnippet && videoSnippet.title}
          </h1>
          {channel && (
            <div className="flex items-center gap-2">
              <img
                src={channelSnippet.thumbnails.default.url}
                alt={`${channelSnippet.title} thumbnail`}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h2 className="text-lg font-medium leading-3">
                  {channelSnippet.title}
                </h2>
                <span className="text-xs text-gray-500">
                  구독자 {formatNumber(channelStatistics.subscriberCount)}명
                </span>
              </div>
            </div>
          )}
          <div
            className={`bg-stone-100 rounded-md my-3 px-3 py-4 ${
              isDescriptionMore
                ? 'h-fit'
                : 'h-22 overflow-hidden hover:bg-stone-300 cursor-pointer'
            }`}
            onClick={!isDescriptionMore ? handleClickDescription : () => {}}
          >
            <span className="text-sm font-medium block mb-4">
              {formatDate(videoSnippet.publishedAt)}
            </span>
            <p className="whitespace-pre-line">
              {description}
              {isDescriptionMore ? (
                <button
                  className="block mt-5 bg-transparent text-sm font-medium"
                  onClick={handleClickDescription}
                >
                  간략히
                </button>
              ) : (
                <span className="pl-2 text-sm font-medium">더보기</span>
              )}
            </p>
          </div>
        </div>
        {comments?.items && (
          <div>
            <h2 className="my-4">댓글 {comments.items.length}개</h2>
            <ul>
              {comments.items.map(({ id, snippet }) => {
                const comment = snippet.topLevelComment;
                return (
                  <li key={id} className="flex items-center mb-6 gap-4">
                    <img
                      src={comment.snippet.authorProfileImageUrl}
                      alt={`${comment.snippet.authorDisplayName} profile`}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <div>
                        <span className="text-sm font-semibold inline-block mr-1">
                          {comment.snippet.authorDisplayName}
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatDate(comment.snippet.publishedAt)}
                        </span>
                      </div>
                      <p className="leading-5">
                        {decode(comment.snippet.textDisplay)}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
      <div className="lg:w-[100rem]">
        {relatedVideos && (
          <ul>
            {relatedVideos.items.map((video) => {
              const { id, snippet } = video;
              const videoId = id.videoId;
              return (
                <li key={videoId} className="mb-2">
                  <Link
                    to={`/watch/${videoId}`}
                    state={{ video }}
                    className="flex gap-2"
                  >
                    <img
                      src={snippet.thumbnails.medium.url}
                      alt={`${snippet.title} thumbnail`}
                      className="w-44 rounded-lg"
                    />
                    <div>
                      <div className="text-[0.95rem] font-medium mb-1 leading-5">
                        <h3 className="hidden lg:block">
                          {truncate(snippet.title, 50)}
                        </h3>
                        <h3 className="lg:hidden">
                          {truncate(snippet.title, 100)}
                        </h3>
                      </div>
                      <div className="flex flex-col text-xs text-gray-500">
                        <span>{snippet.channelTitle}</span>
                        <span>{formatDate(snippet.publishTime)}</span>
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
