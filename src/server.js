require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const { port } = require('./config');

const PORT = port || 5000;

const pass = process.env.PASS;
console.log('pass ===', pass);
// console.log('process.env ===', process.env);

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// ROUTES
app.get('/', (req, res) => {
  res.send('Hello World');
});

// importuojam userRouter
const userRouter = require('./routes/usersRoutes');
const booksRouter = require('./routes/booksRoutes');
const peopleRouter = require('./routes/peopleRoutes');

// panaudoju users routeri
app.use('/', userRouter);
app.use('/', booksRouter);
app.use('/', peopleRouter);

// GET - /api/people - gausim visus zmones
// GET - /api/people/married - gausim visus susituokuius zmones
// GET - /api/people/salary/avg - gausim vis zmoniu atlyginimu vidurki

// route error 404
// jei iki cia atejo kodas, reiskia tokio
// url kuriuo kreipiamasi nera
app.all('*', (req, res) => {
  res.status(404).json({
    msg: 'Path does not exist',
    url: req.path,
    method: req.method,
  });
});

app.listen(PORT, () => {
  console.log(`Server runing on http://localhost:${PORT}`);
});
// app.listen(PORT);
