const { upsertUserStaticPreferences } = require('../src/prismaAPI');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

module.exports = async (req, res) => {
    console.log('Received Data:', req.body); // Check received data
    console.log('Authorization Header:', req.headers.authorization); // Check the token in the header
    // Ensure the request is a POST request
    if (req.method !== 'POST') {
        return res.status(405).send('Method Not Allowed');
    }

    // Extract the JWT token from the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send('Unauthorized: No token provided');
    }

    const token = authHeader.split(' ')[1]; // Assumes format 'Bearer <token>'

    let userId;
    try {
        // Verify the token and extract the user ID
        const decoded = jwt.verify(token, process.env.JSON_WEB_TOKEN_KEY);
        userId = decoded.id;
    } catch (error) {
        // Handle any error that occurred during JWT verification
        console.error("JWT verification error:", error);
        return res.status(401).send('Unauthorized: Invalid token');
    }

    // Prepare the data for upsert operation
    const data = {
        userId: userId, // Use the userId from the token
        selectedSkills: req.body.selectedSkills,
        availability: req.body.availability
    };

    try {
        // Upsert user static preferences
        const preferences = await upsertUserStaticPreferences(data);
        res.status(200).json(preferences);
    } catch (error) {
        // Handle any error that occurred during the upsert operation
        console.error('Error saving static preferences:', error);
        res.status(500).send('Error saving static preferences');
    }
};
