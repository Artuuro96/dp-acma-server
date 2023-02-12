import { Column, Entity, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Session } from './session.entity';
import { Role } from './role.entity';
import { Module } from './module.entity';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 50 })
  name: string;

  @Column('varchar', { name: 'last_name' })
  lastName: string;

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable({
    name: 'user_roles',
    joinColumn: {
      name: 'user_id',
    },
    inverseJoinColumn: {
      name: 'role_id',
    },
  })
  roles: Role[];

  @Column('varchar', { name: 'second_last_name', length: 50, nullable: true })
  secondLastName: string;

  @Column('varchar', { name: 'username', length: 50, unique: true })
  username: string;

  @Column('varchar', { unique: true, length: 50 })
  email: string;

  @Column('varchar', { name: 'password', length: 80 })
  password: string;

  @Column('varchar', { name: 'active', default: true })
  active: boolean;

  @Column('varchar', { array: true, name: 'old_passwords', nullable: true })
  oldPasswords: string[];

  @Column('integer', { name: 'recovery_code', nullable: true })
  recoveryCode: string;

  @Column('boolean', { default: false })
  verified: boolean;

  @ManyToMany(() => Module, (module) => module.users)
  @JoinTable({
    name: 'user_modules',
    joinColumn: {
      name: 'user_id',
    },
    inverseJoinColumn: {
      name: 'module_id',
    },
  })
  modules: Module[];

  @OneToOne(() => Session)
  session: Session;

  constructor(user: Partial<User> = {}) {
    super(user);
    Object.assign(this, user);
  }
}
