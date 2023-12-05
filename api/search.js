// get all users in a class as a sorted list
const { prisma, getUserIdByEmail, getStudentsByClassID, getClassPreference, getEntryByID } = require("./../src/prismaAPI.js");
const { score } = require("./../src/api/utils/_profile.js");


module.exports = async (req, res) => {
    // the method should be get
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed, please use GET' });
    }

    // the params
    // console.log("search req: " + JSON.stringify(req.query));
    const data = req.query;
    const email = data.email;
    const classID = data.classID;

    // variables
    var id, users;
    if (email == "") return res.status(500).send({ message: 'Email is empty' });

    // get the user's id
    try {
        console.log("email: " + email);
        id = await getUserIdByEmail(email);
        console.log("id: " + id);
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send({ message: 'Cannot get id: ' + email });
    }

    // get users
    try {
        users = (await getStudentsByClassID(prisma, classID)).members;
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send({ message: "Cannot get users: " + classID });
    }

    // get user's preferences
    try {
        const prefData = { userID: id, classID: classID };
        console.log("pref data: " + JSON.stringify(prefData));
        var pref = await getClassPreference(prefData);
        console.log(pref);
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send({ message: 'Cannot get pref: ' + error });
    }

    // get the score of each user and sort
    var list = [];
    for (var idx = 0; idx < users.length; idx++) {
        var usr = users[idx];
        try {
            var target = await getEntryByID(usr.id);
        } catch (error) {
            return res.status(500).send({ message: 'Cannot get user: ' + error });
        }
        // console.log("target: " + JSON.stringify(target));
        var pt = score(usr, target, pref, false);
        // TODO: uncomment this
        // if (pt != 0)
        list.push({
            target: target,
            score: pt
        });
    }
    var ret = [];
    for (var elem of list) {
        var usr = elem.target;
        ret.push(usr);
    }
    return res.json(ret);
}