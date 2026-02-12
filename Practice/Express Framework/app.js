const express = require("express");
const app = express();
const fs = require("fs").promises;
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));
let allStudents = [];

// const readStudentsFromFile = async () => {
//     const data = await fs.readFile("./students.json", "utf-8");
//     return JSON.parse(data || "[]");
// };

// const writeStudentsToFile = async (records) => {
//     await fs.writeFile("./students.json", JSON.stringify(records, null, ))
// }; 
app.get("/", (req, res) => {

    const allStudents = [
        { name: "Ayush", branch: "CSE" },
        { name: "Rohit", branch: "IT" },
        { name: "Priya", branch: "ECE" }
    ];

    res.render("form", { allStudents });
});

app.post("/students/register",(req,res)=>{
  const { name, branch } = req.body;
  allStudents.push({ name, branch });
  res.redirect("/");
});


app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
