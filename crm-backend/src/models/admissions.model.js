import { getAdmissionsPool } from '../config/database.js';

/**
 * Admissions Model
 * Handles all database operations for admissions database
 * This is a separate database on the same AWS RDS instance
 * 
 * Schema:
 * - id: char(36) - UUID
 * - name: varchar(255)
 * - email: varchar(255)
 * - password: varchar(255)
 * - role_name: varchar(50)
 * - managed_by: char(36)
 * - is_manager: tinyint(1)
 * - designation: varchar(100)
 * - permissions: json
 * - is_active: tinyint(1)
 * - created_at: datetime
 * - updated_at: datetime
 */

/**
 * Find user by email in admissions database
 * @param {string} email - Email to search for
 * @returns {Promise<Object|null>} User object or null if not found
 */
export const findAdmissionsUserByEmail = async (email) => {
  try {
    const pool = getAdmissionsPool();
    const [rows] = await pool.execute(
      'SELECT id, name, email, password, role_name, managed_by, is_manager, designation, permissions, is_active, created_at, updated_at FROM users WHERE email = ? AND is_active = 1',
      [email]
    );

    if (rows.length === 0) {
      return null;
    }

    return rows[0];
  } catch (error) {
    console.error('Error finding admissions user by email:', error);
    throw error;
  }
};

/**
 * Find user by ID in admissions database
 * @param {string} id - User ID (UUID)
 * @returns {Promise<Object|null>} User object or null if not found
 */
export const findAdmissionsUserById = async (id) => {
  try {
    const pool = getAdmissionsPool();
    const [rows] = await pool.execute(
      'SELECT id, name, email, password, role_name, managed_by, is_manager, designation, permissions, is_active, created_at, updated_at FROM users WHERE id = ? AND is_active = 1',
      [id]
    );

    if (rows.length === 0) {
      return null;
    }

    return rows[0];
  } catch (error) {
    console.error('Error finding admissions user by ID:', error);
    throw error;
  }
};

/**
 * Find user by name in admissions database
 * @param {string} name - Name to search for
 * @returns {Promise<Object|null>} User object or null if not found
 */
export const findAdmissionsUserByName = async (name) => {
  try {
    const pool = getAdmissionsPool();
    const [rows] = await pool.execute(
      'SELECT id, name, email, password, role_name, managed_by, is_manager, designation, permissions, is_active, created_at, updated_at FROM users WHERE name = ? AND is_active = 1',
      [name]
    );

    if (rows.length === 0) {
      return null;
    }

    return rows[0];
  } catch (error) {
    console.error('Error finding admissions user by name:', error);
    throw error;
  }
};

/**
 * Get admissions data for a user
 * You can add more admissions-specific queries here
 */
export const getAdmissionsData = async (userId) => {
  try {
    const pool = getAdmissionsPool();
    // Add your admissions-specific queries here
    // Example:
    // const [rows] = await pool.execute(
    //   'SELECT * FROM admissions WHERE user_id = ?',
    //   [userId]
    // );
    // return rows;
    return [];
  } catch (error) {
    console.error('Error getting admissions data:', error);
    throw error;
  }
};

export default {
  findAdmissionsUserByEmail,
  findAdmissionsUserById,
  findAdmissionsUserByName,
  getAdmissionsData,
};
