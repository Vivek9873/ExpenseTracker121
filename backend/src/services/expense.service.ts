import pool from '../config/database';
import { CreateExpenseDTO, ExpenseQueryParams, ExpenseResponse } from '../types/expense.types';
import { DatabaseError } from '../utils/errors';

export class ExpenseService {
  async createExpense(data: CreateExpenseDTO): Promise<ExpenseResponse> {
    const client = await pool.connect();
    
    try {
      const query = `
        INSERT INTO expenses (amount, category, description, date)
        VALUES ($1, $2, $3, $4)
        RETURNING id, amount, category, description, date, created_at, updated_at
      `;
      
      const values = [data.amount, data.category, data.description, data.date];
      const result = await client.query(query, values);
      
      return this.formatExpenseResponse(result.rows[0]);
    } catch (error) {
      console.error('Error creating expense:', error);
      throw new DatabaseError('Failed to create expense');
    } finally {
      client.release();
    }
  }

  async getExpenses(params: ExpenseQueryParams): Promise<ExpenseResponse[]> {
    const client = await pool.connect();
    
    try {
      const { category, sort = 'date_desc' } = params;
      
      let query = 'SELECT * FROM expenses';
      const values: any[] = [];
      
      if (category) {
        query += ' WHERE category = $1';
        values.push(category);
      }
      
      const sortDirection = sort === 'date_desc' ? 'DESC' : 'ASC';
      query += ` ORDER BY date ${sortDirection}, created_at ${sortDirection}`;
      
      const result = await client.query(query, values);
      
      return result.rows.map(row => this.formatExpenseResponse(row));
    } catch (error) {
      console.error('Error fetching expenses:', error);
      throw new DatabaseError('Failed to fetch expenses');
    } finally {
      client.release();
    }
  }

  async getExpenseById(id: string): Promise<ExpenseResponse | null> {
    const client = await pool.connect();
    
    try {
      const query = 'SELECT * FROM expenses WHERE id = $1';
      const result = await client.query(query, [id]);
      
      if (result.rows.length === 0) {
        return null;
      }
      
      return this.formatExpenseResponse(result.rows[0]);
    } catch (error) {
      console.error('Error fetching expense:', error);
      throw new DatabaseError('Failed to fetch expense');
    } finally {
      client.release();
    }
  }

  async deleteExpense(id: string): Promise<boolean> {
    const client = await pool.connect();
    
    try {
      const query = 'DELETE FROM expenses WHERE id = $1 RETURNING id';
      const result = await client.query(query, [id]);
      
      return result.rowCount !== null && result.rowCount > 0;
    } catch (error) {
      console.error('Error deleting expense:', error);
      throw new DatabaseError('Failed to delete expense');
    } finally {
      client.release();
    }
  }

  async updateExpense(id: string, data: Partial<CreateExpenseDTO>): Promise<ExpenseResponse | null> {
    const client = await pool.connect();
    
    try {
      const updates: string[] = [];
      const values: any[] = [];
      let paramCount = 1;
      
      if (data.amount !== undefined) {
        updates.push(`amount = $${paramCount++}`);
        values.push(data.amount);
      }
      if (data.category !== undefined) {
        updates.push(`category = $${paramCount++}`);
        values.push(data.category);
      }
      if (data.description !== undefined) {
        updates.push(`description = $${paramCount++}`);
        values.push(data.description);
      }
      if (data.date !== undefined) {
        updates.push(`date = $${paramCount++}`);
        values.push(data.date);
      }
      
      if (updates.length === 0) {
        const existing = await this.getExpenseById(id);
        return existing;
      }
      
      values.push(id);
      const query = `
        UPDATE expenses 
        SET ${updates.join(', ')}
        WHERE id = $${paramCount}
        RETURNING id, amount, category, description, date, created_at, updated_at
      `;
      
      const result = await client.query(query, values);
      
      if (result.rows.length === 0) {
        return null;
      }
      
      return this.formatExpenseResponse(result.rows[0]);
    } catch (error) {
      console.error('Error updating expense:', error);
      throw new DatabaseError('Failed to update expense');
    } finally {
      client.release();
    }
  }

  private formatExpenseResponse(row: any): ExpenseResponse {
    return {
      id: row.id,
      amount: parseFloat(row.amount).toString(),
      category: row.category,
      description: row.description,
      date: row.date.toISOString(),
      createdAt: row.created_at.toISOString(),
      updatedAt: row.updated_at.toISOString(),
    };
  }
}

export default new ExpenseService();
