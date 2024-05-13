import { Injectable } from '@nestjs/common';
import { SupabaseService } from 'src/supabase/supabase.service';

@Injectable()
export class UserService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async getUser() {
    const {
      data: { user },
    } = await this.supabaseService.getClient().auth.getUser();

    return { user };
  }
}
