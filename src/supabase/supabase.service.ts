import { Inject, Injectable, Scope } from '@nestjs/common';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { createClient, SupabaseClient } from '@supabase/supabase-js';

import { ExtractJwt } from 'passport-jwt';
import { Database } from './types/db.types';

@Injectable({ scope: Scope.REQUEST })
export class SupabaseService {
  private clientInstance: SupabaseClient;

  constructor(
    @Inject(REQUEST) private readonly request: Request,
    private readonly configService: ConfigService,
  ) {}

  getClient() {
    if (this.clientInstance) {
      return this.clientInstance;
    }

    this.clientInstance = createClient<Database>(
      this.configService.get('SUPABASE_API_URL'),
      this.configService.get('SUPABASE_ANON_KEY'),
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
        global: {
          headers: {
            Authorization: `Bearer ${ExtractJwt.fromAuthHeaderAsBearerToken()(
              this.request,
            )}`,
          },
        },
      },
    );

    return this.clientInstance;
  }
}
