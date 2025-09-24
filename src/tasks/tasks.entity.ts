import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/user.entity';

export type TaskStatus = 'open' | 'in_progress' | 'done' | 'blocked';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  description!: string;

  @Column({ nullable: true, type: 'datetime' })
  dueDate?: Date;

  @ManyToOne(() => User, { nullable: true, eager: true })
  @JoinColumn({ name: 'assigneeId' })
  assignee?: User | null;

  @Column({ nullable: true })
  assigneeId?: string | null;

  @Column({ default: 'open' })
  status!: TaskStatus;

  @Column({ nullable: true, type: 'json' })
  metadata?: Record<string, any>;
}
