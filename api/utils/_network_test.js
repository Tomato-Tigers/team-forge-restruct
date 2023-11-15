import { sampleUsers } from "./user.js";
import { group } from "./network.js";

// tests forming a group
function testGroup() {
    console.log("Test: form groups");
    var students = sampleUsers();

    for (var student of students.values())
        console.log("student " + student.id + " want to work with " + student.relation);
    console.log();

    console.log("form a group of 3 for student 2: " + group(students, 2, 3));
    console.log("form a group of 4 for student 2: " + group(students, 2, 4));
    console.log("form a group of 5 for student 2: " + group(students, 2, 5));
    console.log("form a group of 4 for student 3: " + group(students, 3, 4));
    console.log("from a group of 4 for student 4: " + group(students, 4, 4));
}

testGroup();