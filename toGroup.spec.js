const toGroup = require('./toGroup')

describe("toGroup", () => {
    test("ルールごとに分類・集計", () => {
        expect(toGroup([
            ["カテゴリー1-1", 2500],
            ["カテゴリー1-2", 5000],
            ["foo", 2500],
        ], [{
            category: "カテゴリー1",
            rule: new RegExp("カテゴリー1")
        },
        {
            category: "カテゴリー2",
            rule: new RegExp("カテゴリー2")
        },
        {
            category: "その他",
            rule: new RegExp(".*")
        },
        ], () => "hoge")).toEqual([{
            id: "hoge",
            key: "カテゴリー1",
            parcent: "75.00",
            parts: [{
                id: "hoge",
                name: "カテゴリー1-1",
                yen: 2500,
                parcent: "25.00"
            }, {
                id: "hoge",
                name: "カテゴリー1-2",
                yen: 5000,
                parcent: "50.00"
            }]
        },
        {
            id: "hoge",
            key: "カテゴリー2",
            parcent: "0.00",
            parts: []
        },
        {
            id: "hoge",
            key: "その他",
            parcent: "25.00",
            parts: [{
                id: "hoge",
                name: "foo",
                yen: 2500,
                parcent: "25.00"
            }]
        }
        ])
    })
})