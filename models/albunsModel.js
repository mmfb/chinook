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

module.exports.getOne = async function(idAlbum) {
    try {
        let sql = "SELECT * FROM album, artist WHERE album.ArtistId = artist.ArtistId "+
                  " AND AlbumId = ?";
        let albuns = await pool.query(sql,[idAlbum]);
        let album = albuns[0]; // its only one

        sql = "SELECT TrackId, track.Name AS Name, genre.Name AS Genre, "+
        "mediaType.Name AS Media, Composer, UnitPrice "+
        "FROM track,genre,mediatype WHERE "+
        "track.MediaTypeId = mediatype.MediaTypeId AND "+
        "track.GenreId = genre.GenreId AND AlbumId = ?";
        let tracks = await pool.query(sql,[idAlbum]);

        album.tracks = tracks;
        
        return {status:200, data: album};
    } catch(err) {
        console.log(err);
        return {status:500, data: err};
    }
}

module.exports.save = async function(album) {
    try {
        let sql ="INSERT INTO album(Title,ArtistId,Cover) "+
                "VALUES (?,?,?)"
        let result = await pool.query(sql,[album.Title,album.ArtistId,album.Cover]);
        return {status:200, data: result};
    } catch(err) {
        console.log(err);
        return {status:500, data: err};
    }
}