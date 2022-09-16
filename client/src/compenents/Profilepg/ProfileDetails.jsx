import React from 'react'
import './ProfileDetails.css'
import FollowersCard from '../LeftSide/followersCard/FollowersCard'
import LogoSearch from '../LeftSide/Search/LogoSearch'
import UserInfo from './UserInfo'

const ProfileDetails = () => {
  return (
    <div className='ProfileDetails'>
        <LogoSearch/>
        <UserInfo/>
        <FollowersCard/>
        </div>
  )
}

export default ProfileDetails