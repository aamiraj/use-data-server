const randomNumberGenerator = (minNum, maxNum, factor) => {
  let number = Math.round(Math.random() * factor);
  if (number < minNum) {
    return minNum;
  } else if (number > maxNum) {
    return maxNum;
  } else {
    return number;
  }
};

module.exports = randomNumberGenerator;
