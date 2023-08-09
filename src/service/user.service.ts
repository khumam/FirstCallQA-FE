import axios from "axios";
import { type StoreUserPayload, type UpdateUserPayload } from "../interfaces/user.interface";

const base_url = "http://localhost:3080/api/v1";

export const getAllUsers = async () => {
  const users = await axios.get(`${base_url}/user`);
  return users;
}

export const getUserById = async (id: string) => {
  const user = await axios.get(`${base_url}/user/${id}`);
  return user;
}

export const storeUser = async (payload: StoreUserPayload) => {
  const user = await axios.post(`${base_url}/user/store`, payload);
  return user;
}

export const updateUser = async (payload: UpdateUserPayload) => {
  const data = {
    first_name: payload.first_name,
    last_name: payload.last_name
  }
  const user = await axios.put(`${base_url}/user/update/${payload.id}`, data);
  return user;
}

export const deleteUser = async (id: string) => {
  const user = await axios.delete(`${base_url}/user/delete/${id}`);
  return user;
}

const UserService = {
  getAllUsers,
  getUserById,
  storeUser,
  updateUser,
  deleteUser,
}

export default UserService;