import axios from "./axios";

export const getServiceCommentsRequest = async (id) =>
  await axios.get(`/comments/${id}`);

export const createCommentRequest = async (comment) =>
  await axios.post(`/comments`, comment);

export const updateCommentRequest = async (comment) =>
  await axios.put(`/comments`, comment);
