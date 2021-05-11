var pool = require("./connection");

module.exports.login = async function(fname,lname,email) {
    try {
        let sql = "SELECT * FROM Customer WHERE FirstName=? AND "+
                 "LastName=? AND email=?";
        let costumers = await pool.query(sql,[fname,lname,email] );
        if (costumers.length > 0)
            return {status:200, data: costumers[0]};
        else return {status:401, data: {msg: "Incorrect name or email"}};
    } catch(err) {
        console.log(err);
        return {status:500, data: {msg: "Server Problems. Try again later", err:err}};
    }
}


module.exports.getCustomer = async function(id) {
    try {
        let sql = "SELECT * FROM Customer WHERE CustomerId=?";
        let costumers = await pool.query(sql,id );
        if (costumers.length > 0)
            return {status:200, data: costumers[0]};
        else return {status:401, data: {msg: "No customer with that id"}};
    } catch(err) {
        console.log(err);
        return {status:500, data: {msg: "Server Problems. Try again later", err:err}};
    }
}