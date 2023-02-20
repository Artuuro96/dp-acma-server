import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { RolePermissions } from './role-permissions.entity';

@Entity('permissions')
export class Permission extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { nullable: false, unique: true })
  name: string;

  @Column('varchar', { nullable: true })
  description: string;

  @OneToMany(() => RolePermissions, (rolePermission) => rolePermission.permission)
  rolePermission: RolePermissions[];

  constructor(permission: Partial<Permission>) {
    super(permission);
    Object.assign(this, permission);
  }
}
