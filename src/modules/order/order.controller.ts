import type { Request, Response } from "express"
import { orderService } from "./order.service";

const createOrder = async (req: Request, res: Response) => {
    try {
        const userId = req.user!.id;
        const order = await orderService.createOrder(userId as any, req.body)
        return res.status(201).json(order);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "post failed"
        })
    }
}


export const orderController = {
    createOrder
}