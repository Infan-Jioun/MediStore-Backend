import express, { Router, type Application } from "express";
import cors from 'cors';
export const app: Application = express()
app.use(express.json())
app.use(cors({
    origin: process.env.APP_URL,
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.send("Succesfullt MediStore Server Runing... ")
})



