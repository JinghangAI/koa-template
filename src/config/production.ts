import common from './common';

const config = Object.assign({}, common, {
    app: {
        port: 11601,
        mongodb: ''
    }
});

export default config;