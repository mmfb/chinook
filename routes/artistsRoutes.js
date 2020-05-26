var express = require('express');
var router = express.Router();
var artModel = require("../models/artistsModel");

/* GET all albuns */
router.get('/', async function(req, res, next) {
  let result = await artModel.getAll();
  res.status(result.status).
     send(result.data);
});


module.exports = router;