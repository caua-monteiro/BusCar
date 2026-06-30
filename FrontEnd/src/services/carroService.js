import api from "./api";

export const createCarro = (dados) => {
  return api.post("/carros", dados);
};

export const getMeusCarros = () => {
  return api.get("/carros/meus");
};

export const getAllCarros = () => {
  return api.get("/carros");
};

export const getCarroById = (id) => {
  return api.get(`/carros/${id}`);
};

export const deleteCarro = (id) => {
  return api.delete(`/carros/${id}`);
};
