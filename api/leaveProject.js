const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = (async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({error: 'Method not allowed, please use POST'});
    }
    const data = req.body;
    const email = data.email;
    const projectID = data.projectID;
    const classID = data.classID;
    console.log("Email: " + email + " Project ID: " + projectID + "\n")

    try {

        //make sure user is not the owner, if they are send message that they must delete the project
        const projectOwner = await prisma.project.findFirst({
            where: {
                projectID: projectID,
                ownerEmail: email,
            },
        });
        console.log("Project owner: ", projectOwner.ownerEmail);
        if (projectOwner) {
            return res.status(400).send({message: 'You are the owner of this project. Please delete your project to leave.'});
        }
        // remove user's email from project's members list
        const updatedProject = await prisma.project.update({
            where: {
                projectID: projectID,
            },
            data: {
                group: {
                    update: {
                        members: {
                            disconnect: {
                                email: email,
                            },
                        },
                    },
                },
            },
        });
        console.log("Done updating project");
        // remove existing project's ID from user's projects list and set groupID to null
        const updateUser = await prisma.entry.update({
            where: {
                email: email,
            },
            data: {
                Projects: {
                    disconnect: {
                        projectID: projectID,
                    },
                },
                groupID: null,
            },
        });
        // remove user from group
        const updatedGroup = await prisma.group.update({
            where: {
                groupID: updatedProject.groupID,
            },
            data: {
                members: {
                    disconnect: {
                        email: email,
                    },
                },
            },
        });

        console.log("Success:", updatedProject);
        return res.status(201).json({message: 'Successfully left the project!'});
    } catch (error) {
        console.error("Error leaving project:", error);
        return res.status(500).send({message: 'Error leaving project'});
    }
});