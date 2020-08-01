import { ErrorCode } from './enum';

/**
 * 参数验证异常
 */
export class ValidateError extends Error {
    code: ErrorCode;
    constructor(
        readonly data: string[]
    ) {
        super();
        this.name = 'ValidateError';
        this.code = ErrorCode.invalidArgument;
    }
}

/**
 * 业务异常
 */
export class BizError extends Error {
    constructor(
        readonly code: ErrorCode
    ) {
        super();
        this.name = 'BizError';
    }
}

global.ERROR = {
    ValidateError,
    BizError
};