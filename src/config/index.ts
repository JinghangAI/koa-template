import dev from './development';
import prod from './production';

const env = process.env.NODE_ENV === 'production' ? 'production' : 'development';
const CONFIG = env === 'production' ? prod : dev;
global.CONFIG = CONFIG;

export default CONFIG;