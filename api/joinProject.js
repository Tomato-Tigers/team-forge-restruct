const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = (async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({error: 'Method not allowed, please use POST'});
    }  
        const data = req.body;
        const email = data.email;
        const classID = data.classID;
        console.log("Email: " + email + " Class ID: " + classID + "\n")

        // check if class exists
        const existingClass = await prisma.class.findUnique({
            where: { 
                    classID: classID,
            },
        })

        // check if user is already a member of the class
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

        if (!existingUser) {
            return res.status(400).send({message: 'You are not a member of this class.'});
        }

        if (existingClass){
            try{
                // remove user's email from class' members list
                const updatedClass = await prisma.class.update({
                    where: {
                        classID: existingClass.classID,
                    },
                    data: {
                        members: {
                            disconnect: {
                                email: email,
                            },
                        },
                    },
                });
                console.log("Done updating class");
                // remove existing class's ID from user's classes list
                const updateUser = await prisma.entry.update({
                    where: {
                        email: email,
                    },
                    data: {
                        classes: {
                            disconnect: {
                                classID: existingClass.classID,
                            },
                        },
                    },
                });
                console.log("Success:", updatedClass);
                return res.status(201).json({message: 'Successfully left the class!'});
            } catch (error) {
                console.error("Error leaving class:", error);
                return res.status(500).send({message: 'Error leaving class'});
            }
        } else {
            return res.status(400).send({message:'Class does not exist.'});
        }
});