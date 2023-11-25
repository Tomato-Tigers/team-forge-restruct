//API to allow a user to create a new group/project for a specific class
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = (async (req, res) => {
    const data = req.body;
    const classID = data.classID;
    const title = data.title;
    const groupName = data.groupName;
    const description = data.description;
    let email = data.email;

    console.log("classID: ", classID, " title: ", title, " groupName: ", groupName, " description: ", description, " email: ", email);
    //remove "" from email
    email = data.email.replace(/['"]+/g, '');


    //check if user is already in a group, if they are, they cannot create a project
    const userInGroup = await prisma.entry.findUnique({
        where: {
            email: email,
        },
        include: {
            group: true,
        },
    });

    if (userInGroup.group) {
        return res.status(400).send({message: 'You are already in a group. Please leave your current group to create a new project.'});
    } else { // user is not in a group, they can create a project/group
         const newGroup = await prisma.group.create({
            data: {
                name: groupName,
                // add users email to members list
                members: {
                    connect: {
                        email: email,
                    },
                },
            },
        });
        console.log("Done creating group");

        try { // create new project and link it to the new group and class
            const newProject = await prisma.project.create({
                data: {
                    title: title,
                    description: description,
                    group: {
                        connect: {
                            groupID: newGroup.groupID,
                        },
                        },
                    class: {
                        connect: {
                            classID: classID,
                        },
                    },
                    },
                });

            console.log("Success:", newProject);
            return res.json(newProject);
        } catch (error) {
            console.error("Error creating project:", error);
            return res.status(500).send({message: 'Error creating project'});
        }  finally {
            await prisma.$disconnect();
        }
    }
    
    
});
