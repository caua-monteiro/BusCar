import { AppDataSource } from "../../data-source";
import { Carro } from "../../entities/Carro";

export class HomeService {
    private carroRepository = AppDataSource.getRepository(Carro);

    async getDestaques() {
        // Retorna carros em destaque.
        // Proporção arbitraria: (avaliacao / precoDia). Ordena pelos de maior custo beneficio.
        // Evita divisão por zero (não deveria ocorrer se precoDia > 0, mas usamos COALESCE/NULLIF por segurança)
        const destaques = await this.carroRepository
            .createQueryBuilder("carro")
            .orderBy("(carro.avaliacao * 100) / NULLIF(carro.precoDia, 0)", "DESC", "NULLS LAST")
            .limit(5)
            .getMany();

        return {
            destaques: destaques.map(c => ({
                id: c.id,
                modelo: c.modelo,
                marca: c.marca,
                precoDia: c.precoDia,
                imagem: c.imagem || "url-imagem"
            }))
        };
    }
}
