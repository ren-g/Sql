const db = require("../Global/db");

let sql = `select Sex,Nation,NativePlace,IdCardNo from Pati_Regi_BasicInfo`;
module.exports.aa = {
    method: "GET",
    path: "/aa",
    callback: (req, res) => {
        db.sql(sql,(data) => {
            res.end(JSON.stringify(data.recordset));
        })
    }
};