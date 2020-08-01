import 'module-alias/register'; // hook require
import './config';
import 'common/logger';

import App from 'koa';
import body from 'koa-body';
import route from './route';
import { request, error } from './middleware';
import pdb from 'common/db';

function start() {
    const app = new App();
    app.proxy = true;

    // body parser
    app.use(body());
    // 错误处理
    app.use(error.middleware());
    // 请求日志
    app.use(request.middleware());
    // 路由
    app.use(route.middleware());

    app.listen(global.CONFIG.app.port);
    global.LOGGER.info(`PTE start: http://127.0.0.1:${global.CONFIG.app.port}`);
}

pdb.init(
    global.CONFIG.app.mongodb
).then(start).catch((err: Error) => {
    console.log(err);
    process.exit(1);
});



