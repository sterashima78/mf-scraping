module.exports = (data, rules, genId) => {
    const groupedData = groupByRules(data, rules, genId)
    const calcParcent = toParcent(sumByKey(1)(data))
    return rules.map(({ category: key }) => {
        return {
            id: genId(),
            key,
            parts: (groupedData[key] || [])
                .map(addParcent(calcParcent))
                .map(i => ({ ...i, id: genId() })),
            parcent: calcParcent(sumByKey("yen")(groupedData[key] || []))
        }
    })
}

const sumByKey = key => data => data.reduce((sum, i) => sum + (i[key] || 0), 0)

const toParcent = total => val => (val / total * 100).toFixed(2)

const addParcent = calcParcent => ({ name, yen }) => ({
    name,
    yen,
    parcent: calcParcent(yen)
})

const groupByRules = (data, rules) => {
    const groupedData = {}
    data.forEach(([name, yen]) => {
        let done = false
        rules.forEach(({ category, rule }) => {
            if (!done && rule.test(name)) {
                done = true
                groupedData[category] =
                    (groupedData[category] || []).concat([{ name, yen }])
            }
        })
    })
    return groupedData
}