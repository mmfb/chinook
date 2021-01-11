


window.onload = function() {
    loadAlbuns();
}

async function loadAlbuns() {
    try {
        let albuns = await $.ajax({
            url: "/api/albuns",
            method: "get",
            dataType: "json"
        });
        showAlbuns(albuns);
        
    } catch(err) {
        let elemMain = document.getElementById("main");
        console.log(err);
        elemMain.innerHTML = "<h1> Página não está disponível</h1>"+
                "<h2> Por favor tente mais tarde</h2>";
    }
} 

function showAlbuns(albuns) {
    let elemMain = document.getElementById("main");
    let html ="";
    for (let album of albuns) {
        html += "<section onclick='showAlbum("+album.AlbumId+")'>"+
        "<h3>"+album.Title+"</h3>"+
        "<p> Artista: "+album.Name+"</p></section>";
    }
    elemMain.innerHTML = html;
}


function showAlbum(albumId) {
    sessionStorage.setItem("albumId",albumId);
    window.location = "album.html";
}

async function filtrar() {
    try {
        let title = document.getElementById("title").value;
        let artist = document.getElementById("artist").value;
        let start = sessionStorage.getItem("start");
        let count = sessionStorage.getItem("count");
        let albuns = await $.ajax({
            url: "/api/albuns?artist="+artist+"&title="+title,
            method: "get",
            dataType: "json"
        });
        showAlbuns(albuns);       
    } catch(err) {
        let elemMain = document.getElementById("main");
        console.log(err);
        elemMain.innerHTML = "<h1> Página não está disponível</h1>"+
                "<h2> Por favor tente mais tarde</h2>";
    }
 
 
}