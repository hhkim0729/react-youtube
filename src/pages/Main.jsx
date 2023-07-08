import { useQuery } from '@tanstack/react-query';
import VideoList from 'components/VideoList';
import { API_URLS } from 'consts';

export default function Main() {
  const { data } = useQuery({
    queryKey: ['videos', 'main'],
    queryFn: async () => fetch(API_URLS.POPULAR).then((res) => res.json()),
  });

  const videos = data?.items ?? [];

  return <VideoList videos={videos} />;
}
