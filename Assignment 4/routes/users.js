const express = require("express");
const router = express.Router();

const users = [
  { name:"Ayush" },
  { name:"Rahul" },
  { name:"Amit" },
  { name:"Ankit" }
];

router.get("/", (req,res)=>{
  const search = req.query.name;

  const filtered = search
    ? users.filter(u=>u.name.toLowerCase().includes(search.toLowerCase()))
    : users;

  res.render("users",{users:filtered, search});
});

module.exports = router;
