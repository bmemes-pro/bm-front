/* eslint-disable react/prop-types */
import React from 'react'
import { Card, Radio } from 'antd'
import './styles.css'

const pageOptions = [
  {
    label: 'posts 🏞',
    value: 'posts'
  },
  {
    label: 'users 👤',
    value: 'users'
  }
]

const Status = ({ options, option, setNewOption, page }) => {
  const { innerWidth } = window
  const isMobile = innerWidth <= 400
  const size = isMobile ? 'small' : 'middle'

  const pageChangeAction = (newValue) => {
    if (newValue === pageOptions[1].value) {
      window.location = '/users'
    } else if (newValue === pageOptions[0].value) {
      window.location = '/'
    }
  }

  return (
        <Card
            bordered={false}
            size='small'
            className='status-card'
            bodyStyle={ isMobile ? { paddingLeft: 8, paddingRight: 8 } : {} }
        >
          <div className='status-container'>
            <Radio.Group
                  options={pageOptions}
                  value={page}
                  optionType="button"
                  size={size}
                  onChange={({ target: { value } }) => pageChangeAction(value)}
            />
            <Radio.Group
                  options={options}
                  value={option}
                  optionType="button"
                  size={size}
                  onChange={({ target: { value } }) => { setNewOption(value) }}
              />
          </div>
        </Card>
  )
}

export default Status
