import { verifyToken } from "@repo/common/jwt";

// @ts-ignore
export const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(404).json({ message: "Token not found" });
  }
  try {
    const decoded = verifyToken(token);
    // @ts-ignore
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error verify the token" });
  }
};
