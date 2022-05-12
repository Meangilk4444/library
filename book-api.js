const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cos');

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