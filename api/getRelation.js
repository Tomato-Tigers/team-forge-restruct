// get all classes that a user is a member of
const { prisma, getRelationByID } = require("./../src/prismaAPI.js");


module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed, please use POST' });
    }
    const data = req.body;
    const user = data.user;
    try {
        const ret = await getRelationByID(user);
        return res.json(ret);
    }
    catch (error) {
        console.error("Error:", error);
        return res.status(500).send({ message: "Cannot get relation: " + error });
    }
}