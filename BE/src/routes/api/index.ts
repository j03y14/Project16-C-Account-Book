import Router from 'koa-router';

import authMiddleware from '@/middlewares/check-token';

import authRouter from '@/routes/api/auth';
import accountBookRouter from '@/routes/api/account-book';
import defaultPaymentMethodRouter from '@/routes/api/defaultPaymentMethod';
import socialRouter from '@/routes/api/social';

const router = new Router();

// api/

router.use('/auth', authRouter.routes());
router.use(authMiddleware.checkToken);
router.use('/accountbook', accountBookRouter.routes());
router.use('/social/accountbook', socialRouter.routes());
router.use('/defaultPaymentMethod', defaultPaymentMethodRouter.routes());

export default router;
