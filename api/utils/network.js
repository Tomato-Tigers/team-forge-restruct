// sample student object
const student = {
    id: 0,
    name: '',
    skills: {},
    interests: [],
    availability: [], // "hh:mm-hh:mm;hh:mm-hh:mm;hh:mm-hh:mm"
    relation: [] // the id of the students who the user wants to work with
}

// builds the network
function build(students) {
    var adj = new Map(); // adjacent matrix

    // for each student
    for (var student of students.values()) {
        var temp = student.relation;

        // add students who want to work with the current student
        var original = adj.get(student.id) || [];
        for (var id of original)
            if (!temp.includes(id))
                temp.push(id);
        adj.set(student.id, temp);

        // go through all students the current student wants to work with
        for (var id of student.relation) {
            var list = adj.get(id) || [];
            // adds the student to the list if not already
            if (!list.includes(student.id)) list.push(student.id);
            adj.set(id, list);
        }
    }
    return adj;
}

// forms a group of {size} for student {id} (using a bfs approach)
function formGroup(adj, id, size) {
    var res = [];
    var queue = [];
    res.push(id);
    queue.push(id);

    while (queue.length != 0) {
        var cur = queue.shift(); // pop the first element
        for (var to of adj.get(cur)) {
            // adds unvisited nodes
            if (!res.includes(to) && res.length < size) {
                res.push(to);
                queue.push(to);
            }
        }
    }
    return res;
}

// builds a sample set of students
function testBuild() {
    console.log("Test: builds a network");
    var students = new Map(); // the key is the id of the student
    students.set(1, { id: 1, interest: [""], relation: [2, 3, 4] });
    students.set(2, { id: 2, interest: [""], relation: [4] });
    students.set(3, { id: 3, interest: [""], relation: [] });
    students.set(4, { id: 4, interest: [""], relation: [2] });
    students.set(6, { id: 6, interest: [""], relation: [3] });
    students.set(7, { id: 7, interest: [""], relation: [] });

    for (var student of students.values()) {
        console.log("student " + student.id + " want to work with [" + student.relation + "]");
    }
    console.log();
    var adj = build(students);
    for (var entry of adj.entries()) {
        var id = entry[0];
        var relation = entry[1];
        console.log("student " + id + " may work with [" + relation + "]");
    }
    console.log();
}

// tests forming a group
function testForm() {
    console.log("Test: form groups");
    var students = new Map(); // the key is the id of the student
    students.set(1, { id: 1, interest: [""], relation: [2, 3, 4] });
    students.set(2, { id: 2, interest: [""], relation: [4] });
    students.set(3, { id: 3, interest: [""], relation: [] });
    students.set(4, { id: 4, interest: [""], relation: [2] });
    students.set(6, { id: 6, interest: [""], relation: [3] });
    students.set(7, { id: 7, interest: [""], relation: [] });

    var adj = build(students);
    console.log("form a group of 3 for student 2: " + formGroup(adj, 2, 3));
    console.log("form a group of 5 for student 2: " + formGroup(adj, 2, 5));
    console.log("form a group of 6 for student 2: " + formGroup(adj, 2, 6));
    console.log("form a group of 4 for student 3: " + formGroup(adj, 3, 4));
}

testBuild();
testForm();