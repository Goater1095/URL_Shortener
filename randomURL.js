const eUpperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const eLowerCase = eUpperCase.toLowerCase();
const numbers = '0123456789';

const collection = eUpperCase + eLowerCase + numbers;

function randomURL() {
  let passWords = '';
  for (let i = 0; i < 5; i++) {
    const index = Math.floor(Math.random() * collection.length);
    passWords += collection[index];
  }
  return `https://URL_SHORTENER.herokuapp.com/${passWords}`;
}

module.exports = randomURL;
// https://your-project-name.herokuapp.com/6y7UP
