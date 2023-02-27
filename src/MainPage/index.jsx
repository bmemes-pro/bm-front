import React from 'react'
import MainLayout from '../MainLayout'
import PostsList from '../PostsList'
import './styles.css'

const MainPage = () => {
  return (
        <MainLayout backButton={false}>
            <PostsList className='main-page-posts-list'/>
        </MainLayout>
  )
}

export default MainPage
