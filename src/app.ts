import express, { Router, type Application } from "express";
import cors from 'cors';
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import { medicineRouter } from "./modules/medicine/medicine.router";
import { adminRouter } from "./modules/admin/admin.router";
import { categoryRouter } from "./modules/category/category.router";
import { orderRouter } from "./modules/order/order.router";
import { sellerRouter } from "./modules/seller/seller.router";
export const app: Application = express()
// app.use(cors({
//     origin: process.env.APP_URL,
//     credentials: true
// }))

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.all('/api/auth/*splat', toNodeHandler(auth));
app.use("/api/admin", adminRouter)
app.use("/api/seller", sellerRouter)
app.use("/api/medicines", medicineRouter)
app.use("/api/categories", categoryRouter)
app.use("/api/orders", orderRouter)
app.get("/", (req, res) => {
    res.send("Succesfullt MediStore Server Runing... ")
})



