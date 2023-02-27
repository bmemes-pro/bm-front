import React from 'react'
import MainPage from './MainPage'
import InfoPage from './InfoPage'
import PostPage from './PostPage'
import UsersPage from './UsersPage'
import UserPage from './UserPage'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import './App.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />
  },
  {
    path: '/info',
    element: <InfoPage />
  },
  {
    path: '/post/:id',
    element: <PostPage />
  },
  {
    path: '/users',
    element: <UsersPage />
  },
  {
    path: '/user/:id',
    element: <UserPage />
  }
])

function App () {
  return (
    <RouterProvider router={router} />
  )
}

export default App
