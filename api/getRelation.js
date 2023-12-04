// get the relation array of a user
const { prisma, getRelationByID } = require("./../src/prismaAPI.js");


module.exports = async (req, res) => {
    // the method should be get
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed, please use GET' });
    }

    // params
    const data = req.query;
    const user = data.user;

    // use Prisma API to get relation
    try {
        const ret = await getRelationByID(user);
        return res.json(ret);
    }
    catch (error) {
        console.error("Error:", error);
        return res.status(500).send({ message: "Cannot get relation: " + error });
    }
}