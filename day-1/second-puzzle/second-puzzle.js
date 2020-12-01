const fs = require('fs'), path = require('path');
const input = fs.readFileSync(path.join(__dirname, './second-puzzle.input'), 'utf-8').split('\n');

const getNumbers = (input) => {
    for (let i = 0; i < input.length; i++) {
        let first = parseInt(input[i]);
        for (let j = i + 1; j < input.length; j++) {
            let second = parseInt(input[j]);
            for (let k = j + 1; k < input.length; k++) {
                let third = parseInt(input[k]);
                if (first + second + third === 2020) {
                    return { first, second, third };
                }
            }
        }
    }

    return { first: 0, second: 0, third: 0 }
}

const numbers = getNumbers(input);
console.log(numbers.first * numbers.second * numbers.third);