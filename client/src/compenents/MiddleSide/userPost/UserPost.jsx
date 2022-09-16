import React from 'react'
import "./UserPost.css"
import Comment from "../../../img/comment.png"
import Share from "../../../img/share.png"
import Heart from "../../../img/like.png"
import NotLike from "../../../img/notlike.png"
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { likePost } from '../../../api/PostApi'


const UserPost = ({ data }) => {

  const { user } = useSelector((state) => state.AuthReducer.authData)

  const [liked, setLiked] = useState(data.likes.includes(user._id))
  const [like, setLike] = useState(data.likes.length)
  const handleLiked = () => {
    likePost(data._id, user._id);
    setLiked((prev) => !prev);
    liked ? setLike((prev) => prev - 1) : setLike((prev) => prev + 1)
  }
  return (
    <div className='UserPost'>
      <img src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : " "} alt="" />

      <div className="postReaction">
        <img src={liked ? Heart : NotLike} alt="" onClick={handleLiked} />
        <img src={Comment} alt="" />
        <img src={Share} alt="" />

      </div>
      <span>{like} Likes</span>

      <div className="details">
        <span><b>{data.name}</b></span>
        <span> {data.desc}</span>
      </div>
    </div>
  )
}

export default UserPost