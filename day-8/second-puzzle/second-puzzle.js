const fs = require('fs'), path = require('path');
const input = fs.readFileSync(path.join(__dirname, './second-puzzle.input'), 'utf-8').split('\r\n');

const fixProgram = (input) => {
    let linesToChange = input.reduce((acc, line, index) => {
        let instruction = line.split(' ')[0];
        if (instruction === 'nop' || instruction === 'jmp') {
            acc.push({ instruction, index });
        }
        return acc;
    }, []);

    let accumulator = 0;
    for (let i = 0; i < linesToChange.length; i++) {
        let line = linesToChange[i];
        let programStatus;

        if (line.instruction === 'nop') {
            input[line.index] = input[line.index].replace('nop', 'jmp');
            programStatus = runProgram(input);
        } else {
            input[line.index] = input[line.index].replace('jmp', 'nop');
            programStatus = runProgram(input);
        }

        if (!programStatus.terminated) {
            if (line.instruction === 'nop') {
                input[line.index] = input[line.index].replace('jmp', 'nop');
            } else {
                input[line.index] = input[line.index].replace('nop', 'jmp');
            }
        } else {
            accumulator = programStatus.accumulator;
            break;
        }
    }

    return accumulator;
};

const runProgram = (input) => {
    let accumulator = 0;
    let executedInstructions = [];
    let terminated = true;

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
            terminated = false;
            break;
        } else {
            executedInstructions.push(i);
        }
    }

    return { accumulator, terminated };
}

console.log(fixProgram(input));