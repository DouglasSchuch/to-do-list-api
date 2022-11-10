import { Test, TestingModule } from '@nestjs/testing';
import { CreateListDto } from './dto/create-list.dto';
import { List } from './entities/list.entity';
import { ListsController } from './lists.controller';
import { ListsService } from './lists.service';

const newList = new List({ name: 'List 1' });

describe('ListsController', () => {
  let listController: ListsController;
  let listService: ListsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ListsController],
      providers: [
        {
          provide: ListsService,
          useValue: {
            create: jest.fn().mockResolvedValue(newList),
            delete: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    listController = module.get<ListsController>(ListsController);
    listService = module.get<ListsService>(ListsService);
  });

  it('should be defined', () => {
    expect(listController).toBeDefined();
    expect(listService).toBeDefined();
  });

  describe('save', () => {
    it('should save a new list with success', async () => {
      const data: CreateListDto = { name: 'List 1' };
      const listMock = { ...data } as List;
      jest.spyOn(listService, 'create').mockResolvedValueOnce(listMock);

      const result = await listController.create(data);

      expect(result).toBeDefined();
      expect(listService.create).toBeCalledTimes(1);
    });
  });

  describe('delete', () => {
    it('should remove a list item successfully', async () => {
      const result = await listController.delete(1);

      expect(result).toBeUndefined();
    });

    it('should throw an exception', () => {
      jest.spyOn(listService, 'delete').mockRejectedValueOnce(new Error());

      expect(listController.delete(1)).rejects.toThrowError();
    });
  });
});
