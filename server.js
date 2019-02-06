const express = require('express')
var exphbs = require('express-handlebars');
const mongoose = require('mongoose')
var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');


const app = express()




const Post = require('./models/post');

const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(expressValidator());
app.use(cookieParser());

var checkAuth = (req, res, next) => {
  console.log("Checking authentication");
  if (req.cookies.nToken === "undefined" || req.cookies.nToken === null) {
    console.log(req.cookies.nToken)
    req.user = null;
  } else {
    var token = req.cookies.nToken;
    var decodedToken = jwt.decode(token, {
      complete: true
    }) || {};
    req.user = decodedToken.payload;
  }

  next();
};
app.use(checkAuth);

require('./controllers/posts.js')(app);
require('./controllers/comments.js')(app);
require('./controllers/auth.js')(app);
require('./data/reddit-db');
require('dotenv').config();



app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');


app.get('/', (req, res) => {
  var currentUser = req.user;
  Post.find().populate('author')
    .then(posts => {
      res.render("posts-index", {
        posts,
        currentUser
      });
    })
    .catch(err => {
      console.log(err.message);
    });
})

app.get('/posts/new', (req, res) => {
  console.log("In post new get request")
  res.render('posts-new')
})

app.listen(3000, () => {
  console.log('App listening on port 3000!')
})


module.exports = app