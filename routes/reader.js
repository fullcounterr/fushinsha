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
              res.render('read', {title: locals.title+' - Page 1 | HN Archive', data: locals});
            }
            else {
              res.status(response.statusCode).send(response.statusMessage);
            }
          })
      } else {
        request({
          method: 'GET',
          uri: 'http://localhost:3000/api/manga/read/'+req.params.id+'?page='+req.query.page
        }, function (error, response, body){
          if(!error && response.statusCode == 200){
            var locals = JSON.parse(body);
            if(!locals.index){ 
              res.send('End of chapter');
            } else {
              res.render('read', {title: locals.title+' - Page '+ req.query.page +' | HN Archive', data: locals});
            }
          }
          else {
            res.status(response.statusCode).send(response.statusMessage);
          }
        })
      }
    
  });



module.exports = router;
