const { sharedTime, dayCnt } = require("./_profile.js");

// test function for time slot
function testTimeSlot() {
    var testCases = [ // TODO: add more test cases
        {
            timeA: [";08:00-09:00;11:00-13:00;14:59-15:01;16:00-18:00", "", "", "", "", "", ""],
            timeB: [";08:00-09:00;11:00-13:00;14:59-15:01;16:00-18:00", "", "", "", "", "", ""],

            expected: ["08:00-09:00;11:00-13:00;14:59-15:01;16:00-18:00", "", "", "", "", "", ""],
        },
    ]

    describe("Test sharedTime()", () => {
        test.each(testCases)('', (testCase) => {
            var result = sharedTime(testCase.timeA, testCase.timeB);
            expect(result).toStrictEqual(testCase.expected);
        });
    });
}

function testDayCnt() {
    var testCases = [ // TODO: add more test cases
        {
            time: ";08:00-09:00;11:00-13:00;14:59-15:01;16:00-18:00",

            expected: 300,
        },
    ]

    describe("Test dayCnt()", () => {
        test.each(testCases)('', (testCase) => {
            var result = dayCnt(testCase.time);
            expect(result).toBe(testCase.expected);
        });
    });
}


testTimeSlot();
testDayCnt();