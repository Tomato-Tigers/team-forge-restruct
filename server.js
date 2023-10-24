const express = require("express");
const app = express();

app.use("/users/", require("./routes/usersRoutes"));

app.listen(3001, function() {
    console.log("express server is running on port 3001");
})