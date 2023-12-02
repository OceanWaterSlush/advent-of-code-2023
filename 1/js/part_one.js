import { open } from 'node:fs/promises';

function findFirstAndLastDigits(line) {
  let firstDigit = null;
  let lastDigit = null;

  for (let i = 0; i < line.length; i++) {
    if (!isNaN(parseInt(line[i]))) {
      firstDigit = line[i];

      i = line.length;
    }
  }

  for (let i = line.length - 1; i > -1; i--) {
    if (!isNaN(parseInt(line[i]))) {
      lastDigit = line[i];

      i = -1;
    }
  }

  return parseInt(firstDigit + lastDigit);
}

(async () => {
  const file = await open('../input.txt');

  let totalSum = 0;

  for await (const line of file.readLines()) {
    totalSum += findFirstAndLastDigits(line);
  }

  console.log(totalSum);
})();
