var express = require('express');
const axios = require('axios');
var router = express.Router();


router.route('/')
  .get(async function (req, res) {
    try {
      let page = (req.query.page ? ('?page=' + req.query.page) : '');
      const response = await axios.get('https://nexus.elscione.com/api/manga/search/' + req.query.query + page);
      res.render('search', { data: response.data, searchQuery: req.query.query });
    }
    catch (error) {
      res.status(error.response.status).send(error.response.statusText);
    }
  });



module.exports = router;
