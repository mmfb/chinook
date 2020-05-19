var pool = require("./connection");

module.exports.getAll = async function() {
    try {
        let sql = "SELECT * FROM album, artist WHERE album.ArtistId = artist.ArtistId";
        let albuns = await pool.query(sql);
        return {status:200, data: albuns};
    } catch(err) {
        console.log(err);
        return {status:500, data: err};
    }
}