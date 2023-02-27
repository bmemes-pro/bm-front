/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { Button, Alert } from 'antd'
import Status from '../Status'
import Post from '../Post'
import Loader from '../Loader'
import { fetchPosts } from '../data'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import './styles.css'
import PostForm from '../PostForm'
import SettingsForm from '../SettingsForm'
import { useSearchParams } from 'react-router-dom'

const PAGE_COUNT = 20
const STATUS_MODE_OPTIONS = [
  {
    label: 'hot 🔥',
    value: 'hot'
  },
  {
    label: 'new 🏄🏽‍♂️',
    value: 'new'
  }
]

const collapseComments = (posts) => {
  let results = posts.map((post) => {
    return post.parent || post
  })

  results = [...new Map(results.map((post) => [post.id, post])).values()]

  return results
}

const PostsList = ({ className }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const queryOption = searchParams.get('option')
  const [option, setNewOption] = useState(queryOption === 'new' ? queryOption : STATUS_MODE_OPTIONS[0].value)
  const [formOpened, setFormOpened] = useState(false)
  const [settingsOpened, setSettingsOpened] = useState(false)
  const [alertData, setAlertData] = useState(undefined)
  const [count, setCount] = useState(0)
  const [page, setPage] = useState(1)
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const { innerWidth } = window
  const isMobile = innerWidth <= 400
  const collapsedPosts = collapseComments(posts)

  const handleFetchPosts = ({ offset, mode }) => {
    setIsLoading(true)
    fetchPosts({ count: PAGE_COUNT, mode, offset })
      .then(({ posts, count }) => {
        setPosts(prevPosts => offset === 0 ? posts : [...prevPosts, ...posts])
        setCount(count)
      })
      .finally(() => setIsLoading(false))
  }

  const postingSuccess = () => {
    setFormOpened(false)
    setSettingsOpened(false)
    setAlertData({ message: 'confirm your transaction and wait 30s 👍', type: 'success' })
  }

  useEffect(() => {
    handleFetchPosts({ offset: 0, mode: option })
  }, [])

  const _setNewOption = (option) => {
    setNewOption(option)
    setPage(1)
    handleFetchPosts({ offset: 0, mode: option })
    setSearchParams({ option })
  }

  const { loadMoreRef, isInView, observer } = useIntersectionObserver()

  const hasMore = PAGE_COUNT * page < count

  useEffect(() => {
    if (isInView && hasMore) {
      const newPage = page + 1
      setPage(newPage)
      handleFetchPosts({ offset: (newPage - 1) * PAGE_COUNT, mode: option })
      observer.disconnect()
    }
  }, [isInView, hasMore])

  return (
        <div className={className}>
            <Status
              options={STATUS_MODE_OPTIONS}
              option={option}
              setNewOption={_setNewOption}
              page='posts'
            />
          <div className='PostsListFormContainer' style={{ display: isMobile ? 'none' : 'block' }}>
            {
              alertData &&
              <Alert
                message={alertData.message}
                type={alertData.type}
                onClose={() => setAlertData(undefined)}
                showIcon
                closable
                className='posts-list-alert'
              />
            }
            {
              (!settingsOpened && !formOpened && !alertData) &&
              <div className='posts-list-buttons-container'>
                <Button
                  className='posts-list-settings-button'
                  size='large'
                  onClick={() => setSettingsOpened(true)}
                >
                  ⚙️
                </Button>
                <Button
                  className='posts-list-post-button'
                  type='primary'
                  size='large'
                  onClick={() => setFormOpened(true)}
                >
                  post 🚀
                </Button>
              </div>
            }
            { formOpened && <PostForm className='posts-list-post-form' onSuccess={postingSuccess} /> }
            { settingsOpened && <SettingsForm className='posts-list-settings-form' onSuccess={postingSuccess} /> }
          </div>
          {
            collapsedPosts.map(post => <Post key={post.id} className='posts-list-post' post={post} />)
          }
          {isLoading ? <Loader/> : <div ref={loadMoreRef}/>}
        </div>
  )
}

export default PostsList
