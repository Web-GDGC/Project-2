import React, { useContext, useEffect, useState} from 'react'
import { StoreContext } from '../../context/StoreContext'
import './PlaceOrder.css'
import axios from 'axios'
import { toast } from 'react-toastify'

import {useNavigate} from 'react-router-dom'

const PlaceOrder = () => {

  const { getTotalAmount, token, book_list, url, cartItem} = useContext(StoreContext)

  const navigate = useNavigate();

  // if the cart is empty do not proced to the payment page
  useEffect(() => {
    if(!token){
      navigate('/cart')
    }else if(getTotalAmount() === "0.00"){
      navigate('/cart')
    }
  }, [])

  const [data, setData] = useState({
    firstName: "",
    lastName:"",
    email:"",
    department: "",
    degree: "",
    branch: "",
    rollno: "",
    issued_for: "",
    phone: ""
  })

  const onChangeHandler = (event) => {
    setData({...data, [event.target.name]: event.target.value })
  }

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    book_list.map((item) =>{
      if(cartItem[item._id] > 0){
        let itemInfo = item;
        itemInfo["quantity"] = cartItem[item._id];
        orderItems.push(itemInfo);
      }
    })
    let orderData = {
      address: data,
      items: orderItems,
      amount: parseFloat(getTotalAmount())+2.23,
    }
    console.log(orderData)
    let response = await axios.post(`${url}/api/order/place`, orderData, {headers: {token}})
    if(response.data.success){
      toast.success(response.data.message)
      setTimeout(() => {
        navigate('/myorders'); // Navigate to '/target-path' after the delay
      }, 3000);
    }else{
      toast.error(response.data.message)
    }
  }
  

  return (
    <>
      <form onSubmit={placeOrder} className='place-order'>
        <div className="place-order-left">
            <p className='title'>Delivery Information</p>
            <div className='multi-fields'>
              <input required onChange={onChangeHandler} name='firstName' value={data.firstName} type="text" placeholder='First Name' />
              <input required onChange={onChangeHandler} name='lastName' value={data.lastName} type="text" placeholder='Second Name' />
            </div>
            <input required onChange={onChangeHandler} name='email' value={data.email} type="email" placeholder='Email Address' />
            <input required onChange={onChangeHandler} name='department' value={data.department} type="text" placeholder='Department' />
            <div className='multi-fields'>
              <input required onChange={onChangeHandler} name='degree' value={data.degree} type="text" placeholder='Degree' />
              <input required onChange={onChangeHandler} name='branch' value={data.branch} type="text" placeholder='Branch' />
            </div>
            <div className='multi-fields'>
              <input required onChange={onChangeHandler} name='rollno' value={data.rollno} type="text" placeholder='Roll No' />
              {/* <input required onChange={onChangeHandler} name='country' value={data.country} type="text" placeholder='Country' /> */}
              <label required onChange={onChangeHandler} for="issue_month">Choose a Monts:</label>
              <select id="issue_month" name="Issue_month">
                <option value="1mon">1 Month</option>
                <option value="2mon">2 Month</option>
              </select>
            </div>
            <input required onChange={onChangeHandler} name='phone' value={data.phone} type="number" placeholder='Phone' />
        </div>
        <button type='submit' className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">PROCEED TO ISSUE REQUEST</button> 
      </form>
    </>
  )
}

export default PlaceOrder