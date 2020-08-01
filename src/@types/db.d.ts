/**
 * DO NOT MODIFY IT BY HAND.
 * Generator it with command: `npm run schema`.
 */

export interface Test extends BaseModel {
    name: string;
    [k: string]: unknown;
}
export interface BaseModel {
    _id?: PID;
    deleted?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    [k: string]: unknown;
}
