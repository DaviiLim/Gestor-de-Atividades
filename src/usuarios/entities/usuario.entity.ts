import { Chamado } from "src/chamados/entities/chamado.entity";
import { Role } from "src/roles/entities/role.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    })
    updatedAt: Date;

    @OneToMany(() => Chamado, chamado => chamado.closedBy)
    closedChamados: Chamado[];

    @OneToMany(() => Chamado, chamado => chamado.openedBy)
    chamados_como_tecnico: Usuario[];

    @ManyToOne(() => Role, role => role.usuarios, {eager: false})
    @JoinColumn({ name: 'role_id' })
    role: Role; 

}
