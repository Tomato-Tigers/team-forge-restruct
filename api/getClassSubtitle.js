const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = (async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({error: 'Method not allowed, please use POST'});
    }  

    const data = req.body;
    const classID = data.classID;

    //get class subtitle
    try {
        const classSubtitle = await prisma.class.findUnique({
            where: {
                classID: classID,
            },
            select: {
                subtitle: true,
            },
        });
        return res.json({subtitle: classSubtitle.subtitle});
    } catch (error) {
        console.error("Error getting class subtitle:", error);
        return res.status(500).send({message: 'Internal server error'});
    }
});