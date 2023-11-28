
const { getPasswordByEmail } = require('../src/prismaAPI');
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

      const { email, password } = req.body;
    
  try {
     const storedHashedPassword = await getPasswordByEmail(prisma, email);
    
    
    if (!storedHashedPassword) {
        return res.status(400).send('Username not found');
    }
        // get user's name
    const username = await prisma.entry.findUnique({
            where: {
                email: email,
            },
            select: {
                name: true,
            },
        });
    
    
    if (bcrypt.compareSync(password, storedHashedPassword)) {
        res.status(200).send({email: email, name: username, message: 'Login successful'}); 
    } else {
        res.status(400).send('Incorrect password. Please Try again.');
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send({message: 'Error logging in', error: error });
  } finally {
    await prisma.$disconnect();
  }
};