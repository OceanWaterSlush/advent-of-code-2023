import { open } from 'node:fs/promises';

const availableRedCubes = 12;
const availableGreenCubes = 13;
const availableBlueCubes = 14;

const possibleGameIdsMap = {};

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

function isGamePossible(gameSets) {
  for (const gs of gameSets) {
    const colorCounts = gs.split(', ');

    for (const cc of colorCounts) {
      const indexOfSpace = cc.indexOf(' ');
      const count = parseInt(cc.slice(0, indexOfSpace));

      if (cc.includes('red') && count > availableRedCubes) {
        return false;
      }

      if (cc.includes('green') && count > availableGreenCubes) {
        return false;
      }

      if (cc.includes('blue') && count > availableBlueCubes) {
        return false;
      }
    }
  }

  return true;
}

function getSumOfPossibleGameIds(possibleGameIdsmap) {
  let total = 0;

  for (const g of Object.keys(possibleGameIdsMap)) {
    if (possibleGameIdsMap[g] === true) {
      total += parseInt(g);
    }
  }

  return total;
}

(async () => {
  const file = await open('../input.txt');

  for await (const line of file.readLines()) {
    const gameId = getGameId(line);
    const gameSets = getGameSets(line);

    possibleGameIdsMap[gameId] = isGamePossible(gameSets);
  }

  console.log(getSumOfPossibleGameIds(possibleGameIdsMap));
})();
