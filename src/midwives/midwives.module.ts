import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Midwife } from './midwife.entity';
import { MidwivesService } from './midwives.service';
import { MidwivesController } from './midwives.controller';
import { Token } from 'src/tokens/token.entity';
import { JwtService } from '@nestjs/jwt';
import { TokensService } from 'src/tokens/tokens.service';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Midwife, Token, User])],
  providers: [MidwivesService, JwtService, TokensService, UsersService],
  controllers: [MidwivesController],
  exports: [TypeOrmModule],
})
export class MidwivesModule {}
