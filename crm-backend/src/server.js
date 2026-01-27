import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/error.middleware.js';
import { connectDatabase } from './config/database.js';
import authRoutes from './routes/auth.routes.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: [
    process.env.CORS_ORIGIN || 'http://localhost:5173',
    'http://localhost:3001', // Development portal application
    'http://localhost:3000', // Student portal application
    'http://localhost:5173'  // CRM frontend
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Custom request logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl || req.url}`);
  next();
});

// Logging middleware (morgan for additional details)
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
} else {
  // In production, use combined format for more details
  app.use(morgan('combined'));
}

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handle OPTIONS requests for CORS preflight
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.sendStatus(200);
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'CRM Authentication Gateway is running',
    timestamp: new Date().toISOString()
  });
});

// Test endpoint for verify-token route
app.get('/auth/verify-token/test', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Verify-token endpoint is accessible',
    endpoint: 'POST /auth/verify-token',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/auth', authRoutes);

// 404 handler
app.use((req, res) => {
  console.log(`[404] Route not found: ${req.method} ${req.originalUrl || req.url}`);
  console.log(`[404] Headers:`, {
    origin: req.headers.origin,
    'content-type': req.headers['content-type'],
    'user-agent': req.headers['user-agent']
  });
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.originalUrl || req.url,
    method: req.method
  });
});

// Error handling middleware (must be last)
app.use(errorHandler);

// Start server
app.listen(PORT, async () => {
  console.log(`🚀 CRM Authentication Gateway running on port ${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
  
  // Connect to database
  try {
    await connectDatabase();
  } catch (error) {
    console.error('⚠️  Database connection failed. Some features may not work.');
    console.error('   Make sure MySQL is running and database credentials are correct.');
  }
});

export default app;
