import axios from "./axios";

export const updateUserRequest = async (data) =>
  await axios.put(`/auth/profile`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
