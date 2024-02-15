var express = require('express');
const axios = require('axios');
var router = express.Router();


router.route('/:id')
  .get(async function (req, res) {
    try {
      let page = req.query.page || '1';
      const response = await axios.get('https://nexus.elscione.com/api/manga/read/' + req.params.id + '?page=' + page);
      if (!response.data.index) {
        res.send('End of chapter');
      }
      else {
        res.render('read', { title: response.data.title + ' - Page ' + page + ' | HN Archive', data: response.data });
      }
    }
    catch (error) {
      res.status(error.response.status).send(error.response.statusText);
    }
  });



module.exports = router;
