const { prisma, getUserIdByEmail } = require('./../../prismaAPI.js');

async function run() {
    console.log(await getUserIdByEmail("test@gmail.com"));
}

run();