import { Configuration } from 'log4js';

const log: Configuration = {
    appenders: {
        info: {
            type: 'dateFile',
            filename: './log/info/info.log',
            keepFileExt: true
        },
        error: {
            type: 'dateFile',
            filename: './log/error/error.log',
            keepFileExt: true
        },
        request: {
            type: 'dateFile',
            filename: './log/request/request.log',
            keepFileExt: true
        },
        console: {
            type: 'console'
        }
    },
    categories: {
        default: { appenders: ['console'], level: 'info' },
        info: { appenders: ['info', 'console'], level: 'info' },
        error: { appenders: ['error', 'console'], level: 'info' },
        request: { appenders: ['request'], level: 'info' }
    }
};

const wechat = {
    corpid: 'wwed2e62dc088e450c',
    corpsecret: '6-HHHDPFZ3_mtl3Exklz0EGKhL0k7DXsl33wXLDKph0',
    agentid: '1000003',
    touser: 'WangGang|DiaoChengLei'
};

export default { log, wechat };