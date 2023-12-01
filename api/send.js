
const { createMessage, prisma} = require('../src/prismaAPI');
// In send.js
module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).send('Method Not Allowed');
    }

    console.log("Received message data on server:", req.body);
    const { senderEmail, recipientEmail, content } = req.body;

    try {
        const message = await createMessage(prisma, senderEmail, recipientEmail, content);
        console.log("Message created:", message);
        res.status(201).send({ message, message: 'Message sent successfully' });
    } catch (error) {
        console.error("Error in server-side message creation:", error);
        res.status(500).send({ message: 'Error sending message', error: error });
    }
};
