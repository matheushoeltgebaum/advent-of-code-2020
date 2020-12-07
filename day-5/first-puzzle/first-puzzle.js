const fs = require('fs'), path = require('path');
const input = fs.readFileSync(path.join(__dirname, './first-puzzle.input'), 'utf-8').split('\r\n');

const processBoardingPasses = (input) => {
    const rows = Array.from({ length: 128 }, (x, i) => i);
    const columns = Array.from({ length: 8 }, (x, i) => i);
    let highestSeatId = 0;

    for (let i = 0; i < input.length; i++) {
        let currentBoardPass = input[i];
        let currentRowRange = rows;
        let currentColumnRange = columns;
        let currentSeatId = 0;

        for (let j = 0; j < currentBoardPass.length; j++) {
            let currentHalf = currentBoardPass[j];
            if (j < 7) {
                //Processing rows
                if (currentHalf === 'F') {
                    currentRowRange = currentRowRange.slice(0, currentRowRange.length / 2);
                } else {
                    currentRowRange = currentRowRange.slice(currentRowRange.length / 2);
                }
            } else {
                //Processing columns
                if (currentHalf === 'L') {
                    currentColumnRange = currentColumnRange.slice(0, currentColumnRange.length / 2);
                } else {
                    currentColumnRange = currentColumnRange.slice(currentColumnRange.length / 2);
                }
            }
        }

        currentSeatId = currentRowRange[0] * 8 + currentColumnRange[0];
        if (currentSeatId > highestSeatId) {
            highestSeatId = currentSeatId;
        }
    }

    return highestSeatId;
};

console.log(processBoardingPasses(input));