# Database Setup Guide

## MySQL Database Configuration

### 1. Install MySQL

Make sure MySQL is installed and running on your system.

**Windows:**
- Download MySQL from https://dev.mysql.com/downloads/installer/
- Or use XAMPP/WAMP which includes MySQL

**Linux:**
```bash
sudo apt-get update
sudo apt-get install mysql-server
```

**macOS:**
```bash
brew install mysql
brew services start mysql
```

### 2. Create Database

```sql
CREATE DATABASE IF NOT EXISTS crm_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 3. Run Schema

Execute the SQL schema file to create tables:

```bash
mysql -u root -p crm_db < database/schema.sql
```

Or using MySQL command line:
```sql
USE crm_db;
SOURCE database/schema.sql;
```

### 4. Configure Environment Variables

Update `.env` file with your MySQL credentials:

```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=crm_db
DB_USER=root
DB_PASSWORD=your_password
```

### 5. Create Initial Admin User

The schema includes a default admin user, but you should:

1. Generate a proper password hash:
```javascript
const bcrypt = require('bcryptjs');
const hash = await bcrypt.hash('your_secure_password', 10);
console.log(hash);
```

2. Update the admin user password:
```sql
UPDATE users 
SET password = 'your_generated_hash' 
WHERE username = 'admin';
```

### 6. Test Connection

Start the backend server:
```bash
npm run dev
```

You should see:
```
✅ MySQL database connection established
```

## Database Schema

### Tables

1. **users** - User accounts
   - id, username, email, password, role, is_active
   
2. **portals** - Available portals
   - id, portal_id, portal_name, portal_url, description
   
3. **user_portals** - User-portal access mapping
   - user_id, portal_id, is_active

### Default Data

The schema includes:
- 5 default portals (admissions-crm, student-portal, hostel-automation, hrms, pharmacy)
- 1 default admin user (username: admin)

## Adding New Users

### Via SQL:
```sql
INSERT INTO users (username, email, password, role) 
VALUES ('username', 'email@example.com', '$2a$10$hashed_password', 'user');
```

### Via Code:
```javascript
import { createUser } from './models/user.model.js';
import { hashPassword } from './services/auth.service.js';

const hashedPassword = await hashPassword('user_password');
const user = await createUser({
  username: 'newuser',
  email: 'newuser@example.com',
  password: hashedPassword,
  role: 'user'
});
```

## Granting Portal Access

### Grant access to specific portals:
```sql
INSERT INTO user_portals (user_id, portal_id, is_active)
VALUES (
  (SELECT id FROM users WHERE username = 'username'),
  (SELECT id FROM portals WHERE portal_id = 'admissions-crm'),
  1
);
```

## Troubleshooting

### Connection Refused
- Check if MySQL service is running
- Verify host and port in `.env`
- Check firewall settings

### Access Denied
- Verify username and password in `.env`
- Check user permissions in MySQL

### Table Doesn't Exist
- Run the schema.sql file
- Check database name matches `.env` configuration

### Password Verification Fails
- Ensure passwords are hashed with bcrypt
- Use `bcrypt.compare()` for verification, not direct comparison
