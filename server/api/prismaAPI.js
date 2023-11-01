const { PrismaClient } = require("@prisma/client");

async function createNewUser(prisma, data) {
    return await prisma.entry.create({
        data: {
            
            email: data.email,
            password: data.password,
            name: data.name,
            title: data.title,
             // Assuming content field is used to store email
            // Include other default or required fields as necessary
        }
    });
}

async function getPasswordByID(prisma, id) {
    const entry = await prisma.entry.findFirst({
        where: {
            id: id,
        },
        select: {
            password: true
        }
    });
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
            id: id,
        },
        data: data
    });
    return updatedEntry;
}

async function getTableIdByID(prisma, id) {
    const entry = await prisma.entry.findFirst({
        where: {
            id: id,
        },
        select: {
            id: true
        }
    });
    return entry?.id;
}

module.exports = {
    createNewUser,
    getPasswordByID,
    getSkillsByID,
    deleteEntryByID,
    modifyEntryByID,
    getTableIdByID,
};