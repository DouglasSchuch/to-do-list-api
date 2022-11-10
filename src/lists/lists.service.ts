import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateListDto } from './dto/create-list.dto';
import { List } from './entities/list.entity';

@Injectable()
export class ListsService {
  constructor(
    @InjectRepository(List) private readonly listRepository: Repository<List>,
  ) {}

  async create(createListDto: CreateListDto) {
    try {
      const newList = this.listRepository.create(createListDto);
      return await this.listRepository.save(newList);
    } catch (err) {
      console.error(err);
    }
  }

  async delete(id: number) {
    return await this.listRepository.delete(id);
  }
}
