import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { Role } from './role.entity';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @Column('varchar', { name: 'last_name' })
  lastName: string;

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'role_id', referencedColumnName: 'id' })
  role: Role;

  @Column('varchar', { name: 'second_last_name' })
  secondLastName: string;

  @Column('varchar', { name: 'username' })
  username: string;

  @Column('varchar')
  email: string;

  @Column('varchar', { name: 'password' })
  password: string;

  @Column('uuid', { name: 'role_id' })
  roleId: string;

  @Column('uuid', { name: 'setting_id' })
  settingId: string;

  @Column('varchar', { name: 'active' })
  active: boolean;

  @Column('varchar', { array: true, name: 'old_passwords' })
  oldPasswords: string[];

  @Column('smallint', { name: 'recovery_code' })
  recoveryCode: string;
}
