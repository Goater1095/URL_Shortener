const eUpperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const eLowerCase = eUpperCase.toLowerCase()
const numbers = '0123456789'

const collection = eUpperCase + eLowerCase + numbers

function randomURL() {
  let randomWords = ''
  for (let i = 0; i < 5; i++) {
    const index = Math.floor(Math.random() * collection.length)
    randomWords += collection[index]
  }
  return `${randomWords}`
}

module.exports = randomURL
