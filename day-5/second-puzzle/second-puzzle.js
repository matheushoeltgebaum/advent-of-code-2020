const fs = require('fs'), path = require('path');
const input = fs.readFileSync(path.join(__dirname, './second-puzzle.input'), 'utf-8').split('\r\n');

const processBoardingPasses = (input) => {
    const rows = Array.from({ length: 128 }, (x, i) => i);
    const columns = Array.from({ length: 8 }, (x, i) => i);
    let seatIds = [];

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
        seatIds.push(currentSeatId);
    }

    return seatIds.sort((a, b) => a - b);
};

const findSeatId = (seatIds) => {
    for (let i = 0; i < seatIds.length; i += 2) {
        let currentSeatId = seatIds[i];
        let nextSeatId = seatIds[i + 1];

        if (nextSeatId - currentSeatId === 2) {
            return nextSeatId - 1;
        }
    }
};

const seatIds = processBoardingPasses(input);
console.log(findSeatId(seatIds));