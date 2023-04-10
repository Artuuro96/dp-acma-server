import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Module } from './module.entity';
import { Role } from './role.entity';
import { Session } from './session.entity';
import { UserModule } from './user-module.entity';
import { UserRole } from './user-role.entity';

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

  @OneToMany(() => UserRole, (userRole) => userRole.user)
  userRoles: UserRole[];

  roles: Role[];

  modules: Module[];

  @OneToMany(() => UserModule, (UserModule) => UserModule.user)
  userModules: UserModule[];

  @OneToOne(() => Session)
  session: Session;

  @Column('varchar', { name: 'refresh_token', nullable: true })
  refreshToken: string;

  constructor(user: Partial<User> = {}) {
    super(user);
    Object.assign(this, user);
  }
}
