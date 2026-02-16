import { Router } from 'express';
import expenseRoutes from './expense.routes';

const router = Router();

// Health check route
router.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV 
  });
});

// API routes
router.use('/expenses', expenseRoutes);

export default router;
