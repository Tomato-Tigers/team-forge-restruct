const process = require('process');
const { autocomplete } = require("./_autocomplete.js");
const { getDict } = require('./_dict.js');
const { arrayEqual } = require("./_utils.js");


// tests autocomplete on several words
function testAutocomplete() {
    var dict = getDict("skills");
    var testCases = [
        {
            prefix: "java",

            expected: ["Java", "JavaScript"]
        },
        {
            prefix: "Java",

            expected: ["Java", "JavaScript"]
        },
        {
            prefix: "C",

            expected: ["C", "C++"]
        },
        {
            prefix: "bla",

            expected: []
        }
    ]

    describe("Test autocomplete()", () => {
        test.each(testCases)('', (testCase) => {        // TODO: describe prefix in test name
            var result = autocomplete(dict, testCase.prefix);
            expect(result).toStrictEqual(testCase.expected);
        });
    });
}

// test the functions
testAutocomplete();