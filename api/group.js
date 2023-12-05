// get all users in a class as a sorted list
const { prisma, getUserIdByEmail, getStudentsByClassID, getClassPreference, getEntryByID } = require("./../src/prismaAPI.js");
const { group } = require("./../src/api/utils/_network.js");


module.exports = async (req, res) => {
    // the method should be get
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed, please use GET' });
    }

    // the params
    const data = req.query;
    const email = data.email;
    const classID = data.classID;
    const size = data.size;

    // variables
    var id;
    var users;

    // get id
    try {
        // console.log("email: " + email);
        id = await getUserIdByEmail(email);
        // console.log("id: " + id);
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send({ message: 'Cannot get id: ' + error });
    }

    // get users
    try {
        var users = (await getStudentsByClassID(prisma, classID)).members;
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send({ message: "Cannot get users: " + classID });
    }

    //get pref
    try {
        const prefData = { userID: id, classID: classID };
        console.log("pref data: " + JSON.stringify(prefData));
        var pref = await getClassPreference(prefData);
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send({ message: 'Cannot get pref: ' + error });
    }

    var ret = group(users, id, size, pref);
    return res.json(ret);
}