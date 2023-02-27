/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import { Input, Card, message as antdMessage, Button } from 'antd'
import { stringToBoc, buildPostMessage } from '../bmp/utils'
import { fetchInfo } from '../data'
import Upload from './Upload'
import './styles.css'

let TARGET_ADDRESS
let BMP_SIGNS
const MAX_CHARS = 512
const PAYMENT_VALUE = '50000000' // nanotons = 0.05 TONs
const REPLY_PAYMENT_VALUE = '100000000' // nanotons = 0.1 TONs
const WALLET_METHOD = 'ton_sendTransaction'

const { TextArea } = Input

const PostForm = ({ className, replyToHash, onSuccess }) => {
  const [message, setMessage] = useState('')
  const [imgURL, setImgURL] = useState(undefined)
  const [messageApi, contextHolder] = antdMessage.useMessage()
  const haveTonWallet = window.ton && window.ton.isTonWallet === true

  const showInfo = (message, type = 'info') => {
    messageApi.open({
      type,
      content: message
    })
  }

  const handleResult = (success) => {
    if (success) {
      onSuccess()
    } else {
      showInfo(<label>probably you’ve canceled the transaction 😿</label>, 'warning')
    }
  }

  const postAction = async () => {
    const _message = message.trim()

    if (_message.length === 0 && imgURL === undefined) {
      showInfo(<label>pls write <b>message</b> or select <b>image</b></label>)
      return
    }

    if (TARGET_ADDRESS === undefined || BMP_SIGNS === undefined) {
      showInfo(<label>something wrong with code, sorry 😿</label>, 'warning')
      return
    }

    const bmpString = buildPostMessage({
      message: _message,
      img_urls: [imgURL],
      signs: BMP_SIGNS,
      reply_to: replyToHash
    })
    const dataToProvider = await stringToBoc(bmpString)

    console.log('BMP message:')
    console.log(bmpString)

    const value = replyToHash === undefined ? PAYMENT_VALUE : REPLY_PAYMENT_VALUE

    const provider = window.ton
    provider.send(
      WALLET_METHOD,
      [{
        to: TARGET_ADDRESS,
        value,
        data: dataToProvider,
        dataType: 'boc'
      }]
    ).then((param) => {
      console.log('provider.send.then')
      console.log(param)
      handleResult(true)
    }).catch((e) => {
      console.log('provider.send.catch')
      console.log(e)
    })

    handleResult(true)
  }

  useEffect(() => {
    fetchInfo().then(({ targetAddress, bmpSigns }) => {
      TARGET_ADDRESS = targetAddress
      BMP_SIGNS = bmpSigns
    })
  }, [])

  return (
    <Card
      bordered={false}
      className={className}
      size='small'
    >
      <div className='message-container'>
        <TextArea
          autoSize={{ minRows: 3, maxRows: 8 }}
          maxLength={MAX_CHARS}
          placeholder={`characters: ${MAX_CHARS}`}
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
      </div>
      <div className='upload-container'>
        <Upload
          className='upload-component'
          attachImgUrl={setImgURL}
          clearImgUrl={() => setImgURL(undefined)}
          messageApi={messageApi}
          />
      </div>
      <div>
        <Button
          disabled={!haveTonWallet}
          type="primary"
          size='large'
          onClick={postAction}
          className='post-button'
        >
          post 🚀
        </Button>
        {contextHolder}
      </div>
      <div className='ton-info'>
        only for <a href='https://ton.org/en/wallets' target='_blank' rel="noreferrer">TON Wallet ↗️</a> users
        <br/>
        we’re working on it
      </div>
    </Card>
  )
}

export default PostForm
