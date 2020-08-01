import 'koa-body';
import { Context, Next } from 'koa';
import { ErrorCode, ErrorCodeLabel } from 'common/enum';
import * as error from 'common/error';
import wechat from 'common/wechat';

class ErrorHanlde {
    /**
     * 全局异常捕获
     */
    middleware() {
        return async (ctx: Context, next: Next) => {
            await next().catch(err => {
                ctx.status = 200;

                switch (true) {
                    case err instanceof error.ValidateError:
                        this.handleValidateError(ctx, err);
                        break;
                    case err instanceof error.BizError:
                        this.handleBizError(ctx, err);
                        break;
                    default:
                        this.handleUnknownError(ctx, err);
                }
            });
        };
    }

    /**
     * 处理未知异常
     */
    private handleUnknownError(ctx: Context, err: Error): void {
        ctx.body = this.getResponseBody(ErrorCode.unknown);
        global.LOGGER.error(err);
        // 发送消息
        wechat.send(err.message);
    }

    /**
     * 处理参数验证异常
     */
    private handleValidateError(ctx: Context, err: error.ValidateError): void {
        ctx.body = this.getResponseBody(err.code, err.data);
        global.LOGGER.info(err);
    }

    /**
     * 处理业务异常
     */
    private handleBizError(ctx: Context, err: error.BizError): void {
        ctx.body = this.getResponseBody(err.code);
    }

    /**
     * 根据错误码生成错误信息
     */
    private getResponseBody(code: ErrorCode, data?: unknown) {
        return {
            code: code,
            msg: ErrorCodeLabel.get(code),
            data
        };
    }
}

export default new ErrorHanlde();