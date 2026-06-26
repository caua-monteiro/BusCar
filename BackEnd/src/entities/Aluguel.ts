import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";
import { Carro } from "./Carro";

@Entity("alugueis")
export class Aluguel {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column("date")
    dataInicio!: string;

    @Column("date")
    dataFim!: string;

    @Column({ default: "PENDENTE" })
    status!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @ManyToOne(() => User, { onDelete: "CASCADE" })
    @JoinColumn({ name: "usuarioId" })
    usuario!: User;

    @ManyToOne(() => Carro, { onDelete: "CASCADE" })
    @JoinColumn({ name: "carroId" })
    carro!: Carro;
}
