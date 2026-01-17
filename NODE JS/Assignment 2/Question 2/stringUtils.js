function capitalize(str) {
  return str.toUpperCase();
}

function reverseString(str) {
  return str.split("").reverse().join("");
}

function countVowels(str) {
  const vowels = str.match(/[aeiou]/gi);
  return vowels ? vowels.length : 0;
}

module.exports = {
  capitalize,
  reverseString,
  countVowels
};
