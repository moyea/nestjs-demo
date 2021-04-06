import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtService {
  verify(authToken: string, arg1: { secret: any }) {
    return {
      userId: authToken,
    };
  }
}
