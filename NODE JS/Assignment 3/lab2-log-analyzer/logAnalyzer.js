const fs = require("fs");
const readline = require("readline");

const stream = fs.createReadStream("app.log");

const rl = readline.createInterface({
    input: stream
});

let total = 0;
let errors = 0;
let warnings = 0;

rl.on("line", line=>{
    total++;

    if(line.includes("ERROR")) errors++;
    if(line.includes("WARNING")) warnings++;
});

rl.on("close", ()=>{
    console.log("Total:", total);
    console.log("Errors:", errors);
    console.log("Warnings:", warnings);
});
