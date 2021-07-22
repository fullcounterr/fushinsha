var express = require('express');
var request = require('request');
var router = express.Router();


router.route('/')
  .get(function(req, res){
    if(!req.query.page){
      request({
        method: 'GET',
        uri: 'http://localhost:3000/api/manga/search/'+req.query.query
      }, function (error, response, body){
        if(!error && response.statusCode == 200){
          var locals = JSON.parse(body);
          res.render('search', {data: locals, searchQuery: req.query.query});
        }
      })
    } else {
      request({
        method: 'GET',
        uri: 'http://localhost:3000/api/manga/search/'+req.query.query+'?page='+req.query.page
      }, function (error, response, body){
        if(!error && response.statusCode == 200){
          var locals = JSON.parse(body);
          res.render('search', {data: locals, searchQuery: req.query.query});
        }
      })
    }
  });



module.exports = router;
