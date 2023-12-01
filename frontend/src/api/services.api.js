import axios from "./axios";

export const createServiceRequest = async (service) =>
  await axios.post("/services", service, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const updateServiceRequest = async (service) =>
  await axios.put(`/services`, service, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const getAllServicesRequest = async () => await axios.get("/services");

export const getServiceRequest = async (id) =>
  await axios.get(`/services/${id}`);

export const getAllUserServicesRequest = async () =>
  await axios.get(`/user-services`);

export const deleteServiceRequest = async (id) =>
  await axios.delete(`/services/${id}`);
