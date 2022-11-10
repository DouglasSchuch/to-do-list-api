import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    try {
      const newList = this.taskRepository.create(createTaskDto);
      return await this.taskRepository.save(newList);
    } catch (err) {
      console.error(err);
    }
  }

  async delete(id: number) {
    return await this.taskRepository.delete(id);
  }
}
