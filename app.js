var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var readRouter = require('./routes/reader');
var searchRouter = require('./routes/search');

var app = express();
var mangadb = require('./manga.json');
const { json } = require('express');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css/bootstrap/', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/js/bootstrap/', express.static(__dirname + '/node_modules/bootstrap/dist/js'));

app.use('/', indexRouter);
app.use('/read', readRouter);
app.use('/search', searchRouter);
app.set('view engine', 'pug');
var fs = require('fs'), obj

//
// START OF API
//

// Get Manga List (page view/list view). 
// It is paginated by default, each page contains 10 thumbnail.
// page = The page you will get. Default is 1.
app.get("/api/manga/list/:page", (req, res, next) => {
  const pageCount = Math.ceil(mangadb.length / 10);
  let page = parseInt(req.params.page);
  if (!page) { page = 1;}
  if (page > pageCount) {
    page = pageCount
  }
  res.json({
    "page": page,
    "pageCount": pageCount,
    "limit" : 10,
    "manga": mangadb.slice(page * 10 - 10, page * 10)
  })
});

// Get Manga by id (single view)
// id = The manga id that you want to view.
// No error handling yet
app.get("/api/manga/view/:id", (req, res, next) => {
  res.json(mangadb.filter((m) => m.gallery_id == req.params.id));
});


// Read Manga data.json by id (whole manga data)
// id = The manga id that you want to view.
// Return : filename with extension
// No error handling yet
app.get("/api/manga/read/:id", (req, res, next) => {
  if(!req.query.page){
    fs.readFile("data/manga/"+req.params.id+"/data.json", 'utf8', function (err, data) {
      if (err) {
        switch (err.code) {
          case "ENOENT":
            res.status(404).end();
            break;
          default:
            console.log(err.code);
            res.status(500).end();
        }
        return;
      };
      obj = JSON.parse(data);
      res.json({
        "id" : req.params.id,
        "index" : obj
      });
    });
  } else if (req.query.page){
    fs.readFile("data/manga/"+req.params.id+"/data.json", 'utf8', function (err, data) {
      if (err) {
        switch (err.code) {
          case "ENOENT":
            res.status(404).end();
            break;
          default:
            console.log(err.code);
            res.status(500).end();
        }
        return;
      };
      obj = JSON.parse(data);
      const titleName = mangadb.filter((m) => m.gallery_id == req.params.id)
      reqPages = parseInt(req.query.page)
      sendData = obj[reqPages-1]
      res.json({
        "id" : req.params.id,
        "title" : titleName[0].title_conventional,
        "page" : req.query.page,
        "index" : sendData
      });
    });
  }
});

// Search Manga by name
// name = The manga name that you want to search.
// Return : JSON file with matched name, paginated, 10 each page.
// No error handling yet
app.get("/api/manga/search/", (req, res, next) => {
  const pageCount = Math.ceil(mangadb.length / 10);
  let page = parseInt(req.params.page);
  if (!page) { page = 1;}
  if (page > pageCount) {
    page = pageCount
  }
  res.json({
    "page": page,
    "pageCount": pageCount,
    "limit" : 10,
    "manga": mangadb.slice(page * 10 - 10, page * 10)
  })
});

app.get("/api/manga/search/:search", (req, res, next) => {
  var nameSearch = mangadb.filter((m) => m.title_conventional.toLowerCase().includes(req.params.search.toLowerCase()))
  var tagSearch = mangadb.filter((m) => m.tags.some(n => n === req.params.search.toLowerCase()))
  var finalSearch = Object.assign(nameSearch, tagSearch)
  var pageCount = Math.ceil(finalSearch.length / 10);
  let page = parseInt(req.query.page);
  if (!page) { page = 1;}
  if (page > pageCount) {
    page = pageCount
  }
  res.json({
    "page": page,
    "pageCount": pageCount,
    "manga": finalSearch.slice(page * 10 - 10, page * 10)
  });
});

module.exports = app;