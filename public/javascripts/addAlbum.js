
window.onload = async function() {
    try {
        let artistas = await $.ajax({
            url: "/api/artistas",
            method: "get",
            dataType: "json"
        });
        let html="";
        for (let artista of artistas) {
            html+= "<option value="+artista.ArtistId+">"+artista.Name+
                "</option>";
        }
        document.getElementById("artist").innerHTML = html;
    } catch (err) {
        console.log(err);
        // mensagem de erro para o utilizador      
    }

}


async function addAlbum() {
    try {
        let album = {
            Title: document.getElementById("title").value,
            Cover: document.getElementById("cover").value,
            ArtistId: parseInt(document.getElementById("artist").value)
        }
        alert(JSON.stringify(album));
        let result = await $.ajax({
            url: "/api/albuns",
            method: "post",
            dataType: "json",
            data:JSON.stringify(album),
            contentType: "application/json"
        });
        alert(JSON.stringify(result));
    } catch(err) {
        console.log(err);
        // mensagem para o utilizador
    }
}