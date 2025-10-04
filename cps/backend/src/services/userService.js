import { User } from "../models/user.model.js";

const normalizeEmail = (email) => email.trim().toLowerCase();

export const findUserByEmail = async (email) =>
  User.findOne({ email: normalizeEmail(email) });

export const createUser = async ({ email, ...rest }) =>
  User.create({ email: normalizeEmail(email), ...rest });

export const verifyPassword = (user, password) => user.verifyPassword(password);
