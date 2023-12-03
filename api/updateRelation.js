// get all classes that a user is a member of
const { prisma, updateRelationByID } = require("./../src/prismaAPI.js");


module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed, please use POST' });
    }
    const data = req.body;
    const user = data.user;
    const relation = data.relation;
    try {
        const ret = await updateRelationByID(user, relation);
        return res.json(ret);
    }
    catch (error) {
        console.error("Error:", error);
        return res.status(500).send({ message: "Cannot update relation: " + error });
    }
}