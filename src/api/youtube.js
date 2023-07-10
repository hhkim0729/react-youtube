import axios from 'axios';
import { API_URLS } from 'consts';

export async function search(query) {
  return axios
    .get(`${API_URLS.SEARCH}&q=${query}`)
    .then((res) => res.data.items);
}

export async function getPopularVideos() {
  return axios.get(API_URLS.POPULAR).then((res) => res.data.items);
}

export async function getChannel(channelId) {
  return axios
    .get(`${API_URLS.CHANNEL}&id=${channelId}`)
    .then((res) => res.data);
}

export async function getComments(videoId) {
  return axios
    .get(`${API_URLS.COMMENTS}&videoId=${videoId}`)
    .then((res) => res.data);
}

export async function getRelatedVideos(videoId) {
  return axios
    .get(`${API_URLS.RELATED}&relatedToVideoId=${videoId}`)
    .then((res) => res.data);
}
