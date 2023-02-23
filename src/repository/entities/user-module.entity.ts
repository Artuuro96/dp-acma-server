import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Module } from './module.entity';
import { User } from './user.entity';

@Entity('user_modules')
export class UserModule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @ManyToOne(() => Module)
  @JoinColumn({ name: 'module_id', referencedColumnName: 'id' })
  module: Module;

  constructor(userModule: Partial<UserModule> = {}) {
    Object.assign(this, userModule);
  }
}
