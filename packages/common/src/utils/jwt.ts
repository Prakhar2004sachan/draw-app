import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "only_on_dev"

// @ts-ignore
export function genrateToken(payload) {
  // @ts-ignore
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "15d" });
}

// @ts-ignore
export function verifyToken(token) {
  // @ts-ignore
  return jwt.verify(token, JWT_SECRET);
}
