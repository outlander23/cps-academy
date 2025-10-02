import bcrypt from "bcrypt";
import { users } from "../data/demoData.js";

export const findUserByEmail = (email) =>
  users.find((user) => user.email.toLowerCase() === email.toLowerCase());

export const verifyPassword = async (password, passwordHash) =>
  bcrypt.compare(password, passwordHash);
