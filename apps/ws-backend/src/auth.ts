import { IncomingMessage } from "http";
import { verifyToken } from "@repo/common/jwt";

export const authenticateWS = (
  req: IncomingMessage,
  socket: any
): { userId: string } | null => {
  try {
    const url = new URL(req.url || "", `http://${req.headers.host}`);
    const token = url.searchParams.get("token");

    if (!token) {
      socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
      socket.destroy();
      return null;
    }

    const decoded = verifyToken(token);
    // @ts-ignore
    return decoded.id;
  } catch (err) {
    socket.write("HTTP/1.1 403 Forbidden\r\n\r\n");
    socket.destroy();
    return null;
  }
};