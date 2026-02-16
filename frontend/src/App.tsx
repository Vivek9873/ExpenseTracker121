import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { ExpenseForm } from '@/components/ExpenseForm';
import { ExpenseFilters } from '@/components/ExpenseFilters';
import { ExpenseList } from '@/components/ExpenseList';
import { useExpenses } from '@/hooks/useExpenses';

function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('date_desc');
  
  const { expenses, loading, error, refetch } = useExpenses();

  const categories = useMemo(() => {
    return Array.from(new Set(expenses.map(e => e.category))).sort();
  }, [expenses]);

  const filteredExpenses = useMemo(() => {
    let filtered = [...expenses];

    if (selectedCategory) {
      filtered = filtered.filter(e => e.category === selectedCategory);
    }

    filtered.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'date_desc' ? dateB - dateA : dateA - dateB;
    });

    return filtered;
  }, [expenses, selectedCategory, sortOrder]);

  const total = useMemo(() => {
    return filteredExpenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
  }, [filteredExpenses]);

  const handleExpenseCreated = () => {
    refetch();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-6xl mx-auto px-6 pb-12">
        <div className="space-y-8">
          <ExpenseForm onSuccess={handleExpenseCreated} />

          <ExpenseFilters
            categories={categories}
            selectedCategory={selectedCategory}
            sortOrder={sortOrder}
            onCategoryChange={setSelectedCategory}
            onSortChange={setSortOrder}
            total={total}
            count={filteredExpenses.length}
          />

          <ExpenseList
            expenses={filteredExpenses}
            loading={loading}
            error={error}
            selectedCategory={selectedCategory}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
