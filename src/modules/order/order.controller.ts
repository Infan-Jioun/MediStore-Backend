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
const getOrders = async (req: Request, res: Response) => {
    try {
        const { userId } = req.body
        const order = await orderService.getOrders(userId as string);
        return res.status(200).json(order)
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Get failed"
        })
    }
}
const getOrdersById = async (req: Request, res: Response) => {
    try {
        const order = await orderService.getOrdersById(req.params.id as string, req.user!);
        return res.status(200).json(order)
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Get failed"
        })
    }
}

export const orderController = {
    createOrder,
    getOrders,
    getOrdersById
}