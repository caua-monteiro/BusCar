import { AppDataSource } from "../../data-source";
import { Conversa } from "../../entities/Conversa";
import { Mensagem } from "../../entities/Mensagem";
import { User } from "../../entities/User";
import { notifyUser } from "../../websocket";

export class ChatService {
    private conversaRepository = AppDataSource.getRepository(Conversa);
    private mensagemRepository = AppDataSource.getRepository(Mensagem);
    private userRepository = AppDataSource.getRepository(User);

    async criarConversa(usuarioLogadoId: number, usuarioDestinoId: number) {
        if (usuarioLogadoId === usuarioDestinoId) {
            throw new Error("Não é possível criar conversa consigo mesmo");
        }

        // Verifica se já existe conversa entre os dois
        const existente = await this.conversaRepository
            .createQueryBuilder("c")
            .where("(c.usuario1Id = :u1 AND c.usuario2Id = :u2) OR (c.usuario1Id = :u2 AND c.usuario2Id = :u1)", {
                u1: usuarioLogadoId,
                u2: usuarioDestinoId
            })
            .getOne();

        if (existente) return existente;

        const u1 = new User(); u1.id = usuarioLogadoId;
        const u2 = new User(); u2.id = usuarioDestinoId;

        const conversa = this.conversaRepository.create({
            usuario1: u1,
            usuario2: u2
        });

        await this.conversaRepository.save(conversa);
        return conversa;
    }

    async listarConversas(usuarioLogadoId: number) {
        return await this.conversaRepository
            .createQueryBuilder("c")
            .leftJoinAndSelect("c.usuario1", "u1")
            .leftJoinAndSelect("c.usuario2", "u2")
            .where("c.usuario1Id = :id OR c.usuario2Id = :id", { id: usuarioLogadoId })
            .getMany();
    }

    async listarMensagens(conversaId: number, usuarioLogadoId: number) {
        const conversa = await this.conversaRepository.findOne({
            where: { id: conversaId },
            relations: { usuario1: true, usuario2: true }
        });

        if (!conversa) throw new Error("Conversa não encontrada");

        if (conversa.usuario1.id !== usuarioLogadoId && conversa.usuario2.id !== usuarioLogadoId) {
            throw new Error("Você não tem acesso a esta conversa");
        }

        return await this.mensagemRepository.find({
            where: { conversa: { id: conversaId } },
            relations: { remetente: true },
            order: { dataEnvio: "ASC" }
        });
    }

    async enviarMensagem(conversaId: number, remetenteId: number, texto: string) {
        const conversa = await this.conversaRepository.findOne({
            where: { id: conversaId },
            relations: { usuario1: true, usuario2: true }
        });

        if (!conversa) throw new Error("Conversa não encontrada");

        if (conversa.usuario1.id !== remetenteId && conversa.usuario2.id !== remetenteId) {
            throw new Error("Você não tem acesso a esta conversa");
        }

        const remetente = new User(); remetente.id = remetenteId;

        const msg = this.mensagemRepository.create({
            texto,
            conversa,
            remetente
        });

        await this.mensagemRepository.save(msg);

        // Notifica via WebSocket o outro usuário
        const destinatarioId = conversa.usuario1.id === remetenteId ? conversa.usuario2.id : conversa.usuario1.id;
        
        notifyUser(destinatarioId, "nova_mensagem", {
            id: msg.id,
            conversaId: conversa.id,
            remetenteId,
            texto,
            dataEnvio: msg.dataEnvio
        });

        return msg;
    }
}
