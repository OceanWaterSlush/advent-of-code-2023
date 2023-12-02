import { open } from 'node:fs/promises';

const gameIdsToPowerMap = {};

function getGameId(line) {
  const indexOfSpace = line.indexOf(' ');
  const indexOfColon = line.indexOf(':');

  return line.slice(indexOfSpace + 1, indexOfColon);
}

function getGameSets(line) {
  const indexOfColon = line.indexOf(':');

  return line
    .slice(indexOfColon + 1)
    .split(';')
    .map((s) => s.slice(1));
}

function getPower(gameSets) {
  let redMinimumCount = 0;
  let greenMinimumCount = 0;
  let blueMinimumCount = 0;

  for (const gs of gameSets) {
    const colorCounts = gs.split(', ');

    for (const cc of colorCounts) {
      const indexOfSpace = cc.indexOf(' ');
      const count = parseInt(cc.slice(0, indexOfSpace));

      if (cc.includes('red') && count > redMinimumCount) {
        redMinimumCount = count;
      }

      if (cc.includes('green') && count > greenMinimumCount) {
        greenMinimumCount = count;
      }

      if (cc.includes('blue') && count > blueMinimumCount) {
        blueMinimumCount = count;
      }
    }
  }

  return redMinimumCount * greenMinimumCount * blueMinimumCount;
}

function getSumOfPowers(gameIdsToPowerMap) {
  let total = 0;

  for (const g of Object.keys(gameIdsToPowerMap)) {
    total += parseInt(gameIdsToPowerMap[g]);
  }

  return total;
}

(async () => {
  const file = await open('../input.txt');

  for await (const line of file.readLines()) {
    const gameId = getGameId(line);
    const gameSets = getGameSets(line);

    gameIdsToPowerMap[gameId] = getPower(gameSets);
  }

  console.log(getSumOfPowers(gameIdsToPowerMap));
})();
