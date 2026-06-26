import { AppDataSource } from "../../data-source";
import { Carro } from "../../entities/Carro";
import { User } from "../../entities/User";

export class CarrosService {
    private carroRepository = AppDataSource.getRepository(Carro);

    async listAll(filters: any) {
        const query = this.carroRepository.createQueryBuilder("carro");

        if (filters.marca) {
            query.andWhere("carro.marca = :marca", { marca: filters.marca });
        }
        if (filters.cidade) {
            query.andWhere("carro.cidade = :cidade", { cidade: filters.cidade });
        }
        if (filters.ano) {
            query.andWhere("carro.ano = :ano", { ano: filters.ano });
        }
        if (filters.precoMax) {
            query.andWhere("carro.precoDia <= :precoMax", { precoMax: filters.precoMax });
        }

        return await query.getMany();
    }

    async getById(id: number) {
        const carro = await this.carroRepository.findOne({
            where: { id },
            relations: { proprietario: true }
        });

        if (!carro) {
            throw new Error("Carro não encontrado");
        }

        return {
            id: carro.id,
            modelo: carro.modelo,
            marca: carro.marca,
            ano: carro.ano,
            precoDia: carro.precoDia,
            descricao: carro.descricao,
            cidade: carro.cidade,
            proprietario: {
                id: carro.proprietario.id,
                nome: carro.proprietario.nome
            }
        };
    }

    async create(usuarioId: number, data: any) {
        const user = new User();
        user.id = usuarioId;

        const carro = this.carroRepository.create({
            ...data,
            proprietario: user
        });

        await this.carroRepository.save(carro);
        return carro;
    }

    async getMeusCarros(usuarioId: number) {
        return await this.carroRepository.find({
            where: { proprietario: { id: usuarioId } },
            select: ["id", "modelo", "marca"]
        });
    }

    async update(id: number, usuarioId: number, data: any) {
        const carro = await this.carroRepository.findOne({
            where: { id },
            relations: { proprietario: true }
        });

        if (!carro) {
            throw new Error("Carro não encontrado");
        }

        if (carro.proprietario.id !== usuarioId) {
            throw new Error("Você não tem permissão para editar este carro");
        }

        this.carroRepository.merge(carro, data);
        await this.carroRepository.save(carro);
        
        return carro;
    }

    async delete(id: number, usuarioId: number) {
        const carro = await this.carroRepository.findOne({
            where: { id },
            relations: { proprietario: true }
        });

        if (!carro) {
            throw new Error("Carro não encontrado");
        }

        if (carro.proprietario.id !== usuarioId) {
            throw new Error("Você não tem permissão para excluir este carro");
        }

        await this.carroRepository.remove(carro);
    }
}
