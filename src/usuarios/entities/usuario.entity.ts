import { Chamado } from "src/chamados/entities/chamado.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { roleUsuario } from "../dto/create-usuario.dto";

@Entity('usuarios')
export class Usuario {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fullName: string;

    @Column()
    email: string;

    @Column( {select: false} )
    password: string;

    @Column({
        type: 'enum',
        enum: roleUsuario,
    })
    role: roleUsuario;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    })
    updatedAt: Date;

    @OneToMany(() => Chamado, chamado => chamado.usuario)
    chamados: Chamado[];
}
