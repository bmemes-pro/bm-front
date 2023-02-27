import React, { useState, useEffect } from 'react'
import MainLayout from '../MainLayout'
import Post from '../Post'
import { useParams } from 'react-router-dom'
import { fetchPost } from '../data'
import RepliesSection from './RepliesSection'
import './styles.css'

const PostPage = () => {
  const [post, setPost] = useState(undefined)
  const params = useParams()

  useEffect(() => {
    fetchPost({ postId: params.id }).then(setPost)
  }, [])

  return (
        <MainLayout>
            {post === undefined && <div>...loading...</div>}
            {
              post &&
              <React.Fragment>
                <Post post={post} showCommentLink={false} showReplies={false} />
                <RepliesSection post={post} className='replies-section' />
              </React.Fragment>
            }
        </MainLayout>
  )
}

export default PostPage
