import Router from 'koa-router';
import apiv1 from './api/v1';

const router = new Router();

router.use(apiv1.routes());

/**
 * DO NOT EDIT IT!!!
 */
router.get('/heartbeat', async (ctx) => {
    ctx.body = 1;
});
export default router;
