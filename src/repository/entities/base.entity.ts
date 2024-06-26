import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'created_at', type: 'timestamp', nullable: false })
  createdAt: Date;

  @Column('uuid', { name: 'created_by', nullable: false })
  createdBy: string;

  @Column({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt: Date;

  @Column('uuid', { name: 'updated_by', nullable: true })
  updatedBy: string;

  @Column({
    name: 'deleted_at',
    type: 'timestamp',
    nullable: true,
  })
  deletedAt: Date;

  @Column({
    name: 'deleted_by',
    type: 'uuid',
    nullable: true,
  })
  deletedBy: string;

  @Column('boolean', { nullable: false, default: false })
  deleted: boolean;

  constructor(baseEntity: Partial<BaseEntity> = {}) {
    Object.assign(this, baseEntity);
  }
}
