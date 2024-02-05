import { User } from "./../../entity/User";
import { AppDataSource } from "../../data-source";
import { BaseService } from "../base.service";

const userRepository = AppDataSource.getRepository(User);

const userService = new BaseService(User, userRepository);

export const getUsers = async () => {
  return await userService.index();
};

export const getUserByUsername = async (username: string) => {
  return await userService.findByColumn("username", username);
};

export const getUserByEmail = async (email: string) => {
  return await userService.findByColumn("email", email);
};

export const getUserById = async (id: number) => {
  return await userService.findById(id);
};

export const storeUser = async (user: Partial<User>) => {
  return await userService.store(user);
};

export const updateUser = async (id: number, user: Partial<User>) => {
  return await userService.update(id, user);
};

export const deleteUser = async (id: number) => {
  await userService.delete(id);
};
