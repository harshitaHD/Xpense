import { axiosInstance } from ".";

export const getAllRequestsByUser = async (payload) => {
  try {
    const { data } = await axiosInstance.post(
      "/api/requests/get-all-requests-by-user",
      payload
    );
    return data;
  } catch (error) {
    console.error("Error fetching requests:", error);
    return { error: "Request Failed" };
  }
};

// send requests

export const sendRequest = async (request) => {
  try {
    const { data } = await axiosInstance.post(
      "/api/requests/send-request",
      request
    );
    return data;
  } catch (error) {
    return error.response.data;
  }
};

// status
export const UpdateRequestStatus = async (request) => {
  try {
    const { data } = await axiosInstance.post(
      "/api/requests/update-request-status",
      request
    );
    return data;
  } catch (error) {
    return error.response.data;
  }
};
