import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
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

     })
    status: string;
    
    @ManyToOne(() => Usuario, usuario => usuario.chamados, { eager: true })
    @JoinColumn({ name: 'usuario_id' })
    usuario: Usuario;
}
