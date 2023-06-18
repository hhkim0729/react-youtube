import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import VideoList from 'components/VideoList';

export default function SearchResult() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');

  if (!query) {
    navigate('/');
  }

  const { data } = useQuery({
    queryKey: ['videos', query],
    queryFn: async () =>
      fetch(
        `videos/search.json`
        // `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${query}&key=AIzaSyDfnXB2YvH37X7K6NEkWVBiHIsPcCGHkvw`
      ).then((res) => res.json()),
    staleTime: 1000 * 60 * 5,
  });

  const videos = data?.items ?? [];

  return (
    <section>
      <VideoList videos={videos} />
    </section>
  );
}
