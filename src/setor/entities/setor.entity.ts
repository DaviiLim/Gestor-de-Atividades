import { Chamado } from "src/chamados/entities/chamado.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('setores')
export class Setor {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Chamado, chamado => chamado.setor)
    chamados: Chamado[];

}
