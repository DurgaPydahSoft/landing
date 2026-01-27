import bcrypt from 'bcryptjs';
import { findRBACUserByIdentifier } from '../models/rbac.model.js';
import { findAdmissionsUserByEmail } from '../models/admissions.model.js';
import { findStudentByUsername } from '../models/student.model.js';
import { generateSSOToken } from './token.service.js';
import { encryptToken } from './encryption.service.js';
import { ERROR_MESSAGES } from '../config/constants.js';

/**
 * Authentication Service
 * Handles authentication business logic
 * Supports both student_database and admissions_db
 */

/**
 * Validate user credentials
 * Checks student_credentials, rbac_users, and admissions_db
 * @param {string} username - Username, admission number, or email
 * @param {string} password - Plain text password
 * @param {string} role - Optional role hint ('student', 'staff', etc.)
 * @returns {Object} User object if valid, null otherwise
 */
export const validateCredentials = async (username, password, role = null) => {
  try {
    let user = null;
    let databaseSource = null;

    // Unified login: Check in order (rbac_users first, then student_credentials)
    // This allows both staff and students to login without role selection
    // 1. rbac_users table (for staff/admin/RBAC) - checked first
    // 2. admissions_db users table
    // 3. student_credentials table (for students)
    
    console.log(`[Auth] Unified login - Checking rbac_users table first for username: ${username}`);
    user = await findRBACUserByIdentifier(username);
    if (user) {
      databaseSource = 'rbac_users';
      console.log(`[Auth] RBAC user found: ${user.id}, role: ${user.role}`);
    } else {
      // Try admissions_db
      console.log(`[Auth] Checking admissions_db for username: ${username}`);
      user = await findAdmissionsUserByEmail(username);
      if (user) {
        databaseSource = 'admissions_db';
        console.log(`[Auth] Admissions user found: ${user.id}`);
      } else {
        // Check student_credentials table (for students)
        console.log(`[Auth] Checking student_credentials table for username: ${username}`);
        user = await findStudentByUsername(username);
        if (user) {
          databaseSource = 'student_credentials';
          console.log(`[Auth] Student found in student_credentials table: ${user.id}`);
        }
      }
    }

    if (!user) {
      console.log(`[Auth] User not found in any database for username: ${username}, role: ${role || 'not specified'}`);
      return null;
    }
    
    console.log(`[Auth] User found: ${user.username || user.admission_number}, database: ${databaseSource}, role: ${user.role}`);

    // Verify password using bcrypt
    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
      console.log(`[Auth] Password validation failed for user: ${user.username || user.admission_number}`);
      return null;
    }

    console.log(`[Auth] Password validated successfully for user: ${user.username || user.admission_number}`);

    // Get user's accessible portals
    let portals = [];
    if (databaseSource === 'rbac_users') {
      // RBAC users have access to multiple portals based on their role
      // For now, grant access to all staff portals
      portals = ['admissions-crm', 'hostel-automation', 'hrms', 'student-portal'];
    } else if (databaseSource === 'admissions_db') {
      // For admissions_db users, grant access to admissions-crm portal by default
      portals = ['admissions-crm'];
    } else if (databaseSource === 'student_credentials') {
      // Students have access to student-portal
      portals = ['student-portal'];
    }

    // Remove password from returned user object
    const { password: _, ...userWithoutPassword } = user;
    
    // Normalize user object structure
    const normalizedUser = {
      ...userWithoutPassword,
      // Map role_name to role for consistency (for admissions_db)
      role: user.role_name || user.role || 'user',
      // Map name to username if needed
      username: user.username || user.email || user.name || user.admission_number,
      portals: portals,
      databaseSource: databaseSource
    };

    return normalizedUser;
  } catch (error) {
    console.error('Credential validation error:', error);
    throw new Error(ERROR_MESSAGES.INTERNAL_ERROR);
  }
};

/**
 * Generate encrypted SSO token for portal access
 * @param {string} userId - User ID
 * @param {string} portalId - Target portal identifier
 * @param {string} role - User role
 * @param {string} databaseSource - Which database the user came from ('rbac_users', 'student_credentials', or 'admissions_db')
 * @returns {string} Encrypted SSO token
 */
export const generatePortalToken = async (userId, portalId, role, databaseSource = 'rbac_users') => {
  try {
    let userPortals = [];
    
    // Get portals based on database source
    if (databaseSource === 'rbac_users') {
      // RBAC users have access to multiple portals
      userPortals = ['admissions-crm', 'hostel-automation', 'hrms', 'student-portal'];
    } else if (databaseSource === 'admissions_db') {
      // Admissions users have access to admissions-crm portal
      userPortals = ['admissions-crm'];
    } else if (databaseSource === 'student_credentials') {
      // Students have access to student-portal
      userPortals = ['student-portal'];
    }
    
    if (!userPortals.includes(portalId)) {
      throw new Error('User does not have access to this portal');
    }

    // Generate SSO JWT token
    const ssoToken = generateSSOToken(userId, portalId, role);
    
    // Encrypt the token
    const encryptedToken = encryptToken(ssoToken);
    
    return encryptedToken;
  } catch (error) {
    console.error('Portal token generation error:', error);
    throw new Error(error.message || ERROR_MESSAGES.TOKEN_GENERATION_FAILED);
  }
};

/**
 * Hash password using bcrypt
 * @param {string} password - Plain text password
 * @returns {string} Hashed password
 */
export const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

/**
 * Compare password with hash
 * @param {string} password - Plain text password
 * @param {string} hash - Hashed password
 * @returns {boolean} True if password matches
 */
export const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

export default {
  validateCredentials,
  generatePortalToken,
  hashPassword,
  comparePassword
};
