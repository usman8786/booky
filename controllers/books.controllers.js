const booksController = {};
const Books = require("../models/books.model");

booksController.getAll = async (req, res) => {
  let books;
  try {
    let merged = {};
    const start = 0;
    const length = 1000;
    books = await Books.paginate(merged, {
      offset: parseInt(start),
      limit: parseInt(length),
    });
    res.status(200).send({
      code: 200,
      message: "Successful",
      data: books,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).send(error);
  }
};

// booksController.getBooksByUserId = async (req, res) =>{
//   try {
//     const id = req.query.id;
//     console.log('user id', id);
//     const book = new Books(user_id);
//     const result = await book.save();
//     res.status(200).send({
//       code: 200,
//       message: 'Book Added Successfully',
//     });
//   } catch (error) {
//     console.log('error', error);
//     return res.status(500).send(error);
//   }
// };
// module.exports = booksController;

booksController.addBook = async (req, res) => {
  try {
    const body = req.body;
    const book = new Books(body);
    const result = await book.save().then((r) => {
      res.status(200).send({
        result: r,
        code: 200,
        message: "Feedback added successfully",
      });
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).send(error);
  }
};

booksController.getBooksByUserId = async (req, res) => {
  let book;
  try {
    const id = req.params.id;
    book = await Books.find({ user_id: id });
    res.status(200).send({
      code: 200,
      message: "Successfully find books against this user_id",
      data: book,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).send(error);
  }
};

booksController.getSingleBook = async (req, res) => {
  let book;
  try {
    const _id = req.params._id;
    book = await books.findOne({ _id: _id });
    res.status(200).send({
      code: 200,
      message: "Successful",
      data: book,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).send(error);
  }
};

booksController.deleteBook = async (req, res) => {
  if (!req.params._id) {
    Fu;
    res.status(500).send({
      message: "ID missing",
    });
  }
  try {
    const _id = req.params._id;

    const result = await Books.findOneAndDelete({
      _id: _id,
    });

    res.status(200).send({
      code: 200,
      message: "Deleted Successfully",
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).send(error);
  }
};

booksController.deleteManyBooks = async (req, res) => {
  console.log("in");

  try {
    const query = req.body.data;
    console.log("query", query);

    const result = await Books.deleteMany({ _id: { $in: query } });
    console.log("result", result);

    res.status(200).send({
      code: 200,
      message: `${result.deletedCount} Books Deleted Successfully`,
      result: result,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).send(error);
  }
};

booksController.updateBook = async (req, res) => {
  if (!req.params._id) {
    res.status(500).send({
      message: "ID missing",
    });
  }
  try {
    const _id = req.params._id;
    let updates = req.body;
    runUpdate(_id, updates, res);
  } catch (error) {
    console.log("error", error);
    return res.status(500).send(error);
  }
};

booksController.updateManyBooks = async (req, res) => {
  try {
    const _ids = req.body.data.ids;
    const updates = req.body.data.user_id;
    const result = await Books.updateMany(
      { _id: { $in: _ids } },
      { $set: { user_id: updates } },
      { multi: true }
    );
    res.status(200).send({
      code: 200,
      message: "Updated All Successfully",
    });
    console.log("result", result);
  } catch (error) {
    console.log("error", error);
    return res.status(500).send(error);
  }
};

async function runUpdate(_id, updates, res) {
  try {
    const result = await Books.updateOne(
      {
        _id: _id,
      },
      {
        $set: updates,
      },
      {
        upsert: true,
        runValidators: true,
      }
    );

    {
      if (result.nModified == 1) {
        res.status(200).send({
          code: 200,
          message: "Updated Successfully",
        });
      } else if (result.upserted) {
        res.status(200).send({
          code: 200,
          message: "Created Successfully",
        });
      } else {
        res.status(422).send({
          code: 422,
          message: "Unprocessible Entity",
        });
      }
    }
  } catch (error) {
    console.log("error", error);
    return res.status(500).send(error);
  }
}
async function runUpdateById(id, updates, res) {
  try {
    const result = await books.updateOne(
      {
        id: id,
      },
      {
        $set: updates,
      },
      {
        upsert: true,
        runValidators: true,
      }
    );

    if (result.nModified == 1) {
      res.status(200).send({
        code: 200,
        message: "Updated Successfully",
      });
    } else if (result.upserted) {
      res.status(200).send({
        code: 200,
        message: "Created Successfully",
      });
    } else {
      {
        res.status(200).send({
          code: 200,
          message: "Task completed successfully",
        });
      }
    }
  } catch (error) {
    console.log("error", error);
    return res.status(500).send(error);
  }
}
module.exports = booksController;
