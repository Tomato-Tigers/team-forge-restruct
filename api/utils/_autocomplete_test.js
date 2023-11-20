const process = require('process');
const { autocomplete } = require("./_autocomplete.js");
const { getDict } = require('./_dict.js');
const { arrayEqual } = require("./_utils.js");


// tests autocomplete on several words
function testAutocomplete() {
    var dict = getDict("skills");
    var testCases = [
        {
            name: "Test java",
            prefix: "java",

            expected: ["Java", "JavaScript"]
        },
        {
            name: "Test Java",
            prefix: "Java",

            expected: ["Java", "JavaScript"]
        },
        {
            name: "Test C",
            prefix: "C",

            expected: ["C", "C++"]
        },
        {
            name: "Test bla",
            prefix: "bla",

            expected: []
        },
        {
            name: "Test ",
            prefix: "",

            expected: []
        },
    ]
    for (var test of testCases) {
        var result = autocomplete(dict, test.prefix);
        if (!arrayEqual(result, test.expected))
            console.log("Test " + test.name + " failed; result is " + result + " and expected is " + test.expected);
    }
}

// test the functions
testAutocomplete();
