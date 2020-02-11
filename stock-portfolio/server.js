const express = require('express');
const app = express();

// Environment variable for production, but 5000 for development
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => console.log(`Server started on ${PORT}`));

// Defining routes to be used
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/transactions', require('./routes/transactions'));

app.get('/', (req, res) => res.send('Hello World'));
