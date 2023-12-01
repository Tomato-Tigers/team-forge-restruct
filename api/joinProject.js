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

            //check if user is already a member of a project in the current class
            const classWithProjects = await prisma.class.findUnique({
                where: { classID },
                select: {
                  projects: {
                    select: {
                      group: {
                        select: {
                          members: {
                            select: {
                              email: true,
                            },
                          },
                        },
                      },
                    },
                  },
                },
              });

            const isMember = classWithProjects.projects.some(project =>
                project.group?.members.some(member => member.email === email)
              );
            if (isMember) {
                return res.status(400).send({message: 'You are already in a group/project for this class. Please leave your current project to join a new project. If you are a project owner, you must delete the project before attempting to join a new one.'});
            } else {

                const userInProject = await prisma.entry.findFirst({
                    where: {
                        email: email,
                        Projects: {
                            some: {
                                projectID: projectID,
                            },
                        },
                    },
                })
                if (userInProject) {
                    return res.status(400).send({message: 'You are already a member of this project.'});
                }
            }
            
                    // add user's email to project's members list
                    const updatedProject = await prisma.project.update({
                        where: {
                            projectID: projectID,
                        },
                        data: {
                            group: {
                                update: {
                                    members: {
                                        connect: {
                                            email: email,
                                        },
                                    },
                                },
                            },
                        },
                        select: {
                            ownerEmail: true,
                            groupID: true,
                        },
                    });
                    console.log(updatedProject.ownerEmail);
                    // add existing project's ID to user's projects list and set groupID
                    const updateUser = await prisma.entry.update({
                        where: {
                            email: email,
                        },
                        data: {
                            Projects: {
                                connect: {
                                    projectID: projectID,
                                },
                            },
                            groupID: updatedProject.groupID,
                        },
                    });

                    // join the group
                    const updatedGroup = await prisma.group.update({
                        where: {
                            groupID: updatedProject.groupID,
                        },
                        data: {
                            members: {
                                connect: {
                                    email: email,
                                },
                            },
                        },
                    });
                    console.log("Success:", updatedProject);
                    return res.status(201).json({message: "Project joined successfully!"});
    } catch (error) {
                        console.error("Error adding project:", error);
                        return res.status(500).send({message: 'Internal server error when attempting to join project'});
            
                    }
});