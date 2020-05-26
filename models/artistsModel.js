var pool = require("./connection");

module.exports.getAll = async function() {
    try {
        let sql = "SELECT * FROM artist";
        let artists = await pool.query(sql);
        return {status:200, data: artists};
    } catch(err) {
        console.log(err);
        return {status:500, data: err};
    }
}