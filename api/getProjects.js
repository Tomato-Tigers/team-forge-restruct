//API to get all projects specific to a class
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = (async (req, res) => {
    const data = req.body;
    const classID = data.classID;
    console.log("classID: ", classID);
    try {
        const projects = await prisma.class.findUnique({
            where: {
                classID: classID,
            },
            select: {
                projects: true,
            },
        });
        // send empty array if no projects found
        if (!projects) {
            return res.json([]);
        } else {
            console.log("Projects: ", projects.projects);
            return res.json(projects.projects);
        }
    } catch (error) {
        console.error("Error getting projects:", error);
        return res.status(500).send('Internal server error');
    } finally {
        await $prisma.disconnect;
    }
});
