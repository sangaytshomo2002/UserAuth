const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
require('dotenv').config();

const { createUserTable } = require('./model/userModel');

// Route Imports
const authRoute = require('./routes/authRoute');
const adminRoute = require('./routes/adminRoute');
const userRoute = require('./routes/userRoute');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.SESSION_SECRET || 'secretkey',
  resave: false,
  saveUninitialized: true,
}));

// View Engine Setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/', authRoute);
app.use('/admin', adminRoute);
app.use('/user', userRoute);

// Schema Initialization
createUserTable(); // Make sure the DB schema is set up

// Server Start
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
