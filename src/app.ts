import express, { Router, type Application } from "express";
import cors from 'cors';
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import { medicineRouter } from "./modules/medicine/medicine.router";
export const app: Application = express()
// app.use(cors({
//     origin: process.env.APP_URL,
//     credentials: true
// }))

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.all('/api/auth/*splat', toNodeHandler(auth));
app.use("/api/medicine" , medicineRouter)
app.get("/", (req, res) => {
    res.send("Succesfullt MediStore Server Runing... ")
})



