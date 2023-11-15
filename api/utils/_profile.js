// imports
import { sharedElements } from "./_utils.js";

// calculate the score of user B for user A
// param userA: User: the current user
// param userB: User: the target user
// param pref: Pref: user A's preference
// param filter: Filter: the search filter
// return score: int: the score
// the score depends on availability and interests
// a higher score indicates a more likely chance of working together
// a score of 0 means that user B should not work with user A
export function score(userA, userB, pref, filter) {
    if (userA.id == userB.id)
        return 0;

    var res = 0;    // the final score

    var slots = sharedAvailability(userA.availability, userB.availability);
    var slotCnt = timeCnt(slots);
    if (slotCnt == 0) return 0;

    var sharedInterests = sharedElements(userA.interests, userB.interests);
    res += sharedInterests.length * pref.interest;

    // make sure the user satisfy the filter and add corresponding score
    for (var ski of filter.hasSki)
        if (!userB.skills.includes(ski))
            return 0;
    for (var int of filter.hasInt)
        if (!userB.interests.includes(int))
            return 0;
    for (var ski of filter.notSki)
        if (userB.skills.includes(ski))
            return 0;
    for (var int of filter.notInt)
        if (userB.interests.includes(int))
            return 0;
    for (var ski of filter.maySki)
        if (userB.skills.includes(ski))
            res += pref.skills;
    for (var int of filter.mayInt)
        if (userB.interests.includes(int) && !userA.interests.includes(int))
            res += pref.interests;

    return res;
}

// find the shared available time slots
// param timeA: array:string: avaiable time for user A
// param timeB: array:string: avaiable time for user B
// return availability: array:string(7): the share available time
export function sharedAvailability(timeA, timeB) {
    var availability = ["", "", "", "", "", "", ""];
    for (var i = 0; i < 7; i++) {
        var inter = intersection(timeA[i], timeB[i]);
        if (inter != "") availability[i] = inter.substring(1);
    }
    return availability;
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
        var day = dayCnt(time[i]);
        res += day;
    }
    return res;
}

// count the length of time slots in a day
// param time: string: the time slots
// return length: int: the length of time
// if a time segment is less than 30 minutes, 
// it will not be counted towards the total length of time
// this is because a small segment of time cannot be enough for a meeting
export function dayCnt(time) {
    var length = 0;
    var segment = time.split(";");
    for (var j = 1; j < segment.length; j++) {
        var chunk = atot(segment[j]);
        var diff = timeDiff(chunk);
        if (diff >= 30) length += diff;
    }
    return length;
}

function timeDiff(time) {
    var h = parseInt(time.e.h) - parseInt(time.s.h);
    var m = parseInt(time.e.m) - parseInt(time.s.m);
    var diff = h * 60 + m;
    return diff;
}