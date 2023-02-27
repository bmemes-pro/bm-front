/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import Linkify from 'react-linkify'
import { Card, Button } from 'antd'
import TimeAgo from 'react-timeago'
import FittedImg from 'react-fitted-img'
import ImageViewer from 'react-simple-image-viewer'
import { fetchInfo } from '../data'
import { formatAward } from '../data/utils'
import './styles.css'

const PostBody = ({ className, post, showCommentLink = true, parentPost }) => {
  const likeKey = `like_${post.id}`
  const [openImage, setOpenImage] = useState(false)
  const [liked, setLiked] = useState(localStorage.getItem(likeKey) === 'true')
  const { message, utime, txhash, img_urls: imgUrls } = post
  const { wallet_address: walletAddress, nickname, emoji_avatar: emojiAvatar, id: userId } = post.user
  const imgUrl = (imgUrls || [])[0]
  const emoji = emojiAvatar || '👤'
  const displayName = nickname || walletAddress
  const userLink = `/user/${userId}`
  const postUrl = `${location.origin}/post/${post.id}`
  const awardsAmount = formatAward(post.awards_amount)

  const likeAction = () => {
    localStorage.setItem(likeKey, 'true')
    setLiked(true)
    fetchInfo({
      postId: post.id,
      byLike: true
    })
  }

  return (
    <React.Fragment>
        <div className='post-header'>
          <div>
            <a
              href={userLink}
              className='post-username'
            >
                {emoji}&nbsp;&nbsp;{displayName.slice(0, 24).trim()}
            </a>
            {
              !parentPost &&
              <React.Fragment>
                &nbsp;&nbsp;&gt;&nbsp;&nbsp;
                <a
                  className='post-transaction-link'
                  target='_blank'
                  rel="noreferrer"
                  href={`https://tonscan.org/tx/${txhash}`}
                  >
                        🌍 <TimeAgo date={utime} />
                </a>
              </React.Fragment>
            }
          </div>
          <div>
            {
              awardsAmount &&
              <React.Fragment>💎 <span className='award-amount'>${awardsAmount}</span></React.Fragment>
            }
          </div>
        </div>
        <div className='post-content'>
            <Linkify
              componentDecorator={(href, text, i) => (
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  key={i}
                  className='post-text-link'
                >
                  {decodeURIComponent(text)}
                </a>
              )}
            >
              {message}
              </Linkify>
            { message && imgUrl && <div style={{ height: 6 }} /> }
            {
                imgUrl &&
                <React.Fragment>
                <FittedImg
                  src={`${imgUrl}?preview=true`}
                  alt='...loading image...'
                  fit="cover"
                  position="0 50%"
                  className='fitted-img'
                  onClick={() => setOpenImage(true)}
                  loading='lazy'
                />
                {
                  openImage &&
                  <ImageViewer
                    src={[imgUrl]}
                    currentIndex={0}
                    disableScroll={true}
                    closeOnClickOutside={true}
                    backgroundStyle={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
                    onClose={() => setOpenImage(false)}
                  />
                }
                </React.Fragment>
            }
        </div>
        <div className='post-footer'>
              {
                showCommentLink &&
                <a
                  className='footer-link'
                  href={postUrl}
                >
                  comment
                </a>
              }
              <Button
                size="small"
                className='post-like-button'
                disabled={liked}
                onClick={likeAction}
              >
                  {liked ? `${post.likes_count + 1} 👍` : `${post.likes_count} 👍` }
              </Button>
        </div>
    </React.Fragment>
  )
}

const Post = ({ className, post, showCommentLink = true, showReplies = true }) => {
  const replies = post.replies || []
  const postUrl = `${location.origin}/post/${post.id}`
  const repliesCount = post.replies_count
  const commentButtonText = repliesCount > 2 ? `show all comments (${repliesCount})` : 'add reply'

  return (
    <Card
    className={className + ' post-card'}
    bordered={false}
    size='small'
    >
      <PostBody post={post} showCommentLink={showCommentLink && replies.length === 0} />
      {
        showReplies && replies.length > 0 &&
        <div className='post-replies-section'>
          {replies.map(comment => (
            <div key={comment.id} className='post-comment-container'>
              <PostBody post={comment} parentPost={post} showCommentLink={false} />
            </div>
          ))}
          <a
            className='post-all-comments-link'
            href={postUrl}
          >
            {commentButtonText}
          </a>
        </div>
      }
    </Card>
  )
}

export default Post
