import axios from "axios";

export const authLogin = async (values) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/user/login`,
      { ...values }
    );
    localStorage.setItem("token",response.data.token)
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const register = async (values) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/user/createUser`,
      { ...values }
    );
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};
