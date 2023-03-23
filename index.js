const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8000;

app.use(bodyParser.json());

//import books
const books = require('./book.json');

//add id for each book
books.forEach((book, index) => {
  book.id = index + 1;
});

//route to get all books
app.get('/books', (req, res) => {
  res.send(books);
});

//route to get a single book by id
app.get('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find((book) => book.id === id);
  if (!book) return res.send('Book not found');
  res.send(book);
});

//route to create a new book
app.post('/books', (req, res) => {
  const book = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author,
  };
  books.push(book);
  res.send(book);
});

//route to update a book by id
app.put('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const bookIndex = books.findIndex((book) => book.id === id);

  const updatedBook = {
    id: id,
    title: req.body.title,
    author: req.body.author,
  };
  books[bookIndex] = updatedBook;
  res.send(updatedBook);
});

//route to delete by id
app.delete('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const bookIndex = books.findIndex((book) => book.id === id);

  const deletedBook = books.splice(bookIndex, 1);
  res.send(deletedBook);
});

app.listen(port, () => console.log(`Listening on port ${port}...`));
