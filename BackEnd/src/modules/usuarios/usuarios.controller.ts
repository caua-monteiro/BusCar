import { Request, Response } from "express";
import { UsuariosService } from "./usuarios.service";
import { AuthRequest } from "../../middlewares/auth.middleware";
import { z } from "zod";

const usuariosService = new UsuariosService();

import { isValidCNH } from "../../utils/validators";

const updateSchema = z.object({
    nome: z.string().min(2).optional(),
    telefone: z.string().min(10).optional(),
    cnh: z.string().refine((val) => isValidCNH(val), { message: "CNH inválida." }).optional()
});

const updateSenhaSchema = z.object({
    senhaAtual: z.string().min(6),
    novaSenha: z.string().min(6)
});

export class UsuariosController {
    async getMe(req: AuthRequest, res: Response): Promise<void> {
        try {
            if (!req.usuarioId) { res.status(401).json({ error: "Não autorizado" }); return; }
            const user = await usuariosService.getMe(req.usuarioId);
            res.json(user);
        } catch (error: any) {
            res.status(404).json({ error: error.message });
        }
    }

    async update(req: AuthRequest, res: Response): Promise<void> {
        try {
            if (!req.usuarioId) { res.status(401).json({ error: "Não autorizado" }); return; }
            const data = updateSchema.parse(req.body);
            const user = await usuariosService.update(req.usuarioId, data);
            res.json(user);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async updateSenha(req: AuthRequest, res: Response): Promise<void> {
        try {
            if (!req.usuarioId) { res.status(401).json({ error: "Não autorizado" }); return; }
            const data = updateSenhaSchema.parse(req.body);
            await usuariosService.updateSenha(req.usuarioId, data.senhaAtual, data.novaSenha);
            res.status(204).send();
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async delete(req: AuthRequest, res: Response): Promise<void> {
        try {
            if (!req.usuarioId) { res.status(401).json({ error: "Não autorizado" }); return; }
            await usuariosService.delete(req.usuarioId);
            res.status(204).send();
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
}
