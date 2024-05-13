import { Controller, Get, UseGuards } from '@nestjs/common';
import { SupabaseGuard } from 'src/supabase/guards/supabase.guard';
import { UserService } from './user.service';
import { SupabaseService } from 'src/supabase/supabase.service';

@Controller('user')
@UseGuards(SupabaseGuard)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly supabaseService: SupabaseService,
  ) {}

  @Get('/me')
  async getUser() {
    return await this.userService.getUser();
  }
}
