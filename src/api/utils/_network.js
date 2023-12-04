const { search } = require("./_search.js");
var groupResult = [];

// sample user object
const user = {
    id: 0,
    name: '',
    skills: {},
    interests: [],
    availability: [], // "hh:mm-hh:mm;hh:mm-hh:mm;hh:mm-hh:mm"
    relation: [] // the id of the users who the user wants to work with
}


// forms a group of {size} for user {id}
// param users: Map: contains all information with the id as the key
// param id: int: id of the user
// param size: int: size of group
// param pref: Pref: user's preference
// filter filter: Filter: the search filter
// return list: array: the id of the students in the group
function group(users, id, size) {
    var list = groupByRelation(id, size);
    var res = [];
    if (list.length == size) return list;
    var res = search(users, id, pref, filter);
    for (var i = 0; i < res.length && list.length < size; i++) {
        if (list.includes(res[i].id)) continue;
        list.push(res[i].id);
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


module.exports = {
    group,
};
