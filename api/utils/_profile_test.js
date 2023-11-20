const { sharedAvailability, dayCnt, sharedElements } = require("./_profile.js");

// test function for time slot
function testTimeSlot() {
    console.log("Test: find shared availability")
    var timeA = [
        ";08:00-09:00;11:00-13:00;14:59-15:01;16:00-18:00",
        "",
        "",
        "",
        "",
        "",
        ""
    ];
    var timeB = [
        ";08:00-09:00;11:00-13:00;14:59-15:01;16:00-18:00",
        "",
        "",
        "",
        "",
        "",
        ""
    ];
    console.log("time slot 1: " + timeA);
    console.log("time slot 2: " + timeB);
    var res = sharedAvailability(timeA, timeB);
    console.log("The available time slots are: " + res);
    for (var i = 0; i < 7; i++) {
        console.log(dayCnt(res[i]) + " minutes are available on day " + (i + 1) + ". \n");
    }
}

// test function for shared elements
function testSharedElements() {
    console.log("Test: find shared elements");
    var list1 = ["piano", "reading", "basketball", "hiking"];
    var list2 = ["hiking", "violin", "piano", "video games", "shopping"];
    console.log("list 1: " + list1);
    console.log("list 2: " + list2);
    console.log(sharedElements(list1, list2) + "\n");
}

testTimeSlot();
testSharedElements();
