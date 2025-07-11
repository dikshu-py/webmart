const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./Routes/productRoutes');
// const Login = require('./models/login');  // keep if you use it

const app = express();

// Middleware
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/mydb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// Health check
app.get('/', (req, res) => res.send('Hello from Node.js & MongoDB!'));

// Use product routes
app.use('/', productRoutes);

//use for Login and Register
const authRoutes = require('./Routes/LoginRoutes');
app.use('/', authRoutes);

// to Upload A Image
const path = require('path');
const uploadRoutes = require('./Routes/uploadRoutes');
app.use(express.static(path.join(__dirname, 'uploads'))); // Serve static files
app.use('/', uploadRoutes);



// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
