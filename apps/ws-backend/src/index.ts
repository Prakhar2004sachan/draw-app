import { createServer } from "http";
import { handleRoomSocket } from "./roomSocket";
import { authenticateWS } from "./auth";
import { WebSocketServer } from "ws";


const server = createServer();

const wss = new WebSocketServer({ noServer: true });

server.on("upgrade", (req, socket, head) => {
  const user = authenticateWS(req, socket);
  if (!user) return;

  (req as any).user = user;

  wss.handleUpgrade(req, socket, head, (ws) => {
    wss.emit("connection", ws, req);
  });
});

handleRoomSocket(wss);

server.listen(3001, () => {
  console.log("🚀 WS server running at ws://localhost:3001");
});
