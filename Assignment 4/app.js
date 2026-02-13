const express = require("express");
const app = express();
const fs = require("fs").promises;

app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

// middleware
const logger = require("./middleware/logger");
app.use(logger);

// users route
const usersRoute = require("./routes/users");
app.use("/users", usersRoute);


// ---------- CONTACT ----------
app.get("/contact",(req,res)=>{
  res.render("contact");
});

app.post("/contact",(req,res)=>{
  console.log(req.body);
  res.send("Form submitted successfully!");
});


// ---------- GALLERY ----------
app.get("/gallery",(req,res)=>{
  const images = ["1.jpg","2.jpg","3.jpg"];
  res.render("gallery",{images});
});


// ---------- BLOG ----------
const path = "./posts.json";

async function getPosts(){
  const data = await fs.readFile(path,"utf8");
  return JSON.parse(data || "[]");
}

async function savePosts(posts){
  await fs.writeFile(path, JSON.stringify(posts,null,2));
}

app.get("/posts", async (req,res)=>{
  const posts = await getPosts();
  res.render("posts",{posts});
});

app.get("/posts/new",(req,res)=>{
  res.render("newPost");
});

app.post("/posts", async (req,res)=>{
  const posts = await getPosts();

  posts.push({
    id: Date.now(),
    title: req.body.title,
    content: req.body.content
  });

  await savePosts(posts);
  res.redirect("/posts");
});

app.get("/posts/:id", async (req,res)=>{
  const posts = await getPosts();
  const post = posts.find(p=>p.id==req.params.id);
  res.render("post",{post});
});


// ---------- HOME ----------
app.get("/",(req,res)=>{
  res.send("Home Page");
});


// ---------- 404 ----------
app.use((req,res)=>{
  res.status(404).render("404");
});


app.listen(3000,()=>console.log("Server running on port 3000"));
