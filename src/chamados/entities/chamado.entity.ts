import { Setor } from "src/setor/entities/setor.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { StatusChamado } from "../dto/create-chamado.dto";
import { Usuario } from "src/usuarios/entities/usuario.entity";

@Entity('chamados')
export class Chamado {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({ type: 'timestamp', nullable: true })
    startDate: Date;

    @Column({ type: 'timestamp', nullable: true })
    endDate: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    })
    updatedAt: Date;

    @Column({ 
        
        type: 'enum',
        enum: StatusChamado,
        default: StatusChamado.ABERTO

     })
    status: string;

    @ManyToOne(() => Usuario, usuario => usuario.id, { eager: true })
    @JoinColumn({ name: 'tecnico_id' })
    tecnico: Usuario;

    @ManyToOne(() => Usuario, usuario => usuario.id, { eager: true })
    @JoinColumn({ name: 'requerente_id' })
    requerente: Usuario;

    @ManyToOne(() => Setor, setor => setor.chamados, { eager: true })
    @JoinColumn({ name: 'setor_id' })
    setor: Setor;   

}
