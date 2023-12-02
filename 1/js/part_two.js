import { open } from 'node:fs/promises';

const singleDigitStringsMap = {
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9',
};

function findFirstDigit(line) {
  for (let i = 0; i < line.length; i++) {
    if (isNaN(parseInt(line[i]))) {
      for (const digit of Object.keys(singleDigitStringsMap)) {
        if (line.startsWith(digit)) {
          return singleDigitStringsMap[digit];
        }
      }

      line = line.slice(1);

      i = -1;
    }

    if (!isNaN(parseInt(line[i]))) {
      return line[i];
    }
  }
}

function findLastDigit(line) {
  let lastDigit = null;

  for (let i = 0; i < line.length; i++) {
    if (isNaN(parseInt(line[i]))) {
      for (const digit of Object.keys(singleDigitStringsMap)) {
        if (line.startsWith(digit)) {
          lastDigit = singleDigitStringsMap[digit];
        }
      }

      line = line.slice(1);

      i = -1;
    }

    if (!isNaN(parseInt(line[i]))) {
      lastDigit = line[i];

      line = line.slice(1);

      i = -1;
    }
  }

  return lastDigit;
}

(async () => {
  const file = await open('../input.txt');

  let totalSum = 0;

  for await (const line of file.readLines()) {
    const firstDigit = findFirstDigit(line);
    const lastDigit = findLastDigit(line);

    totalSum += parseInt(firstDigit + lastDigit);
  }

  console.log(totalSum);
})();
