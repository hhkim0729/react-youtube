import { useLocation, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { decode } from 'html-entities';
import YouTube from 'react-youtube';

export default function Detail() {
  const { state } = useLocation();
  const video = state.video;
  const [videoId, videoSnippet] = [
    video.id.videoId ? video.id.videoId : video.id,
    video.snippet,
  ];

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

  return (
    <section>
      <div>
        <div>
          <YouTube
            videoId={videoId}
            opts={{
              playerVars: {
                origin: 'http://localhost:3000',
              },
            }}
          />
        </div>
        <div>
          <h1>{videoSnippet && videoSnippet.title}</h1>
          {channel && (
            <div>
              <img
                src={channelSnippet.thumbnails.default.url}
                alt={`${channelSnippet.title} thumbnail`}
              />
              <div>
                <h2>{channelSnippet.title}</h2>
                <span>구독자 {channelStatistics.subscriberCount}명</span>
              </div>
            </div>
          )}
          <div>
            <span>{videoSnippet.publishedAt}</span>
            <p>{videoSnippet.description}</p>
          </div>
        </div>
        {comments && (
          <ul>
            {comments.items.map(({ id, snippet }) => {
              const comment = snippet.topLevelComment;
              return (
                <li key={id}>
                  <img
                    src={comment.snippet.authorProfileImageUrl}
                    alt={`${comment.snippet.authorDisplayName} profile`}
                  />
                  <div>
                    <div>
                      <span>{comment.snippet.authorDisplayName}</span>
                      <span>{comment.snippet.publishedAt}</span>
                    </div>
                    <p>{decode(comment.snippet.textDisplay)}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <div>
        {relatedVideos && (
          <ul>
            {relatedVideos.items.map((video) => {
              const { id, snippet } = video;
              const videoId = id.videoId;
              return (
                <li key={videoId}>
                  <Link to={`/watch/${videoId}`} state={{ video }}>
                    <img
                      src={snippet.thumbnails.medium.url}
                      alt={`${snippet.title} thumbnail`}
                    />
                    <div>
                      <h3>{snippet.title}</h3>
                      <span>{snippet.channelTitle}</span>
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
