import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataSource } from 'typeorm';
import { User } from './users/user.entity';
import { Token } from './tokens/token.entity';
import { UsersModule } from './users/users.module';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UsersController } from './users/users.controller';
import { AuthController } from './auth/auth.controller';
import { TokensService } from './tokens/tokens.service';
import { TokensModule } from './tokens/tokens.module';
import { MidwivesModule } from './midwives/midwives.module';
import { MidwivesController } from './midwives/midwives.controller';
import { MidwivesService } from './midwives/midwives.service';
import { Midwife } from './midwives/midwife.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || '',
      database: process.env.DB_NAME || 'simple_booking_app',
      entities: [User, Midwife, Token],
      synchronize: true,
      logging: true,
    }),
    UsersModule,
    MidwivesModule,
    TokensModule,
  ],
  controllers: [
    AppController,
    UsersController,
    AuthController,
    MidwivesController,
  ],
  providers: [
    AppService,
    AuthService,
    UsersService,
    MidwivesService,
    JwtService,
    TokensService,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
