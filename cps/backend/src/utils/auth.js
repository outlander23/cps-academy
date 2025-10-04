import jwt from "jsonwebtoken";
import { JWT_SECRET, TOKEN_EXPIRY } from "./config.js";

export const buildUserPayload = (user) => ({
  id: user.id,
  email: user.email,
  name: user.name,
  role: user.role,
});

export const generateAuthToken = (user) =>
  jwt.sign(
    {
      sub: user.id,
      email: user.email,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: TOKEN_EXPIRY }
  );

export const sendAuthResponse = (res, user, statusCode = 200) => {
  const safeUser = buildUserPayload(user);
  const token = generateAuthToken(user);

  return res.status(statusCode).json({ token, user: safeUser });
};
