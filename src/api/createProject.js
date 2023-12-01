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


  try {  //check if user is already an owner of a Project in the current class
            const projectOwner = await prisma.project.findFirst({
                where: {
                    classID: classID,
                    owner: {
                        email: email,
                    }
                },
            });
            
            if (projectOwner) {
                return res.status(400).send({message: 'You are already an owner for a group/project for this class. Please delete your current project to create a new project.'});
            }

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
                return res.status(400).send({message: 'You are already in a group/project for this class. Please leave your current project to create a new project. If you are a project owner, you must delete the project before attempting to create a new one.'});
            }
         // create new project and group and link them
            const newProject = await prisma.project.create({
                data: {
                    title: title,
                    description: description,
                    group: {
                        create: {
                            name: groupName,
                            members: {
                                connect: {
                                    email: email,
                                },
                            },
                        },
                        },
                    class: {
                        connect: {
                            classID: classID,
                        },
                    },
                    owner: {
                        connect: {
                            email: email,
                        },
                    },
                },
            });

            //add project to user's projects list
            const updateUser = await prisma.entry.update({
                where: {
                    email: email,
                },
                data: {
                    Projects: {
                        connect: {
                            projectID: newProject.projectID,
                        },
                    },
                },
            });
            console.log("Success:", newProject);
            const projectWithGroup = await prisma.project.findUnique({
                where: {
                    projectID: newProject.projectID, // Use the project ID from the newProject object
                },
                include: {
                    group: {
                        select:{
                            members: true, // retrieve all members of the group
                            name: true, // retrieve group name
                        }
                    } // Include the group data
                },
            });

            return res.json({project: projectWithGroup, message: 'Project created successfully!'});
        } catch (error) {
            console.error("Error creating project:", error);
            return res.status(500).send({message: 'Error creating project'});
        }
});
