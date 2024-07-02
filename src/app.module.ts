import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as ormConfig from '../ormconfig';
import { ScheduleModule } from '@nestjs/schedule';
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { LoggingInterceptor } from '@algoan/nestjs-logging-interceptor';
import { HttpExceptionFilter } from '@algoan/nestjs-http-exception-filter';
import { LoggerModule } from 'nestjs-pino';
import { LOG_LEVEL } from 'config';

@Module({
  imports: [
    ApiModule,
    ScheduleModule.forRoot(),
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
        },
        level: LOG_LEVEL || 'info',
        redact: ['req.headers.authorization', 'headers.authorization', 'headers["secret-api-key"]'],
      },
    }),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
