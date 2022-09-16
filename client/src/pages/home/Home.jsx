import React from 'react'
import PostSec from '../../compenents/MiddleSide/PostSec/PostSec'
import Profile from '../../compenents/LeftSide/profile/Profile'
import "./Home.css"
import RightSec from '../../compenents/RightSide/rightSec/RightSec'
const Home = () => {
  return (
    <div className='Home'>
 <Profile/>
<PostSec/>
<RightSec/>



    </div>
  )
}

export default Home