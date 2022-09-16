import React from 'react'
import "./LogoSearch.css"
import logo from "../../../img/logo.png"
import {UilSearch} from '@iconscout/react-unicons'
const LogoSearch = () => {
  return (
    <div className='LogoSearch'>
{/* <img src="Logo" alt="Logo"/> */}
<span>Social<br></br> Media</span>
<div className='Search'>
    <input type="text" placeholder='Search'></input>
    <div className='s-icon'>
        <UilSearch/>
    </div>
</div>
    </div>

  )
}

export default LogoSearch