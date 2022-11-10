import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

const newUser = new User({ email: 'test@test.com', password: '123' });
const userList: User[] = [
  new User({ id: 1, email: 'test1@test.com', password: '111' }),
  new User({ id: 2, email: 'test2@test.com', password: '222' }),
  new User({ id: 3, email: 'test3@test.com', password: '333' }),
];

describe('UsersController', () => {
  let userController: UsersController;
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest.fn().mockResolvedValue(newUser),
            findById: jest.fn().mockResolvedValue(userList[0]),
          },
        },
      ],
    }).compile();

    userController = module.get<UsersController>(UsersController);
    userService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
    expect(userService).toBeDefined();
  });

  describe('save', () => {
    it('should save a new user with success', async () => {
      const data: CreateUserDto = { email: 'test@test.com', password: '123' };
      const userMock = { ...data } as User;
      jest.spyOn(userService, 'create').mockResolvedValueOnce(userMock);

      const result = await userController.create(data);

      expect(result).toBeDefined();
      expect(userService.create).toBeCalledTimes(1);
    });
  });

  describe('find', () => {
    it('should get a task item successfully', async () => {
      // Act
      const result = await userController.findById(1);

      // Assert
      expect(result).toEqual(userList[0]);
      expect(userService.findById).toHaveBeenCalledTimes(1);
      expect(userService.findById).toHaveBeenCalledWith('1');
    });

    it('should throw an exception', () => {
      // Arrange
      jest.spyOn(userService, 'findById').mockRejectedValueOnce(new Error());

      // Assert
      expect(userController.findById(1)).rejects.toThrowError();
    });
  });
});
