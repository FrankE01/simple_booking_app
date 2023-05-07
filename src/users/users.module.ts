import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Token } from 'src/tokens/token.entity';
import { JwtService } from '@nestjs/jwt';
import { TokensService } from 'src/tokens/tokens.service';
import { MidwivesService } from 'src/midwives/midwives.service';
import { Midwife } from 'src/midwives/midwife.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Token, Midwife])],
  providers: [UsersService, JwtService, TokensService, MidwivesService],
  controllers: [UsersController],
  exports: [TypeOrmModule],
})
export class UsersModule {}
