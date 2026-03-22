import axios from "axios";

const api = axios.create({
  baseURL: process.env.DOMAIN,
  withCredentials: true,
});

export const uploadPhoto = async (file: File) => {
  const formData = new FormData();
  formData.append("photo", file);
  const response = await api.post("/api/upload/photo", formData);
  return response.data;
};

export const getPhotos = async () => {
  const response = await api.get("/api/photos");
  return response.data;
};

export const setPfp = async (photoUrl: string) => {
  const response = await api.post("/api/upload/pfp", { photoUrl });
  return response.data;
};
