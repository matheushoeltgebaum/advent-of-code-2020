const fs = require('fs'), path = require('path');
const input = fs.readFileSync(path.join(__dirname, './first-puzzle.input'), 'utf-8').split('\r\n');

const runProgram = (input) => {
    let accumulator = 0;
    let executedInstructions = [];

    for (let i = 0; i < input.length; i++) {
        let current = input[i].split(' ');
        let instruction = current[0];
        let argument = Number(current[1]);

        switch (instruction) {
            case 'acc':
                accumulator += argument;
                break;
            case 'jmp':
                i += (argument - 1);
                break;
            default:
                break;
        }

        if (executedInstructions.includes(i)) {
            break;
        } else {
            executedInstructions.push(i);
        }
    }

    return accumulator;
};

console.log(runProgram(input));