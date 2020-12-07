const fs = require('fs'), path = require('path');
const input = fs.readFileSync(path.join(__dirname, './second-puzzle.input'), 'utf-8').split('\r\n\r\n');

const processPassports = (input) => {
    let validPassports = 0;

    for (let i = 0; i < input.length; i++) {
        let currentPassport = input[i];
        let isValidPassport = true;
        let properties = currentPassport.replace(/\r\n/g, ' ').split(' ');

        if (properties.length === 8 || properties.length === 7 && !properties.find(p => p.startsWith('cid'))) {
            for (let j = 0; j < properties.length; j++) {
                let currentProperty = properties[j].split(':');
                if (!isValidProperty(currentProperty[0], currentProperty[1])) {
                    isValidPassport = false;
                    break;
                }
            }
        } else {
            isValidPassport = false;
        }

        if (isValidPassport) {
            validPassports++;
        }
    }

    return validPassports;
};

const isValidProperty = (propertyName, propertyValue) => {
    switch (propertyName) {
        case 'byr':
            let birthYear = parseInt(propertyValue);
            return propertyValue.length === 4 && birthYear >= 1920 && birthYear <= 2002;
        case 'iyr':
            let issueYear = parseInt(propertyValue);
            return propertyValue.length === 4 && issueYear >= 2010 && issueYear <= 2020;
        case 'eyr':
            let expirationYear = parseInt(propertyValue);
            return propertyValue.length === 4 && expirationYear >= 2020 && expirationYear <= 2030;
        case 'hgt':
            let isCentimeterHeight = propertyValue.endsWith('cm');
            let height = parseInt(propertyValue.replace('cm', '').replace('in', ''));
            return isCentimeterHeight ? height >= 150 && height <= 193 : height >= 59 && height <= 76;
        case 'hcl':
            let hairColor = propertyValue;
            return hairColor.length === 7 && hairColor.match(/(#)([a-fA-F0-9]{6})/);
        case 'ecl':
            let eyeColor = propertyValue;
            return eyeColor === 'amb' || eyeColor === 'blu' || eyeColor === 'brn' || eyeColor === 'gry' || eyeColor === 'grn' || eyeColor === 'hzl' || eyeColor === 'oth';
        case 'pid':
            let passportId = propertyValue;
            return passportId.length === 9 && Number(passportId) > 0;
        case 'cid':
            return true;
        default:
            return false;
    }
}

console.log(processPassports(input));