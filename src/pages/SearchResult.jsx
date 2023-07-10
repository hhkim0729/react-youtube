import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import VideoList from 'components/VideoList';
import { API_URLS } from 'consts';

export default function SearchResult() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');

  if (!query) {
    navigate('/');
  }

  const { data: videos } = useQuery({
    queryKey: ['videos', query],
    queryFn: async () =>
      axios.get(`${API_URLS.SEARCH}&q=${query}`).then((res) => res.data.items),
    staleTime: 1000 * 60 * 5,
  });

  return <VideoList videos={videos ?? []} />;
}
