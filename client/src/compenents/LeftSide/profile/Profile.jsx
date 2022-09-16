import React from 'react'
import "./Profile.css"
import ProfileCard from '../profileCard/ProfileCard'
import LogoSearch from '../Search/LogoSearch'
import FollowersCard from '../../LeftSide/followersCard/FollowersCard'

const Profile = () => {
  return (
    <div className='Profile'>
       <LogoSearch/>
       <ProfileCard location='homepage'/>
       <FollowersCard/>
    </div>
  )
}

export default Profile