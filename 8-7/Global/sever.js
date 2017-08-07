const HTTP = require("http");
const URL = require("url");
const read = require("./read");
const path = require("path");
const ServerConfig = require("../config").Server;
let obj = {};
obj.serverArr = [];
obj.run = () => {
    HTTP.createServer((req, res) => {
        let method = req.method,
            pathName = URL.parse(req.url).pathname;
        let realPath = path.join(pathName);
        let ext = path.extname(realPath) ? path.extname(realPath).slice(1) : 'unknown';
        if (ext != 'unknown') {
            read.write("View"+pathName,
                (data) => {
                    res.end(data.toString());
                },
                (err) => {
                    res.end(err.toString());
                });
        }
        else{
            if (obj.serverArr.length == 0) {
                res.end();
                return;
            }

            let len = obj.serverArr.length;
            for (let i = 0; i < len; i++) {
                if (pathName == obj.serverArr[i].path && method == obj.serverArr[i].method) {
                    obj.serverArr[i].callback(req, res);
                }
            }
        }
    }).listen(ServerConfig.port, ServerConfig.localhost);
    console.log(`Server: ${ServerConfig.localhost}:${ServerConfig.port}\n运行中...`);
};
obj.use = (data) => {
    if (!data.path || !data.method) return;
    obj.serverArr.push({
        method: data.method || "GET",
        path: data.path,
        callback: data.callback
    });
};
obj.get = (data) => {
    if(!data.path) return;
    obj.serverArr.push({
        method:"GET",
        path:data.path,
        callback:data.callback
    })
};
obj.post = (data) => {
    if(!data.path) return;
    obj.serverArr.push({
        method:"POST",
        path:data.path,
        callback:data.callback
    })
};
module.exports = obj;