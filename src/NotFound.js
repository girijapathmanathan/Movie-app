import React from 'react'
import {Link} from 'react-router-dom'

export default function NotFound() {
  return (
    <div className='NotFound'>
        <h1>404 not found </h1>
        <h2><Link to="/portal/home"></Link></h2>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmP8yRM52RChehBEbwMgcadItduVlYJ5Xiz1gF4OdhS2vPJO39JN28pObSn529yTNBZgE&usqp=CAU" alt='img'/>
    </div>        
  )
}