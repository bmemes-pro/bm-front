import React, { useState } from 'react'
import { Button, Upload } from 'antd'

const _Upload = ({ className, attachImgUrl, clearImgUrl, messageApi }) => {
  const [filesCount, setFilesCount] = useState(0)

  const onChange = (info) => {
    setFilesCount(info.fileList.length)

    if (info.file.status !== 'uploading') {
      if (info.file.status === 'removed') {
        clearImgUrl()
      }
    }
    if (info.file.status === 'done') {
      attachImgUrl(info.file.response.url)
    } else if (info.file.status === 'error') {
      // some
    }
  }

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif'
    if (!isJpgOrPng) {
      messageApi.open({
        type: 'warning',
        content: <label>pls select only <b> JPG/PNG/GIF</b> files</label>
      })
      return false
    }
    const isLt2M = file.size / 1024 / 1024 < 6
    if (!isLt2M) {
      messageApi.open({
        type: 'warning',
        content: <label>image must smaller than <b>4MB</b></label>
      })
      return false
    }
    return isJpgOrPng && isLt2M
  }

  return (<Upload
    className={className}
    name='image'
    action='/api/images'
    onChange={onChange}
    beforeUpload={beforeUpload}
    >
    {filesCount === 0 && <Button>select 🏞</Button>}
  </Upload>)
}

export default _Upload
