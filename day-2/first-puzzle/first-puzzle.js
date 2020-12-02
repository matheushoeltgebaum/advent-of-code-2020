const fs = require('fs'), path = require('path');
const input = fs.readFileSync(path.join(__dirname, './first-puzzle.input'), 'utf-8').split('\n');

const processPasswords = (input) => {
    let validPasswords = 0;

    for (let i = 0; i < input.length; i++) {
        let currentLine = input[i].split(': ');
        let passwordRules = generatePasswordRule(currentLine[0]);
        let password = currentLine[1];

        let currentPasswordLetterOccurences = 0;
        for (let j = 0; j < password.length; j++) {
            let currentLetter = password[j];
            if (currentLetter === passwordRules.letterCheck) {
                currentPasswordLetterOccurences++;
            }
        }

        if (currentPasswordLetterOccurences >= passwordRules.minOccurences &&
            currentPasswordLetterOccurences <= passwordRules.maxOccurences) {
                validPasswords++;
            }
    }

    return validPasswords;
};

const generatePasswordRule = (currentRule) => {
    let occurencesAndLetter = currentRule.split(' ');
    let occurences = occurencesAndLetter[0].split('-');
    let minOccurences = parseInt(occurences[0]);
    let maxOccurences = parseInt(occurences[1]);
    let letterCheck = occurencesAndLetter[1];

    return { minOccurences, maxOccurences, letterCheck };
};

console.log(processPasswords(input));