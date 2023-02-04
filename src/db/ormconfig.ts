import { ConfigService } from 'src/config/config.service';
import { DataSource, DataSourceOptions } from 'typeorm';

const config = new ConfigService();

export const dataSourceOptions: DataSourceOptions = {
  ssl: false,
  type: 'postgres',
  host: config.get('POSTGRES_HOST'),
  port: 5432,
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
