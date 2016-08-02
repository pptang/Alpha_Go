var attractions = require('../../attractions.json');

export const GENERATE_OPTIONS = 'GENERATE_OPTIONS';

export function generateOptions() {
  var result;
  var randomNum = Math.floor(Math.random() * attractions.length);
  if (randomNum <= 8) {
    result = attractions.slice(randomNum, randomNum + 9);
  } else {
    result = attractions.slice(randomNum - 9, randomNum);
  }

  console.log(result)

  return {
    type: GENERATE_OPTIONS,
    payload: result
  };


}
