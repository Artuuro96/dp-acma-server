import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { UserModules } from './user-modules.entity';

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

  @OneToMany(() => UserModules, (userModules) => userModules.module)
  userModules: UserModules[];

  constructor(module: Partial<Module> = {}) {
    super(module);
    Object.assign(this, module);
  }
}
