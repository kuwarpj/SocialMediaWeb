import React from 'react'
import { useState } from 'react'
import ShareModal from '../../ShareModal/ShareModal'
import NavIcon from '../navIcon/NavIcon'
import Trend from '../TrendingSec/Trend'
import "./RightSec.css"
const RightSec = () => {
  const [modalOpened, setModalOpened] = useState(false)
  return (
    <div className='RightSec'>
        <NavIcon/>
        <Trend/>
        <button className='button tr-button' onClick={()=>setModalOpened(true)}>
        
            
            Share 
        </button>
        <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened}/>
        
        </div>
  )
}

export default RightSec