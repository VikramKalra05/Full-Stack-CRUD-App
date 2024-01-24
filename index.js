const express = require("express");
const { connection } = require("./db");
const { userRouter } = require("./routes/userRoutes");
const { noteRoutes } = require("./routes/noteRoutes");
const dotenv = require("dotenv").config()
const cors = require("cors");

const app = express();
const PORT = process.env.PORT;

app.use(cors({
    origin: "*"
}));

app.use(express.json());
app.use("/users", userRouter);
app.use("/notes", noteRoutes);

app.get("/", (req, res) => {
    res.send("Home Page");
})

app.listen(PORT, async () => {
    try {
        await connection;
        console.log(`The server is running at port ${PORT}`);
    } catch (error) {
        console.log(error);
    }
})