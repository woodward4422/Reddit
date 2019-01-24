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
  
  };
  