export default function VideoList({ videos }) {
  return (
    <ul>
      {videos.map(({ id, snippet, statistics }) => (
        <li key={id.videoId ? id.videoId : id}>
          <img src={snippet.thumbnails.medium.url} alt={snippet.title} />
          <div>
            <h3>{snippet.title}</h3>
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
      ))}
    </ul>
  );
}
