const express = require("express");
const app = express();
const fs = require("fs").promises;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

// READ students
const readStudents = async () => {
  try {
    const data = await fs.readFile("students.json", "utf-8");
    return JSON.parse(data || "[]");
  } catch {
    return [];
  }
};

// WRITE students
const writeStudents = async (students) => {
  await fs.writeFile("students.json", JSON.stringify(students, null, 2));
};
// HOME → show all registered students
app.get("/", async (req, res) => {
    
  const allStudents = await readStudents();
  res.render("form", { allStudents });
});

// SUBMIT → add new student
app.post("/students/register", async (req, res) => {
  const { name, branch } = req.body;

  const allStudents = await readStudents(); // get old students
  allStudents.push({ name, branch });       // add new student

  await writeStudents(allStudents);         // save updated list
  res.redirect("/");                        // reload home
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
