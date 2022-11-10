import { Test, TestingModule } from '@nestjs/testing';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './entities/task.entity';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

const newTask = new Task({ description: 'Task 1' });

describe('TasksController', () => {
  let taskController: TasksController;
  let taskService: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: {
            create: jest.fn().mockResolvedValue(newTask),
            delete: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    taskController = module.get<TasksController>(TasksController);
    taskService = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(taskController).toBeDefined();
    expect(taskService).toBeDefined();
  });

  describe('save', () => {
    it('should save a new task with success', async () => {
      const data: CreateTaskDto = { description: 'Task 1' };
      const taskMock = { ...data } as Task;
      jest.spyOn(taskService, 'create').mockResolvedValueOnce(taskMock);

      const result = await taskController.create(data);

      expect(result).toBeDefined();
      expect(taskService.create).toBeCalledTimes(1);
    });
  });

  describe('delete', () => {
    it('should remove a task item successfully', async () => {
      const result = await taskController.delete(1);

      expect(result).toBeUndefined();
    });

    it('should throw an exception', () => {
      jest.spyOn(taskService, 'delete').mockRejectedValueOnce(new Error());

      expect(taskController.delete(1)).rejects.toThrowError();
    });
  });
});
