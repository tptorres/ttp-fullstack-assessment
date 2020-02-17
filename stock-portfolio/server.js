const express = require('express');
const app = express();
const connectDB = require('./config/database');

// Connect to MongoDB
connectDB();
// Middleware

app.use(express.json({ extended: false })); // can accept body data now

// Environment variable for production, but 7000 for development
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => console.log(`Server started on ${PORT}`));

// Defining routes to be used
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/stocks', require('./routes/stocks'));
app.use('/api/transactions', require('./routes/transactions'));
