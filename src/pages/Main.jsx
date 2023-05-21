import { useQuery } from '@tanstack/react-query';

export default function Main() {
  const { data } = useQuery({
    queryKey: ['videos', 'main'],
    queryFn: async () => fetch(`videos/popular.json`).then((res) => res.json()),
  });

  const videos = data?.items ?? [];

  return (
    <section>
      <ul>
        {videos.map(({ id, snippet, statistics }) => (
          <li key={id}>
            <img src={snippet.thumbnails.medium.url} alt={snippet.title} />
            <div>
              <h3>{snippet.title}</h3>
              <div>
                <span>{snippet.channelTitle}</span>
                <div>
                  <span>조회수 {statistics.viewCount} </span>
                  <span>·</span>
                  <span> {snippet.publishedAt} </span>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
