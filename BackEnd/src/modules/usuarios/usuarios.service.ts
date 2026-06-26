import { AppDataSource } from "../../data-source";
import { User } from "../../entities/User";
import bcrypt from "bcryptjs";

export class UsuariosService {
    private userRepository = AppDataSource.getRepository(User);

    async getMe(id: number) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) throw new Error("Usuário não encontrado");

        return {
            id: user.id,
            nome: user.nome,
            email: user.email,
            telefone: user.telefone
        };
    }

    async update(id: number, data: { nome?: string; telefone?: string }) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) throw new Error("Usuário não encontrado");

        this.userRepository.merge(user, data);
        await this.userRepository.save(user);

        return {
            id: user.id,
            nome: user.nome,
            email: user.email,
            telefone: user.telefone
        };
    }

    async updateSenha(id: number, senhaAtual: string, novaSenha: string) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) throw new Error("Usuário não encontrado");

        const match = await bcrypt.compare(senhaAtual, user.senha);
        if (!match) throw new Error("Senha atual incorreta");

        user.senha = await bcrypt.hash(novaSenha, 10);
        await this.userRepository.save(user);
    }

    async delete(id: number) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) throw new Error("Usuário não encontrado");

        await this.userRepository.remove(user);
    }
}
