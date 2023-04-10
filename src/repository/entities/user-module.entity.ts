import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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

  @Column({ name: 'created_at', type: 'timestamp', nullable: true })
  createdAt: Date;

  @Column('uuid', { name: 'created_by', nullable: true })
  createdBy: string;

  constructor(userModule: Partial<UserModule> = {}) {
    Object.assign(this, userModule);
  }
}
