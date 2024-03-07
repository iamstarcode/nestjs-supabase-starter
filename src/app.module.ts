import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SupabaseModule } from './supabase/supabase.module';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { CoinbaseService } from './coinbase/coinbase.service';
import { CoinbaseModule } from './coinbase/coinbase.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SupabaseModule,
    UserModule,
    CoinbaseModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService, CoinbaseService],
})
export class AppModule {}
