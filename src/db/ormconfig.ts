import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  ssl: false,
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  synchronize: false,
  username: 'postgres',
  password: 'postgres',
  database: 'acma-server',
  entities: ['dist/**/**/*.entity.{ts,js}'],
  migrationsTableName: 'migrations',
  migrations: ['dist/db/migrations/*.{js,ts}'],
};
const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
