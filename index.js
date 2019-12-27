const scraping = require("./scraping")
const toGroup =  require("./toGroup")
const save = require("./store")
process.env.CLASSIFY_RULE
scraping().then(data => {
    if(data.length > 0) {
        save(toGroup(data))
    }
})