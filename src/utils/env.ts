import { config } from 'dotenv';
import * as dotenvExpand from 'dotenv-expand';
import { join, basename } from 'path';
import { rootPath } from '@utils/node';
import { existsSync } from 'fs';

export const env = {
    get(key: string): string | undefined {
        const envFilePath = `.env.${process.env['NODE_ENV']}`;
        const path = join(rootPath, envFilePath);

        if (!existsSync(path)) {
            throw Error(`File ${basename(path)} does not exist.`);
        }

        const envConfig = config({ path });
        dotenvExpand(envConfig);

        const envVaribale = process.env[key.toUpperCase()];

        if (!envVaribale) {
            throw Error(`Env variable: ${key} does not exist.`);
        } else {
            return envVaribale;
        }
    }
};
