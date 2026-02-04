const express = require('express');
const app = express();
app.use(express.json());
const PORT = 7054;

const students = [
    {id: 1, name: "Ayush", branch: "CSE"},
    {id: 2, name: "Anuj", branch: "Managment"},
    {id: 3, name: "Priyanshu", branch: "BCA"}
]

app.get("/", (req, res)=>{
    res.send("Welcome to Home Page");
})

app.get("/students/search", (req,res)=>{                //http://localhost:7054/students/search?branch=CSE
    const branch = req.query.branch;
    const foundStudent = students.filter(s=>s.branch==branch);
    res.json(foundStudent);
})

app.get("/students", (req, res)=>{
    res.json(students);
})

app.get("/students/:id", (req, res)=>{
    const id = req.params.id;
    const arrayIndex = students.findIndex(s=> s.id==id);
    if(arrayIndex < 0){
        return res.status(404).send("Student not found");
    }
    const data = students[arrayIndex];
    res.json(data);
})

app.post("/students/register", (req, res)=>{
    const Data = req.body;
    students.push(Data);
    res.json(students);
})
// app.get("/", (req, res) => {
//     res.send("Welcome to Home Page");
// })
// app.get("/users", (req, res) => {
//     res.send("<h1>This is Users Page<h1>")
// })
// app.get("/users/:id", (req, res) => {
//     const userId = req.params.id
//     res.send(`You are requesting for user:${userId}`)
// })
app.listen(PORT, () => {
    console.log(`Server is Running on Port:${PORT}`);
}) 