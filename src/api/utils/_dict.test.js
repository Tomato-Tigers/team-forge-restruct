const { dtos, getDict, writeDict } = require("./_dict.js");
const { select } = require("./_select.js");

function testGetDict() {
    var dict = getDict("skills");

    describe("Test getDict()", () => {
        test('', () => {
            expect(dtos(dict))
                .toBe("C 3\nC++ 3\nJasperReports 1\nJava 1\nJavaScript 1\npiano 3\n");
        });
    });
}

// TODO: change to a test function
function testWriteDict() {
    // console.log("Test writing into dictionary");
    var dict = getDict("skills");
    // console.log("Select C");
    select(dict, "C");
    // console.log("select C++");
    select(dict, "C++");
    // console.log("Select piano");
    select(dict, "piano");
    writeDict("skills", dict);
    // console.log("Dictionary: {\n" + dtos(dict) + "}");
}

// test the functions
testGetDict();
testWriteDict();