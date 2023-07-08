import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import VideoList from 'components/VideoList';
import { API_URLS } from 'consts';

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
      fetch(`${API_URLS.SEARCH}&q=${query}`).then((res) => res.json()),
    staleTime: 1000 * 60 * 5,
  });

  const videos = data?.items ?? [];

  return <VideoList videos={videos} />;
}
