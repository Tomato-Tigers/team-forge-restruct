//API to get all projects specific to a class
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();


module.exports = (async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({error: 'Method not allowed, please use POST'});
    }
    const data = req.body;
    const classID = data.classID;
    console.log("classID: ", classID);
    try {
        const projects = await prisma.class.findUnique({
            where: {
                classID: classID,
            },
            select: {
                projects: {
                    include: {
                        group: {
                            select:{
                                members: true, // retrieve all members of the group
                                name: true, // retrieve group name
                            },
                        },
                        owner: {
                            select: {
                                email: true,
                            },
                        },
                    },
                },
            },
        });
        // send empty array if no projects found
        if (!projects) {
            return res.json([]);
        } else {
            console.log("Projects sending: ", projects.projects);
            return res.json(projects.projects);
        }
    } catch (error) {
        console.error("Error getting projects:", error);
        return res.status(500).send({message: 'Internal server error'});
    }
});