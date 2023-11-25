const { sharedElements } = require("./_utils.js");

// test function for shared elements
function testSharedElements() {
    var testCases = [
        {
            list1: ["piano", "reading", "basketball", "hiking"],
            list2: ["hiking", "violin", "piano", "video games", "shopping"],

            expected: ["piano", "hiking"]
        }
    ]
    describe("Test sharedElements()", () => {
        test.each(testCases)('', (testCase) => {
            var result = sharedElements(testCase.list1, testCase.list2);
            expect(result).toStrictEqual(testCase.expected);
        });
    });
}

testSharedElements();