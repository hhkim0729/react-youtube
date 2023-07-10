import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import VideoList from 'components/VideoList';
import { API_URLS } from 'consts';

export default function Main() {
  const { data: videos } = useQuery({
    queryKey: ['videos', 'main'],
    queryFn: async () =>
      axios.get(API_URLS.POPULAR).then((res) => res.data.items),
  });

  return <VideoList videos={videos ?? []} />;
}
