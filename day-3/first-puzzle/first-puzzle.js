const fs = require('fs'), path = require('path');
const input = fs.readFileSync(path.join(__dirname, './first-puzzle.input'), 'utf-8').split('\r\n');

const processMap = (input) => {
    let increaseRowCount = Math.ceil(input.length / input[0].length) * 3;
    for (let i = 0; i < input.length; i++) {
        let currentRow = input[i];
        let processedRow = '';

        for (let j = 0; j < increaseRowCount; j++) {
            processedRow += currentRow;
        }

        input[i] = processedRow;
    }

    return input;
}

const navigateMap = (map) => {
    let currentPosition = { x: 3, y: 1 };
    let treeCount = 0;

    while (currentPosition.y <= map.length - 1) {
        let hasTree = map[currentPosition.y][currentPosition.x] === '#';
        if (hasTree) {
            treeCount++;
        }

        currentPosition.x += 3;
        currentPosition.y += 1;
    }

    return treeCount;
};

const processedMap = processMap(input);
console.log(navigateMap(processedMap));