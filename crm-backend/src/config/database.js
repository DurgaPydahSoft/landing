import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Database Configuration
 * MySQL connection pool setup for multiple databases
 */

let studentPool = null;
let admissionsPool = null;

/**
 * Create MySQL connection pool for student database
 */
export const createStudentPool = () => {
  if (studentPool) {
    return studentPool;
  }

  studentPool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'student_database',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
  });

  return studentPool;
};

/**
 * Create MySQL connection pool for admissions database
 */
export const createAdmissionsPool = () => {
  if (admissionsPool) {
    return admissionsPool;
  }

  admissionsPool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME_ADMISSIONS || 'admissions_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
  });

  return admissionsPool;
};

/**
 * Create MySQL connection pool (legacy - defaults to student database)
 */
export const createPool = () => {
  return createStudentPool();
};

/**
 * Initialize database connections
 */
export const connectDatabase = async () => {
  try {
    // Connect to student database
    studentPool = createStudentPool();
    const studentConnection = await studentPool.getConnection();
    await studentConnection.ping();
    studentConnection.release();
    console.log(`✅ Student database (${process.env.DB_NAME}) connection established`);

    // Connect to admissions database if configured
    if (process.env.DB_NAME_ADMISSIONS) {
      admissionsPool = createAdmissionsPool();
      const admissionsConnection = await admissionsPool.getConnection();
      await admissionsConnection.ping();
      admissionsConnection.release();
      console.log(`✅ Admissions database (${process.env.DB_NAME_ADMISSIONS}) connection established`);
    }

    return { studentPool, admissionsPool };
  } catch (error) {
    console.error('❌ Database connection error:', error);
    throw error;
  }
};

/**
 * Close database connection pools
 */
export const closeDatabase = async () => {
  try {
    if (studentPool) {
      await studentPool.end();
      studentPool = null;
      console.log('✅ Student database connection pool closed');
    }
    if (admissionsPool) {
      await admissionsPool.end();
      admissionsPool = null;
      console.log('✅ Admissions database connection pool closed');
    }
  } catch (error) {
    console.error('❌ Error closing database connection:', error);
    throw error;
  }
};

/**
 * Get student database pool instance
 */
export const getStudentPool = () => {
  if (!studentPool) {
    return createStudentPool();
  }
  return studentPool;
};

/**
 * Get admissions database pool instance
 */
export const getAdmissionsPool = () => {
  if (!admissionsPool) {
    return createAdmissionsPool();
  }
  return admissionsPool;
};

/**
 * Get database pool instance (legacy - defaults to student database)
 */
export const getPool = () => {
  return getStudentPool();
};

export default {
  createPool,
  createStudentPool,
  createAdmissionsPool,
  connectDatabase,
  closeDatabase,
  getPool,
  getStudentPool,
  getAdmissionsPool,
};
