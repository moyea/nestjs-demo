import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'sqlite',
          database: config.get('SQLITE_DB'),
          synchronize: true,
          entities: ['dist/**/*.entity.{ts,js}'],
        };
      },
    }),
  ],
})
export class DatabaseModule {}
