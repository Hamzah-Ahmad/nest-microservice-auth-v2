import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '@app/common/dtos/user/CreateUser.dto';
import { instanceToPlain } from 'class-transformer';
import { VerifyUserDto } from '@app/common/dtos/user/VerifyUser.dto';

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
    const existingUser = await this.userRepository.findOne({
      where: { username: body.username },
    });

    if (existingUser) {
      throw new ConflictException('Username already taken');
    }

    const newUser = this.userRepository.create(body);
    const user = await this.userRepository.save(newUser);
    // return user;
    return instanceToPlain(user); // NOTE: Quick method to hide  fields that use Exclude
  }

  async verifyUser({ username, password }: VerifyUserDto) {
    const user = await this.userRepository.findOneBy({ username });
    if (!user) throw new UnauthorizedException('Credentials are not valid');

    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      throw new UnauthorizedException('Credentials are not valid');
    }

    return instanceToPlain(user);
  }
}
