// get all classes that a user is a member of
const { prisma, getUserIdByEmail, getStudentsByClassID, getClassPreference, getEntryByID } = require("./../src/prismaAPI.js");
const { score } = require("./../src/api/utils/_profile.js");


module.exports = async (req, res) => {
    console.log("hello word");
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed, please use POST' });
    }
    const data = req.body;
    const email = data.email;
    const classID = data.classID;
    try {
        var id = await getUserIdByEmail(email);
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send({ message: 'Cannot get id: ' + error });
    }
    try {
        var users = (await getStudentsByClassID(prisma, classID)).members;
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send({ message: "Cannot get users: " + classID });
    }
    try {
        var pref = await getClassPreference(id, classID);
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send({ message: 'Cannot get pref: ' + error });
    }
    var list = [];
    for (var idx = 0; idx < users.length; idx++) {
        console.log(idx);
        var usr = users[idx];
        try {
            var target = await getEntryByID(usr.id);
        } catch (error) {
            return res.status(500).send({ message: 'Cannot get user: ' + error });
        }
        // console.log("target: " + JSON.stringify(target));
        var pt = score(usr, target, pref);
        // if (pt != 0)
        list.push({
            id: target.id,
            score: pt
        });
    }
    var ret = [];
    for (var elem of list) {
        var usr = await getEntryByID(elem.id);
        ret.push(usr);
    }
    return res.json(ret);
}