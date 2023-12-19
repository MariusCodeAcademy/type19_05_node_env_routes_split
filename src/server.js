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

const books = [
  {
    id: 1,
    title: 'Book 1',
    year: 2021,
    isPublished: true,
    category: 'Fiction',
  },
  {
    id: 2,
    title: 'Book 2',
    year: 2022,
    isPublished: false,
    category: 'Mystery',
  },
  {
    id: 3,
    title: 'Book 3',
    year: 2020,
    isPublished: true,
    category: 'Fantasy',
  },
  {
    id: 4,
    title: 'Book 4',
    year: 2019,
    isPublished: true,
    category: 'Science Fiction',
  },
  {
    id: 5,
    title: 'Book 5',
    year: 2023,
    isPublished: false,
    category: 'Thriller',
  },
];

// Middleware
app.use(cors());
app.use(morgan('dev'));

// ROUTES
app.get('/', (req, res) => {
  res.send('Hello World');
});
// importuojam userRouter
const userRouter = require('./routes/usersRoutes');

// panaudoju users routeri
app.use('/', userRouter);

// BOOKS ROUTES
// GET /api/books - grazina visas knygas
app.get('/api/books', (req, res) => {
  res.json(books);
});

// GET /api/books/2 grazina knyga kurios id 2
app.get('/api/books/:bookId', (req, res) => {
  const bookId = +req.params.bookId;
  // surasti obj su id === bookId
  const found = books.find((bObj) => bObj.id === bookId);
  // jei neradom
  if (found === undefined) {
    res.status(404).json({
      msg: `book not found with id ${bookId}`,
    });
    return;
  }
  res.json(found);
});

// route error 404
// jei iki cia atejo kodas, reiskia tokio
// url kuriuo kreipiamasi nera
app.get('*', (req, res) => {
  res.status(404).json({
    msg: 'Path does not exist',
    url: req.path,
  });
});

app.listen(PORT, () => {
  console.log(`Server runing on http://localhost:${PORT}`);
});
// app.listen(PORT);
