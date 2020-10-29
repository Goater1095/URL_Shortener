const eUpperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const eLowerCase = eUpperCase.toLowerCase()
const numbers = '0123456789'

const collection = eUpperCase + eLowerCase + numbers

function randomURL() {
  let passWords = ''
  for (let i = 0; i < 5; i++) {
    const index = Math.floor(Math.random() * collection.length)
    passWords += collection[index]
  }
  return passWords
}

module.exports = randomURL
