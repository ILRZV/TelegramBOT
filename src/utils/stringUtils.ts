export const arrayToString = (arr: Array<string>, div: string): string => {
  return arr
    .reduce((acc, category) => {
      return (acc += category + div);
    }, "")
    .slice(0, -1);
};

export const arrayToLowerCase = (arr: Array<string>): Array<string> => {
  if (arr.length === 0) return [];
  return arr.join(". .").toLowerCase().split(". .");
};

export const stringToArrayOfWords = (str: string): Array<string> => {
  let word = "";
  const wordArray: string[] = [];

  for (var i = 0; i < str.length; i++) {
    if (str[i].match(/[a-z]/i)) {
      word += str[i];
    } else {
      if (word.length > 0) {
        wordArray.push(word);
        word = "";
      }
    }
  }
  if (word.length > 0) {
    wordArray.push(word);
  }
  return wordArray;
};
