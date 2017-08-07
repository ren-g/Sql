const fs = require("fs");
const path = require("path");
let write = (p,success,fail) => {
    let ext = path.extname(p).slice(1);
    if (!ext) return null;
    fs.readFile(p,(err,data) => {
        if(err && fail){
            fail(err);
            return ;
        }
        success(data);
    })
};
module.exports.write = write;