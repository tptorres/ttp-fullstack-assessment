const express = require('express');
const connectDB = require('./config/database');
const path = require('path');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json({ extended: false })); // can accept body data now

// Defining routes to be used
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/stocks', require('./routes/stocks'));
app.use('/api/transactions', require('./routes/transactions'));

// Serve static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  // We are loading the static index.html file signifying production
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

// Environment variable for production, but 7000 for development
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => console.log(`Server started on ${PORT}`));
