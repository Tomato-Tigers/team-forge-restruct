// get all users in a class as a sorted list
const { prisma, getUserIdByEmail, getStudentsByClassID, getClassPreference, getEntryByID } = require("./../src/prismaAPI.js");
const { group } = require("./../src/api/utils/_network.js");


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

    var ret = group(users, id, size);
    return res.json(ret);
}