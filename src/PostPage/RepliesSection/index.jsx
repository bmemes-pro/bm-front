/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import Post from '../../Post'
import { Button, Alert } from 'antd'
import PostForm from '../../PostForm'
import './styles.css'

const RepliesSection = ({ post, className }) => {
  const [formOpened, setFormOpened] = useState(false)
  const [alertData, setAlertData] = useState(undefined)
  const replies = post.replies || []

  const postingSuccess = () => {
    setFormOpened(false)
    setAlertData({ message: 'confirm your transaction and wait 30s 👍', type: 'success' })
  }

  return (
    <div className={className}>
      { replies.map(r => <Post key={r.id} post={r} showCommentLink={false} className='post-comment' />) }
      <div className='RepliesSectionFormContainer'>
      {
        alertData &&
        <Alert
          message={alertData.message}
          type={alertData.type}
          onClose={() => setAlertData(undefined)}
          showIcon
          closable
        />
      }
      {
        (!formOpened && !alertData) &&
        <Button
          style={{ width: '100%' }}
          type='primary'
          size='large'
          onClick={() => setFormOpened(true)}
        >
          comment 🚀
        </Button>
      }
      { formOpened && post.txhash && <PostForm replyToHash={post.txhash} onSuccess={postingSuccess}/> }
      </div>
    </div>
  )
}

export default RepliesSection
