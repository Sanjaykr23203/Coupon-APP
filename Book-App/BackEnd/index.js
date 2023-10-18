import express from "express";
import { PORT, mongoURL } from "./config.js";
import mongoose from "mongoose";

const app = express();
app.use(express.json())

app.get('/', (request, response) => {
  console.log(request);
  return response.status(233).send('welcome to mern app');
})


// Route for Get All Books from database
router.get('/booksget', async (request, response) => {
  try {
    const books = await Book.find({});

    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

app.post('/books', async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: 'Send all required fields: title, author, publishYear',
      });
    }
    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };

    const book = await Book.create(newBook);

    return response.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});






// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("connected");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

  })
  .catch((eror)=>{
  console.log(eror);
})


