import Comment from "../models/comment.model.js";
import User from "../models/user.model.js";

export const getPostComments = async (req, res) => {
  const comments = await Comment.find({ post: req.params.postId })
    .populate("user", "username img")
    .sort({ createdAt: -1 });

  res.json(comments);
};
export const addComment = async (req, res) => {
  const clerkUserId = req.auth.userId;
  const postId = req.params.postId;

  if (!clerkUserId) {
    return res.status(401).json("Not authenticated");
  }

  // console.log("postId", postId);
  // console.log("clerkUserId", clerkUserId);

  // console.log("request body", req.body);

  const user = await User.findOne({ clerkUserId });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  // console.log("postId", postId);
  // console.log("user", user);

  const newComment = new Comment({
    user: user._id,
    post: postId,
    ...req.body,
  });
  // console.log("newComment", newComment);

  const savedComment = await newComment.save();
  res.status(201).json(savedComment);
};
export const deleteComment = async (req, res) => {
  const clerkUserId = req.auth.userId;
  const id = req.params.id;

  if (!clerkUserId) {
    return res.status(401).json("Not authenticated");
  }
  const deletedComment = await Comment.findOneAndDelete({
    _id: id,
    user: user._id,
  });

  if (!deletedComment) {
    return res.status(403).json("You can delete only your comment");
  }
  return res.satus(200).json("Comment is deleted");
};
