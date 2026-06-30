import { Request, Response } from "express";
import { CarrosService } from "./carros.service";
import { AuthRequest } from "../../middlewares/auth.middleware";
import { z } from "zod";

const carrosService = new CarrosService();

const createCarroSchema = z.object({
    marca: z.string().min(1),
    modelo: z.string().min(1),
    ano: z.coerce.number().int().min(1900),
    precoDia: z.coerce.number().positive(),
    descricao: z.string().optional(),
    cidade: z.string().min(1)
});

export class CarrosController {
    async listAll(req: Request, res: Response): Promise<void> {
        try {
            const carros = await carrosService.listAll(req.query);
            res.json(carros);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async getById(req: Request, res: Response): Promise<void> {
        try {
            const carro = await carrosService.getById(Number(req.params.id));
            res.json(carro);
        } catch (error: any) {
            res.status(404).json({ error: error.message });
        }
    }

    async create(req: AuthRequest, res: Response): Promise<void> {
        try {
            if (!req.usuarioId) {
                res.status(401).json({ error: "Não autorizado" });
                return;
            }
            const data = createCarroSchema.parse(req.body);
            
            // Se houver arquivo anexado pelo multer, pegamos o nome dele
            const imagem = req.file ? `uploads/${req.file.filename}` : null;
            
            const carroData = {
                ...data,
                imagem
            };

            const carro = await carrosService.create(req.usuarioId, carroData);
            res.status(201).json(carro);
        } catch (error: any) {
            if (error instanceof z.ZodError) {
                res.status(400).json({ error: error.errors });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async getMeusCarros(req: AuthRequest, res: Response): Promise<void> {
        try {
            if (!req.usuarioId) {
                res.status(401).json({ error: "Não autorizado" });
                return;
            }
            const carros = await carrosService.getMeusCarros(req.usuarioId);
            res.json(carros);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async update(req: AuthRequest, res: Response): Promise<void> {
        try {
            if (!req.usuarioId) {
                res.status(401).json({ error: "Não autorizado" });
                return;
            }
            // Usamos partial() no Zod para permitir atualização parcial
            const data = createCarroSchema.partial().parse(req.body);
            const carro = await carrosService.update(Number(req.params.id), req.usuarioId, data);
            res.json(carro);
        } catch (error: any) {
            if (error instanceof z.ZodError) {
                res.status(400).json({ error: error.errors });
            } else {
                res.status(403).json({ error: error.message });
            }
        }
    }

    async delete(req: AuthRequest, res: Response): Promise<void> {
        try {
            if (!req.usuarioId) {
                res.status(401).json({ error: "Não autorizado" });
                return;
            }
            await carrosService.delete(Number(req.params.id), req.usuarioId);
            res.status(204).send();
        } catch (error: any) {
            res.status(403).json({ error: error.message });
        }
    }
}
