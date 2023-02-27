/* eslint-disable react/prop-types */
import React from 'react'
import { Card } from 'antd'
import { formatAward } from '../data/utils'
import './styles.css'

const User = ({ user, className }) => {
  const {
    id,
    nickname,
    wallet_address: walletAddress,
    emoji_avatar: emojiAvatar,
    created_at: createdAt,
    posts_count: postsCount
  } = user

  const displayName = nickname || walletAddress
  const emoji = emojiAvatar || '👤'
  const userLink = `/user/${id}`
  const created = createdAt.slice(0, 10)
  const awardsAmount = formatAward(user.awards_amount)
  const tonscanLink = `https://tonscan.org/address/${walletAddress}`

  return (
        <Card
            className={className + ' user-card'}
            bodyStyle={{ paddingTop: 8 }}
            size='small'
            bordered={false}
        >
            <div className='user-header'>
                <span className='user-emoji-avatar'>
                    {emoji}
                </span>
                <a className='user-displayname-link' href={userLink} rel="noreferrer">
                    {displayName}
                </a>
            </div>
            <div className='user-content'>
                <div className='user-awards'>
                    💎 <span className='user-awards-amount'>${awardsAmount || 0}</span>
                </div>
                <div className='user-posts-count'>
                    posts: {postsCount}
                </div>
                <div className='user-created-label'>
                    reg: {created}
                </div>
                <a className='user-tonscan-link' href={tonscanLink} target='_blank' rel="noreferrer">
                    tonscan ↗️
                </a>
            </div>
        </Card>
  )
}

export default User
