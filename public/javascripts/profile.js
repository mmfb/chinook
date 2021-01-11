
window.onload = async function() {
    let customerId = sessionStorage.getItem("customerId");
    if (!customerId) {
        alert("Your are not logged!");
        window.location = "login.html";        
    }
    let customer = await $.ajax({
        url: "/api/customers/"+customerId,
        method: "get",
        dataType: "json"
    });
    console.log(customer);
    

    document.getElementById("name").innerHTML = "Profile of "+customer.FirstName + " " + customer.LastName;
    document.getElementById("email").innerHTML = customer.Email;
    let fullAddress = customer.Address+", "+customer.PostalCode+" "+customer.City;
    if (customer.State) fullAddress+=" ("+customer.State+")";
    fullAddress += " - "+customer.Country;

    
    document.getElementById("address").innerHTML = fullAddress;
    
    //document.getElementById("artista").innerHTML = album.Name;

}
function logout() {
    sessionStorage.removeItem("customerId");
    window.location="index.html";
}