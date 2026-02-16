import { ValidationError } from './errors';
import { CreateExpenseDTO } from '../types/expense.types';

export const validateCreateExpense = (data: any): CreateExpenseDTO => {
  const { amount, category, description, date } = data;


  if (!amount || !category || !description || !date) {
    throw new ValidationError('Missing required fields: amount, category, description, date');
  }

  const amountNum = parseFloat(amount);
  if (isNaN(amountNum) || amountNum <= 0) {
    throw new ValidationError('Amount must be a positive number');
  }


  if (typeof category !== 'string' || category.trim().length === 0) {
    throw new ValidationError('Category must be a non-empty string');
  }


  if (typeof description !== 'string' || description.trim().length === 0) {
    throw new ValidationError('Description must be a non-empty string');
  }


  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    throw new ValidationError('Invalid date format');
  }

  return {
    amount: amountNum,
    category: category.trim(),
    description: description.trim(),
    date: date,
  };
};

export const validateExpenseQuery = (query: any) => {
  const { category, sort } = query;

  if (sort && sort !== 'date_desc' && sort !== 'date_asc') {
    throw new ValidationError('Sort parameter must be either "date_desc" or "date_asc"');
  }

  return {
    category: category ? String(category) : undefined,
    sort: sort as 'date_desc' | 'date_asc' | undefined,
  };
};
