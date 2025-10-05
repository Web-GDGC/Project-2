import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import './BookItem.css'
import { StoreContext } from '../../context/StoreContext'

const BookItem = ({ id, name, quantity, description, image }) => {


    const {cartItem, addToCart, removeFromCart} = useContext(StoreContext)
    

    return (
        <div className='book-item'>
            <div className='book-item-img-container'>
                <img className='book-item-img' src={'http://localhost:4000/images/'+image} alt="img" />
                {!cartItem[id]
                    ?<img className='add' onClick={()=>addToCart(id)} src={assets.add_icon_white} alt="add" />
                    : <div className='book-item-counter'>
                        <img onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} alt="remove" />
                    </div>
                }
            </div>
            <div className='book-item-info'>
                <div className="book-item-name-rating">
                    <p>{name}</p>
                    <img src={assets.rating_starts} alt="" />
                </div>
                <p className="book-item-desc">{description}</p>
                <p className='book-item-price'>{quantity}</p>
            </div>

        </div>
    )
}

export default BookItem