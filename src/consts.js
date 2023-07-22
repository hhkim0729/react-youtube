const YOUTUBE_API_BASE_URL = 'https://youtube.googleapis.com/youtube/v3';

export const API_URLS = {
  POPULAR: `${YOUTUBE_API_BASE_URL}/videos?part=snippet&chart=mostPopular&maxResults=24&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`,
  CHANNEL: `${YOUTUBE_API_BASE_URL}/channels?part=snippet&part=statistics&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`,
  COMMENTS: `${YOUTUBE_API_BASE_URL}/commentThreads?part=snippet&maxResults=25&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`,
  RELATED: `${YOUTUBE_API_BASE_URL}/search?part=snippet&type=video&maxResults=24&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`,
  SEARCH: `${YOUTUBE_API_BASE_URL}/search?part=snippet&type=video&maxResults=24&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`,
  VIDEO: `${YOUTUBE_API_BASE_URL}/videos?part=snippet&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`,
};
