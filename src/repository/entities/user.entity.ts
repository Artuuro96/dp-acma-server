import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Module } from './module.entity';
import { Role } from './role.entity';
import { UserModule } from './user-module.entity';
import { UserRole } from './user-role.entity';
import { ActiveRole } from 'src/auth/interfaces/active-role';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 50 })
  name: string;

  @Column('varchar', { name: 'last_name' })
  lastName: string;

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

  @OneToMany(() => UserRole, (userRole) => userRole.user, { onDelete: 'CASCADE' })
  userRoles: UserRole[];

  roles: Role[];

  modules: Module[];

  @Column('jsonb', { name: 'active_role', nullable: true })
  activeRole?: ActiveRole;

  @OneToMany(() => UserModule, (UserModule) => UserModule.user, { onDelete: 'CASCADE' })
  userModules: UserModule[];

  @Column('varchar', { name: 'refresh_token', nullable: true })
  refreshToken: string;

  constructor(user: Partial<User> = {}) {
    super(user);
    Object.assign(this, user);
  }
}
