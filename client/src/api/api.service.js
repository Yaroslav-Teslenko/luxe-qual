import axios from "axios";

const CL_API_URL = process.env.VUE_APP_CL_API_URL;

const api = axios.create({
  withCredentials: true,
  baseURL: CL_API_URL,
});
const geo = axios.create({
  // withCredentials: true,
  baseURL: "https://nominatim.openstreetmap.org",
});

export default class ApiService {
  static async getRecords() {
    return api.get("/records");
  }
  static async addRecords(payload) {
    console.log(payload);
    return api.post("/record", payload);
  }
  static async getAdress({ lat, lng }) {
    return geo.post(`/reverse?lat=${lat}&lon=${lng}&format=json`);
  }
}
