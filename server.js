const { createNewUser, getPasswordByEmail, getSkillsByID, deleteEntryByID, modifyEntryByID, getTableIdByID } = require('./src/prismaAPI.js');
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

app.use( cors({ origin: 'https://team-forge-restruct.vercel.app'}));
app.use(bodyParser.json());

app.post('/register', async (req, res) => {
    const { name, email, password} = req.body;

    const existingUser = await prisma.entry.findUnique({ where: { email } });
    if (existingUser) {
        return res.status(400).send('User already exists');
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    try {
        await createNewUser(prisma, { name, password: hashedPassword, email });
        res.status(201).send('User registered successfully');
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).send('Error registering user');
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

     const storedHashedPassword = await getPasswordByEmail(prisma, email);
    
    
    if (!storedHashedPassword) {
        return res.status(400).send('Username not found');
    }

    if (bcrypt.compareSync(password, storedHashedPassword)) {
        res.status(200).send('Login successful'); 
    } else {
        res.status(400).send('Incorrect password');
    }
});


app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});
