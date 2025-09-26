/* eslint-env node */
// Test restart
// If using ES modules, replace require with import statements below:
// import express from 'express';
// import mysql from 'mysql2/promise';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import cors from 'cors';
// import { body, validationResult } from 'express-validator';
// import dotenv from 'dotenv';
// dotenv.config();

import express from 'express';
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import { body, validationResult } from 'express-validator';
import dotenv from 'dotenv';
import process from 'process';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || origin.startsWith('http://localhost:')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());

let db;

const __filename = new URL('', import.meta.url).pathname;
const __dirname = __filename.substring(0, __filename.lastIndexOf('/'));

async function initializeDatabase() {
  try {
    // First, connect to MySQL without specifying database to create it if needed
    const initialConnection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
    });

    // Create database if not exists
    await initialConnection.execute(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME || 'split_smart'}\``);
    await initialConnection.end();

    // Now connect to the specific database
    db = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'split_smart'
    });

    console.log('Connected to MySQL database');

    // Ensure role column exists in users table
    try {
      await db.execute(`
        ALTER TABLE users
        ADD COLUMN role ENUM('user', 'manager', 'admin') DEFAULT 'user'
      `);
    } catch (error) {
      if (!error.message.includes('Duplicate column name')) {
        throw error;
      }
    }

    // Set role to 'user' for any existing users without role
    await db.execute(`
      UPDATE users
      SET role = 'user'
      WHERE role IS NULL OR role = ''
    `);

    // Drop group-related tables to avoid foreign key issues, but preserve users
    await db.execute('DROP TABLE IF EXISTS `group_members`');
    await db.execute('DROP TABLE IF EXISTS `groups`');

    // Create tables if they don't exist
    await db.execute(`
      CREATE TABLE IF NOT EXISTS \`groups\` (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        created_by INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    await db.execute(`
      CREATE TABLE IF NOT EXISTS \`group_members\` (
        id INT AUTO_INCREMENT PRIMARY KEY,
        group_id INT NOT NULL,
        user_id INT NOT NULL,
        role ENUM('admin', 'member') DEFAULT 'member',
        joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE KEY unique_group_user (group_id, user_id),
        FOREIGN KEY (group_id) REFERENCES \`groups\`(id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    // Create default demo users if they don't exist
    const saltRounds = 12;

    // Check if manager demo exists
    const existingManager = await dbExecute('SELECT id FROM users WHERE email = ?', ['manager@example.com']);
    if (existingManager.length === 0) {
      const managerPasswordHash = await bcrypt.hash('manager123', saltRounds);
      await db.execute(
        'INSERT INTO users (full_name, email, password_hash, role) VALUES (?, ?, ?, ?)',
        ['Manager User', 'manager@example.com', managerPasswordHash, 'manager']
      );
    }

    // Check if user demo exists
    const existingUser = await dbExecute('SELECT id FROM users WHERE email = ?', ['user@example.com']);
    if (existingUser.length === 0) {
      const userPasswordHash = await bcrypt.hash('user123', saltRounds);
      await db.execute(
        'INSERT INTO users (full_name, email, password_hash, role) VALUES (?, ?, ?, ?)',
        ['Demo User', 'user@example.com', userPasswordHash, 'user']
      );
    }

    console.log('Database initialized');
  } catch (error) {
    console.error('Database connection failed:', error);
    throw error;
  }
}

// Database operations
const dbExecute = async (sql, params = []) => {
  const [rows] = await db.execute(sql, params);
  return rows;
};

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, (typeof process !== 'undefined' && process.env.JWT_SECRET) ? process.env.JWT_SECRET : 'your-secret-key', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Routes

// Register
app.post('/api/register', [
  body('fullName').trim().isLength({ min: 2 }).withMessage('Full name must be at least 2 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { fullName, email, password } = req.body;

    // Check if user exists
    const existingUsers = await dbExecute('SELECT id FROM users WHERE email = ?', [email]);
    if (existingUsers.length > 0) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // Hash password
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Create user
    const result = await dbExecute(
      'INSERT INTO users (full_name, email, password_hash) VALUES (?, ?, ?)',
      [fullName, email, passwordHash]
    );

    const insertId = result.insertId;

    // Generate JWT
    const token = jwt.sign(
      { userId: insertId },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    // Get user data
    const users = await dbExecute(
      'SELECT id, full_name, email, created_at FROM users WHERE id = ?',
      [insertId]
    );
    const user = users[0];

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Registration failed' });
  }
});

// Login
app.post('/api/login', [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').exists().withMessage('Password is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { email, password } = req.body;

    // Find user
    const users = await dbExecute(
      'SELECT id, full_name, email, password_hash, role FROM users WHERE email = ?',
      [email]
    );
    const user = users[0];

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    // Return user data without password hash
    const userData = {
      id: user.id,
      full_name: user.full_name,
      email: user.email,
      role: user.role,
      created_at: user.created_at
    };

    res.json({
      message: 'Login successful',
      token,
      user: userData
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Login failed' });
  }
});

// Get profile
app.get('/api/profile', authenticateToken, async (req, res) => {
  try {
    const users = await dbExecute(
      'SELECT id, full_name, email, role, created_at FROM users WHERE id = ?',
      [req.user.userId]
    );
    const user = users[0];

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ message: 'Failed to get profile' });
  }
});

// Logout
app.post('/api/logout', authenticateToken, (req, res) => {
  // In a real application, you might want to blacklist the token
  // For now, we'll just return success
  res.json({ message: 'Logged out successfully' });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'SplitSmart API is running' });
});

// Get group by ID
app.get('/api/groups/:id', authenticateToken, async (req, res) => {
  try {
    const groupId = req.params.id;

    // Check if user is a member of the group
    const membership = await dbExecute(
      'SELECT role FROM `group_members` WHERE group_id = ? AND user_id = ?',
      [groupId, req.user.userId]
    );

    if (membership.length === 0) {
      return res.status(403).json({ message: 'Access denied. You are not a member of this group.' });
    }

    // Fetch group details
    const groups = await dbExecute(
      'SELECT id, name, description, created_by, created_at FROM `groups` WHERE id = ?',
      [groupId]
    );

    if (groups.length === 0) {
      return res.status(404).json({ message: 'Group not found' });
    }

    const group = groups[0];

    // Fetch group members
    const members = await dbExecute(`
      SELECT u.id, u.full_name, u.email, gm.role, gm.joined_at
      FROM users u
      JOIN group_members gm ON u.id = gm.user_id
      WHERE gm.group_id = ?
      ORDER BY gm.joined_at ASC
    `, [groupId]);

    // For now, return empty expenses array since expenses table doesn't exist yet
    const expenses = [];

    res.json({
      group: {
        id: group.id,
        name: group.name,
        description: group.description,
        created_by: group.created_by,
        created_at: group.created_at,
        is_admin: membership[0].role === 'admin'
      },
      members: members.map(member => ({
        id: member.id,
        name: member.full_name,
        email: member.email,
        role: member.role,
        joined_at: member.joined_at
      })),
      expenses: expenses
    });

  } catch (error) {
    console.error('Get group error:', error);
    res.status(500).json({ message: 'Failed to get group' });
  }
});

// Create group
app.post('/api/groups', authenticateToken, [
  body('name').trim().isLength({ min: 2 }).withMessage('Group name must be at least 2 characters'),
  body('description').optional().trim().escape()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { name, description } = req.body;

    // Insert into groups
    const groupResult = await dbExecute(
      'INSERT INTO `groups` (name, description, created_by) VALUES (?, ?, ?)',
      [name, description || null, req.user.userId]
    );

    const groupId = groupResult.insertId;

    // Add creator as admin to group_members
    await dbExecute(
      'INSERT INTO `group_members` (group_id, user_id, role) VALUES (?, ?, "admin")',
      [groupId, req.user.userId]
    );

    // Fetch the new group
    const newGroup = await dbExecute(
      'SELECT id, name, description, created_at FROM `groups` WHERE id = ?',
      [groupId]
    );

    res.status(201).json({
      success: true,
      group: newGroup[0]
    });

  } catch (error) {
    console.error('Create group error:', error);
    res.status(500).json({ message: 'Failed to create group' });
  }
});

// Update group
app.put('/api/groups/:id', authenticateToken, [
  body('name').trim().isLength({ min: 2 }).withMessage('Group name must be at least 2 characters'),
  body('description').optional().trim().escape()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const groupId = req.params.id;
    const { name, description } = req.body;

    // Check if user is admin of the group
    const membership = await dbExecute(
      'SELECT role FROM `group_members` WHERE group_id = ? AND user_id = ? AND role = "admin"',
      [groupId, req.user.userId]
    );

    if (membership.length === 0) {
      return res.status(403).json({ message: 'Access denied. Only group admins can update group details.' });
    }

    // Check if group exists
    const existingGroup = await dbExecute(
      'SELECT id FROM `groups` WHERE id = ?',
      [groupId]
    );

    if (existingGroup.length === 0) {
      return res.status(404).json({ message: 'Group not found' });
    }

    // Update group
    await dbExecute(
      'UPDATE `groups` SET name = ?, description = ? WHERE id = ?',
      [name, description || null, groupId]
    );

    // Fetch updated group
    const updatedGroup = await dbExecute(
      'SELECT id, name, description, created_at FROM `groups` WHERE id = ?',
      [groupId]
    );

    res.json({
      success: true,
      group: updatedGroup[0]
    });

  } catch (error) {
    console.error('Update group error:', error);
    res.status(500).json({ message: 'Failed to update group' });
  }
});

// Error handling middleware
app.use((err, req, res) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Initialize database and start server
async function startServer() {
  try {
    await initializeDatabase();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    //    process.exit(1);
  }
}

startServer();
