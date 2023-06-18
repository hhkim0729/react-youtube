import { useQuery } from '@tanstack/react-query';
import VideoList from 'components/VideoList';

export default function Main() {
  const { data } = useQuery({
    queryKey: ['videos', 'main'],
    queryFn: async () => fetch(`videos/popular.json`).then((res) => res.json()),
  });

  const videos = data?.items ?? [];

  return (
    <section>
      <VideoList videos={videos} />
    </section>
  );
}
