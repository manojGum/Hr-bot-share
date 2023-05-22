const stringSimilarity = require('string-similarity');
// Function to check if the user input matches the given text with a similarity threshold
const isMatch = (userInput, text, threshold) => {
    const similarity = stringSimilarity.compareTwoStrings(userInput, text);
    return similarity >= threshold;
  };

  module.exports = isMatch