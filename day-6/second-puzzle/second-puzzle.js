const fs = require('fs'), path = require('path');
const input = fs.readFileSync(path.join(__dirname, './second-puzzle.input'), 'utf-8').split('\r\n\r\n');

const processAffirmativeAnswers = (input) => {
    let questions = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    let countAffirmativeAnswers = 0;

    for (let i = 0; i < input.length; i++) {
        let persons = input[i].split('\r\n');
        let affirmativeAnswers = [];

        for (let j = 0; j < persons.length; j++) {
            let person = persons[j];
            let answers = person.split('');

            if (j > 0) {
                affirmativeAnswers = affirmativeAnswers.filter(question => answers.includes(question));
            } else {
                affirmativeAnswers = questions.filter(question => answers.includes(question));
            }
        }

        countAffirmativeAnswers += affirmativeAnswers.length;
    }

    return countAffirmativeAnswers;
};

console.log(processAffirmativeAnswers(input));