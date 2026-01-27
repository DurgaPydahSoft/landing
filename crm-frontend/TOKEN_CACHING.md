# Portal Token Caching System

## Overview

The CRM frontend now implements **token caching** for portal SSO tokens. This allows users with access to multiple portals to have their tokens stored and reused, reducing API calls and improving performance.

## How It Works

### Token Storage

When a user clicks on a portal:

1. **First Click**: System generates a new SSO token and stores it in `localStorage`
2. **Subsequent Clicks**: System checks cache first:
   - If cached token exists and is valid → uses cached token
   - If cached token expired or missing → generates new token

### Storage Structure

Tokens are stored in `localStorage` with the following keys:

```
portalToken_{portalId}          → Encrypted SSO token
portalTokenExpiry_{portalId}    → Expiration timestamp (milliseconds)
```

**Example:**
```javascript
localStorage.setItem('portalToken_student-portal', 'encrypted-token-here');
localStorage.setItem('portalTokenExpiry_student-portal', '1738000000000');
```

### Token Expiration

- **Default Expiration**: 15 minutes (from backend `JWT_SSO_EXPIRY`)
- **Automatic Cleanup**: Expired tokens are automatically removed when accessed
- **Format**: Expiration time parsed from strings like `'15m'`, `'1h'`, `'30s'`

## Current Storage

### What's Stored

1. **CRM Authentication Token** (single):
   - `accessToken` - Main authentication token for CRM
   - `refreshToken` - Token refresh token
   - `user` - User information object

2. **Portal SSO Tokens** (multiple, one per portal):
   - `portalToken_admissions-crm`
   - `portalToken_student-portal`
   - `portalToken_hostel-automation`
   - `portalToken_hrms`
   - `portalToken_pharmacy`

### Example localStorage Contents

```javascript
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": "{\"id\":43,\"username\":\"teja\",\"role\":\"super_admin\",...}",
  
  // Portal tokens (cached)
  "portalToken_student-portal": "encrypted-token-abc123...",
  "portalTokenExpiry_student-portal": "1738000000000",
  
  "portalToken_admissions-crm": "encrypted-token-xyz789...",
  "portalTokenExpiry_admissions-crm": "1738000000000",
  
  "portalToken_hrms": "encrypted-token-def456...",
  "portalTokenExpiry_hrms": "1738000000000"
}
```

## API Functions

### Available Functions

```javascript
import { 
  cachePortalToken,
  getCachedPortalToken,
  clearPortalToken,
  clearAllPortalTokens,
  getAllCachedPortalTokens
} from './services/api';
```

### Usage Examples

#### Get Cached Token
```javascript
const cached = getCachedPortalToken('student-portal');
if (cached) {
  console.log('Token:', cached.token);
  console.log('Expires in:', cached.expiresIn);
  console.log('Expires at:', cached.expiresAt);
}
```

#### Clear Specific Portal Token
```javascript
clearPortalToken('student-portal');
```

#### Clear All Portal Tokens
```javascript
clearAllPortalTokens();
```

#### Get All Cached Tokens
```javascript
const allTokens = getAllCachedPortalTokens();
// Returns: { 'student-portal': {...}, 'admissions-crm': {...}, ... }
```

## Behavior

### When Tokens Are Generated

1. **After Login**: New token generated (forced, cache not used)
2. **Portal Click (No Cache)**: New token generated and cached
3. **Portal Click (Valid Cache)**: Cached token reused
4. **Portal Click (Expired Cache)**: New token generated and cached

### When Tokens Are Cleared

- **Automatic**: When token expires (on access)
- **Manual**: Can be cleared via utility functions
- **On Logout**: Should call `clearAllPortalTokens()` (if logout implemented)

## Benefits

1. **Performance**: Reduces API calls for repeated portal access
2. **User Experience**: Faster portal access for users with multiple portals
3. **Efficiency**: Tokens reused until expiration
4. **Automatic Management**: Expired tokens cleaned up automatically

## Implementation Details

### Token Generation Flow

```javascript
// In PortalsPage.jsx (when user clicks portal)
const tokenResponse = await authAPI.generatePortalToken(portalId, false);
// false = use cache if available
// true = force new token generation
```

### Cache Check Logic

```javascript
// In api.js generatePortalToken()
1. Check if forceNew = true → skip cache
2. Check if cached token exists
3. Check if cached token is expired
4. If valid → return cached token
5. If invalid/missing → generate new token and cache it
```

## Notes

- **Security**: Tokens are encrypted SSO tokens (not plain JWT)
- **Expiration**: Tokens expire based on backend `JWT_SSO_EXPIRY` setting
- **Storage Limit**: localStorage has ~5-10MB limit (plenty for tokens)
- **Browser**: Works in all modern browsers that support localStorage

## Future Enhancements

Possible improvements:
- Add token refresh mechanism before expiration
- Add UI to show cached portals
- Add manual "Refresh Token" option
- Add token usage analytics
