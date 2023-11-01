
const student = {
    id: 0,
    name: '',
    skills: {},
    interests: [],
    availability: [], // "hh:mm-hh:mm;hh:mm-hh:mm;hh:mm-hh:mm"
    relation: [], // the id of the students who the user wants to work with
}

// example: 
/*
{
    "id": 123,
    "name": "Henry",
    "skills": {
        "Java": 3,
        "Python": 2, 
        "C": 2, 
        "Communication": 2, 
    },
    "interests": [
        "shopping",
        "reading", 
        "video games"
    ],
    "availability": [
        ";08:00-9:00;10:00-13:00", 
        ";08:00-9:00;10:00-13:00", 
        ";08:00-9:00;10:00-13:00", 
        ";08:00-9:00;10:00-13:00", 
        ";08:00-9:00;10:00-13:00", 
        ";08:00-9:00;10:00-13:00", 
        ";08:00-9:00;10:00-13:00"
    ], 
    relationship: [

    ]
}
*/

const interestWeight = 5;       // the weight for interests

// calculate the similarity score
// returns an int
function similarityScore(studentA, studentB) {
    if (studentA.id == studentB.id) {
        return 0;
    }

    var res = 0;    // the final score

    var slots = sharedAvailability(studentA.availability, studentB.availability);
    var slotCnt = timeCnt(slots);
    if (slotCnt == 0) return 0;

    var sharedInterests = sharedElements(studentA["interests"], studentB["interests"]);
    res += sharedInterests.length * interestWeight;

    return res;
}

// find the shared available time slots
// timeA and timeB are the students' availablity
// returns an arr of length 7
function sharedAvailability(timeA, timeB) {
    var res = ["", "", "", "", "", "", ""];
    for (var i = 0; i < 7; i++) {
        var inter = intersection(timeA[i], timeB[i]);
        if (inter != "") res[i] = inter.substring(1);
    }
    return res;
}

// finds the intersection of two availability (on a day)
function intersection(timeA, timeB) {
    if (timeA == "" || timeB == "") return "";
    var segmentA = timeA.split(";");
    var segmentB = timeB.split(";");

    var res = "";
    var lPtr = 1, rPtr = 1;     // left pointer and right pointer
    var lItem;
    var rItem = atot(segmentB[rPtr]);
    while (lPtr < segmentA.length) {
        var lItem = atot(segmentA[lPtr]);

        while (isEarlier(rItem.e, lItem.s)) {
            // console.log("pass " + ttoa(lItem) + " " + ttoa(rItem));
            rPtr++;
            if (rPtr == segmentB.length)
                return res;
            rItem = atot(segmentB[rPtr]);
        }
        while (isEarlier(rItem.s, lItem.e)) {
            // console.log("check " + ttoa(lItem) + " " + ttoa(rItem));
            var intersection = {
                s: later(lItem.s, rItem.s),
                e: earlier(lItem.e, rItem.e)
            }
            res += ";" + ttoa(intersection);

            rPtr++;
            if (rPtr == segmentB.length)
                return res;
            rItem = atot(segmentB[rPtr]);
        }
        lPtr++;
    }
    return res;
}

// convert a string ("00:00-00:00") to a time block structure
function atot(text) {
    var startingText = text.split("-")[0]; // starting time
    var endingText = text.split("-")[1]; // ending time
    var startingTime = atos(startingText);
    var endingTime = atos(endingText);
    return {
        s: startingTime,
        e: endingTime
    }
}

// convert a string ("00:00") to a time segment
function atos(text) {
    var hour = text.split(":")[0]; // starting hour
    var minute = text.split(":")[1]; // starting minute
    var segment = {
        h: hour,
        m: minute
    }
    return segment;
}

function ttoa(time) {
    return time.s.h + ":" + time.s.m + "-" + time.e.h + ":" + time.e.m;
}

// compares time A and B
// return 1 if A is earlier
// return 0 otherwise
function isEarlier(timeA, timeB) {
    // console.log("compare " + timeA.h + " " + timeA.m + " " + timeB.h + " " + timeB.m);
    if (timeA.h < timeB.h)
        return 1;
    // console.log(timeA.h + " >= " + timeB.h)
    if (timeA.h == timeB.h && timeA.m < timeB.m)
        return 1;
    // console.log("right is later");
    return 0;
}

// get the earlier time
function earlier(timeA, timeB) {
    if (isEarlier(timeA, timeB))
        return timeA;
    else return timeB;
}

// get the later time
function later(timeA, timeB) {
    if (isEarlier(timeA, timeB))
        return timeB;
    else return timeA;
}

// counts the length of time slots in a week
// return an int
function timeCnt(time) {
    var res = 0;
    for (var i = 0; i < 7; i++) {
        console.log("time" + time[i]);
        var day = dayCnt(time);
        res += day;
    }
    return res;
}

// counts the length of time slots in a day
function dayCnt(time) {
    var res = 0;
    var segment = time.split(";");
    for (var j = 1; j < segment.length; j++) {
        var chunk = atot(segment[j]);
        var diff = timeDiff(chunk);
        if (diff >= 30) res += diff;
    }
    return res;
}

function timeDiff(time) {
    var h = parseInt(time.e.h) - parseInt(time.s.h);
    var m = parseInt(time.e.m) - parseInt(time.s.m);
    var diff = h * 60 + m;
    return diff;
}

// return the shared elements in two lists
// return a list
function sharedElements(arrA, arrB) {
    var filteredArray = arrA.filter(function (n) {
        return arrB.indexOf(n) !== -1;
    });
    return filteredArray;
}

// test function for time slot
function testTimeSlot() {
    console.log("Test: find shared availability")
    timeA = [
        ";08:00-09:00;11:00-13:00;14:59-15:01;16:00-18:00",
        "",
        "",
        "",
        "",
        "",
        ""
    ];
    timeB = [
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