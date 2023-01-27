import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @Column('varchar', { name: 'created_by' })
  createdBy: string;

  @Column('varchar', { name: 'updated_by' })
  updatedBy: string;

  @Column({ name: 'deleted_at', type: 'timestamp' })
  deletedAt: Date;

  @Column('boolean')
  deleted: boolean;

  constructor(baseEntity: Partial<BaseEntity> = {}) {
    Object.assign(this, baseEntity);
  }
}
