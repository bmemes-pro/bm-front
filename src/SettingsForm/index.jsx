/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import { Input, Card, message as antdMessage, Button } from 'antd'
import { stringToBoc, buildProfileMessage } from '../bmp/utils'
import { fetchInfo } from '../data'
import './styles.css'

let TARGET_ADDRESS
let BMP_SIGNS
const MAX_NICKNAME_CHARS = 50
const PAYMENT_VALUE = '200000000' // nanotons = 0.2 TONs
const WALLET_METHOD = 'ton_sendTransaction'

const SettingsForm = ({ className, onSuccess }) => {
  const [nickname, setNickname] = useState('')
  const [emoji, setEmoji] = useState('')
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
    const _nickname = nickname.trim()
    const emojiAvatar = emoji.trim()

    if (_nickname.length === 0 && emojiAvatar.length === 0) {
      showInfo(<label>pls write <b>nickname</b> or <b>emoji</b></label>)
      return
    }

    if (TARGET_ADDRESS === undefined || BMP_SIGNS === undefined) {
      showInfo(<label>something wrong with code, sorry 😿</label>, 'warning')
      return
    }

    const bmpString = buildProfileMessage({
      nickname: _nickname,
      emoji_avatar: emojiAvatar,
      signs: BMP_SIGNS
    })
    const dataToProvider = await stringToBoc(bmpString)

    console.log('BMP message:')
    console.log(bmpString)

    const provider = window.ton
    provider.send(
      WALLET_METHOD,
      [{
        to: TARGET_ADDRESS,
        value: PAYMENT_VALUE,
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
      <div className='settings-form-nickname-container'>
        <Input
          maxLength={MAX_NICKNAME_CHARS}
          placeholder='nickname (without spaces)'
          value={nickname}
          onChange={e => setNickname(e.target.value.replace(/\s/g, '_'))}
        />
      </div>
      <div className='settings-form-emoji-container'>
        <Input
          maxLength={20}
          placeholder='emoji avatar (onle one)'
          value={emoji}
          onChange={e => setEmoji(e.target.value)}
        />
      </div>
      <div>
        <Button
          disabled={!haveTonWallet}
          type="primary"
          size='large'
          onClick={postAction}
          className='settings-form-save-button'
        >
          save 💾
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

export default SettingsForm
