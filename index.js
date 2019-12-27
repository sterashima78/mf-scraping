const scraping = require("./scraping")
const toGroup =  require("./toGroup")
const save = require("./store")
const uuidv4 = require('uuid/v4');
const rules = JSON.parse(Buffer.from(process.env.CLASSIFY_RULE, 'base64'))
                .map(({ category, rule})=> ({category, rule: new RegExp(rule)}))
scraping().then(data => {
    if(data.length > 0) {
        save(toGroup(data, rules, uuidv4), new Date())
    }
})