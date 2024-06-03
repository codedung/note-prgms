import { iUserProps } from "../models/users.model";
import { api } from "./https";

export const login = async (data: iUserProps) => {
  console.log("api", data);
  const response = await api.post("/api/users/login", data);
  console.log("api", response);
  return response;
};
export const join = async (data: iUserProps) => {
  const response = await api.post("/api/users/join", data);
  return response.data;
};

export const checkEmail = async (email: string) => {
  const data = {
    email: email,
  };
  const response = await api.post("/api/users/checkEmail", data);
  return response.data;
};
