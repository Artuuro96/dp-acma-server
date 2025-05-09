import { ConfigService } from 'src/config/config.service';
import { DataSource, DataSourceOptions } from 'typeorm';
import { readFileSync } from 'fs';

const config = new ConfigService();

const ssl: boolean | { ca: Buffer } =
  process.env.NODE_ENV === 'PROD' ? { ca: readFileSync('./certs/ca-certificate.crt') } : false;

export const dataSourceOptions: DataSourceOptions = {
  ssl: ssl,
  type: 'postgres',
  host: config.get('POSTGRES_HOST'),
  port: parseInt(config.get('POSTGRES_PORT'), 10),
  synchronize: false,
  username: config.get('POSTGRES_USER'),
  password: config.get('POSTGRES_PASSWORD'),
  database: config.get('POSTGRES_DB'),
  entities: ['dist/**/**/*.entity.{ts,js}'],
  migrationsTableName: 'migrations',
  migrations: ['dist/db/migrations/*.{js,ts}'],
};
const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
