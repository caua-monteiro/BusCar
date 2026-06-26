import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Conversa } from "./Conversa";
import { User } from "./User";

@Entity("mensagens")
export class Mensagem {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column("text")
    texto!: string;

    @CreateDateColumn()
    dataEnvio!: Date;

    @ManyToOne(() => Conversa, { onDelete: "CASCADE" })
    @JoinColumn({ name: "conversaId" })
    conversa!: Conversa;

    @ManyToOne(() => User, { onDelete: "CASCADE" })
    @JoinColumn({ name: "remetenteId" })
    remetente!: User;
}
