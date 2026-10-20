import axios from "axios";

const API_URL = "http://localhost:3000/api/auth";

const authService = {
  async login(credentials) {
    const response = await axios.post(
      `${API_URL}/login`,
      credentials,
      { withCredentials: true }
    );

    return response.data;
  },

  async register(userData) {
    const response = await axios.post(
      `${API_URL}/register`,
      userData,
      { withCredentials: true }
    );

    return response.data;
  },
};

export default authService;
