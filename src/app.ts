import express, { Router, type Application } from "express";
import cors from 'cors';
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import { medicineRouter } from "./modules/medicine/medicine.router";
import { adminRouter } from "./modules/admin/admin.router";
import { categoryRouter } from "./modules/category/category.router";
import { orderRouter } from "./modules/order/order.router";
import { sellerRouter } from "./modules/seller/seller.router";
import { authRouter } from "./modules/auth/auth.Router";
import { ReviewRouter } from "./modules/reviews/review.router";
export const app: Application = express()
// app.use(cors({
//     origin: process.env.APP_URL || "https://medi-store-frontend-seven.vercel.app",
//     credentials: true
// }))

const allowedOrigins = [
    process.env.APP_URL || "https://medi-store-frontend-seven.vercel.app",
    // process.env.PROD_APP_URL || "https://medi-store-frontend-seven.vercel.app", // Production frontend URL
].filter(Boolean); 

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin) return callback(null, true);
            const isAllowed =
                allowedOrigins.includes(origin) ||
                /^https:\/\/next-blog-client.*\.vercel\.app$/.test(origin) ||
                /^https:\/\/.*\.vercel\.app$/.test(origin); // Any Vercel deployment

            if (isAllowed) {
                callback(null, true);
            } else {
                callback(new Error(`Origin ${origin} not allowed by CORS`));
            }
        },
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
        exposedHeaders: ["Set-Cookie"],
    }),
);


app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRouter);
app.all('/api/auth/*splat', toNodeHandler(auth));
app.use("/api/admin", adminRouter)
app.use("/api/seller", sellerRouter)
app.use("/api/medicines", medicineRouter)
app.use("/api/categories", categoryRouter)
app.use("/api/orders", orderRouter)
app.use("/api/reviews", ReviewRouter)
app.get("/", (req, res) => {
    res.send("Successfully MediStore Server Runing... ")
})