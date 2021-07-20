var express = require('express');
var request = require('request');
var router = express.Router();


router.route('/:id')
  .get(function(req, res){
      if(!req.query.page){
          request({
            method: 'GET',
            uri: 'http://localhost:3000/api/manga/read/'+req.params.id+'?page=1'
            
          }, function (error, response, body){
            if(!error && response.statusCode == 200){
              var locals = JSON.parse(body);
              res.render('read', {data: locals});
            }
          })
      } else {
        request({
          method: 'GET',
          uri: 'http://localhost:3000/api/manga/read/'+req.params.id+'?page='+req.query.page
        }, function (error, response, body){
          if(!error && response.statusCode == 200){
            var locals = JSON.parse(body);
            res.render('read', {data: locals});
          }
        })
      }
    
  });



module.exports = router;
