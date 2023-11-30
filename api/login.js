
const { getPasswordByEmail } = require('../src/prismaAPI');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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
    const user = await prisma.entry.findUnique({
            where: {
                email: email,
            },
            select: {//fetches
              id: true, 
              password: true, 
              name: true, 
             
          },
      });
    
    
        if (bcrypt.compareSync(password, storedHashedPassword)) {
          const token = jwt.sign(
            { 
              
              name: user.name, 
              email: user.email
            }, 
            process.env.JSON_WEB_TOKEN_KEY, 
            { expiresIn: '1h' }
          );
                    res.status(200).send({ email: user.email, name: user.name, token, message: 'Login successful' });; 
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