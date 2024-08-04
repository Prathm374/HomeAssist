import express from "express";
import pg from "pg";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const port = 5000;

const db = new pg.Client({
    host: "localhost",
    database: "homeassist",
    user: "postgres",
    password: "prathmSci123",
    port: 5432
});

// db.connect();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req,res)=>{
    res.send("comprehensive services tailored to your needs");
});

app.listen(port,() => {
    console.log(`Server is running on port: ${port}`);
});