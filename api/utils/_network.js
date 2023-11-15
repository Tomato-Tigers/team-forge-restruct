import { search } from "./_search.js";
var adj = 0;

// sample user object
const user = {
    id: 0,
    name: '',
    skills: {},
    interests: [],
    availability: [], // "hh:mm-hh:mm;hh:mm-hh:mm;hh:mm-hh:mm"
    relation: [] // the id of the users who the user wants to work with
}

// builds the network
function build(users) {
    var adj = new Map(); // adjacent matrix

    // for each user
    for (var user of users.values()) {
        var temp = user.relation;

        // add users who want to work with the current user
        var original = adj.get(user.id) || [];
        for (var id of original)
            if (!temp.includes(id))
                temp.push(id);
        adj.set(user.id, temp);

        // go through all users the current user wants to work with
        for (var id of user.relation) {
            var list = adj.get(id) || [];
            // adds the user to the list if not already
            if (!list.includes(user.id)) list.push(user.id);
            adj.set(id, list);
        }
    }
    return adj;
}

// forms a group of {size} for user {id}
// param users: Map: contains all information with the id as the key
// param id: int: id of the user
// param size: int: size of group
// return list: array: the id of the students in the group
export function group(users, id, size) {
    if (adj == 0)
        preprocess(users);
    var list = groupByRelation(id, size);
    if (list.length == size) return list;
    var search = search(users, id, );
    for (var i = 0; i < search.length && list.length < size; i++) {
        if (list.includes(search[i].id)) continue;
        list.push(search[i].id);
    }
    return list;
}

// forms a group of {size} for user {id} (based on relations)
// if there are not enough people, return an array of smaller size
function groupByRelation(id, size) {
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

// preprocess: 
//  builds the adj map
function preprocess(users) {
    adj = build(users);
}
