const Post = require('../models/post');

module.exports = (app) => {

  app.post('/posts/new', (req, res) => {
    console.log("In the post post")
    const post = new Post(req.body);
    console.log(req.body);

    post.save((err, post) => {
      // REDIRECT TO THE ROOT
      return res.redirect(`/`);
    })
  });

  app.get('/posts/new', (req, res) => {
    console.log("In post new get request")
    res.render('posts-new')
  });

  app.get("/posts/:id", function (req, res) {
    // Query for the post to see if it exists in the DB
    Post.findById(req.params.id)
      .then(post => {
        res.render("posts-show", {
          post
        });
      })
      .catch(err => {
        console.log(err.message);
      });
  });
};