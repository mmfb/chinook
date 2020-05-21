

window.onload = async function() {
    let albumId = sessionStorage.getItem("albumId");

    let album = await $.ajax({
        url: "/api/albuns/"+albumId,
        method: "get",
        dataType: "json"
    });
    console.log(album);
    document.getElementById("titulo").innerHTML = album.Title;
    document.getElementById("artista").innerHTML = album.Name;

    let html = "";
    for(let track of album.tracks) {
        html+= "<p>"+track.Name+" - "+track.UnitPrice+" €</p>";
    }
    document.getElementById("tracks").innerHTML = html;
}