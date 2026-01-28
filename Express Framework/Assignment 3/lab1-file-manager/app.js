const fs = require("fs");

const [,, command, ...args] = process.argv;

switch(command){

    case "read":
        fs.readFile(args[0], "utf8", (err, data)=>{
            if(err) return console.log(err.message);
            console.log(data);
        });
        break;

    case "write":
        fs.writeFile(args[0], args[1], err=>{
            if(err) return console.log(err.message);
            console.log("File written");
        });
        break;

    case "copy":
        fs.copyFile(args[0], args[1], err=>{
            if(err) return console.log(err.message);
            console.log("Copied");
        });
        break;

    case "delete":
        fs.unlink(args[0], err=>{
            if(err) return console.log(err.message);
            console.log("Deleted");
        });
        break;

    case "list":
        fs.readdir(args[0], (err, files)=>{
            if(err) return console.log(err.message);
            console.log(files);
        });
        break;

    default:
        console.log("Commands: read/write/copy/delete/list");
}
