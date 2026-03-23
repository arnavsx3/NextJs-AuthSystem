import axios from "axios";
import { ContactEmail } from "../app/contact/page";

export const contactUs = async ({ name, email, message }: ContactEmail) => {
  const response = await axios.post("/api/contact", { name, email, message });
  return response.data;
};
