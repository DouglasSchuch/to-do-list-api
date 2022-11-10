import { List } from '../../lists/entities/list.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ nullable: false })
  description: string;

  @ManyToOne(() => List, (list: List) => list.id, { onDelete: 'CASCADE' })
  list: List;

  constructor(task?: Partial<Task>) {
    this.id = task?.id;
    this.description = task?.description;
  }
}
