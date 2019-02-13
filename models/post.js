const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Populate = require("../util/autopopulate");

const PostSchema = new Schema({
  createdAt: {
    type: Date
  },
  updatedAt: {
    type: Date
  },
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  subreddit: {
    type: String,
    required: true
  },
  subredditTwo: {
    type: String,
    required: false
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  upVotes: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }],
  downVotes: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }],
  voteScore: {
    type: Number
  }

});

PostSchema
  .pre('findOne', Populate('author'))
  .pre('find', Populate('author'))

PostSchema.pre("save", function (next) {
  // SET createdAt AND updatedAt
  const now = new Date();
  this.updatedAt = now;

  if (!this.createdAt) {
    this.createdAt = now;
  }

  next();
});

module.exports = mongoose.model("Post", PostSchema);