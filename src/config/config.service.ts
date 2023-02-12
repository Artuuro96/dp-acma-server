import * as fs from 'fs';
import { parse } from 'dotenv';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor() {
    const isDevelopmentEnv = process.env.NODE_ENV !== 'production';

    if (isDevelopmentEnv) {
      const envFilePath = __dirname + '/../../.env';
      const existPath = fs.existsSync(envFilePath);

      if (!existPath) {
        console.log('.env file does not exist');
        return;
      }
      this.envConfig = parse(fs.readFileSync(envFilePath));
    } else {
      this.envConfig = process.env;
    }
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
