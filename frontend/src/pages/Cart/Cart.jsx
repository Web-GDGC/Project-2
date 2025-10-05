import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import {useNavigate} from 'react-router-dom'

const Cart = () => {

  const { cartItem, setCartItem, removeFromCart, addToCart, getTotalAmount, book_list, url } = useContext(StoreContext)

  const navigate = useNavigate();

  return (
    <div className='cart'>
      <div className='cart-items'>
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Available</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />

        {book_list.map((item, index) => {
          if (cartItem[item._id] > 0) {
            console.log("paras");
            return (
              <div>
                <div className='cart-items-title cart-items-item'>
                  <img src={url+'/images/'+item.image} alt="" />
                  <p>{item.name}</p>
                  <p>{item.quantity}</p>
                  <p onClick={() => { removeFromCart(item._id) }} className='cross'>X</p>
                </div>
                <hr />
              </div>
            )
          }
        })}
      </div>
      <button onClick={()=>{navigate("/placeorder")}} className=" issue-button text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 m-5">REQUEST TO ISSUE</button>
    </div>
  )
}

export default Cart