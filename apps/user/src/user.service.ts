import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '@app/common/dtos/user/CreateUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUser(id: string) {
    return await this.userRepository.findOneBy({ id });
  }

  async createUser(body: CreateUserDto) {
    const user = this.userRepository.create(body);
    return await this.userRepository.save(user);
  }
}
