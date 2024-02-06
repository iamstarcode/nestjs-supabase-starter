import { Controller, Get, UseGuards } from '@nestjs/common';
import { SupabaseGuard } from 'src/supabase/guards/supabase.guard';
import { SupabaseService } from 'src/supabase/supabase.service';
import { Tables } from 'src/supabase/types/db.types';

@Controller('users')
export class UsersController {
  constructor(private readonly supabaseService: SupabaseService) {}
  @Get('/profile')
  @UseGuards(SupabaseGuard)
  async getUserProfile() {
    const { data } = await this.supabaseService
      .getClient()
      .from('profiles')
      .select('*')
      .single();

    const profile: Tables<'profiles'> = data;

    return { profile };
  }
}
