import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from './token.entity';
import { TokensService } from './tokens.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';
import { Midwife } from 'src/midwives/midwife.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Token, User, Midwife])],
  providers: [TokensService, JwtService],
  exports: [TypeOrmModule],
})
export class TokensModule {}
