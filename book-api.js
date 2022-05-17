const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

//where we will keep the books
let books = [];

app.use(cors());

//Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/book', (req, res) => {
    const book = req.body;

    //output the book to the console for debugging
    console.log(book);
    books.push(book);

    res.send('Book is added to the database');
});

app.listen(port, () => console.log('Hello world app listening on port'))
app.get('/books', (req, res) => {
    res.json(books);
});

app.post('/book/:isbn', (req, res) => {
    //reading isbn from url
    const isbn = req.params.isbn;
    const newBook = req.body;

    //remove item from the books array
    for (let i = 0; i < books.length; i++) {
        let book = books[i]

        if (book.isbn === isbn) {
            books[i] = newBook;
            res.sendStatus(200);
            return;
        }
    }

    res.sendStatus(404);
});

app.get('/book/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    for (let i = 0; i < books.length; i++) {
        let book = books[i];
        if (book.isbn === isbn) {
            res.send(book);
        }
    }
});

app.delete('/book/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    books = books.filter((book) => book.isbn !== isbn);
    res.sendStatus(200);
});