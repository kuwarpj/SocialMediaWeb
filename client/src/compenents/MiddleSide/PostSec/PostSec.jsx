import React from "react";
import Posts from "../posts/Posts";
import PostShare from "../postShare/PostShare";
import "./PostSec.css";

const PostSec = () => {
  return (
    <div className="Post">
      <PostShare />
      <Posts />
    </div>
  );
};

export default PostSec;
