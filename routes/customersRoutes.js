var express = require('express');
var router = express.Router();
var cusModel = require("../models/customersModel");

/* login */
router.post('/login', async function(req, res, next) {
  let result = await cusModel.login(req.body.firstname,req.body.lastname, req.body.email);
  res.status(result.status).
     send(result.data);
});


router.get('/:id', async function(req, res, next) {
    let idCustomer = req.params.id;
    let result = await cusModel.getCustomer(idCustomer);
    res.status(result.status).
       send(result.data);
  });
  


module.exports = router;