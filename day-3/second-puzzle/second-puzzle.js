const fs = require('fs'), path = require('path');
const input = fs.readFileSync(path.join(__dirname, './second-puzzle.input'), 'utf-8').split('\r\n');

const processMap = (input) => {
    let increaseRowCount = Math.ceil(input.length / input[0].length) * 7;
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

const navigateMap = (map, x, y) => {
    let currentPosition = { x, y };
    let treeCount = 0;

    while (currentPosition.y <= map.length - 1) {
        let hasTree = map[currentPosition.y][currentPosition.x] === '#';
        if (hasTree) {
            treeCount++;
        }

        currentPosition.x += x;
        currentPosition.y += y;
    }

    return treeCount;
};

const processedMap = processMap(input);

var firstTreeCount = navigateMap(processedMap, 1, 1);
var secondTreeCount = navigateMap(processedMap, 3, 1);
var thirdTreeCount = navigateMap(processedMap, 5, 1);
var forthTreeCount = navigateMap(processedMap, 7, 1);
var fifthTreeCount = navigateMap(processedMap, 1, 2);
console.log(firstTreeCount * secondTreeCount * thirdTreeCount * forthTreeCount * fifthTreeCount);