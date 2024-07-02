import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { typeorm } from 'config';

const options = {
  ...typeorm,
  entities: [__dirname + '/src/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/*.ts'],
} as TypeOrmModuleOptions;

module.exports = options;
