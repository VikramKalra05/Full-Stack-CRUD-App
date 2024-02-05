const express = require("express");
const swaggerJSdoc=require("swagger-jsdoc");
const swaggerUi=require("swagger-ui-express");
const { connection } = require("./db");
const { userRouter } = require("./routes/userRoutes");
const { noteRoutes } = require("./routes/noteRoutes");
const dotenv = require("dotenv").config()
const cors = require("cors");

const app = express();
const PORT = process.env.PORT;

const options={
    definition: {
        openapi:"3.0.0",
        info: {
            title:"Learning Swagger",
            version:"1.0.0"
        },
        servers:[
            {
                url:"https://tan-clear-gharial.cyclic.app"
            }
        ]
    },
    apis:["./routes/*.js"]
}

const swaggerSpec=swaggerJSdoc(options)
app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerSpec))

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