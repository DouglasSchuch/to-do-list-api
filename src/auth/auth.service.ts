import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(userEmail: string, userPassword: string) {
    const user = await this.usersService.findByEmail(userEmail);
    if (user?.password === userPassword) {
      const { id, email } = user;
      return { id, email };
    }

    return null;
  }

  async login(cred: any) {
    const payload = { email: cred.email, sub: cred.id };
    const user: User = await this.usersService.findOne(cred.id);
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async getBoard(token: string) {
    const decodeToken: any = this.jwtService.decode(token.split(' ')[1]);
    return await this.usersService.findOne(decodeToken.sub);
  }
}
