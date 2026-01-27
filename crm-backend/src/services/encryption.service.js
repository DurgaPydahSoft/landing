import crypto from 'crypto';

/**
 * Encryption Service
 * Handles token encryption/decryption using AES-256-GCM
 */

const ALGORITHM = process.env.ENCRYPTION_ALGORITHM || 'aes-256-gcm';
const KEY_LENGTH = 32; // 256 bits
const IV_LENGTH = 16; // 128 bits
const SALT_LENGTH = 64;
const TAG_LENGTH = 16;
const ITERATIONS = 100000;

/**
 * Get encryption key from environment or derive from secret
 */
const getEncryptionKey = () => {
  const envKey = process.env.ENCRYPTION_KEY;
  
  if (envKey && envKey.length === 32) {
    return Buffer.from(envKey, 'utf8');
  }
  
  // Fallback: derive key from JWT_SECRET if ENCRYPTION_KEY not set
  const secret = process.env.JWT_SECRET || 'default-secret-key';
  const salt = crypto.createHash('sha256').update(secret).digest();
  
  return crypto.pbkdf2Sync(secret, salt, ITERATIONS, KEY_LENGTH, 'sha256');
};

/**
 * Encrypt token
 * @param {string} token - JWT token to encrypt
 * @returns {string} Encrypted token (base64 encoded)
 */
export const encryptToken = (token) => {
  try {
    const key = getEncryptionKey();
    const iv = crypto.randomBytes(IV_LENGTH);
    
    const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
    
    let encrypted = cipher.update(token, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    
    const authTag = cipher.getAuthTag();
    
    // Combine IV + AuthTag + Encrypted data
    const combined = Buffer.concat([
      iv,
      authTag,
      Buffer.from(encrypted, 'base64')
    ]);
    
    return combined.toString('base64');
  } catch (error) {
    console.error('Encryption error:', error);
    throw new Error('Failed to encrypt token');
  }
};

/**
 * Decrypt token
 * @param {string} encryptedToken - Encrypted token (base64 encoded)
 * @returns {string} Decrypted JWT token
 */
export const decryptToken = (encryptedToken) => {
  try {
    const key = getEncryptionKey();
    const combined = Buffer.from(encryptedToken, 'base64');
    
    // Extract IV, AuthTag, and encrypted data
    const iv = combined.slice(0, IV_LENGTH);
    const authTag = combined.slice(IV_LENGTH, IV_LENGTH + TAG_LENGTH);
    const encrypted = combined.slice(IV_LENGTH + TAG_LENGTH);
    
    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
    decipher.setAuthTag(authTag);
    
    let decrypted = decipher.update(encrypted, null, 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  } catch (error) {
    console.error('Decryption error:', error);
    throw new Error('Failed to decrypt token');
  }
};

/**
 * Generate a secure random key (for initial setup)
 * @returns {string} Base64 encoded key
 */
export const generateEncryptionKey = () => {
  return crypto.randomBytes(KEY_LENGTH).toString('base64');
};

export default {
  encryptToken,
  decryptToken,
  generateEncryptionKey
};
