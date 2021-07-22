var express = require('express');
var request = require('request');
var router = express.Router();


router.route('/')
  .get(function(req, res){
    if (!req.query.page){
      request({
        method: 'GET',
        uri: 'http://localhost:3000/api/manga/list/1'
        
      }, function (error, response, body){
        if(!error && response.statusCode == 200){
          var locals = JSON.parse(body);
          res.render('index', {data: locals, title: 'HN Archive | Home'});
        }
      })
    } else {
      request({
        method: 'GET',
        uri: 'http://localhost:3000/api/manga/list/'+req.query.page
        
      }, function (error, response, body){
        if(!error && response.statusCode == 200){
          var locals = JSON.parse(body);
          res.render('index', {data: locals, title: 'HN Archive | Page '+req.query.page });
        }
      })
    }

  });



module.exports = router;
