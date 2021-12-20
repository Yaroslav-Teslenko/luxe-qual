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
  static async getRecords(bounds) {
    return api.get(`/records`, { params: { ne_lat: bounds._northEast.lat, ne_lng: bounds._northEast.lng, sw_lat: bounds._southWest.lat, sw_lng: bounds._southWest.lng } });
  }
  static async addRecords(payload) {
    return api.post("/record", payload);
  }
  static async getAdress({ lat, lng }) {
    return geo.post(`/reverse?lat=${lat}&lon=${lng}&format=json`);
  }
}
