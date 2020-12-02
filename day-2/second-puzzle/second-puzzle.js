const fs = require('fs'), path = require('path');
const input = fs.readFileSync(path.join(__dirname, './second-puzzle.input'), 'utf-8').split('\n');

const processPasswords = (input) => {
    let validPasswords = 0;

    for (let i = 0; i < input.length; i++) {
        let currentLine = input[i].split(': ');
        let passwordRules = generatePasswordRule(currentLine[0]);
        let password = currentLine[1];

        let currentPasswordLetterOccurences = 0;
        for (let j = 0; j < password.length; j++) {
            let currentLetter = password[j];
            if (currentLetter === passwordRules.letterCheck &&
                (j + 1 === passwordRules.firstPosition || j + 1 === passwordRules.secondPosition)) {
                    currentPasswordLetterOccurences++;
            }
        }

        if (currentPasswordLetterOccurences === 1) {
            validPasswords++;
        }
    }

    return validPasswords;
};

const generatePasswordRule = (currentRule) => {
    let positionsAndLetter = currentRule.split(' ');
    let occurences = positionsAndLetter[0].split('-');
    let firstPosition = parseInt(occurences[0]);
    let secondPosition = parseInt(occurences[1]);
    let letterCheck = positionsAndLetter[1];

    return { firstPosition, secondPosition, letterCheck };
};

console.log(processPasswords(input));