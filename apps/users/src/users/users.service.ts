import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { LoginInput } from './dto/login.input';
import { UpdateUserInput } from './dto/update-user.input';
import { sign } from 'jsonwebtoken';

@Injectable()
export class UsersService {
  create(createUserInput: CreateUserInput) {
    return  { exampleField: createUserInput.exampleField };
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  login(loginInput: LoginInput) {
    // TODO: implement logic properly...
    if(loginInput.username === 'foo' && loginInput.password === 'bar'){
      const accessToken =  sign({foo: 'bar'}, 'supersecretstring')
      return {accessToken}
    }
    throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
  }
}
