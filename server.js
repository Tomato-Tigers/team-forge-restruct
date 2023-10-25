const jsonServer = require('json-server');
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

const app = express();
const router = jsonServer.router('db.json'); // Your mock database file
const middlewares = jsonServer.defaults();

app.use(bodyParser.json());
app.use(middlewares);

// Custom route to handle user registration
app.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = router.db.get('users').find({ email }).value();
    if (existingUser) {
        return res.status(400).send('User already exists');
    }

    // Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Save the new user
    const newUser = {
        id: Date.now(),
        name,
        email,
        password: hashedPassword
    };
    router.db.get('users').push(newUser).write();

    res.status(200).send('User registered successfully');
});


// Custom route to handle user login
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const user = router.db.get('users').find({ email }).value();

    if (!user) {
        return res.status(400).send('Username not found');
    }

    if (bcrypt.compareSync(password, user.password)) {
        res.status(200).send('Login successful');
    } else {
        res.status(400).send('Incorrect password');
    }
});

app.use(router);
app.listen(5000, () => {
    console.log('JSON Server with custom routes is running on http://localhost:5000');
});
