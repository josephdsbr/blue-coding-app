import { Controller, Get, Inject } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}
    
    @Get()
    async getUserById(): Promise<User | null> {
      return this.userService.findById(1);
    }
}
