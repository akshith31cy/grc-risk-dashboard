import app from './app';
import { initializeDatabase } from './config/database';
import { seedDatabase } from './utils/seedData';

const PORT = process.env.PORT || 3001;

// Initialize database and seed data
initializeDatabase();

// Check if we should seed the database (only on first run)
const shouldSeed = process.argv.includes('--seed');
if (shouldSeed) {
  console.log('Seeding database...');
  seedDatabase();
}

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 API docs: http://localhost:${PORT}/api/health`);
});