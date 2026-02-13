const express = require("express");
const fs = require("fs").promises;
const path = require("path");

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

const filePath = path.join(__dirname, "students.json");

/* ---------- Helpers ---------- */
async function readStudents() {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data || "[]");
  } catch {
    return [];
  }
}

async function writeStudents(data) {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

/* ---------- Routes ---------- */

// Home Page (Form)
app.get("/", (req, res) => {
  res.render("home");
});

// Add Student
app.post("/add", async (req, res) => {
  const students = await readStudents();

  const newStudent = {
    id: Date.now().toString(),
    name: req.body.name,
    branch: req.body.branch,
    age: req.body.age
  };

  students.push(newStudent);
  await writeStudents(students);

  res.redirect("/students");
});

// Students List
app.get("/students", async (req, res) => {
  let students = await readStudents();

  const branchFilter = req.query.branch;

  if (branchFilter) {
    students = students.filter(s => s.branch === branchFilter);
  }

  res.render("students", {
    students,
    total: students.length,
    branch: branchFilter || ""
  });
});

// Delete Student
app.get("/students/delete/:id", async (req, res) => {
  let students = await readStudents();

  students = students.filter(s => s.id !== req.params.id);

  await writeStudents(students);

  res.redirect("/students");
});

/* ---------- Server ---------- */
app.listen(3000, () => console.log("Server running on http://localhost:3000"));
