// imports
const { score } = require("./_profile.js");
const { prisma, getStudentsByClassID, getEntryByID, getClassPreference, getUserIdByEmail } = require("./../../prismaAPI.js");

// an example filter
const filter = {
    // hasSki: [],     // skills that must have
    // hasInt: [],     // interests that must have
    // notSki: [],     // skills that must not have
    // notInt: [],     // interests that must not have
    ski: [],     // skills prefered
    int: [],      // interests prefered
    interest: 5,
    skill: 5
}

// gets a list of suggested users for user {id}
// param users: Map: contains all information with the id as the key
// param id: int: user id
// param filter: Filter: the search filter
// return list: array: a sorted list of users
async function search(email, classid) {
    var id = await getUserIdByEmail(email);
    var users = (await getStudentsByClassID(prisma, classid)).members;
    console.log(JSON.stringify(users));
    var pref = await getClassPreference(id, classid);
    var list = [];
    for (var user of users.values()) {
        var target = await getEntryByID(user.id);
        console.log("target: " + JSON.stringify(target));
        var pt = score(id, target.id, pref);
        // if (pt != 0)
        list.push({
            id: target.id,
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