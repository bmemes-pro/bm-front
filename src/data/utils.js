
const TON_RATE = 2.3

export const formatAward = (awardsAmount) => {
  let result = parseFloat(awardsAmount) * TON_RATE
  result = result.toFixed(1)

  if (result.split('.')[1] === '0') result = result.split('.')[0]
  if (result === '0') result = undefined

  return result
}
