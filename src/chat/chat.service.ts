import { Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { parse } from 'cookie';
import { Socket } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class ChatService {
  constructor(private readonly authService: AuthService) {}

  async getUserFromSocket(socket: Socket) {
    const cookie = socket.handshake.headers.cookie;
    const { Authentication: authToken } = parse(cookie);
    const user = this.authService.getUserFromAuthToken(authToken);
    if (!user) {
      throw new WsException('Invalid credentials.');
    }
    return user;
  }
}
