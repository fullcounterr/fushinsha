var express = require('express');
const axios = require('axios');
var router = express.Router();


router.route('/')
  .get(async function (req, res) {
    try {
      let page = req.query.page || '1';
      let title = 'HN Archive | ' + (req.query.page ? ('Page ' + req.query.page) : 'Home');
      const response = await axios.get('https://nexus.elscione.com/api/manga/list/' + page);
      res.render('index', { data: response.data, title: title });
    }
    catch (error) {
      res.status(error.response.status).send(error.response.statusText);
    }
  });



module.exports = router;
