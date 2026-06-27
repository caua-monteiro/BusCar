import api from "./api";

export const login = (email, senha) => {
  return api.post("/auth/login", {
    email,
    senha,
  });
};

export const cadastrar = (dados) => {
  return api.post("/auth/register", dados);
};