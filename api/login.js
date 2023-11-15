
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
      return res.status(401).send('Invalid login credentials');
    }

    const isPasswordMatch = await bcrypt.compare(password, storedHashedPassword);
    if (isPasswordMatch) {
      res.status(200).send('Login successful');
    } else {
      res.status(401).send('Invalid login credentials');
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send({message: 'Error logging in', error: error );
  } finally {
    await prisma.$disconnect();
  }
};
