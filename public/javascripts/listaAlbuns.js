


window.onload = function() {
    loadAlbuns();
}

async function loadAlbuns() {
    let elemMain = document.getElementById("main");
    try {
        let albuns = await $.ajax({
            url: "/api/albuns",
            method: "get",
            dataType: "json"
        });
        let html ="";
        for (let album of albuns) {
            html += "<section><h3>"+album.Title+"</h3>"+
            "<p> Artista: "+album.Name+"</p></section>";
        }
        elemMain.innerHTML = html;

    } catch(err) {
        console.log(err);
        elemMain.innerHTML = "<h1> Página não está disponível</h1>"+
                "<h2> Por favor tente mais tarde</h2>";
    }
} 