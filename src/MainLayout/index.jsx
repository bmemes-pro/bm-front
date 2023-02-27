/* eslint-disable react/prop-types */
import React from 'react'
import Header from './Header'
import './styles.css'

const MainLayout = ({ children, backButton = true }) => {
  return (
    <div className='main-layout'>
        <div className='layout-container'>
          <div className='header-container'>
            <Header/>
            { backButton && <div className='back-button-container'><a href='/'>{'< main page 🌍'}</a></div> }
          </div>
          {children}
        </div>
    </div>
  )
}

export default MainLayout
