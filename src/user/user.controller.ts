import { Controller, Get, UseGuards } from '@nestjs/common';
import { SupabaseGuard } from 'src/supabase/guards/supabase.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/profile')
  @UseGuards(SupabaseGuard)
  async getUserProfile() {
    await this.userService.getUserProfile();
  }
}
