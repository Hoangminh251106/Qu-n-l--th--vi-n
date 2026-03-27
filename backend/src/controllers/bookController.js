const { HttpError } = require("../errors");
const { getBooks, createBook } = require("../models/bookModel");
const { bookCreateSchema } = require("../validators");

async function getAllBooks(req, res) {
  const data = await getBooks({ q: req.query.q ? String(req.query.q) : "" });
  res.json({ data });
}

async function addBook(req, res) {
  const parsed = bookCreateSchema.safeParse(req.body);
  if (!parsed.success) throw new HttpError(400, "Invalid payload", parsed.error.flatten());

  const book = await createBook(parsed.data);
  res.status(201).json({ data: book });
}

module.exports = { getAllBooks, addBook };
