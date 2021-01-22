var pool = require("./connection");

module.exports.getAll = async function(filterObj) {
    try {
        let filterQueries = "";
        let filterValues = [];
        if (filterObj.title) {
            filterQueries += " AND Title LIKE ?";
            filterValues.push("%"+filterObj.title+"%");
        }
        if (filterObj.artist) {
            filterQueries += " AND Name LIKE ?";
            filterValues.push("%"+filterObj.artist+"%");
        }
        let sql = "SELECT * FROM album, artist WHERE album.ArtistId = artist.ArtistId"+
                        filterQueries;
        console.log(sql);
        console.log(filterValues);
        let albuns = await pool.query(sql,filterValues);
        return {status:200, data: albuns};
    } catch(err) {
        console.log(err);
        return {status:500, data: err};
    }
}
    /*
    try {
        let sql = "SELECT * FROM album, artist WHERE album.ArtistId = artist.ArtistId";
        let albuns = await pool.query(sql);
        return {status:200, data: albuns};
    } catch(err) {
        console.log(err);
        return {status:500, data: err};
    }
}
*/

//module.exports.getFiltered = async function(title,artist) {
 

module.exports.getOne = async function(idAlbum) {
    try {
        let sql = "SELECT * FROM album, artist WHERE album.ArtistId = artist.ArtistId "+
                  " AND AlbumId = ?";
        let albuns = await pool.query(sql,[idAlbum]);
        if (albuns.length > 0) {
            let album = albuns[0]; // its only one

            sql = "SELECT TrackId, track.Name AS Name, genre.Name AS Genre, "+
            "mediaType.Name AS Media, Composer, UnitPrice "+
            "FROM track,genre,mediatype WHERE "+
            "track.MediaTypeId = mediatype.MediaTypeId AND "+
            "track.GenreId = genre.GenreId AND AlbumId = ?";
            let tracks = await pool.query(sql,[idAlbum]);

            album.tracks = tracks;
            
            return {status:200, data: album};
        } else {
            return {status:404, data: {msg:"Album not found for that id"}};
        }
    } catch(err) {
        console.log(err);
        return {status:500, data: err};
    }
}

module.exports.save = async function(album) {
    try {
        let sql ="INSERT INTO album(Title,ArtistId) VALUES (?,?)";
        let result = await pool.query(sql,[album.Title,album.ArtistId]);
        return {status:200, data: result};
    } catch(err) {
        console.log(err);
        return {status:500, data: err};
    }
}