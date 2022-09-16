import postModel from "../Models/postModel.js";
import UserModel from "../Models/userModel.js";
import mongoose from "mongoose";

//Create post

export const createPost = async (req, res) => {
  const newPost = postModel(req.body);

  try {
    await newPost.save();
    res.status(200).json(newPost);
  } catch (error) {
    res.status(500).json("Server Error");
  }
};

//Get Post

export const getPost = async (req, res) => {
  const id = req.params.id;

  try {
    const post = await postModel.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json("Error");
  }
};

// Update Post

export const updatePost = async (req, res) => {
  const postId = req.params.id;

  const { userId } = req.body;

  try {
    const post = await postModel.findById(postId);
    if (post.userId === userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("Post Updated");
    } else {
      res.status(403).json("Action Denied");
    }
  } catch (error) {
    res.status(404).json("Error");
  }
};

//Delete Post

export const deletePost = async (req, res) => {
  const id = req.params.id;

  const { userId } = req.body;
  try {
    const post = await postModel.findById(id);
    if (post.userId == userId) {
      await post.deleteOne();
      res.status(200).json("Post has been deleted");
    } else {
      res.status(404).json("Action Denied");
    }
  } catch (error) {
    res.status(500).json("Error");
  }
};

//Like Dislike Post

export const likePost = async (req, res) => {
  const id = req.params.id;

  const { userId } = req.body;

  try {
    const post = await postModel.findById(id);
    if (!post.likes.includes(userId)) {
      await post.updateOne({ $push: { likes: userId } });
      res.status(200).json("Post Liked");
    } else {
      await post.updateOne({ $pull: { likes: userId } });
      res.status(200).json("Post DisLiked");
    }
  } catch (error) {
    res.status(500).json("Error");
  }
};

//TimeLine Post

export const getTimelinePost = async (req, res) => {
  const userId = req.params.id;
  try {
    const currentUserPost = await postModel.find({ userId: userId });
    const followingPost = await UserModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "following",
          foreignField: "userId",
          as: "followingPosts",
        },
      },

      {
        $project: {
          followingPosts: 1,
          _id: 0,
        },
      },
    ]);

    res.status(200).json(
      currentUserPost
        .concat(...followingPost[0].followingPosts)
        .sort((a, b) => {
          return b.createdAt - a.createdAt;
        })
    );
  } catch (error) {
    res.status(500).json("Error");
  }
};
