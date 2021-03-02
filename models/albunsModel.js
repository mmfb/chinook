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
        let sql = "SELECT * FROM Album, Artist WHERE Album.ArtistId = Artist.ArtistId"+
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
        let sql = "SELECT * FROM Album, Artist WHERE Album.ArtistId = Artist.ArtistId";
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
        let sql = "SELECT * FROM Album, Artist WHERE Album.ArtistId = Artist.ArtistId "+
                  " AND AlbumId = ?";
        let albuns = await pool.query(sql,[idAlbum]);
        if (albuns.length > 0) {
            let album = albuns[0]; // its only one

            sql = "SELECT TrackId, Track.Name AS Name, Genre.Name AS Genre, "+
            "MediaType.Name AS Media, Composer, UnitPrice "+
            "FROM Track,Genre,MediaType WHERE "+
            "Track.MediaTypeId = MediaType.MediaTypeId AND "+
            "Track.GenreId = Genre.GenreId AND AlbumId = ?";
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
        let sql ="INSERT INTO Album(Title,ArtistId) VALUES (?,?)";
        let result = await pool.query(sql,[album.Title,album.ArtistId]);
        return {status:200, data: result};
    } catch(err) {
        console.log(err);
        return {status:500, data: err};
    }
}