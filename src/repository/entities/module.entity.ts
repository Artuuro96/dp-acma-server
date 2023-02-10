import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { BaseEntity } from './base.entity';

@Entity('modules')
export class Module extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 25, unique: true })
  name: string;

  @Column('varchar', { length: 25 })
  text: string;

  @Column('varchar', { length: 50 })
  description: string;

  @Column('varchar', { length: 25, unique: true })
  path: string;

  @ManyToMany(() => User, (user) => user.modules)
  users: User[];

  constructor(module: Partial<Module> = {}) {
    super(module);
    Object.assign(this, module);
  }
}
