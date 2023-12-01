const { sampleUsers } = require("./_user.js");
const { group } = require("./_network.js");

// tests forming a group
function testGroup() {
    var students = sampleUsers();

    var pref = {
        interest: 5,
        skill: 5,
        hasSki: [],     // skills that must have
        hasInt: [],     // interests that must have
        notSki: [],     // skills that must not have
        notInt: [],     // interests that must not have
        maySki: [],     // skills prefered
        mayInt: []      // interests prefered
    };

    var testCases = [
        {
            id: 2,
            size: 3,

            expected: [2, 1, 3]
        },
        {
            id: 2,
            size: 4,

            expected: [2, 1, 3, 5]
        },
        {
            id: 2,
            size: 5,

            expected: [2, 1, 3, 5, 6]
        },
        {
            id: 3,
            size: 4,

            expected: [3, 2, 5, 6]
        },
        {
            id: 4,
            size: 4,

            expected: [4]
        },
    ]

    describe("Test group()", () => {
        test.each(testCases)('', (testCase) => {
            var result = group(students, testCase.id, testCase.size, pref);
            expect(result).toStrictEqual(testCase.expected);
        });
    });
}

testGroup();