import fs from "fs";

export const readStudentsFromFile = async () => {
    const data = await fs.promises.readFile("employees.json", "utf-8")
    return JSON.parse(data || "[]")
};

export const writeStudentsToFile = async (records) => {
    await fs.promises.writeFile("employees.json", JSON.stringify(records, null, 2))
}