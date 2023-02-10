import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';

@Entity('sessions')
export class Session extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid', { name: 'user_id' })
  userId: string;

  @OneToOne(() => User, (user) => user.session)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  constructor(session: Partial<Session> = {}) {
    super(session);
    Object.assign(this, session);
  }
}
