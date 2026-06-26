import { WebSocketServer, WebSocket } from "ws";
import { Server } from "http";
import jwt from "jsonwebtoken";

// Mapeia os usuários conectados (um usuário pode ter múltiplas abas abertas)
const clients = new Map<number, WebSocket[]>();

export function setupWebSocket(server: Server) {
    const wss = new WebSocketServer({ server, path: "/chat" });

    wss.on("connection", (ws, req) => {
        try {
            // Extrai o token da query string: ws://localhost:3000/chat?token=xxx
            const url = new URL(req.url || "", `http://${req.headers.host}`);
            const token = url.searchParams.get("token");

            if (!token) {
                ws.close(1008, "Token missing");
                return;
            }

            const secret = process.env.JWT_SECRET || "super-secret-key";
            const decoded = jwt.verify(token, secret) as { id: number };
            const usuarioId = decoded.id;

            if (!clients.has(usuarioId)) {
                clients.set(usuarioId, []);
            }
            clients.get(usuarioId)!.push(ws);

            console.log(`[WS] Usuário ${usuarioId} conectado.`);

            ws.on("close", () => {
                const userClients = clients.get(usuarioId);
                if (userClients) {
                    const filtered = userClients.filter(c => c !== ws);
                    if (filtered.length === 0) {
                        clients.delete(usuarioId);
                    } else {
                        clients.set(usuarioId, filtered);
                    }
                }
                console.log(`[WS] Usuário ${usuarioId} desconectado.`);
            });
        } catch (err) {
            ws.close(1008, "Invalid token");
        }
    });
}

// Função para notificar um usuário específico em tempo real
export function notifyUser(usuarioId: number, event: string, data: any) {
    const userClients = clients.get(usuarioId);
    if (userClients) {
        const payload = JSON.stringify({ event, data });
        userClients.forEach(ws => {
            if (ws.readyState === WebSocket.OPEN) {
                ws.send(payload);
            }
        });
    }
}
