import { Request, Response, NextFunction } from 'express';
import expenseService from '../services/expense.service';
import { validateCreateExpense, validateExpenseQuery } from '../utils/validators';
import { AppError } from '../utils/errors';

export class ExpenseController {
  async createExpense(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedData = validateCreateExpense(req.body);
      const expense = await expenseService.createExpense(validatedData);

      res.status(201).json(expense);
    } catch (error) {
      next(error);
    }
  }

  async getExpenses(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedParams = validateExpenseQuery(req.query);
      const expenses = await expenseService.getExpenses(validatedParams);

      res.json(expenses);
    } catch (error) {
      next(error);
    }
  }

  
  async getExpenseById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const expense = await expenseService.getExpenseById(id);

      if (!expense) {
        throw new AppError(404, 'Expense not found');
      }

      res.json(expense);
    } catch (error) {
      next(error);
    }
  }
}

export default new ExpenseController();
