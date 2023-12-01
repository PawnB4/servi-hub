import axios from "./axios";

export const createRatingRequest = async (rating) =>
  await axios.post(`/ratings`, rating);
