import { getStudentPool } from '../config/database.js';

/**
 * Student Model
 * Handles all database operations for student_credentials table
 */

/**
 * Find student by admission number (commonly used for login)
 * @param {string} admissionNumber - Admission number to search for
 * @returns {Promise<Object|null>} Student object or null if not found
 */
export const findStudentByAdmissionNumber = async (admissionNumber) => {
  try {
    const pool = getStudentPool();
    const [rows] = await pool.execute(
      'SELECT id, student_id, admission_number, username, password_hash, created_at, updated_at, last_login, login_count FROM student_credentials WHERE admission_number = ?',
      [admissionNumber]
    );

    if (rows.length === 0) {
      return null;
    }

    const student = rows[0];
    return {
      id: student.student_id || student.id, // Use student_id as the main ID
      student_credential_id: student.id, // Keep credential table ID
      admission_number: student.admission_number,
      username: student.username || student.admission_number,
      password: student.password_hash,
      role: 'student'
    };
  } catch (error) {
    console.error('Error finding student by admission number:', error);
    throw error;
  }
};

/**
 * Find student by username
 * @param {string} username - Username to search for
 * @returns {Promise<Object|null>} Student object or null if not found
 */
export const findStudentByUsername = async (username) => {
  try {
    const pool = getStudentPool();
    const [rows] = await pool.execute(
      'SELECT id, student_id, admission_number, username, password_hash, created_at, updated_at, last_login, login_count FROM student_credentials WHERE username = ? OR admission_number = ?',
      [username, username]
    );

    if (rows.length === 0) {
      return null;
    }

    const student = rows[0];
    return {
      id: student.student_id || student.id, // Use student_id as the main ID
      student_credential_id: student.id, // Keep credential table ID
      admission_number: student.admission_number,
      username: student.username || student.admission_number,
      password: student.password_hash,
      role: 'student'
    };
  } catch (error) {
    console.error('Error finding student by username:', error);
    throw error;
  }
};

/**
 * Find student by ID (student_id from students table)
 * @param {string|number} id - Student ID
 * @returns {Promise<Object|null>} Student object or null if not found
 */
export const findStudentById = async (id) => {
  try {
    const pool = getStudentPool();
    const [rows] = await pool.execute(
      'SELECT id, student_id, admission_number, username, password_hash, created_at, updated_at, last_login, login_count FROM student_credentials WHERE student_id = ?',
      [id]
    );

    if (rows.length === 0) {
      return null;
    }

    const student = rows[0];
    return {
      id: student.student_id || student.id,
      student_credential_id: student.id,
      admission_number: student.admission_number,
      username: student.username || student.admission_number,
      password: student.password_hash,
      role: 'student'
    };
  } catch (error) {
    console.error('Error finding student by ID:', error);
    throw error;
  }
};

export default {
  findStudentByAdmissionNumber,
  findStudentByUsername,
  findStudentById,
};
