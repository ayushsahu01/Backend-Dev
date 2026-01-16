const fs = require("fs");
// fs.writeFileSync("./test.txt","This is Test File");
// fs.writeFile("./test.txt","This is Async File Content",(err, data)=>{
//     if(err){
//         console.log(err)
//     }
//     else{
//         console.log("File is Created")
//     }
// });
// const file = fs.readFileSync("test.txt","utf-8")
// console.log(file)

fs.appendFileSync("test.txt", new Date().toLocaleString())
const file = fs.readFileSync("test.txt","utf-8")

const http = require("http")
const server = http.createServer((req,res)=>{
    res.writeHead(200, {"c\Content-Type":"application/json"})
    res.removeHeader("response is closed")
})
server.listen(3000, ()=>{
    console.log("Server is running on port 7054")
})