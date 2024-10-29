import axios from 'axios';

const API_BASE_URL = "https://taskmanagerapp-qc92.onrender.com/api";

export const registerUser = async (userData) => {
    console.log(userData)
  try {
    const response = await axios.post(`${API_BASE_URL}/users/register`, userData);
    return response.data; 
  } catch (error) {
  
    throw error.response.data || "Error registering user";
  }
};
export const loginUser = async (userData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/users/login`, userData); 
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to login");
    }
  };
  

  export const getTasks = async () => {
    return axios.get(`${API_BASE_URL}/tasks`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
  };

  export const addTask = async (taskData) => {
    return axios.post(`${API_BASE_URL}/tasks`, taskData, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
  };
  
  export const editTask = async (taskId, taskData, token) => {
    return axios.patch(`${API_BASE_URL}/tasks/${taskId}`, taskData, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
  };
  
  export const deleteTask = async (taskId, token) => {
    return axios.delete(`${API_BASE_URL}/tasks/${taskId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
  };
