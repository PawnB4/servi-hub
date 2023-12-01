import axios from "./axios";

export const getAllContractsRequest = async (service_id) =>
  await axios.get(`/contracts/${service_id}`);

export const createContractRequest = async (contract) =>
  await axios.post(`/contracts`, contract);

export const updateContractRequest = async (contract) =>
  await axios.put(`/contracts`, contract);

export const deleteAllFinishedContractsRequest = async (service_id) =>
  await axios.delete(`/service-contracts/${service_id}`);

export const deleteFinishedContractRequest = async (contract_id) =>
  await axios.delete(`/contracts/${contract_id}`);
