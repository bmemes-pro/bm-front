/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import MainLayout from '../MainLayout'
import './styles.css'
import { fetchUser } from '../data'
import { useParams } from 'react-router-dom'
import User from '../User'
import Post from '../Post'
import { Alert } from 'antd'

const UserPage = () => {
  const [user, setUser] = useState(undefined)
  const params = useParams()

  useEffect(() => {
    fetchUser({ id: params.id }).then(({ user }) => {
      setUser(user)
    }).catch(e => console.log('users error', e))
  }, [])

  return (
        <MainLayout>
          {user === undefined && <div>...loading...</div>}
          {
            user &&
            <React.Fragment>
              <User user={user} className='' />
              <div className='user-page-posts'>
                <Alert
                  message={<span>only featured posts available here, see <a href='/?option=new'>new</a> for more</span>}
                  type='info'
                  style={{ border: 'none' }}
                  showIcon
                />
                {user.posts.map((post) => <Post key={post.id} post={post} className='user-page-post' />)}
              </div>
            </React.Fragment>
          }
        </MainLayout>
  )
}

export default UserPage
