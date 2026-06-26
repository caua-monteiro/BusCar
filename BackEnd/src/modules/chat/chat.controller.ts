import { Request, Response } from "express";
import { ChatService } from "./chat.service";
import { AuthRequest } from "../../middlewares/auth.middleware";
import { z } from "zod";

const chatService = new ChatService();

const criarConversaSchema = z.object({
    usuarioDestino: z.number().int().positive()
});

const enviarMensagemSchema = z.object({
    texto: z.string().min(1)
});

export class ChatController {
    async criarConversa(req: AuthRequest, res: Response): Promise<void> {
        try {
            if (!req.usuarioId) { res.status(401).json({ error: "Não autorizado" }); return; }
            const data = criarConversaSchema.parse(req.body);
            const conversa = await chatService.criarConversa(req.usuarioId, data.usuarioDestino);
            res.status(201).json(conversa);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async listarConversas(req: AuthRequest, res: Response): Promise<void> {
        try {
            if (!req.usuarioId) { res.status(401).json({ error: "Não autorizado" }); return; }
            const conversas = await chatService.listarConversas(req.usuarioId);
            res.json(conversas);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async listarMensagens(req: AuthRequest, res: Response): Promise<void> {
        try {
            if (!req.usuarioId) { res.status(401).json({ error: "Não autorizado" }); return; }
            const mensagens = await chatService.listarMensagens(Number(req.params.id), req.usuarioId);
            res.json(mensagens);
        } catch (error: any) {
            res.status(403).json({ error: error.message });
        }
    }

    async enviarMensagem(req: AuthRequest, res: Response): Promise<void> {
        try {
            if (!req.usuarioId) { res.status(401).json({ error: "Não autorizado" }); return; }
            const data = enviarMensagemSchema.parse(req.body);
            const msg = await chatService.enviarMensagem(Number(req.params.id), req.usuarioId, data.texto);
            res.status(201).json(msg);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
}
