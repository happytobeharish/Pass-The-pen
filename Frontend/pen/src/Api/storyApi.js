import axios from "axios";

const BASE_URL = "/api/stories";

export const createStory = async (data) => {
  const response = await axios.post(BASE_URL, data);
  return response.data;
};

export const contributeToStory = async (storyId, payload) => {
  const response = await axios.post(`${BASE_URL}/${storyId}/contribute`, payload);
  return response.data;
};
 
export const getStoryById = async (id) => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
};

export const voteOnStory = async (storyId) => {
  const response = await axios.post(`${BASE_URL}/${storyId}/vote`);
  return response.data;
};

export const searchStories = async (filters) => {
  const query = new URLSearchParams(filters).toString();
  const response = await axios.get(`${BASE_URL}?${query}`);
  return response.data;
};