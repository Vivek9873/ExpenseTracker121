import { useState, useEffect, useCallback } from 'react';
import { expenseApi } from '@/services/expense.service';
import { Expense } from '@/types/expense';

interface UseExpensesReturn {
  expenses: Expense[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useExpenses = (category?: string, sort?: string): UseExpensesReturn => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchExpenses = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await expenseApi.getExpenses(category, sort);
      setExpenses(data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to load expenses');
      console.error('Error fetching expenses:', err);
    } finally {
      setLoading(false);
    }
  }, [category, sort]);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  return {
    expenses,
    loading,
    error,
    refetch: fetchExpenses,
  };
};
