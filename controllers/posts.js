const Post = require('../models/post');

module.exports = (app) => {

    app.post('/posts/new', (req, res) => {
      const post = new Post(req.body);
      console.log(req.body);

      post.save((err, post) => {
        // REDIRECT TO THE ROOT
        return res.redirect(`/`);
      })
    });
  
    app.get("/posts/:id", function(req, res) {
      // Query for the post to see if it exists in the DB
      Post.findById(req.params.id)
        .then(post => {
          res.render("posts-show", { post });
        })
        .catch(err => {
          console.log(err.message);
        });
    });
  };
  