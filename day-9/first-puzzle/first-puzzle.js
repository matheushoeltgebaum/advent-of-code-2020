const fs = require('fs'), path = require('path');
const input = fs.readFileSync(path.join(__dirname, './first-puzzle.input'), 'utf-8').split('\r\n');

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
            return number;
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

console.log(findWeakness(input));