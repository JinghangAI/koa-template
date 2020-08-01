import common from './common';

common.wechat.touser = 'WangGang';

const mongodb = process.env.NODE_ENV === 'debug' ?
    'mongodb://127.0.0.1:27017/database?authSource=admin' :
    'mongodb://127.0.0.1:27017/database?authSource=admin';
    
const config = Object.assign({}, common, {
    app: {
        port: 11600,
        mongodb: mongodb
    }
});

export default config;