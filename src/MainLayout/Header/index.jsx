import React, { useState } from 'react'
import './styles.css'

export const DEFAULT_TAGS = ['blockchain', 'memes']

const BMP_SIGNS = [
  '// (= ФェФ=)/',
  '// ⊂(◉‿◉)つ',
  '// (ㆆ _ㆆ)/',
  '// ʕっ•ᴥ•ʔっ',
  '// ( 0 _0)/',
  // '// ( . Y.)/',
  '// (^o^) /',
  '// (⌐■_■)/'
]

const Header = () => {
  const getRandomLogo = () => BMP_SIGNS[Math.floor(Math.random() * BMP_SIGNS.length)]

  const [logo] = useState(getRandomLogo())

  return (
        <div className='header-title'>
            {logo}
            <br/>
            blockchain memes protocol <a href="/info">info</a>
        </div>
  )
}

export default Header
