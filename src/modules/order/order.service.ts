import { prisma } from "../../lib/prisma";
import { UserRole } from "../../middleware/auth";
interface MedicineItem {
    medicineId: string;
    quantity: number;
}
interface OrderPaylaod {
    medicineItems: MedicineItem[];
    shippingAddress: string
}
const createOrder = async (userId: string, payload: OrderPaylaod) => {
    
    const { medicineItems, shippingAddress } = payload;

    if (!medicineItems || medicineItems.length === 0) {
        throw new Error("Order item required")
    }
    if (!shippingAddress) {
        throw new Error("shippingAddress is required")
    }
    let totalAmount = 0;
    const orderItems = await Promise.all(
        medicineItems.map(
            async (item: any) => {
                const medicine = await prisma.medicine.findUniqueOrThrow({
                    where: {
                        id: item.medicineId
                    }

                })
                if (!medicine) {
                    throw new Error(`Medicine not found for id: ${item.medicineId}`);
                }

                totalAmount += medicine.price * item.quantity;
                console.log(totalAmount);
                return {
                    medicineId: medicine.id,
                    quantity: item.quantity,
                    price: medicine.price
                }
            }
        )
    )

    return prisma.order.create({
        data: {
            customerId: userId,
            totalAmount,
            shippingAddress,

            items: {
                create: orderItems
            },
        },
        include: {
            items: true
        }

    })
}
const getOrders = async (userId: string) => {
    return await prisma.order.findMany({
        where: { customerId: userId },
        include: {
            items: {
                include: {
                    medicine: true
                }
            }
        },
        orderBy: { createdAt: "desc" }

    })

}
const getOrdersById = async (orderId: string, user: any) => {
    const order = await prisma.order.findUniqueOrThrow({
        where: { id: orderId },
        include: {
            items: {
                include: {
                    medicine: true
                }
            }
        }
    });
    if (!order) {
        throw new Error("Your Order Not Found...")
    }
    if (order.customerId !== user.id && user.role !== UserRole.ADMIN) {
        throw new Error("Frobidden Access")
    }
    return order
}
export const orderService = {
    createOrder,
    getOrders,
    getOrdersById
}