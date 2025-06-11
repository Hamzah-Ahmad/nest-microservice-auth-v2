import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '@app/common/dtos/user/CreateUser.dto';
import { instanceToPlain } from 'class-transformer';

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
    const newUser = this.userRepository.create(body);
    const user =  await this.userRepository.save(newUser);
    // return user;
    return instanceToPlain(user); // NOTE: Quick method to hide  fields that use Exclude
  }
}
