import axios from "axios";

export const getAllTaskList = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/task/getTaskList`,
      {
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const editTask = async (values) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/task/updateTask/${values._id}`,

      {
        title: values.title,
        status: "C",
        _id: values._id,
      },
      {
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const deleteTask = async (values) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.delete(
      `${process.env.REACT_APP_BASE_URL}/task/deleteTask/${values._id}`,
      {
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const addTask = async (values) => {
  try {
    const token = localStorage.getItem("token");
    debugger;
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/task/createTask`,

      { ...values, status: "P" },
      {
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};
