// function to add a class to the Classes table in schema.prisma
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

module.exports = async(req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({error: 'Method not allowed, please use POST'});
    }

    const data = req.body;
    const title = data.title;
    const subtitle = data.subtitle;
    let email = data.email;
    //remove "" from email
     email = data.email.replace(/['"]+/g, '');

    console.log("Title: " + title + " Subtitle: " + subtitle + " Email: " + email + "\n")

    // check if class exists
    const existingClass = await prisma.class.findFirst({
        where: { 
                title: title ,
                subtitle: subtitle,
        },
    });
    
    if (existingClass) {
        console.log("existing class found");
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
        return res.status(409).json(updatedClass);
        } catch (error) {
            console.error("Error adding class:", error);
            return res.status(500).send('Error adding class');

        }
        
    } else {
        try {
        
        const newClass = await prisma.class.create({
            data: {
                title: title,
                subtitle: subtitle,
                projects: ["Placeholder"],
                // add users email to members list
                members: {
                    connect: {
                        email: email,
                    },
                },

                
            }
        });
        console.log("Done creating class");
        // add new class's ID to user's classes list
        const updatedUser = await prisma.entry.update({
            where: {
                email: email,
            },
            data: {
                classes: {
                    connect: {
                        classID: newClass.classID,
                    },
                },
            },
        });
        console.log("Success:", newClass);
        return res.json(newClass);
    } catch (error) {
        console.error("Error adding class:", error);
        return res.status(500).send('Error adding class');
    }
}
}