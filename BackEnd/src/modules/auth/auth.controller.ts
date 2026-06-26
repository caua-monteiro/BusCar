import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { z } from "zod";

const authService = new AuthService();

const registerSchema = z.object({
    nome: z.string().min(2),
    email: z.string().email(),
    senha: z.string().min(6),
    telefone: z.string().min(10)
});

const loginSchema = z.object({
    email: z.string().email(),
    senha: z.string()
});

export class AuthController {
    async register(req: Request, res: Response): Promise<void> {
        try {
            const data = registerSchema.parse(req.body);
            const user = await authService.register(data);
            res.status(201).json(user);
        } catch (error: any) {
            if (error instanceof z.ZodError) {
                res.status(400).json({ error: error.errors });
            } else {
                res.status(400).json({ error: error.message });
            }
        }
    }

    async login(req: Request, res: Response): Promise<void> {
        try {
            const data = loginSchema.parse(req.body);
            const result = await authService.login(data);
            res.json(result);
        } catch (error: any) {
            if (error instanceof z.ZodError) {
                res.status(400).json({ error: error.errors });
            } else {
                res.status(401).json({ error: error.message });
            }
        }
    }
}
