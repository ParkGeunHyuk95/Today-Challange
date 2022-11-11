import React from 'react'
import '../styles/checkChallenge/checkImg.css'
const ImgCard = ({item}) => {
  console.log(item?.addedImage)
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
