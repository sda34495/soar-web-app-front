
import axios, { AxiosResponse, AxiosError } from 'axios';
import toast from 'react-hot-toast';

const url = "http://localhost:8082/api/";
// const url = process.env.NEXT_PUBLIC_API_URL;

const instance = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
    // Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token && config.url !== "auth/login" && config.url !== "auth/forgetPassword" && config.url !== "auth/verification") {
      config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // console.log('Axios error:', error.response?.data || error.message);
    
    return Promise.reject(error);
  }
);

export const post = async (endpoint: string, data: any): Promise<AxiosResponse> => {
  try {
    const response = await instance.post(endpoint, data);
    return response;
  } catch (error) {
    console.log(`Error in POST request to ${endpoint}:`, error);
    throw error;
  }
};

export const getData = async (endpoint: string): Promise<AxiosResponse> => {
  try {
    const response = await instance.get(endpoint);
    return response;
  } catch (error) {
    console.log(`Error in GET request to ${endpoint}:`, error);
    throw error;
  }
};
export const apiCRUD = async (
  endpoint: string,
  options: { method?: "GET" | "DELETE" | "POST" | "PUT"; data?: any } = {} 
): Promise<AxiosResponse> => {
  try {
    const { method = "GET", data } = options; 

    let response: AxiosResponse;

    switch (method) {
      case "GET":
        response = await instance.get(endpoint);
        break;
      case "DELETE":
        response = await instance.delete(endpoint);
        break;
      case "POST":
        response = await instance.post(endpoint, data);
        break;
      case "PUT":
        response = await instance.put(endpoint, data);
        break;
      default:
        throw new Error(`Unsupported method: ${method}`);
    }

    return response;
  } catch (error) {
    console.error(`Error in current request to ${endpoint}:`, error);
    throw error;
  }
};

export const put = async (endpoint: string, data: any): Promise<AxiosResponse> => {
  try {
    const response = await instance.put(endpoint, data);
    return response;
  } catch (error) {
    console.error(`Error in PUT request to ${endpoint}:`, error);
    throw error;
  }
};

export const postFormData = async (endpoint: string, data: FormData): Promise<AxiosResponse> => {
  try {
    const response = await instance.post(endpoint, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    console.error(`Error in POST FormData request to ${endpoint}:`, error);
    throw error;
  }
};

export const deleteUser = async (endpoint: string, resource_id: string, resource_type: string): Promise<AxiosResponse> => {
  try {
    const response = await instance.post(endpoint, { resource_id, resource_type });
    return response;
  } catch (error) {
    console.error(`Error in DELETE request to ${endpoint}:`, error);
    throw error;
  }
};


export const getUserData = async (token: string) => {
  try {
    const response = await instance.get('leaderboard/all', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
export const getProfileData = async (token: string) => {
  try {
    const response = await instance.get('profile/details', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const updateProfile = async (token: string, formData: object) => {
  try {
    const response = await instance.post('profile/update-profile', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log('Error updating profile:', error);
    toast.error('An error occurred while updating profile.');
    throw error;
  }
}
export const postImage = async (token: string, data: FormData): Promise<AxiosResponse> => {
  try {
    const response = await instance.post("profile/update-profile", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    console.error(`Error in POST FormData request to ${token}:`, error);
    throw error;
  }
};

export const deleteImage = async (token: string): Promise<AxiosResponse> => {
  try {
    const response = await instance.post("profile/delete-profile-image", {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error(`Error in POST request to delete profile image:`, error);
    throw error;
  }
};
export const postData = async (endpoint: string, data: any) => {
  try {
    // Retrieve token from localStorage (or other storage mechanism)
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found. Please log in.");
    }

    // Configure headers with Authorization token
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // Make POST request
    const response = await instance.post(endpoint, data, config);
    return response.data; // Return the response data
  } catch (error: any) {
    console.error("Error in postData:", error);
    throw error.response?.data || error.message || "An error occurred";
  }
};
// File: /pages/api/checkin.js
