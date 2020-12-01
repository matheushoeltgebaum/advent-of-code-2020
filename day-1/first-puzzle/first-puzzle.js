const fs = require('fs'), path = require('path');
const input = fs.readFileSync(path.join(__dirname, './first-puzzle.input'), 'utf-8').split('\n');

const getNumbers = (input) => {
    for (let i = 0; i < input.length; i++) {
        let first = parseInt(input[i]);
        for (let j = i + 1; j < input.length; j++) {
            let second = parseInt(input[j]);
            
            if (first + second === 2020) {
                return { first, second };
            }
        }
    }

    return { first: 0, second: 0 }
}

const numbers = getNumbers(input);
console.log(numbers.first * numbers.second);