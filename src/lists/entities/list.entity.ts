import { Task } from '../../tasks/entities/task.entity';
import { User } from '../../users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('lists')
export class List {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ nullable: false })
  name: string;

  @ManyToOne(() => User, (user: User) => user.id)
  user: User;

  @OneToMany(() => Task, (Task) => Task.list, { cascade: true })
  tasks: Task[];

  constructor(list?: Partial<List>) {
    this.id = list?.id;
    this.name = list?.name;
  }
}
