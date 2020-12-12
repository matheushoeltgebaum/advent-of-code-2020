const fs = require('fs'), path = require('path');
const input = fs.readFileSync(path.join(__dirname, './second-puzzle.input'), 'utf-8').split('\r\n');

const findWeakness = (input) => {
    let preamble = input.slice(0, 25);
    let numbers = input.slice(25);

    for (let i = 0; i < numbers.length; i++) {
        let number = numbers[i];
        let isValid = isValidNumber(preamble, number);

        if (isValid) {
            preamble = preamble.slice(1);
            preamble.push(number);
        } else {
            return findContiguousSet(input, Number(number));
        }
    }
};

const isValidNumber = (preamble, number) => {
    for (let j = 0; j < preamble.length; j++) {
        for (let k = j + 1; k < preamble.length; k++) {
            let first = Number(preamble[j]);
            let second = Number(preamble[k]);

            if (first + second === Number(number)) {
                return true;
            }
        }
    }

    return false;
};

const findContiguousSet = (input, number) => {
    let sum = 0;
    let range = [];

    for (let i = 0; i < input.length; i++) {
        let currentNumber = Number(input[i]);
        let index = i;

        while (sum < number) {
            range.push(currentNumber);
            sum += currentNumber;
            currentNumber = Number(input[index + 1]);
            index++;
        }

        if (sum === number) {
            return Math.min(...range) + Math.max(...range);
        } else {
            sum = 0;
            range = [];
        }
    }
};

console.log(findWeakness(input));