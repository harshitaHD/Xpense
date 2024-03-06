const { axiosInstance } = require(".");

export const LoginUser = async (payload) => {
  try {
    const data = await axiosInstance.post("/api/users/login", payload);
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const RegisterUser = async (payload) => {
  try {
    const data = await axiosInstance.post("/api/users/register", payload);
    return data;
  } catch (error) {
    return error.response.data;
  }
};
