import jwt from "jsonwebtoken";

export const signToken = (payload, expiresIn = "7d") => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET missing in environment");
  return jwt.sign(payload, secret, { expiresIn });
};

export const verifyToken = (token) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET missing in environment");
  return jwt.verify(token, secret);
};

