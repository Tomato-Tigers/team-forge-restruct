const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createNewUser(data) {
    return await prisma.entry.create({
        data: {
            email: data.email,
            password: data.password,
            name: data.name,
            //title: data.title,
            //skills: data.skills || [],
           // title: data.title || "Default Title"  
             // Assuming content field is used to store email
            // Include other default or required fields as necessary
        }
    });
}

async function getPasswordByEmail(prisma, email) {
    
    const entry = await prisma.entry.findUnique({
        where: {
            email:email,
        },
        select: {
            password: true
        }
    });

    if (entry && entry.password) {
        console.log(`Password for email ${email}: ${entry.password}`);  // Logging password
    } else {
        console.log(`No password found for email: ${email}`);
    }
    
    return entry?.password;
}



async function getSkillsByID(prisma, id) {
    const entry = await prisma.entry.findFirst({
        where: {
            id: id,
        },
        select: {
            skills: true
        }
    });
    return entry?.skills;
}

async function deleteEntryByID(prisma, id) {
    await prisma.entry.delete({
        where: {
            id: id,
        }
    });
}

async function modifyEntryByID(prisma, id, data) {
    const updatedEntry = await prisma.entry.update({
        where: {
            title: username,
        },
        data: data
    });
    return updatedEntry;
}

async function getTableIdByID(prisma, id) {
    const entry = await prisma.entry.findFirst({
        where: {
            title: username,
        },
        select: {
            id: true
        }
    });
    return entry?.id;
}

async function getStudentsByClassID(prisma, classID) {
    return await prisma.Class.findUnique({
        where: {
            classID: classID
        },
        select: {
            members: true // Retrieves all Entry (student) records associated with the class
        }
    });
}

async function upsertUserStaticPreferences(data) {
    console.log('Upserting Data:', data);
    try {
        return await prisma.staticPreferences.upsert({
            where: {
                userId: data.userId,
            },
            update: {
                selectedSkills: data.selectedSkills,
                availability: data.availability, 
            },
            create: {
                userId: data.userId,
                selectedSkills: data.selectedSkills,
                availability: data.availability,
            },
        });
    } catch (error) {
        console.error('Error in upsertUserStaticPreferences:', error);
        throw error; // Rethrow the error to handle it in the calling function
    }
}

async function createMessage(senderEmail, recipientEmail, content) {
    console.log('createMessage started', { senderEmail, recipientEmail });

    try {
        const message = await prisma.message.create({
            data: {
                sender: {
                    connect: { email: senderEmail }
                },
                recipient: {
                    connect: { email: recipientEmail }
                },
                content
            }
        });
        
        console.log('createMessage completed', message);
        return message;
    } catch (error) {
        console.error('Error in createMessage', error);
        throw error;
    }
}

  
  
  
  
  async function getInbox(userEmail) {
    console.log('getInbox started', { userEmail });

    try {
        const messages = await prisma.message.findMany({
            where: {
                recipient: {
                    email: userEmail
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        console.log('getInbox completed', messages);
        return messages;
    } catch (error) {
        console.error('Error in getInbox', error);
        throw error;
    }
}


async function getSentMessages(userEmail) {
    console.log('getSentMessages started', { userEmail });

    try {
        const messages = await prisma.message.findMany({
            where: {
                sender: {
                    email: userEmail
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        console.log('getSentMessages completed', messages);
        return messages;
    } catch (error) {
        console.error('Error in getSentMessages', error);
        throw error;
    }
}


async function getMessagesForUser(email) {
    return await prisma.message.findMany({
      where: {
        OR: [
          { senderEmail: email },
          { recipientEmail: email }
        ],
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
}

async function createMessageForUser({ senderEmail, recipientEmail, messageContent }) {
    return await prisma.message.create({
      data: {
        senderEmail,
        recipientEmail,
        content: messageContent,
      },
    });
}

async function getUserIdByEmail(email) {

    const user = await prisma.entry.findUnique({

      where: { email }

    });

    return user?.id;

  }

module.exports = {
    prisma,
    createNewUser,
    getPasswordByEmail,
    getSkillsByID,
    deleteEntryByID,
    modifyEntryByID,
    getTableIdByID,
    getStudentsByClassID,
    upsertUserStaticPreferences,
    createMessage,
    getMessagesForUser,
    createMessageForUser,
    getInbox,
    getSentMessages,
    getUserIdByEmail,

};