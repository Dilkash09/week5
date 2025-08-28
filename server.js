const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Enhanced CORS configuration
app.use(cors({
  origin: 'http://localhost:4200', // Angular dev server
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Handle preflight requests
app.options('*', cors());

app.use(express.json());

// User class
class User {
  constructor(username, birthdate, age, email, password, valid = true) {
    this.username = username;
    this.birthdate = birthdate;
    this.age = age;
    this.email = email;
    this.password = password;
    this.valid = valid;
  }
}

// Sample users array
const users = [
  new User('john_doe', '1990-05-15', 33, 'john@example.com', 'password123'),
  new User('jane_smith', '1985-12-10', 38, 'jane@example.com', 'password456'),
  new User('bob_wilson', '1995-08-22', 28, 'bob@example.com', 'password789')
];

// Auth route
app.post('/api/auth', (req, res) => {
  console.log('Auth request received:', req.body); // Debug log
  
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required', valid: false });
  }
  
  // Find user by email and password
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    // Return user data without password
    const { password: _, ...userWithoutPassword } = user;
    console.log('Login successful for:', user.email); // Debug log
    res.json({ ...userWithoutPassword, valid: true });
  } else {
    console.log('Login failed for:', email); // Debug log
    res.status(401).json({ error: 'Invalid credentials', valid: false });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date().toISOString() });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Available endpoints:');
  console.log('  POST /api/auth - User authentication');
  console.log('  GET  /api/health - Server health check');
});