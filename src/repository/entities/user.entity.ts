import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { Session } from './session.entity';
import { Role } from './role.entity';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
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

  @Column('varchar', { name: 'second_last_name' })
  secondLastName: string;

  @Column('varchar', { name: 'username' })
  username: string;

  @Column('varchar')
  email: string;

  @Column('varchar', { name: 'password' })
  password: string;

  @Column('varchar', { name: 'active' })
  active: boolean;

  @Column('varchar', { array: true, name: 'old_passwords' })
  oldPasswords: string[];

  @Column('smallint', { name: 'recovery_code' })
  recoveryCode: string;

  @OneToOne(() => Session)
  @JoinColumn()
  session: Session;

  constructor(user: Partial<User> = {}) {
    super(user);
    Object.assign(this, user);
  }
}
