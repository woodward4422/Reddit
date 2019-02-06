const Post = require('../models/post');
const User = require('../models/user');

module.exports = (app) => {

  app.post("/posts/new", (req, res) => {
    if (req.user) {
      var post = new Post(req.body);
      post.author = req.user._id;

      post
        .save()
        .then(post => {
          return User.findById(req.user._id);
        })
        .then(user => {
          user.posts.unshift(post);
          user.save();
          res.redirect(`/posts/${post._id}`);
        })
        .catch(err => {
          console.log(err.message);
        });
    } else {
      console.log("This is bad")
      return res.status(401);
    }
  });

  app.get('/posts/new', (req, res) => {
    var currentUser = req.user;
    res.render('posts-new', {
      currentUser
    })
  });

  app.get("/posts/:id", function (req, res) {
    var currentUser = req.user;
    // LOOK UP THE POST

    Post.findById(req.params.id).populate({
        path: 'comments',
        populate: {
          path: 'author'
        }
      }).populate('author')
      .then(post => {
        res.render("posts-show", {
          post,
          currentUser
        });
      })
      .catch(err => {
        console.log(err.message);
      });
  });
  // Shows the subreddit
  app.get("/n/:subreddit", function (req, res) {
    var currentUser = req.user;
    Post.find({
        subreddit: req.params.subreddit
      }).populate('author')
      .then(posts => {
        res.render("posts-index", {
          posts,
          currentUser
        });
      })
      .catch(err => {
        console.log(err);
      });
  });
};