import React from 'react'
import './Header.css'

const Header = () => {
  return (
    <div className="header relative bg-[url('/header_img.png')] h-[32vw] bg-[size:80vw] my-[15px]  bg-no-repeat">
        <div className="header-content absolute flex flex-col gap-[1.5vw] max-w-[50%] items-start bottom-[15%] left-[10%]">
            <h2 className='text text-[4vw] w-[101%] bg-gradient-to-r from-purple-600 via-red-500 to-indigo-400 inline-block text-transparent bg-clip-text'>Get your's favourite book here..!</h2>
            <p className='text-amber-950 text-[1vw] font-bold'>Books are windows to knowledge, imagination, and discovery. Our collection spans diverse categories, ensuring every reader finds something inspiring, educational, or entertaining. Each visit opens a new world of ideas and stories.</p>
            <button className='text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'><a href='#explore-menu'>View Menu</a></button>
        </div>
    </div>
  )
}

export default Header