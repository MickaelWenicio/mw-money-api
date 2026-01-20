import { Router } from 'express';
import userRoutes from './user-routes';
import transactionRoutes from './transaction-routes';
import categoryRoutes from './category-routes';

const router = Router();

router.use('/users', userRoutes);
router.use('/transaction', transactionRoutes);
router.use('/category', categoryRoutes);

export default router;