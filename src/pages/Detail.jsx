import { useLayoutEffect, useRef, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import YouTube from 'react-youtube';
import {
  getChannel,
  getComments,
  getRelatedVideos,
  getVideo,
} from 'api/youtube';
import CommentList from 'components/CommentList';
import { formatDate, formatNumber } from 'utils';

export default function Detail() {
  const { state } = useLocation();
  const { videoId, channelId } = state;

  const { data: videoData } = useQuery({
    queryKey: ['video', videoId],
    queryFn: () => getVideo(videoId),
  });
  const videoSnippet = videoData ? videoData[0].snippet : null;

  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const description = videoSnippet?.description;
  const [isDescriptionMore, setIsDescriptionMore] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  useLayoutEffect(() => {
    if (
      descriptionRef.current &&
      descriptionRef.current.clientHeight < descriptionRef.current.scrollHeight
    ) {
      setIsDescriptionMore(true);
    }
  }, [descriptionRef, videoSnippet?.description]);

  const { data: channelData } = useQuery({
    queryKey: ['channel', channelId],
    queryFn: () => getChannel(channelId),
  });
  const channel = channelData?.items ? channelData.items[0] : null;

  const { data: comments } = useQuery({
    queryKey: ['comments', videoId],
    queryFn: () => getComments(videoId),
  });

  const { data: relatedVideos } = useQuery({
    queryKey: ['relatedVideos', videoId],
    queryFn: () => getRelatedVideos(videoId),
  });

  const handleClickDescription = () => {
    if (isHidden) {
      setIsHidden(false);
    } else {
      setIsHidden(true);
      const titleRect = titleRef.current.getBoundingClientRect();
      if (titleRect.top > 0) return;
      titleRef.current.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="flex gap-6 flex-col lg:flex-row break-all">
      <div>
        <div className="w-full">
          <YouTube
            videoId={videoId}
            opts={{
              playerVars: {
                origin: 'http://localhost:3000',
              },
            }}
            iframeClassName="w-full min-h-[20rem] md:min-h-[48vw] lg:min-h-[36vw] max-h-[44rem]"
          />
        </div>
        <div>
          <h1 className="text-2xl font-medium py-2" ref={titleRef}>
            {videoSnippet && videoSnippet.title}
          </h1>
          {channel && (
            <div className="flex items-center gap-2">
              <img
                src={channel.snippet.thumbnails.default.url}
                alt={`${channel.snippet.title} thumbnail`}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h2 className="text-lg font-medium leading-3">
                  {channel.snippet.title}
                </h2>
                <span className="text-xs text-gray-500">
                  구독자 {formatNumber(channel.statistics.subscriberCount)}명
                </span>
              </div>
            </div>
          )}
          <div
            className={`bg-stone-100 rounded-md my-3 px-3 py-4 ${
              isDescriptionMore
                ? 'h-22 hover:bg-stone-300 cursor-pointer'
                : 'h-fit'
            }`}
            onClick={isDescriptionMore ? handleClickDescription : () => {}}
          >
            <span className="text-sm font-medium block mb-4">
              {formatDate(videoSnippet?.publishedAt)}
            </span>
            <div className="text-sm">
              <p
                className={`whitespace-pre-line ${
                  isHidden ? 'line-clamp-1' : ''
                }`}
                ref={descriptionRef}
              >
                {description}
              </p>
              {isDescriptionMore && (
                <p
                  className={`${
                    isHidden
                      ? 'pl-2 font-medium'
                      : 'mt-5 bg-transparent font-medium'
                  }`}
                  onClick={isHidden ? () => {} : handleClickDescription}
                >
                  {isHidden ? '더보기' : '간략히'}
                </p>
              )}
            </div>
          </div>
        </div>
        {comments?.items && <CommentList comments={comments.items} />}
      </div>
      <div className="lg:min-w-[24rem] lg:max-w-[24rem]">
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
                        <h3 className="md:line-clamp-2 lg:line-clamp-3">
                          {snippet.title}
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
    </div>
  );
}
