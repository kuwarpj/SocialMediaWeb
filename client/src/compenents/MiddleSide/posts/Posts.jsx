import React from "react";
import "./Posts.css";
//import { PostData } from '../../../data/PostData'
import UserPost from "../userPost/UserPost";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getTimelinePosts } from "../../../actions/PostAction";
import { useParams } from "react-router-dom";
const Posts = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.AuthReducer.authData);
  let { posts, loading } = useSelector((state) => state.postReducer);
  useEffect(() => {
    dispatch(getTimelinePosts(user._id));
  }, []);
  if (!posts) {
    return "no posts";
  }
  if (params.id) {
    posts = posts.filter((posts) => posts.userId === params.id);
  }
  return (
    <div className="Posts">
      {loading
        ? "Fetching Post..."
        : posts.map((post, id) => {
            return <UserPost data={post} id={id} />;
          })}
    </div>
  );
};

export default Posts;
