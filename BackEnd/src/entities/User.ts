import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from "typeorm";
import { Carro } from "./Carro";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    nome!: string;

    @Column({ unique: true })
    email!: string;

    @Column()
    senha!: string;

    @Column({ nullable: true })
    telefone!: string;

    @Column({ unique: true })
    cpf!: string;

    @Column()
    endereco!: string;

    @Column({ unique: true })
    cnh!: string;

    @Column({ type: "float", default: 0 })
    avaliacao!: number;

    @CreateDateColumn()
    createdAt!: Date;

    @OneToMany(() => Carro, (carro) => carro.proprietario)
    carros!: Carro[];
}
