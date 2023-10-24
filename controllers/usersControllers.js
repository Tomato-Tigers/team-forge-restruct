const userList = [
    {
        username: "ekurchi",
        email: "ekurchi@emory.edu",
        password: "123"
    },
    {
        username: "hrmitch",
        email: "hrmitch@emory.edu",
        password: "456"
    }
];

exports.usersControllers = (req, res) => {
    res.json({userList})
}