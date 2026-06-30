import { AppDataSource } from "../../data-source";
import { User } from "../../entities/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class AuthService {
    private userRepository = AppDataSource.getRepository(User);

    async register(data: any) {
        const { nome, email, senha, telefone, cpf, endereco, cnh } = data;

        const exists = await this.userRepository.findOneBy({ email });
        if (exists) {
            throw new Error("Email já cadastrado.");
        }

        const hash = await bcrypt.hash(senha, 10);
        
        const user = this.userRepository.create({
            nome,
            email,
            senha: hash,
            telefone,
            cpf,
            endereco,
            cnh
        });

        await this.userRepository.save(user);

        return {
            id: user.id,
            nome: user.nome,
            email: user.email
        };
    }

    async login(data: any) {
        const { email, senha } = data;

        const user = await this.userRepository.findOneBy({ email });
        if (!user) {
            throw new Error("Credenciais inválidas.");
        }

        const match = await bcrypt.compare(senha, user.senha);
        if (!match) {
            throw new Error("Credenciais inválidas.");
        }

        const secret = process.env.JWT_SECRET || "super-secret-key";
        const token = jwt.sign({ id: user.id }, secret, { expiresIn: "1d" });

        return {
            token,
            usuario: {
                id: user.id,
                nome: user.nome,
                email: user.email
            }
        };
    }
}
