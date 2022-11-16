const Post = require("../models/Post");
const User = require("../models/User");
const router = require("express").Router();

router.get("/", (req, res) => {
  console.log("post");
});

//create a post

router.post("/", async (req, res) => {
  const newPost = new Post(req.body);

  try {
    const savedpost = await newPost.save();
    res.status(200).json(savedpost);
  } catch (error) {
    res.status(500).json(error);
  }
});
//update a post

router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    !post && res.status(200).json("no post with the given id");
    if (post.userId === req.body.userId) {
      await post.updateOne({
        $set: req.body,
      });
      res.status(200).json("post has been updated");
    } else {
      res.status(403).json("you are not allowed to edit post");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
//delete a post

router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    post.deleteOne();

    res.status(200).json(" the post has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
});
///like and unlike a post
router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("the post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("the post has been disliked");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//like a post

router.put("/like/:postId/:userId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post.likes.includes(req.params.userId)) {
      await post.updateOne({ $push: { likes: req.params.userId } });
      res.status(200).json("you like this post");
    } else {
      res.status(403).json("you already liked this post");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//unlike a post

router.put("/unlike/:postId/:userId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (post.likes.includes(req.params.userId)) {
      await post.updateOne({ $pull: { likes: req.params.userId } });
      res.status(200).json("you unlike this post");
    } else {
      res.status(403).json("you can not unlike this post");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
//get a post

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});
//get timelines post all foll
router.get("/timeline/:userId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.following.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    res.status(200).json(userPosts.concat(...friendPosts));
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all user's posts
router.get("/profile/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username})
    const posts = await Post.find({ userId: user._id });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(err);
  }
});

module.exports = router;
