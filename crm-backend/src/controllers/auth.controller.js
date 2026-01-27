import { validateCredentials, generatePortalToken } from '../services/auth.service.js';
import { generateToken, verifyToken as verifyJWTToken } from '../services/token.service.js';
import { decryptToken } from '../services/encryption.service.js';
import { HTTP_STATUS, ERROR_MESSAGES, SUCCESS_MESSAGES, TOKEN_TYPES } from '../config/constants.js';

/**
 * Authentication Controller
 * Handles authentication-related HTTP requests
 */

/**
 * Login endpoint handler
 * POST /auth/login
 */
export const login = async (req, res, next) => {
  try {
    const { username, password, role } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: ERROR_MESSAGES.MISSING_CREDENTIALS
      });
    }

    // Validate credentials (pass role if provided)
    const user = await validateCredentials(username, password, role);

    if (!user) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: ERROR_MESSAGES.INVALID_CREDENTIALS
      });
    }

    // Generate access token
    const accessToken = generateToken(
      {
        userId: user.id,
        username: user.username || user.email || user.name,
        role: user.role,
        databaseSource: user.databaseSource // Track which database the user came from
      },
      TOKEN_TYPES.ACCESS
    );

    // Generate refresh token
    const refreshToken = generateToken(
      {
        userId: user.id,
        username: user.username || user.email || user.name
      },
      TOKEN_TYPES.REFRESH
    );

    // Return success response
    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: SUCCESS_MESSAGES.LOGIN_SUCCESS,
      data: {
        user: {
          id: user.id,
          username: user.username || user.email || user.name,
          email: user.email,
          name: user.name,
          role: user.role,
          role_name: user.role_name,
          portals: user.portals,
          databaseSource: user.databaseSource
        },
        tokens: {
          accessToken,
          refreshToken
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Generate SSO token for portal access
 * POST /auth/generate-token
 */
export const generateTokenForPortal = async (req, res, next) => {
  try {
    const { portalId } = req.body;
    const userId = req.user?.userId; // From auth middleware

    if (!userId) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: ERROR_MESSAGES.UNAUTHORIZED_ACCESS
      });
    }

    if (!portalId) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: 'Portal ID is required'
      });
    }

    // Get user role and database source (from token or fetch from DB)
    const userRole = req.user?.role || 'user';
    const databaseSource = req.user?.databaseSource || 'rbac_users';

    // Generate encrypted SSO token
    const encryptedToken = await generatePortalToken(userId, portalId, userRole, databaseSource);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: SUCCESS_MESSAGES.TOKEN_GENERATED,
      data: {
        encryptedToken,
        portalId,
        expiresIn: process.env.JWT_SSO_EXPIRY || '15m'
      }
    });
  } catch (error) {
    if (error.message.includes('does not have access')) {
      return res.status(HTTP_STATUS.FORBIDDEN).json({
        success: false,
        message: error.message
      });
    }
    next(error);
  }
};

/**
 * Validate credentials endpoint
 * POST /auth/validate-credentials
 */
export const validateUserCredentials = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: ERROR_MESSAGES.MISSING_CREDENTIALS
      });
    }

    // Validate credentials
    const user = await validateCredentials(username, password);

    if (!user) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: ERROR_MESSAGES.INVALID_CREDENTIALS,
        valid: false
      });
    }

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: SUCCESS_MESSAGES.CREDENTIALS_VALID,
      valid: true,
      data: {
        userId: user.id,
        username: user.username,
        role: user.role
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Verify token endpoint (for external portals)
 * POST /auth/verify-token
 */
export const verifyToken = async (req, res, next) => {
  try {
    console.log(`[VerifyToken] Request received from: ${req.headers.origin || 'unknown'}`);
    console.log(`[VerifyToken] Request body keys:`, Object.keys(req.body || {}));
    
    const { encryptedToken } = req.body;

    if (!encryptedToken) {
      console.log(`[VerifyToken] Missing encryptedToken in request`);
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: ERROR_MESSAGES.MISSING_TOKEN
      });
    }

    console.log(`[VerifyToken] Attempting to decrypt and verify token...`);

    // Decrypt token
    const decryptedToken = decryptToken(encryptedToken);
    console.log(`[VerifyToken] Token decrypted successfully`);

    // Verify JWT token
    const decoded = verifyJWTToken(decryptedToken);
    console.log(`[VerifyToken] Token verified. UserId: ${decoded.userId}, PortalId: ${decoded.portalId}, Role: ${decoded.role}`);

    // Check if token is SSO type
    if (decoded.type !== TOKEN_TYPES.SSO) {
      console.log(`[VerifyToken] Invalid token type: ${decoded.type}, expected: ${TOKEN_TYPES.SSO}`);
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: 'Invalid token type'
      });
    }

    console.log(`[VerifyToken] Token verification successful. Returning response.`);
    res.status(HTTP_STATUS.OK).json({
      success: true,
      valid: true,
      data: {
        userId: decoded.userId,
        portalId: decoded.portalId,
        role: decoded.role,
        expiresAt: new Date(decoded.exp * 1000).toISOString()
      }
    });
  } catch (error) {
    console.error(`[VerifyToken] Error:`, error.message);
    console.error(`[VerifyToken] Error stack:`, error.stack);
    
    // Handle specific error types
    if (error.message.includes('expired') || error.message.includes('Invalid') || error.message.includes('jwt')) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        valid: false,
        message: ERROR_MESSAGES.INVALID_TOKEN || 'Token expired or invalid'
      });
    }
    
    // Handle decryption errors
    if (error.message.includes('decrypt') || error.message.includes('encryption')) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        valid: false,
        message: 'Failed to decrypt token'
      });
    }
    
    // Generic error response
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      valid: false,
      message: 'Token verification failed'
    });
  }
};

export default {
  login,
  generateTokenForPortal,
  validateUserCredentials,
  verifyToken
};
