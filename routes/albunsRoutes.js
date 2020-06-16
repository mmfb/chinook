var express = require('express');
var router = express.Router();
var albModel = require("../models/albunsModel");

/* GET all albuns */
router.get('/', async function(req, res, next) {
  let filterObj = req.query;
  let result = await albModel.getAll(filterObj);
  res.status(result.status).
     send(result.data);
});

/*
router.get('/filtered', async function(req, res, next) {
  let title = req.query.title;
  let artist = req.query.artist;
  let result = await albModel.getFiltered(title,artist);
  res.status(result.status).
     send(result.data);
});
*/



/* GET one album */

// /api/albuns/3
router.get('/:id', async function(req, res, next) {
  let idAlbum = req.params.id;
  let result = await albModel.getOne(idAlbum);
  res.status(result.status).
     send(result.data);
});


/* GET all albuns */
router.post('/', async function(req, res, next) {
  let album = req.body;
  let result = await albModel.save(album);
  res.status(result.status).
     send(result.data);
});


module.exports = router;
