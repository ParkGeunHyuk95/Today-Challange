import React from 'react'
import '../styles/checkChallenge/checkImg.css'
const ImgCard = ({item}) => {
  return (
    <div className='imgCheckCardContainer'>
    <img
    className='card17'
    src={item?.addedImage}>
    </img>
    </div>
  )
}

export default ImgCard
