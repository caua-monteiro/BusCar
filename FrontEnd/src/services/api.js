import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080", // Altere caso o backend rode em outra porta
});

export default api;