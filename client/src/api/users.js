const { axiosInstance } = require(".");

// user login
export const LoginUser = async (payload) => {
  try {
    const { data } = await axiosInstance.post("/api/users/login", payload);
    return data;
  } catch (error) {
    return error.response.data;
  }
};

// user registration
export const RegisterUser = async (payload) => {
  try {
    const { data } = await axiosInstance.post("/api/users/register", payload);
    return data;
  } catch (error) {
    return error.response.data;
  }
};

// user details
export const GetUserInfo = async () => {
  try {
    const { data } = await axiosInstance.post("/api/users/get-user-info");
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateUserProfile = async (userId, payload) => {
  try {
    const { data } = await axiosInstance.put(`/api/users/${userId}`, payload);
    return data;
  } catch (error) {
    return error.response.data;
  }
};

// Function to update password
