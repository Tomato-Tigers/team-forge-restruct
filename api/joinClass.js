// API to allow a user to join a class via a defined class code
// The class code must match an existing class, and the user must not already be a member of the class

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

module.exports = async (req, res) => {
    const data = req.body;
    const email = data.email;
    const classID = data.classID;
    console.log("Email: " + email + " Class Code: " + classID + "\n")

    // check if class exists
    const existingClass = await prisma.class.findUnique({
        where: { 
                classID: classID,
        },
    })

    const existingUser = await prisma.entry.findFirst({
        where: {
            email: email,
            classes: {
                some: {
                    classID: classID,
                },
            },
        },
    })
    if (existingUser) {
        return res.status(400).send({message: 'You are already a member of this class.'});
    }

    if (existingClass){
        try{
            // add user's email to class' members list
            const updatedClass = await prisma.class.update({
                where: {
                    classID: existingClass.classID,
                },
                data: {
                    members: {
                        connect: {
                            email: email,
                        },
                    },
                },
            });
            console.log("Done updating class");
            // add existing class's ID to user's classes list
            const updateUser = await prisma.entry.update({
                where: {
                    email: email,
                },
                data: {
                    classes: {
                        connect: {
                            classID: existingClass.classID,
                        },
                    },
                },
            });
            console.log("Success:", updatedClass);
            return res.status(201).json({message: "Class joined successfully."});
            } catch (error) {
                console.error("Error adding class:", error);
                return res.status(500).send({message: 'Internal error when attempting to join class'});
    
            }
        }
};