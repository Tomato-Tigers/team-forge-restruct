const { upsertUserStaticPreferences } = require('../src/prismaAPI');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

module.exports = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JSON_WEB_TOKEN_KEY);
    const userId = decoded.id;
    if (req.method !== 'POST') {
        return res.status(405).send('Method Not Allowed');
    }

    const data = {
        userId: req.user.id, // Replace with the actual user ID
        selectedSkills: req.body.selectedSkills,
        availability: req.body.availability
    };

    try {
        const preferences = await upsertUserStaticPreferences(prisma, data);
        res.status(200).json(preferences);
    } catch (error) {
        console.error('Error saving static preferences:', error);
        res.status(500).send('Error saving static preferences');
    } finally {
        await prisma.$disconnect();
    }
};
