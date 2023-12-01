// imports
const { score } = require("./_profile.js");
const { prisma, getStudentsByClassID } = require('./../../prismaAPI.js');

// gets a list of suggested users for user {id}
// param users: Map: contains all information with the id as the key
// param id: int: user id
// return list: array: a sorted list of users
function search(id, pref) {
    var users = getStudentsByClassID(prisma, "696b7b56-2871-4773-af68-f071bb660829");
    var list = [];
    for (var user of users.values()) {
        var pt = score(users.get(id), user, pref);
        if (pt != 0)
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
    search
};