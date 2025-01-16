import axios from "axios";

const API_URL = "http://https://ptpi.tech/api/login/";

const logInservice = async (email, password) => {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);
  try {
    const response = await axios.post(API_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const accessToken = response.data.access_token;
    const refreshToken = response.data.refresh_token;
    localStorage.setItem("access_token", accessToken); // Store the access token
    localStorage.setItem("refresh_token", refreshToken); // Store the refresh token
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

const logout = () => {
  localStorage.removeItem("access_token"); // Remove the access token
  localStorage.removeItem("refresh_token"); // Remove the refresh token
};

export default {
  logInservice,
  logout,
};
