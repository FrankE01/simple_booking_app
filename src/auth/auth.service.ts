import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { TokensService } from 'src/tokens/tokens.service';
import { User } from 'src/users/user.entity';
import { Token } from 'src/tokens/token.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private tokenService: TokensService,
  ) {}

  async loginUser(email: string, password: string): Promise<Token> {
    if (!email || !password) {
      throw new BadRequestException();
    }

    const user = await this.userService.findByEmail(email);

    if (user) {
      const result = await bcrypt.compare(password, user?.password);

      if (!result) {
        throw new UnauthorizedException();
      }

      return this.tokenService.generateToken({
        id: user?.id,
        email: user?.email,
        person: user,
      });
    } else {
      throw new UnauthorizedException();
    }
  }

  async registerUser(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ): Promise<Token> {
    if (!email || !password || !firstName || !lastName) {
      throw new BadRequestException();
    }

    const user = await this.userService.findByEmail(email);

    if (user) {
      throw new ConflictException();
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    let newUser: User = new User();
    newUser.email = email;
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.password = hashedPassword;
    console.log(newUser.password);

    newUser = await this.userService.create(newUser);
    return this.tokenService.generateToken({
      id: newUser?.id,
      email: newUser?.email,
      person: newUser,
    });
  }

  async logoutUser(savedToken: Token, token: string): Promise<Token[]> {
    if (savedToken?.access_token === token) {
      return this.tokenService.deleteMany(savedToken.person);
    }
  }
}
