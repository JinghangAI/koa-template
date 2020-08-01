import { AxiosFactory } from './axios';

const axios = AxiosFactory();

class Wechat {
    private readonly corpid = global.CONFIG.wechat.corpid;
    private readonly corpsecret = global.CONFIG.wechat.corpsecret;
    private readonly tokenURL = 'https://qyapi.weixin.qq.com/cgi-bin/gettoken';
    private readonly messageURL = 'https://qyapi.weixin.qq.com/cgi-bin/message/send';

    /**
     * 获取企业微信access token
     */
    private async getAssessToken() {
        const url = `${this.tokenURL}?corpid=${this.corpid}&corpsecret=${this.corpsecret}`;
        const res = await axios.get(url);
        const token = res.data.access_token;
        return token;
    }

    /**
     * 发送企业微信消息
     * @param msg 发送消息内容
     */
    async send(msg: unknown) {
        const token = await this.getAssessToken();
        const message = new Text(msg);
        const url = `${this.messageURL}?access_token=${token}`;

        await axios.post(url, message);
    }
}

class BaseMessage {
    /**
     * 收信人
     */
    touser = global.CONFIG.wechat.touser;
    /**
     * 应用Id
     */
    agentid = global.CONFIG.wechat.agentid;
    project = 'PTE';
    env = process.env.NODE_ENV || 'development';
}

/**
 * 文本消息
 */
class Text extends BaseMessage {
    msgtype = 'text';
    text = {
        content: ''
    };
    constructor(msg: unknown) {
        super();
        msg = typeof msg === 'string' ? msg : JSON.stringify(msg);
        this.text.content = `${this.project} ${this.env} 环境发生异常\n${msg}`;
    }
}



export default new Wechat();