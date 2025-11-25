const mongoose = require('mongoose')
const express = require('express')
const app = express()
const port = 5001;

// MongoDB connection
const mongoURI = 'mongodb+srv://aryan:aryan123@cluster0.520m4fw.mongodb.net/?appName=Cluster0'

let dbConnected = false

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 10000,
  connectTimeoutMS: 15000,
  socketTimeoutMS: 60000,
  family: 4,
  retryWrites: true,
  w: 'majority'
}).then(() => {
  console.log("connected to mongo")
  dbConnected = true
}).catch(err => {
  console.error("MongoDB connection error:", err.message)
  process.exit(1)
})

// Connection event handlers
mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected')
  dbConnected = false
})

mongoose.connection.on('error', (err) => {
  console.error('MongoDB error:', err.message)
})

// Middleware to check DB connection
app.use((req, res, next) => {
  if (!dbConnected && req.path !== '/') {
    return res.status(503).json({ error: 'Database connection not ready' })
  }
  next()
})

// CORS middleware
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, auth-token"
  );
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});
app.use(express.json())

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/auth', require('./Routes/Auth'));

// Start server
app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})