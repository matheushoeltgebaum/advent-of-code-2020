const fs = require('fs'), path = require('path');
const input = fs.readFileSync(path.join(__dirname, './second-puzzle.input'), 'utf-8').split('\r\n');

const getBagsCount = (input) => {
    let count = 0;
    let bags = [];

    let shinyGoldBagRule = input.find(rule => rule.startsWith('shiny gold bags contain'));
    let innerBags = shinyGoldBagRule.split(' contain ')[1].split(',');

    for (let i = 0; i < innerBags.length; i++) {
        let currentBagRule = innerBags[i].replace('bags', '').replace('bag', '');
        let bagCount = Number(currentBagRule.match('[0-9]+'));
        let bagColor = currentBagRule.replace(bagCount, '').replace('.', '').trim();

        bags.push({ color: bagColor, count: bagCount });
    }

    while (bags.length > 0) {
        let currentBag = bags[0];
        count += currentBag.count;
        processBags(input, currentBag, bags);
        bags = bags.slice(1);
    }

    return count;
}

const processBags = (input, currentBag, bags) => {
    let bagRule = input.find(rule => rule.startsWith(`${currentBag.color} bags contain`));
    console.log(bagRule);
    let innerBags = bagRule.split(' contain ')[1].split(',');

    for (let i = 0; i < innerBags.length; i++) {
        let currentBagRule = innerBags[i].replace('bags', '').replace('bag', '');
        let bagCount = Number(currentBagRule.match('[0-9]+'));
        let bagColor = currentBagRule.replace(bagCount, '').replace('.', '').trim();

        if (bagColor !== 'no other') {
            let existingBag = bags.find(bag => bag.color === bagColor);

            if (!existingBag) {
                bags.push({ color: bagColor, count: currentBag.count * bagCount });
            } else {
                existingBag.count += (currentBag.count * bagCount);
            }
        }
    }
};

console.log(getBagsCount(input));