import { Setor } from "src/setor/entities/setor.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Requerente {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => Setor, setor => setor.requerentes, { eager: true })
    @JoinColumn({ name: 'setor_id' })
    setor: Setor;

}
