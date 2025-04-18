import { WebSocket, WebSocketServer } from "ws";
import { IncomingMessage } from "http";
import { v4 as uuidv4 } from "uuid";

// Map to manage rooms: roomId -> Set of clients
const rooms = new Map<string, Set<WebSocket>>();

export const handleRoomSocket = (wss: WebSocketServer) => {
  wss.on("connection", (ws: WebSocket, req: IncomingMessage) => {
    const user = (req as any).user;
    console.log(`👤 Connected user: ${user.userId}`);

    let currentRoom: string | null = null;

    ws.on("message", (message: string) => {
      try {
        const data = JSON.parse(message);
        const { type, payload } = data;

        switch (type) {
          case "JOIN_ROOM": {
            const { roomId } = payload;
            currentRoom = roomId;

            if (!rooms.has(roomId)) {
              rooms.set(roomId, new Set());
            }

            rooms.get(roomId)?.add(ws);
            console.log(`👥 ${user.userId} joined room ${roomId}`);
            break;
          }

          case "LEAVE_ROOM": {
            if (currentRoom && rooms.has(currentRoom)) {
              rooms.get(currentRoom)?.delete(ws);
              console.log(`🚪 ${user.userId} left room ${currentRoom}`);
            }
            break;
          }

          case "SEND_MESSAGE": {
            const { roomId, message: msg } = payload;

            if (!roomId || !rooms.has(roomId)) return;

            rooms.get(roomId)?.forEach((client) => {
              if (client.readyState === WebSocket.OPEN && client !== ws) {
                client.send(
                  JSON.stringify({
                    type: "RECEIVE_MESSAGE",
                    payload: {
                      from: user.userId,
                      message: msg,
                    },
                  })
                );
              }
            });

            break;
          }

          case "CANVAS_UPDATE": {
            const { roomId, action, element } = payload;

            if (!roomId || !rooms.has(roomId)) return;

            rooms.get(roomId)?.forEach((client) => {
              if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(
                  JSON.stringify({
                    type: "CANVAS_UPDATE",
                    payload: {
                      action,
                      element,
                      from: user.userId,
                    },
                  })
                );
              }
            });
            break;
          }

          case "CURSOR_MOVE": {
            const { roomId, position, userId } = payload;

            if (!roomId || !rooms.has(roomId)) return;

            rooms.get(roomId)?.forEach((client) => {
              if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(
                  JSON.stringify({
                    type: "CURSOR_MOVE",
                    payload: {
                      position,
                      userId,
                    },
                  })
                );
              }
            });
            break;
          }

          default:
            console.log("Unknown message type:", type);
        }
      } catch (err) {
        console.error("Invalid message format", err);
      }
    });

    ws.on("close", () => {
      if (currentRoom && rooms.has(currentRoom)) {
        rooms.get(currentRoom)?.delete(ws);
      }
      console.log(`❌ ${user.userId} disconnected from room ${currentRoom}`);
    });
  });
};
