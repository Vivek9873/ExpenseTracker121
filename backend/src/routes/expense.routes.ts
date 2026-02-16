import { Router } from 'express';
import expenseController from '../controllers/expense.controller';

const router = Router();

router.post('/', expenseController.createExpense.bind(expenseController));
router.get('/', expenseController.getExpenses.bind(expenseController));
router.get('/:id', expenseController.getExpenseById.bind(expenseController));

export default router;
