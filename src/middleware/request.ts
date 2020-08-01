import 'koa-body';
import { Context, Next } from 'koa';

class Request {
    middleware() {
        return async (ctx: Context, next: Next) => {
            const start = Date.now();
            await next();
            const logInfo = {
                request: {
                    method: ctx.request.method,
                    url: ctx.request.url,
                    query: ctx.request.query,
                    body: ctx.request.body
                },
                response: {
                    status: ctx.response.status,
                    body: ctx.response.body,
                    time: Date.now() - start + 'ms'
                }
            };
            global.LOGGER.request(JSON.stringify(logInfo));
        };
    }
}

export default new Request();