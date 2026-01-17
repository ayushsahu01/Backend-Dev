const os = require("os");
const fs = require("fs");

setInterval(() => {
  const info = `
Time: ${new Date().toLocaleString()}
Platform: ${os.platform()}
CPU: ${os.cpus()[0].model}
Free Memory: ${os.freemem()}
Total Memory: ${os.totalmem()}
--------------------------
`;

  fs.appendFile("system.log", info, (err) => {
    if (err) console.error("Error writing log");
  });
}, 5000);
