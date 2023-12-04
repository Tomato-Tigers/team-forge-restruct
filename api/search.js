// get all classes that a user is a member of
const { prisma, getUserIdByEmail, getStudentsByClassID, getClassPreference, getEntryByID } = require("./../src/prismaAPI.js");
const { score } = require("./../src/api/utils/_profile.js");


module.exports = async (req, res) => {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed, please use GET' });
    }
    // console.log("seaarch req: " + JSON.stringify(req.query));
    const data = req.query;
    const email = data.email;
    const classID = data.classID;
    var id;
    try {
        // console.log("email: " + email);
        // TODO: email is "" when user refreshes the page
        id = await getUserIdByEmail(email);
        // console.log("id: " + id);
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
        const prefData = { userID: id, classID: classID };
        console.log("pref data: " + JSON.stringify(prefData));
        var pref = await getClassPreference(prefData);
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send({ message: 'Cannot get pref: ' + error });
    }
    var list = [];
    for (var idx = 0; idx < users.length; idx++) {
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