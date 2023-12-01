const { prisma, createNewUser } = require('../src/prismaAPI.js');
const bcrypt = require('bcryptjs');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).send('Method not allowed');
  }

  const { name, email, password } = req.body;

  try {
    
    const existingUser = await prisma.entry.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).send('User already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await createNewUser({ name, email, password: hashedPassword });

    res.status(201).send('User registered successfully');
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).send('Error registering user');
  }
};
