import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';

@Entity('sessions')
export class Session extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid', { name: 'user_id' })
  userId: string;

  user: User;

  constructor(session: Partial<Session> = {}) {
    super(session);
    Object.assign(this, session);
  }
}
