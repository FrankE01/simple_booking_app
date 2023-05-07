import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { MidwivesModule } from 'src/midwives/midwives.module';
import { UsersService } from 'src/users/users.service';
import { MidwivesService } from 'src/midwives/midwives.service';

@Module({
  imports: [
    UsersModule,
    MidwivesModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, UsersService, MidwivesService],
  exports: [AuthService],
})
export class AuthModule {}
