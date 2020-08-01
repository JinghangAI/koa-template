import Router from 'koa-router';
import test from 'controller/test';
import validate from 'middleware/validate';

const router = new Router();

router.get('/test', validate.middleware('query'), test.test);

export default router;