const express = require("express");
const router = express.Router();
const fs = require("fs").promises;

const FILE = "./data/books.json";

// ---------- helper ----------
async function readBooks() {
  const data = await fs.readFile(FILE, "utf-8").catch(()=> "[]");
  return JSON.parse(data);
}

async function writeBooks(data) {
  await fs.writeFile(FILE, JSON.stringify(data,null,2));
}

// ---------- middleware (Exercise 2) ----------
function validateYear(req,res,next){
  const {year} = req.body;
  if(year!==undefined){
    if(isNaN(year) || year < 1000 || year > new Date().getFullYear()){
      return res.status(400).json({error:"Invalid year"});
    }
  }
  next();
}

// ---------- GET all books (Ex1 + Ex3 + Ex5) ----------
router.get("/", async (req,res)=>{
  let books = await readBooks();

  // filtering (Exercise 1)
  const {author, year, search, page=1, limit=10} = req.query;

  if(author){
    books = books.filter(b=>b.author.toLowerCase() === author.toLowerCase());
  }

  if(year){
    books = books.filter(b=>b.year == year);
  }

  // search by title (Exercise 5)
  if(search){
    books = books.filter(b=>b.title.toLowerCase().includes(search.toLowerCase()));
  }

  // pagination (Exercise 3)
  const start = (page-1)*limit;
  const paginated = books.slice(start, start + Number(limit));

  res.json({
    total: books.length,
    page:Number(page),
    limit:Number(limit),
    data: paginated
  });
});

// ---------- CREATE ----------
router.post("/", validateYear, async (req,res)=>{
  const books = await readBooks();
  const newBook = {id:Date.now(), ...req.body};
  books.push(newBook);
  await writeBooks(books);
  res.json(newBook);
});

// ---------- UPDATE ----------
router.put("/:id", validateYear, async (req,res)=>{
  const books = await readBooks();
  const index = books.findIndex(b=>b.id == req.params.id);
  if(index === -1) return res.status(404).json({msg:"Not found"});

  books[index] = {...books[index], ...req.body};
  await writeBooks(books);
  res.json(books[index]);
});

// ---------- DELETE ----------
router.delete("/:id", async (req,res)=>{
  let books = await readBooks();
  books = books.filter(b=>b.id != req.params.id);
  await writeBooks(books);
  res.json({msg:"Deleted"});
});

module.exports = router;
