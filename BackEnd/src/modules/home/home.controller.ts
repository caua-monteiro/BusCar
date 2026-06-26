import { Request, Response } from "express";
import { HomeService } from "./home.service";

const homeService = new HomeService();

export class HomeController {
    async getDestaques(req: Request, res: Response): Promise<void> {
        try {
            const destaques = await homeService.getDestaques();
            res.json(destaques);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}
