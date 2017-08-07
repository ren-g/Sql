const mssql = require("mssql");
const Dbconfig = require("../config").Db;
let db = mssql.connect(`mssql://${Dbconfig.user}:${Dbconfig.password}@${Dbconfig.local}/${Dbconfig.dataTable}`);
let Dbobj = {};
let sql = (qyery, callback) => {
    db.then(function () {
        new mssql.Request().query(qyery).then((recordset) => {
            callback(recordset);
        }).catch((err) => {
            console.log(err)
        });
    }).catch((err) => {
        console.log(err)
    });
};
module.exports.sql = sql;
