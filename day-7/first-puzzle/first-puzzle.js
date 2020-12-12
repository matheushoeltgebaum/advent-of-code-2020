const fs = require('fs'), path = require('path');
const input = fs.readFileSync(path.join(__dirname, './first-puzzle.input'), 'utf-8').split('\r\n');

const getBagsCount = (input) => {
    let bags = ['shiny gold'];
    let processedBags = [];
    let count = 0;

    while (bags.length > 0) {
        let currentBag = bags[0];
        count += processBags(input, currentBag, bags, processedBags);

        processedBags.push(bags[0]);
        bags = bags.slice(1);
    }

    return count;
}

const processBags = (input, bagColor, bags, processedBags) => {
    let count = 0;

    for (let i = 0; i < input.length; i++) {
        let currentRule = input[i];
        let currentBag = currentRule.split(' bags contain ')[0];

        if (!currentRule.startsWith(bagColor) && 
            currentRule.includes(bagColor) &&
            !bags.includes(currentBag) && 
            !processedBags.includes(currentBag)) {
            bags.push(currentBag);
            count++;
        }
    }

    return count;
};

console.log(getBagsCount(input));