import React, { useState } from 'react'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import BookDisplay from '../../components/BookDisplay/BookDisplay'
import AppDownload from '../../components/AppDownload/AppDownload'

const Home = () => {

  const [Category, setCategory] = useState("All") 

  return (
    <div>
      <Header/>
      <ExploreMenu Category={Category} setCategory={setCategory}/>
      <BookDisplay Category={Category}/>
      <AppDownload/>
    </div>
  )
}

export default Home