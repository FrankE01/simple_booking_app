import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Token } from './token.entity';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';
import { Midwife } from 'src/midwives/midwife.entity';
import { User } from 'src/users/user.entity';

@Injectable()
export class TokensService {
  constructor(
    @InjectRepository(Token)
    private tokenRepository: Repository<Token>,
    private jwtService: JwtService,
  ) {}

  findById(id: number): Promise<Token | null> {
    return this.tokenRepository.findOneBy({ id });
  }

  findByAccessToken(token: string): Promise<Token | null> {
    return this.tokenRepository.findOneBy({ access_token: token });
  }

  findByRefreshToken(token: string): Promise<Token | null> {
    return this.tokenRepository.findOneBy({ refresh_token: token });
  }

  async save(details: Token): Promise<Token> {
    return await this.tokenRepository.save(details);
  }

  async delete(details: Token): Promise<Token> {
    return await this.tokenRepository.remove(details);
  }

  async deleteMany(person: User | Midwife): Promise<Token[]> {
    const allPersonTokens: Token[] = await this.tokenRepository.findBy({
      person,
    });
    return await this.tokenRepository.remove(allPersonTokens);
  }

  async generateToken(details: {
    id: number;
    email: string;
    person: User | Midwife;
  }): Promise<Token> {
    const payload = {
      id: details.id,
      email: details.email,
      role:
        details.person instanceof User
          ? 'user'
          : details.person instanceof Midwife
          ? 'midwife'
          : '',
    };
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: jwtConstants.secret,
    });
    const accessToken = await this.jwtService.signAsync(
      {
        ...payload,
        refreshToken,
      },
      { secret: jwtConstants.secret },
    );

    let token: Token = new Token();
    token.access_token = accessToken;
    token.refresh_token = refreshToken;
    token.person = details.person;

    let date = new Date();
    date.setHours(date.getHours() + 1);
    token.access_token_expiration_time = date;

    date = new Date();
    date.setDate(date.getDate() + 1);
    token.refresh_token_expiration_time = date;

    return this.save(token);
  }
}
