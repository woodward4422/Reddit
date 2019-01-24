const express = require('express')
var exphbs = require('express-handlebars');
const mongoose = require('mongoose')

const app = express()

const Post = require('./models/post');

const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());

require('./controllers/posts.js')(app);
require('./data/reddit-db');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');






app.get('/', (req, res) => {
  res.render('posts-index')

})

app.get('/posts/new', (req, res) => {
    res.render('posts-new')
  })

app.listen(3000, () => {
  console.log('App listening on port 3000!')
})
