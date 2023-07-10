import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { search } from 'api/youtube';
import VideoList from 'components/VideoList';

export default function SearchResult() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');

  if (!query) {
    navigate('/');
  }

  const { data: videos } = useQuery({
    queryKey: ['videos', query],
    queryFn: () => search(query),
    staleTime: 1000 * 60 * 5,
  });

  return <VideoList videos={videos ?? []} />;
}
