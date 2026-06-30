import { Request, Response } from "express";
import { AlugueisService } from "./alugueis.service";
import { AuthRequest } from "../../middlewares/auth.middleware";
import { z } from "zod";

const alugueisService = new AlugueisService();

// Verifica padrão yyyy-mm-dd
const dataRegex = /^\d{4}-\d{2}-\d{2}$/;

const createAluguelSchema = z.object({
    carroId: z.number().int().positive(),
    dataInicio: z.string().regex(dataRegex, "A data deve estar no formato YYYY-MM-DD"),
    dataFim: z.string().regex(dataRegex, "A data deve estar no formato YYYY-MM-DD")
}).refine(data => {
    return new Date(data.dataInicio) <= new Date(data.dataFim);
}, { message: "Data de fim não pode ser antes da data de início", path: ["dataFim"] });

export class AlugueisController {
    async create(req: AuthRequest, res: Response): Promise<void> {
        try {
            if (!req.usuarioId) {
                res.status(401).json({ error: "Não autorizado" });
                return;
            }
            const data = createAluguelSchema.parse(req.body);
            const aluguel = await alugueisService.create(req.usuarioId, data);
            res.status(201).json(aluguel);
        } catch (error: any) {
            if (error instanceof z.ZodError) {
                res.status(400).json({ error: (error as any).errors });
            } else {
                res.status(400).json({ error: error.message });
            }
        }
    }

    async listMeus(req: AuthRequest, res: Response): Promise<void> {
        try {
            if (!req.usuarioId) {
                res.status(401).json({ error: "Não autorizado" });
                return;
            }
            const alugueis = await alugueisService.listMeus(req.usuarioId);
            res.json(alugueis);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async cancel(req: AuthRequest, res: Response): Promise<void> {
        try {
            if (!req.usuarioId) {
                res.status(401).json({ error: "Não autorizado" });
                return;
            }
            await alugueisService.cancel(Number(req.params.id), req.usuarioId);
            res.status(204).send();
        } catch (error: any) {
            res.status(403).json({ error: error.message });
        }
    }
}
