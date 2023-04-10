import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { UserModule } from './user-module.entity';

@Entity('modules')
export class Module extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 25, unique: true })
  name: string;

  @Column('varchar', { length: 25 })
  componentName: string;

  @Column('varchar', { length: 50 })
  description: string;

  @Column('varchar', { length: 50, nullable: true })
  icon: string;

  @Column('varchar', { length: 25, unique: true })
  path: string;

  @OneToMany(() => UserModule, (userModule) => userModule.module)
  userModules?: UserModule[];

  constructor(module: Partial<Module> = {}) {
    super(module);
    Object.assign(this, module);
  }
}
