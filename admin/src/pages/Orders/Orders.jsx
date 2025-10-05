import React from 'react'
import './Orders.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { assets } from '../../assets/assets'

const Orders = ({ backendUrl }) => {

  const [orders, setOrders] = useState([]);

  // fetch orders from backend API
  const getOrders = async () => {
    const response = await axios.post(`${backendUrl}/api/order/list`)
    if (response.data.success) {
      setOrders(response.data.data)
      // setStatus(response.data.data.status)
    } else {
      toast.error(response.data.message)
    }
  }

  useEffect(() => {
    getOrders()
  }, [])

  const updateStatus = async (event, id) => {
    const response = await axios.post(`${backendUrl}/api/order/updatestatus`, {id: id, status: event.target.value})
    if(response.data.success) {
      toast.success(response.data.message)
      getOrders()
    }else{
      toast.warning(response.data.message)
    }
  }

  return (
    <div className='order add'>
      <h2>Order Page</h2>
      <div className="order-list">
        {orders.map((order, index) => {
          return (
            <div key={index} className='order-item'>
            <img src={assets.parcel_icon} alt="parcel" />
            <div>
              <p className='order-item-book'>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " X " + item.quantity
                  } else {
                    return item.name + " X " + item.quantity
                  }
                })}
              </p>
              <p className='order-item-name'>{order.address.firstName}<span>&nbsp;</span>{order.address.lastName}</p>
              <div className='order-item-address'>
                <p>{order.address.department+", "}</p>
                <p>{order.address.degree + ", "+ order.address.branch+", "+order.address.rollno+", "+ order.address.issued_for}</p>
              </div>
              <p className="order-item-phone">Phone: {" "+order.address.phone}</p>
            </div>
            <p>Items:{" "+order.items.length}</p>
            <p className="order-item-phone">Request For: {" "+order.address.issued_for}</p>
            <select onChange={(event)=>{updateStatus(event, order._id)}} className='order-item-select'>
              <option selected={order.status==="Waiting Approval"?"selected":''} value="Waiting Approval">Waiting Approval</option>
              <option selected={order.status==="Verifying"?"selected":''} value="Verifying">Verifying</option>
              <option selected={order.status==="Accepted"?"selected":''} value="Accepted">Accepted</option>
              <option selected={order.status==="Returned"?"selected":''} value="Returned">Returned</option>
            </select>
          </div>
          )
        })}
      </div>
    </div>
  )
}

export default Orders