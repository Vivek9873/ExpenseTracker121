import apiClient from '@/lib/api-client';
import { API_ENDPOINTS } from '@/config/api.config';
import { Expense, CreateExpenseDTO } from '@/types/expense';

export const expenseApi = {

  getExpenses: async (category?: string, sort?: string): Promise<Expense[]> => {
    const params: Record<string, string> = {};
    if (category) params.category = category;
    if (sort) params.sort = sort;

    const response = await apiClient.get<Expense[]>(API_ENDPOINTS.expenses, { params });
    return response.data;
  },


  createExpense: async (data: CreateExpenseDTO): Promise<Expense> => {
    const response = await apiClient.post<Expense>(API_ENDPOINTS.expenses, data);
    return response.data;
  },


  getExpenseById: async (id: string): Promise<Expense> => {
    const response = await apiClient.get<Expense>(`${API_ENDPOINTS.expenses}/${id}`);
    return response.data;
  },


  healthCheck: async (): Promise<{ status: string; timestamp: string }> => {
    const response = await apiClient.get(API_ENDPOINTS.health);
    return response.data;
  },
};
