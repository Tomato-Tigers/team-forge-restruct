const { createNewUser, getPasswordByUsername, getSkillsByUsername, deleteEntryByUsername, modifyEntryByUsername, getTableIdByUsername} = require('./prismaAPI');

const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
        return res.status(400).send('User already exists');
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    try {
        // Create a new user using the function from prismaAPI.ts
        await createNewUser(prisma, { name: name, password: hashedPassword, email: email });

 
        res.status(200).send('User registered successfully');
    } catch (error) {
        res.status(500).send('Error registering user');
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        return res.status(400).send('Username not found');
    }

    if (bcrypt.compareSync(password, user.password)) {
        res.status(200).send('Login successful');
    } else {
        res.status(400).send('Incorrect password');
    }
});

app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});