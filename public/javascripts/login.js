async function login() {
    try {
        let login = {
            firstname: document.getElementById("fname").value,
            lastname: document.getElementById("lname").value,
            email: document.getElementById("email").value,
        }
        
        let customer = await $.ajax({
            url: "/api/clientes/login",
            method: "post",
            data: JSON.stringify(login),
            dataType: "json",
            contentType: "application/json"
        });
        sessionStorage.setItem("customerId",customer.CustomerId);
        alert(JSON.stringify(customer))
        window.location = "profile.html";
    } catch (err) {
        console.log(err);
        // when there is an error the JSON will be inside the responseJSON property
        document.getElementById("err").innerHTML = err.responseJSON.msg;
    }
}