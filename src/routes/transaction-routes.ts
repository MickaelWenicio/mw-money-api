import { Router } from 'express';
import { transactionController } from '../controller/transaction-controller';

const router = Router();

router.post('/', transactionController.create);

export default router;