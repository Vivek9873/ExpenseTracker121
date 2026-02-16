import fs from 'fs';
import path from 'path';
import pool from './database';


export const setupDatabase = async (): Promise<void> => {
  const client = await pool.connect();
  
  try {
    const schemaPath = path.join(__dirname, '../database/schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf-8');
    
    await client.query(schema);
    console.log('Database schema created successfully');
  } catch (error) {
    console.error('Error setting up database:', error);
    throw error;
  } finally {
    client.release();
  }
};

if (require.main === module) {
  setupDatabase()
    .then(() => {
      console.log('Database setup complete');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Database setup failed:', error);
      process.exit(1);
    });
}
