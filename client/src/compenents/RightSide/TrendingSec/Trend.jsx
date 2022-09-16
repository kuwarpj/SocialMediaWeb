import React from 'react'
import { TrendingData } from '../../../data/TrendingData'
import "./Trend.css"
const Trend = () => {
  return (
    <div className='Trend'>
        <h3>Trends For You</h3>
{TrendingData.map((trend)=>{
    return(
        <div className="trend-data">
            <span>#{trend.name}</span>
            <span>{trend.shares}K Shares</span>
        </div>
    )
})}
        
       </div>
  )
}

export default Trend