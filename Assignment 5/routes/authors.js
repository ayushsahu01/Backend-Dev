const express = require("express");
const router = express.Router();
const fs = require("fs").promises;

const FILE = "./data/authors.json";

async function readAuthors(){
  const data = await fs.readFile(FILE,"utf-8").catch(()=> "[]");
  return JSON.parse(data);
}

async function writeAuthors(data){
  await fs.writeFile(FILE, JSON.stringify(data,null,2));
}

// GET all
router.get("/", async(req,res)=>{
  res.json(await readAuthors());
});

// GET one
router.get("/:id", async(req,res)=>{
  const authors = await readAuthors();
  const author = authors.find(a=>a.id==req.params.id);
  if(!author) return res.status(404).json({msg:"Not found"});
  res.json(author);
});

// CREATE
router.post("/", async(req,res)=>{
  const authors = await readAuthors();
  const newAuthor = {id:Date.now(), ...req.body};
  authors.push(newAuthor);
  await writeAuthors(authors);
  res.json(newAuthor);
});

// UPDATE
router.put("/:id", async(req,res)=>{
  const authors = await readAuthors();
  const index = authors.findIndex(a=>a.id==req.params.id);
  if(index==-1) return res.status(404).json({msg:"Not found"});

  authors[index] = {...authors[index], ...req.body};
  await writeAuthors(authors);
  res.json(authors[index]);
});

// DELETE
router.delete("/:id", async(req,res)=>{
  let authors = await readAuthors();
  authors = authors.filter(a=>a.id!=req.params.id);
  await writeAuthors(authors);
  res.json({msg:"Deleted"});
});

module.exports = router;
