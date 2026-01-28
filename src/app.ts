import express, { Application, Router } from "express";

export const app: Application = express()

app.get("/", (req, res) => {
    res.send("Succesfullt MediStore Server Runing... ")
})



