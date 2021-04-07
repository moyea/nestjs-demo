import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat/chat.service';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { JwtService } from './jwt/jwt.service';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ExceptionsLoggerFilter } from './utils/exceptions-logger.filter';
import { LoggingInterceptor } from './utils/logging.interceptor';

@Module({
  imports: [
    PostsModule,
    ConfigModule.forRoot({
      envFilePath: './config/develop.env',
      validationSchema: Joi.object({
        SQLITE_DB: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(),
      }),
    }),
    DatabaseModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    { provide: APP_FILTER, useClass: ExceptionsLoggerFilter },
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
    AppService,
    ChatGateway,
    ChatService,
    AuthService,
    JwtService,
  ],
})
export class AppModule {}
