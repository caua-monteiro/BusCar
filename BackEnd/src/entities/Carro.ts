import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";

@Entity("carros")
export class Carro {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    marca!: string;

    @Column()
    modelo!: string;

    @Column()
    ano!: number;

    @Column("decimal", { precision: 10, scale: 2 })
    precoDia!: number;

    @Column("text", { nullable: true })
    descricao!: string;

    @Column()
    cidade!: string;

    @Column({ type: "float", default: 0 })
    avaliacao!: number;

    @Column({ nullable: true })
    imagem!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @ManyToOne(() => User, (user) => user.carros, { onDelete: "CASCADE" })
    @JoinColumn({ name: "proprietarioId" })
    proprietario!: User;
}
