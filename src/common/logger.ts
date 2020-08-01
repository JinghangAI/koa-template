import { Logger, configure, getLogger } from 'log4js';

/**
 * log4js封装日志类
 */
class BaseLogger {
    private infoLogger: Logger;
    private errorLogger: Logger;
    private requestLogger: Logger;
    constructor() {
        configure(global.CONFIG.log);
        this.infoLogger = getLogger('info');
        this.errorLogger = getLogger('error');
        this.requestLogger = getLogger('request');
    }

    /**
     * 打印 info 信息，并写入 info 文件内
     */
    info(msg: string | Error) {
        this.infoLogger.info(msg);
    }

    /**
     * 打印 error 信息，并写入 error 文件内
     */
    error(msg: string | Error) {
        this.errorLogger.error(msg);
    }

    /**
     * 打印 request 信息，并写入 request 文件内
     */
    request(msg: string | Error) {
        this.requestLogger.info(msg);
    }
}

const logger = new BaseLogger();
global.LOGGER = logger;
export default logger;