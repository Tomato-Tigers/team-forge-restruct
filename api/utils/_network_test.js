const { sampleUsers } = require("./_user.js");
const { group } = require("./_network.js");

// tests forming a group
function testGroup() {
    console.log("Test: form groups");
    var students = sampleUsers();

    for (var student of students.values())
        console.log("student " + student.id + " want to work with " + student.relation);
    console.log();

    var pref = {
        interest: 5,
        skill: 5
    };

    const filter = {
        hasSki: [],     // skills that must have
        hasInt: [],     // interests that must have
        notSki: [],     // skills that must not have
        notInt: [],     // interests that must not have
        maySki: [],     // skills prefered
        mayInt: []      // interests prefered
    }

    console.log("form a group of 3 for student 2: " + group(students, 2, 3, pref, filter));
    console.log("form a group of 4 for student 2: " + group(students, 2, 4, pref, filter));
    console.log("form a group of 5 for student 2: " + group(students, 2, 5, pref, filter));
    console.log("form a group of 4 for student 3: " + group(students, 3, 4, pref, filter));
    console.log("form a group of 4 for student 4: " + group(students, 4, 4, pref, filter));
}

testGroup();
