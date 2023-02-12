import { ConfigService } from './config.service';
import { existsSync, readFileSync } from 'fs';
import { parse } from 'dotenv';

jest.mock('fs');
jest.mock('dotenv');

const mockedExistsSync = existsSync as jest.Mock;
const mockedReadFileSync = readFileSync as jest.Mock;
const mockedParse = parse as jest.Mock;

describe('ConfigService', () => {
  beforeEach(() => {
    mockedExistsSync.mockImplementation(() => true);
    mockedReadFileSync.mockImplementation(() => 'env-buffer');
    mockedParse.mockImplementation(() => ({
      KEY: 'VALUE',
    }));
  });

  afterEach(() => {
    process.env.NODE_ENV = 'develop';
  });

  describe('ConfigSergive constructor', () => {
    it('should call the constructor properly when config Service is called', async () => {
      const config = new ConfigService();
      expect(config).toBeDefined();
    });

    it('should load env properly when environment is production', async () => {
      process.env.NODE_ENV = 'production';
      const config = new ConfigService();
      expect(config).toBeDefined();
    });

    it('should log env file is not found', async () => {
      mockedExistsSync.mockImplementation(() => false);
      const config = new ConfigService();
      expect(config).toBeDefined();
    });
  });

  describe('get', () => {
    it('should return the desired env value', async () => {
      const config = new ConfigService();
      const value = config.get('KEY');
      expect(value).toEqual('VALUE');
    });
  });
});
