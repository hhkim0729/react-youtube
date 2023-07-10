import { useQuery } from '@tanstack/react-query';
import { getPopularVideos } from 'api/youtube';
import VideoList from 'components/VideoList';

export default function Main() {
  const { data: videos } = useQuery({
    queryKey: ['videos', 'main'],
    queryFn: getPopularVideos,
  });

  return <VideoList videos={videos ?? []} />;
}
