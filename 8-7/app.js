let server = require("./Global/sever");
server.run();
let app = {
    use: (path,fn) => {
        let obj = require(path);
        if(fn) obj = obj[fn];
        server.use(obj);
    },
    get: (path) => {
        let obj = require(path);
        if(fn) obj = obj[fn];
        server.get(obj);
    },
    post: (path) => {
        let obj = require(path);
        if(fn) obj = obj[fn];
        server.post(obj);
    }
};
app.use("./Router/index","aa");