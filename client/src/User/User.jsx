import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { followUser, unfollowUser } from '../actions/UserAction'

const User = ({person}) => {
    const dispatch = useDispatch()
    const {user} = useSelector((state)=> state.AuthReducer.authData)
    const [following, setFollowing] = useState(person.followers.includes(user._id))
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER
    const handleFollow = ()=>{
        following ? 
        dispatch(unfollowUser(person._id, user)) :
        dispatch(followUser(person._id, user))
        setFollowing((prev)=>!prev)
    }
    {
        console.log(following)
        console.log(person.following)
    
    }
  return (
    <div className="card-follower">
    <div>
        <img className='followerImg' src={person.profilePic ? serverPublic + person.profilePic : serverPublic +"defaultProfile.png"} alt="imageS "></img>
        <div className="follower-name">
            <span>{person.firstname}</span>
            <span>{person.username}</span>
        </div>
    </div>
    <button className={following ? 'button fc-button unFollowBtn' : "button fc-button"} onClick={handleFollow}>
      {following ? "Unfollow" : "Follow"}
    </button>
</div>


  )
}

export default User