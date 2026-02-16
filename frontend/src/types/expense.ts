export interface Expense {
  id: string;
  amount: string; 
  category: string;
  description: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateExpenseDTO {
  amount: number;
  category: string;
  description: string;
  date: string;
}

export interface ExpenseFormData {
  amount: string;
  category: string;
  description: string;
  date: string;
}

export interface ExpenseFilters {
  category: string;
  sortOrder: 'date_desc' | 'date_asc';
}
