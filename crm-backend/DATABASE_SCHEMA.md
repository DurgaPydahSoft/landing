# Database Schema Documentation

## Overview

The CRM Authentication Gateway connects to multiple databases on the same AWS RDS instance:
- **student_database** - Student portal users
- **admissions_db** - Admissions CRM users

## Student Database Schema

**Table: users**

| Column | Type | Description |
|--------|------|-------------|
| id | int | Primary key, auto increment |
| username | varchar(100) | Unique username |
| email | varchar(255) | Unique email |
| password_hash | varchar(255) | Bcrypt hashed password |
| role | enum('superadmin','admin') | User role |
| created_at | timestamp | Creation timestamp |

## Admissions Database Schema

**Table: users**

| Column | Type | Description |
|--------|------|-------------|
| id | char(36) | Primary key, UUID |
| name | varchar(255) | User's full name |
| email | varchar(255) | User's email (used for login) |
| password | varchar(255) | Bcrypt hashed password |
| role_name | varchar(50) | User role name |
| managed_by | char(36) | Manager's user ID (UUID) |
| is_manager | tinyint(1) | Whether user is a manager |
| designation | varchar(100) | Job designation |
| permissions | json | User permissions (JSON) |
| is_active | tinyint(1) | Active status flag |
| created_at | datetime | Creation timestamp |
| updated_at | datetime | Last update timestamp |

## Authentication Flow

### Login Process

1. User submits username/email and password
2. System checks **student_database** first:
   - Searches by `username`
   - If found, validates password and returns user
3. If not found in student_database, checks **admissions_db**:
   - Searches by `email`
   - If found, validates password and returns user
4. Returns normalized user object with:
   - `id` - User ID
   - `username` - Username/email/name
   - `email` - Email address
   - `role` - Normalized role (from `role` or `role_name`)
   - `portals` - Array of accessible portal IDs
   - `databaseSource` - Which database the user came from

### Portal Access

- **Student Database Users**: Get portals from `user_portals` table or role-based access
- **Admissions Database Users**: Automatically granted access to `admissions-crm` portal

## Usage Examples

### Querying Student Database

```javascript
import { getStudentPool } from '../config/database.js';

const pool = getStudentPool();
const [rows] = await pool.execute(
  'SELECT * FROM users WHERE username = ?',
  [username]
);
```

### Querying Admissions Database

```javascript
import { getAdmissionsPool } from '../config/database.js';

const pool = getAdmissionsPool();
const [rows] = await pool.execute(
  'SELECT * FROM users WHERE email = ? AND is_active = 1',
  [email]
);
```

### Using Model Functions

```javascript
// Student database
import { findUserByUsername } from '../models/user.model.js';
const user = await findUserByUsername('student123');

// Admissions database
import { findAdmissionsUserByEmail } from '../models/admissions.model.js';
const user = await findAdmissionsUserByEmail('user@example.com');
```

## Notes

- Both databases use the same AWS RDS instance
- Same credentials (host, user, password) for both
- SSL enabled for secure connections
- Passwords are hashed with bcrypt in both databases
- User lookup prioritizes student_database, then admissions_db
