// imports
const { score } = require("./_profile.js");

// an example filter
const filter = {
    hasSki: [],     // skills that must have
    hasInt: [],     // interests that must have
    notSki: [],     // skills that must not have
    notInt: [],     // interests that must not have
    maySki: [],     // skills prefered
    mayInt: []      // interests prefered
}

// gets a list of suggested users for user {id}
// param users: Map: contains all information with the id as the key
// param id: int: user id
// return list: array: a sorted list of users
function search(users, cur, pref) {
    var list = [];
    for (var idx = 0; idx < users.length; idx++) {
        var user = users[idx];
        console.log("check " + JSON.stringify(user));
        var pt = score(cur, user, pref);
        // if (pt != 0)
        list.push({
            id: user.id,
            score: pt
        });
    }

    // sort the list based on the score in descending order
    list.sort(function (a, b) {
        return parseInt(b.score) - parseInt(a.score);
    });

    return list;
}

module.exports = {
    search,
};