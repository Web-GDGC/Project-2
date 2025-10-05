import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../context/StoreContext'
import BookItem from '../BookItem/BookItem'
import './BookDisplay.css'


const BookDisplay = ({Category}) => {

    // using the book_list from the context folder using the useContext hook
    const {url, book_list} = useContext(StoreContext)

  return (
    <div>
        <h1 className='font-bold text-[23px]'>Top Books For You</h1>
        <div className='food-display-list'>
          {
            book_list.map((item, index) => {
              if (Category==="All" || Category===item.category) {
                return <BookItem key={index} id={item._id} name={item.name} quantity={item.quantity} description={item.description} image={item.image}></BookItem>
              }
            })
          }
        </div>
    </div>
  )
}

export default BookDisplay