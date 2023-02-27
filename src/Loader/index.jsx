import React from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import './styles.css'

const Loader = () => {
  return (<div className="loader-container">
    <Spin indicator={<LoadingOutlined style={{ fontSize: 32 }} spin />} />
    </div>)
}

export default Loader
