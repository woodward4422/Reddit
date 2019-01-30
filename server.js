const express = require('express')
var exphbs = require('express-handlebars');
const mongoose = require('mongoose')

const app = express()

const Post = require('./models/post');

const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(expressValidator());

require('./controllers/posts.js')(app);
require('./controllers/comments.js')(app);
require('./data/reddit-db');

app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');






app.get('/', (req, res) => {
  Post.find({})
    .then(posts => {
      res.render("posts-index", {
        posts
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