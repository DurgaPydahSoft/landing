# Unified Authentication Backend (CRM as Auth Gateway)

## Overview

Currently, the system consists of 4–5 independent web portals, each having its own authentication mechanism.  
A new **centralized CRM frontend** has been introduced to provide a **unified entry point** to all these applications.

This backend enhancement aims to make the CRM act as a **central authentication gateway**, enabling a **Single Sign-On (SSO)-like experience** across all portals.

---

## Objective

- Centralize authentication through the CRM backend
- Eliminate repeated logins across multiple portals
- Provide a seamless and unified user experience
- Securely authenticate and authorize users across applications

---

## High-Level Flow

1. User logs into the **CRM**
2. User clicks on a target application (portal) inside the CRM
3. CRM backend:
   - Prompts for username & password (if not already authenticated)
   - Validates credentials
   - Generates an authentication token
   - Encrypts the token
4. User is redirected to the selected application
5. Target application:
   - Receives the encrypted token
   - Decrypts and validates it
   - Logs the user in automatically

---

## Backend Responsibilities (CRM Auth Service)

### 1. Authentication
- Validate username and password against the user database
- Support role-based access if required

### 2. Token Generation
- Generate a secure token (preferably JWT)
- Include:
  - User ID
  - Roles / permissions
  - Target application identifier
  - Token expiry

### 3. Token Encryption
- Encrypt the generated token before sharing it with external applications
- Use industry-standard encryption (AES / RSA)
- Ensure tokens are short-lived

### 4. Token Distribution
- Pass encrypted token via:
  - HTTP headers (preferred), or
  - Secure query parameters (if unavoidable)

---

## Target Application Responsibilities

- Accept encrypted token from CRM
- Decrypt token using shared/private key
- Validate:
  - Token signature
  - Expiry
  - Issuer (CRM)
- Create local session without asking for credentials again

---

## Security Requirements

- Use HTTPS everywhere
- Tokens must:
  - Be encrypted
  - Have expiry time
  - Be application-specific
- Implement token revocation if needed
- Do not store plain-text credentials
- Log authentication attempts for auditing

---

## APIs to Implement (Suggested)

### CRM Backend
- `POST /auth/login`
- `POST /auth/generate-token`
- `POST /auth/validate-credentials`

### Target Applications
- `POST /auth/sso-login`
- `POST /auth/verify-token`

---

## Technology Suggestions

- Authentication: JWT
- Encryption: AES / RSA
- Backend: Node.js / Flask / Spring Boot (as per stack)
- Storage: Redis (optional, for token/session management)

---

## Expected Outcome

- CRM becomes the **single source of authentication**
- Users log in once and access all applications
- Consistent UI/UX across platforms
- Secure, scalable, and maintainable authentication system

---

## Notes

- This is not full OAuth implementation but a **custom SSO-style solution**
- Future enhancement: migrate to OAuth2 / OpenID Connect if required
