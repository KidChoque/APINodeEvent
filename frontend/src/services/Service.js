import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export const eventsTypeResource = "/tipoeventos";
export const eventsResource = "/eventos";

export default api;
