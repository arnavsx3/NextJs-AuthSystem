import { useState } from "react";
import { uploadPhoto, getPhotos, setPfp } from "../services/upload-services";

interface Photo {
  _id: string;
  user: string;
  photo: string;
  createdAt: string;
  updatedAt: string;
}

export const usePhotos = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(false);

  const handleUploadPhoto = async (file: File) => {
    setLoading(true);
    try {
      const response = await uploadPhoto(file);
      setPhotos((prev) => [...prev, response.photo]);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleGetPhotos = async () => {
    setLoading(true);
    try {
      const response = await getPhotos();
      setPhotos(response.photos);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleSetPfp = async (photoUrl: string) => {
    setLoading(true);
    try {
      await setPfp(photoUrl);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { photos, loading, handleUploadPhoto, handleGetPhotos, handleSetPfp };
};
