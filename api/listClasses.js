// differs from getClasses (gets user specific classes)
// API to retrieve all available classes

const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = async(req, res) => {
    if (req.method !== 'GET') {
        return res.status(405).json({error: 'Method not allowed, please use GET'});
    }

    const classes = await prisma.class.findMany({
        select: {
            classID: true,
            title: true,
            subtitle: true,
            members: true,
        },
    });

    if (!classes) {
        return res.json([]);
    } else {
        return res.json(classes);
    }
}