/**
 * 前端响应错误码，不可使用`0`
 * 
 * 通用错误码使用负数，自定义错误码使用正数
 */
export enum ErrorCode {
    /**
     * 未知异常
     */
    unknown = -1,
    /**
     * 参数错误
     */
    invalidArgument = -2
}

/**
 * [ErrorCode](#ErrorCode) 的描述
 */
export const ErrorCodeLabel = new Map<ErrorCode, string>([
    [ErrorCode.unknown, '未知异常，请联系管理员！'],
    [ErrorCode.invalidArgument, '参数错误！']
]);