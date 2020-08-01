/* eslint-disable @typescript-eslint/no-unused-vars */
import config from 'src/config';
import logger from 'common/logger';
import * as error from 'common/error';
import { ObjectId } from 'mongodb';

declare global {
    namespace NodeJS {
        interface Global {
            CONFIG: typeof config
            LOGGER: typeof logger
            ERROR: typeof error
        }
    }

    interface Schema {
        title: string
        description?: string
        type: 'array' | 'boolean' | 'integer' | 'null' | 'number' | 'object' | 'string'
        properties: { [x: string]: Schema }
        required?: string[]
    }

    type PID = string | ObjectId;
}