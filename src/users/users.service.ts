import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const newUser = this.userRepository.create(createUserDto);
      return await this.userRepository.save(newUser);
    } catch (err) {
      console.error(err);
    }
  }

  async findById(id: number) {
    return await this.userRepository.findOne({
      relations: ['lists', 'lists.tasks'],
      where: { id },
    });
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }
}
