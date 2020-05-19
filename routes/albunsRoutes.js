var express = require('express');
var router = express.Router();
var albModel = require("../models/albunsModel");

/* GET all albuns */
router.get('/', async function(req, res, next) {
  let result = await albModel.getAll();
  res.status(result.status).
     send(result.data);
});

module.exports = router;
