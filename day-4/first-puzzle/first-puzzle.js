const fs = require('fs'), path = require('path');
const input = fs.readFileSync(path.join(__dirname, './first-puzzle.input'), 'utf-8').split('\r\n\r\n');

const processPassports = (input) => {
    let validPassports = 0;
    for (let i = 0; i < input.length; i++) {
        let currentPassport = input[i];
        let properties = currentPassport.replace(/\r\n/g, ' ').split(' ');

        if (properties.length === 8) {
            validPassports++;
        } else if (properties.length === 7 && !properties.find(p => p.startsWith('cid'))) {
            validPassports++;
        }
    }

    return validPassports;
};

console.log(processPassports(input));