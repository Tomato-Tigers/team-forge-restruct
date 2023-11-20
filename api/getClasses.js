// get all classes that a user is a member of
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = async(req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({error: 'Method not allowed, please use POST'});
    }
    const data = req.body;
    let email = data.email;
    //remove "" from email
    email = data.email.replace(/['"]+/g, '');

    try {
            const classes = await prisma.entry.findUnique({
                where: {
                    email: email,
                    },
                select: {
                    classes: {
                        include: {
                            members: true,
                        },
                    }
                },
            });
        // send empty array if no classes found
            if (!classes) {
                return res.json([]);
            } else {
                console.log("Classes: ", classes.classes);
                return res.json(classes.classes);
            }
        } catch (error) {
            console.error("Error getting classes:", error);
            return res.status(500).send('Internal server error');
        } finally {
            await prisma.$disconnect();
        }

}
