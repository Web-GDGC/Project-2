import React, { useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const Add = ({backendUrl}) => {


    const [image, setImage] = useState(false)
    const [data, setdata] = useState({
        name: '',
        description: '',
        category: '', // Salad is default in the select so adding the default as Salad
        price: '20', //same as above reason
    })

    const onChangeHandler = (event) => {
        setdata({...data, [event.target.name]: event.target.value })
        //...data -> take all the previous data
        // event.target.name -> find this key in the data and update the value with event.target.value
    }

    const onSubmitHandle = async (event) => {
        event.preventDefault() //It will data from disappearing on submit
        // send the data to the backend
        //FormData is a function that store the data in the form
        const formData = new FormData();
        //Take two arguments first key second value
        formData.append('name', data.name)
        formData.append('description', data.description)
        formData.append('quantity', data.quantity)
        formData.append('category', data.category)
        formData.append('image', image)
        //sending a api request to backend server to store the data
        const response = await axios.post(`${backendUrl}/api/book/add`, formData);
        if(response.data.success){
            setdata({
                description: '',
                name: '',
                category: 'Fiction',
                quantity: 10,
            })
            setImage(false);
            toast.success(response.data.message);
        }else{
            toast.error(response.data.message);
        }
    }


  return (
    <div className='add'>
        <form className='flex-col' onSubmit={onSubmitHandle}>
            <div className='add-img-upload flex-col'>
                <p>Upload Image</p>
                <label htmlFor="image">
                    {/* create the url or pass the object store in image as url */}
                    <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
                </label>
                <input onChange={(e)=>{setImage(e.target.files[0])}} type="file" id='image' hidden required />
            </div>
            <div className='add-product-name flex-col'>
                <p>Product Name</p>
                <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here ' />
            </div>
            <div className="add-product-description flex-col">
                <p>Product description</p>
                <textarea onChange={onChangeHandler}
                value={data.description} name="description" rows='6' placeholder='Write Context here'></textarea>
            </div>
            <div className='add-category-price'>
                <div className="add-category flex-col">
                    <p>Product category</p>
                    <select onChange={onChangeHandler} name="category">
                        <option value="Fiction">Fiction</option>
                        <option value="Non-Fiction">Non-Fiction</option>
                        <option value="Academic">Academic</option>
                        <option value="Arts & Humanities">Arts & Humanities</option>
                        <option value="Young Adult">Young Adult</option>
                        <option value="Referece">Referece</option>
                        <option value="History">History</option>
                        <option value="Science">Science</option>
                    </select>
                </div>
                <div className="add-price flex-col">
                    <p>Book Quantity:</p>
                    <input onChange={onChangeHandler} type="Number" name='quantity'  value={data.quantity}  placeholder='10' />
                </div>
            </div>
            <button type="submit" className="add-btn">Add</button>  
        </form>
    </div>
  )
}

export default Add