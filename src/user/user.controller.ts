// src/user/user.controller.ts
import { Controller, Post, Body, Get, Param } from '@nestjs/common'; // Import NotFoundException
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user.dto';
import { LoginUserDto } from './dto/user.dto';
import { User } from '@prisma/client';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.register(createUserDto);
  }

  @Post('login')
  async login(
    @Body() loginUserDto: LoginUserDto,
  ): Promise<{ access_token: string }> {
    return this.userService.login(loginUserDto);
  }

  @Get()
  // @UseGuards(AuthGuard('jwt')) // Защищаем endpoint с помощью JWT guard (нужно настроить стратегию JWT)
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  // @UseGuards(AuthGuard('jwt'))
  async getUserById(@Param('id') id: string): Promise<User | null> {
    return this.userService.getUserById(id);
  }
}
