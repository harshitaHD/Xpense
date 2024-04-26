const { axiosInstance } = require(".");
// account verification
export const VerifyAccount = async (payload) => {
  try {
    const { data } = await axiosInstance.post(
      "/api/transactions/verify-account",
      payload
    );
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const TransferFunds = async (payload) => {
  try {
    const { data } = await axiosInstance.post(
      "/api/transactions/transfer-funds",
      payload
    );
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const GetTransactionsOfUsers = async () => {
  try {
    const { data } = await axiosInstance.post(
      "/api/transactions/get-transactions"
    );
    return data;
  } catch (error) {
    return error.response.data;
  }
};

// deposit funds
