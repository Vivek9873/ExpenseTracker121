export interface Expense {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: Date;
  created_at: Date;
  updated_at: Date;
}

export interface CreateExpenseDTO {
  amount: number;
  category: string;
  description: string;
  date: string;
}

export interface ExpenseQueryParams {
  category?: string;
  sort?: 'date_desc' | 'date_asc';
}

export interface ExpenseResponse {
  id: string;
  amount: string; 
  category: string;
  description: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}
