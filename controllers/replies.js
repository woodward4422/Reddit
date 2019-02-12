var Post = require("../models/post");
var Comment = require("../models/comment");
var User = require("../models/user");


module.exports = app => {
    // NEW REPLY
    app.get("/posts/:postId/comments/:commentId/replies/new", (req, res) => {
        let post;
        Post.findById(req.params.postId)
            .then(p => {
                post = p;
                return Comment.findById(req.params.commentId);
            })
            .then(comment => {
                res.render("reply-new", {
                    post,
                    comment
                });
            })
            .catch(err => {
                console.log(err.message);
            });
    });

    app.post("/posts/:postId/comments/:commentId/replies", (req, res) => {
        // TURN REPLY INTO A COMMENT OBJECT
        const reply = new Comment(req.body);
        console.log(req.user._id)
        reply.author = req.user._id
        // find the post of association
        Post.findById(req.params.postId)
            .then(post => {
                // finds the associated comment 
                Promise.all([
                        reply.save(),
                        Comment.findById(req.params.commentId),
                    ])
                    .then(([reply, comment]) => {
                        // adds the comment to the comments
                        comment.comments.unshift(reply._id);

                        return Promise.all([
                            comment.save(),
                        ]);
                    })
                    .then(() => {
                        res.redirect(`/posts/${req.params.postId}`);
                    })
                    .catch(console.error);

                return post.save();
            })
    });
};