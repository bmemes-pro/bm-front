/* eslint-disable camelcase */
import TonWeb from 'tonweb'

// const SYMBOLS_IN_CELL = 127
// const SYMBOLS_IN_SHORT_CELL = 123
const SYMBOLS_IN_CELL = 63
const SYMBOLS_IN_SHORT_CELL = 61
const DEFAULT_TAGS = ['blockchain', 'memes']

const stringToCellsChain = (original) => {
  const Cell = TonWeb.boc.Cell

  let tail = original
  let i = 0
  let mainCell = null
  let previousCell = null

  while (tail.length > 0) {
    const isShortCell = i === 0
    const symbolsCountToCut = isShortCell ? SYMBOLS_IN_SHORT_CELL : SYMBOLS_IN_CELL

    const towiritePiece = tail.substring(0, symbolsCountToCut)
    tail = tail.substring(symbolsCountToCut)

    const itemCell = new Cell()

    if (isShortCell) {
      itemCell.bits.writeUint(0, 32)
    }

    itemCell.bits.writeString(towiritePiece)

    if (mainCell === null) {
      mainCell = itemCell
    } else if (previousCell) {
      previousCell.refs.push(itemCell)
    }
    previousCell = itemCell

    i++
  }

  return mainCell || new Cell()
}

export const stringToBoc = async (original) => {
  const rootCell = stringToCellsChain(original)
  const boc = await rootCell.toBoc()
  return TonWeb.utils.bytesToBase64(boc)
}

export const getRandomElement = (array) => {
  return array[Math.floor((Math.random() * array.length))]
}

export const trimedStringOrNull = (m) => {
  if (m === undefined || m === null) {
    return null
  }

  const r = m.trim()

  return r.length > 0 ? r : null
}

export const buildPostMessage = ({
  message,
  img_urls,
  reply_to,
  tags,
  signs,
  pretty = false
}) => {
  const _img_urls = (img_urls ?? []).map(url => trimedStringOrNull(url)).filter(url => url !== null)
  const _tags = (tags ?? DEFAULT_TAGS).map(tag => trimedStringOrNull(tag)).filter(tag => tag !== null)

  const result = {
    bmp: 'v23.1',
    action: 'post',
    tags: _tags,
    img_urls: _img_urls,
    reply_to: trimedStringOrNull(reply_to),
    message: trimedStringOrNull(message)
  }

  if (result.message === null && result.img_urls.length === 0) {
    throw new Error('BMP.buildPostMessage: incorrect input')
  }

  const space = pretty ? 2 : undefined

  const jsonString = JSON.stringify(result, undefined, space)
  const bmpSign = getRandomElement(signs)
  return `${bmpSign}\n${jsonString}`
}

export const buildProfileMessage = ({
  nickname,
  emoji_avatar,
  signs,
  pretty = false
}) => {
  const result = {
    bmp: 'v23.1',
    action: 'update_profile',
    nickname: trimedStringOrNull(nickname),
    emoji_avatar: trimedStringOrNull(emoji_avatar)
  }

  const space = pretty ? 2 : undefined

  const jsonString = JSON.stringify(result, undefined, space)
  const bmpSign = getRandomElement(signs)
  return `${bmpSign}\n${jsonString}`
}
