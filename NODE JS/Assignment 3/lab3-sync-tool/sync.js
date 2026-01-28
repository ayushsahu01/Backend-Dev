const fs = require("fs");
const path = require("path");

const sourceDir = "./source";
const backupDir = "./backup";

function syncFiles() {

    fs.readdir(sourceDir, (err, files) => {
        if (err) return console.log("Source error:", err.message);

        files.forEach(file => {

            const srcPath = path.join(sourceDir, file);
            const destPath = path.join(backupDir, file);

            fs.stat(srcPath, (err, srcStat) => {
                if (err) return;

                fs.stat(destPath, (err, destStat) => {

                    if (err) {
                        fs.copyFile(srcPath, destPath, () =>
                            console.log("Copied new file:", file)
                        );
                    }

                    else if (srcStat.mtime > destStat.mtime) {
                        fs.copyFile(srcPath, destPath, () =>
                            console.log("Updated file:", file)
                        );
                    }

                    else {
                        console.log("Already up-to-date:", file);
                    }

                });
            });

        });
    });
}

syncFiles();