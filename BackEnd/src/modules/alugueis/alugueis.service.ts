import { AppDataSource } from "../../data-source";
import { Aluguel } from "../../entities/Aluguel";
import { Carro } from "../../entities/Carro";
import { User } from "../../entities/User";
import { LessThanOrEqual, MoreThanOrEqual } from "typeorm";

export class AlugueisService {
    private aluguelRepository = AppDataSource.getRepository(Aluguel);
    private carroRepository = AppDataSource.getRepository(Carro);

    async create(usuarioId: number, data: any) {
        const { carroId, dataInicio, dataFim } = data;

        const carro = await this.carroRepository.findOneBy({ id: carroId });
        if (!carro) {
            throw new Error("Carro não encontrado");
        }

        // Validação de conflito de datas: checar se já existe aluguel APROVADO que cruze com as datas
        const conflitos = await this.aluguelRepository
            .createQueryBuilder("aluguel")
            .where("aluguel.carroId = :carroId", { carroId })
            .andWhere("aluguel.status = :status", { status: "APROVADO" })
            .andWhere("(aluguel.dataInicio <= :dataFim AND aluguel.dataFim >= :dataInicio)", { dataInicio, dataFim })
            .getMany();

        if (conflitos.length > 0) {
            throw new Error("Carro já está alugado para este período");
        }

        const user = new User();
        user.id = usuarioId;

        const aluguel = this.aluguelRepository.create({
            carro,
            usuario: user,
            dataInicio,
            dataFim,
            status: "PENDENTE"
        });

        await this.aluguelRepository.save(aluguel);

        return {
            id: aluguel.id,
            status: aluguel.status
        };
    }

    async listMeus(usuarioId: number) {
        return await this.aluguelRepository.find({
            where: { usuario: { id: usuarioId } },
            relations: { carro: true }
        });
    }

    async cancel(id: number, usuarioId: number) {
        const aluguel = await this.aluguelRepository.findOne({
            where: { id },
            relations: { usuario: true }
        });

        if (!aluguel) {
            throw new Error("Aluguel não encontrado");
        }

        if (aluguel.usuario.id !== usuarioId) {
            throw new Error("Você não tem permissão para cancelar este aluguel");
        }

        if (aluguel.status === "CANCELADO" || aluguel.status === "CONCLUIDO") {
            throw new Error("Este aluguel não pode mais ser cancelado");
        }

        aluguel.status = "CANCELADO";
        await this.aluguelRepository.save(aluguel);
    }
}
