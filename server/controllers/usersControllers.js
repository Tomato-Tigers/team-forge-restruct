const bcrypt = require('bcrypt');
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
exports.loginController = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    
    const user = userList.find(user => user.email === email);
    if (user) {
        if (bcrypt.compareSync(password, user.password)) {
            res.json({ success: true, message: "Login successful" });
        } else {
            res.json({ success: false, message: "Incorrect password" });
        }
    } else {
        res.status(404).json({ success: false, message: "User not found" });
    }
}
