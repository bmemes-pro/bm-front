/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import MainLayout from '../MainLayout'
import './styles.css'
import { fetchUsers } from '../data'
import User from '../User'
import Status from '../Status'

const PAGE_COUNT = 100
const STATUS_MODE_OPTIOS = [
  {
    label: 'rich 💎',
    value: 'rich'
  },
  {
    label: 'old 🥸',
    value: 'old'
  }
]

const UsersPage = () => {
  const [users, setUsers] = useState([])
  const [option, setNewOption] = useState(STATUS_MODE_OPTIOS[0].value)

  useEffect(() => {
    fetchUsers({ count: PAGE_COUNT, mode: option }).then(({ users }) => {
      setUsers(users)
    }).catch(e => console.log('users error', e))
  }, [option])

  return (
        <MainLayout backButton={false}>
            <Status
              options={STATUS_MODE_OPTIOS}
              option={option}
              setNewOption={setNewOption}
              page='users'
            />
            {users.map(user => <User key={user.id} user={user} className='users-page-user' />)}
        </MainLayout>
  )
}

export default UsersPage
