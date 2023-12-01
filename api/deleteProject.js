const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = (async (req, res) => {
    if (req.method !== 'DELETE') {
        return res.status(405).json({error: 'Method not allowed, please use POST'});
    }
    const data = req.body;
    const email = data.email;
    const projectID = data.projectID;
    const classID = data.classID;
    console.log("Email: " + email + " Project ID: " + projectID + "\n")

    try {
        //make sure project exists
        const existingProject = await prisma.project.findUnique({
            where: {
                projectID: projectID,
            },
        });
        if (!existingProject) {
            return res.status(400).send({message: 'Project not found.'});
        }
        
        if (existingProject.ownerEmail !== email) {
            return res.status(400).send({message: 'You are not the owner of this project.'});
        }

        // Before deleting the project, update all members of the group
        await prisma.entry.updateMany({
            where: {
                groupID: existingProject.groupID,
            },
            data: {
                groupID: null,
            },
        });

        // delete project
        const deletedProject = await prisma.project.delete({
            where: {
                projectID: projectID,
            },
        });
        console.log("Success:", deletedProject);
        return res.status(201).json({message: 'Project deleted successfully!'});
    } catch (error) {
        console.error("Error deleting project:", error);
        return res.status(500).send({message: 'Internal error when attempting to delete project.'});
    }
});