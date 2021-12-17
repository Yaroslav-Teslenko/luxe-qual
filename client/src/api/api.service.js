import axios from "axios";

const CL_API_URL = process.env.VUE_APP_CL_API_URL;

const api = axios.create({
  withCredentials: true,
  baseURL: CL_API_URL,
});

export default class ApiService {
  static async getRecords() {
    return api.get("/records");
  }
  static async addRecords() {
    return api.post("/records");
  }
}
