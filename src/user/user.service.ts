import { Injectable } from '@nestjs/common';
import { SupabaseService } from 'src/supabase/supabase.service';
import { Tables } from 'src/supabase/types/db.types';

@Injectable()
export class UserService {
  constructor(private readonly supabaseService: SupabaseService) {}

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
