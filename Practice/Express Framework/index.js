const express = require('express');
const app = express();
const fs = require("fs");
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

    if (!Data) {
        return res.status(400).send("Please provide student data");
    }

    // Read existing file
    fs.readFile("student.json", "utf8", (err, fileData) => {

        let students = [];

        if (!err && fileData) {
            students = JSON.parse(fileData);
        }

        // add new student
        students.push(Data);

        // Write back to file
        fs.writeFile("student.json", JSON.stringify(students, null, 2), (err) => {
            if (err) return res.status(500).send("Error saving data");

            res.json({
                message: "Student registered successfully",
                students
            });
        });
    });
});

app.put("/students/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const updatedData = req.body;

    if (!updatedData) {
        return res.status(400).send("Please provide updated data");
    }

    fs.readFile("student.json", "utf8", (err, fileData) => {

        if (err) {
            return res.status(500).send("Error reading file");
        }

        let students = fileData ? JSON.parse(fileData) : [];

        const index = students.findIndex(s => s.id == id);

        if (index === -1) {
            return res.status(404).send("Student not found");
        }

        // merge old + new data
        students[index] = { ...students[index], ...updatedData };

        fs.writeFile("student.json", JSON.stringify(students, null, 2), (err) => {
            if (err) return res.status(500).send("Error updating data");

            res.json({
                message: "Student updated successfully",
                student: students[index]
            });
        });
    });
});

app.delete("/students/:id", (req, res) => {
    const id = parseInt(req.params.id);

    fs.readFile("student.json", "utf8", (err, fileData) => {
        let students = fileData ? JSON.parse(fileData) : [];

        const filtered = students.filter(s => s.id != id);

        if (filtered.length === students.length) {
            return res.status(404).send("Student not found");
        }

        fs.writeFile("student.json", JSON.stringify(filtered, null, 2), (err) => {
            if (err) return res.status(500).send("Error deleting");

            res.json({ message: "Student deleted successfully" });
        });
    });
});


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