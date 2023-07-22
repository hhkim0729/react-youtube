import { useLayoutEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import YouTube from 'react-youtube';
import {
  getChannel,
  getComments,
  getRelatedVideos,
  getVideo,
} from 'api/youtube';
import CommentList from 'components/CommentList';
import RelatedVideoList from 'components/RelatedVideoList';
import { formatDate, formatNumber } from 'utils';

export default function Detail() {
  const { state } = useLocation();
  const { videoId, channelId } = state;
  const titleRef = useRef(null);

  const { data: videoData } = useQuery({
    queryKey: ['video', videoId],
    queryFn: () => getVideo(videoId),
  });
  const videoSnippet = videoData ? videoData[0].snippet : null;

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

  return (
    <div className="flex gap-6 flex-col lg:flex-row break-all">
      <div>
        <div className="w-full">
          <YouTube
            videoId={videoId}
            iframeClassName="w-full min-h-[20rem] md:min-h-[48vw] lg:min-h-[36vw] max-h-[44rem]"
          />
        </div>
        <div>
          <h1 className="text-2xl font-medium py-2" ref={titleRef}>
            {videoSnippet && videoSnippet.title}
          </h1>
          {channel && (
            <Channel
              snippet={channel.snippet}
              statistics={channel.statistics}
            />
          )}
          {videoSnippet && (
            <Description videoSnippet={videoSnippet} titleRef={titleRef} />
          )}
        </div>
        {comments?.items && <CommentList comments={comments.items} />}
      </div>
      <div className="lg:min-w-[24rem] lg:max-w-[24rem]">
        {relatedVideos?.items && (
          <RelatedVideoList videos={relatedVideos.items} />
        )}
      </div>
    </div>
  );
}

function Channel({ snippet, statistics }) {
  return (
    <div className="flex items-center gap-2">
      <img
        src={snippet.thumbnails.default.url}
        alt={`${snippet.title} thumbnail`}
        className="w-12 h-12 rounded-full"
      />
      <div>
        <h2 className="text-lg font-medium leading-3">{snippet.title}</h2>
        <span className="text-xs text-gray-500">
          구독자 {formatNumber(statistics.subscriberCount)}명
        </span>
      </div>
    </div>
  );
}

function Description({ videoSnippet, titleRef }) {
  const descriptionRef = useRef(null);
  const [isDescriptionMore, setIsDescriptionMore] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  useLayoutEffect(() => {
    if (
      descriptionRef.current &&
      descriptionRef.current.clientHeight < descriptionRef.current.scrollHeight
    ) {
      setIsDescriptionMore(true);
    }
  }, [descriptionRef]);

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
    <div
      className={`bg-stone-100 rounded-md my-3 px-3 py-4 ${
        isHidden ? 'h-22 hover:bg-stone-300 cursor-pointer' : 'h-fit'
      }`}
      onClick={isDescriptionMore ? handleClickDescription : () => {}}
    >
      <span className="text-sm font-medium block mb-4">
        {formatDate(videoSnippet?.publishedAt)}
      </span>
      <div className="text-sm">
        <p
          className={`whitespace-pre-line ${isHidden ? 'line-clamp-1' : ''}`}
          ref={descriptionRef}
        >
          {videoSnippet.description}
        </p>
        {isDescriptionMore && (
          <p
            className={`${
              isHidden
                ? 'pl-2 font-medium'
                : 'mt-5 bg-transparent font-medium cursor-pointer'
            }`}
            onClick={isHidden ? () => {} : handleClickDescription}
          >
            {isHidden ? '더보기' : '간략히'}
          </p>
        )}
      </div>
    </div>
  );
}
