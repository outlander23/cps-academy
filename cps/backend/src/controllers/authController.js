import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
import { sendAuthResponse } from "../utils/auth.js";
import { USER_ROLES } from "../models/user.model.js";
import {
  createUser,
  findUserByEmail,
  verifyPassword,
} from "../services/userService.js";

export const register = catchAsync(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new AppError("Name, email, and password are required", 400);
  }

  // if (role && !allowedRoles.includes(role)) {
  //   throw new AppError(
  //     `Invalid role. Allowed roles: ${allowedRoles.join(", ")}`,
  //     400
  //   );
  // }

  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new AppError("Email already registered", 409);
  }

  const user = await createUser({
    name: name.trim(),
    email,
    role: "normal",
    passwordHash: password,
  });

  return sendAuthResponse(res, user, 201);
});

export const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError("Email and password are required", 400);
  }

  const user = await findUserByEmail(email);
  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  const isValid = await verifyPassword(user, password);
  if (!isValid) {
    throw new AppError("Invalid credentials", 401);
  }

  return sendAuthResponse(res, user);
});
