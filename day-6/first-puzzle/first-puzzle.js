const fs = require('fs'), path = require('path');
const input = fs.readFileSync(path.join(__dirname, './first-puzzle.input'), 'utf-8').split('\r\n\r\n');

const processAffirmativeAnswers = (input) => {
    let countAffirmativeAnswers = 0;

    for (let i = 0; i < input.length; i++) {
        let persons = input[i].split('\r\n');
        let affirmativeAnswers = [];

        for (let j = 0; j < persons.length; j++) {
            let person = persons[j];

            for (let k = 0; k < person.length; k++) {
                let answer = person[k];
                if (!affirmativeAnswers.includes(answer)) {
                    affirmativeAnswers.push(answer);
                }
            }
        }

        countAffirmativeAnswers += affirmativeAnswers.length;
    }

    return countAffirmativeAnswers;
};

console.log(processAffirmativeAnswers(input));