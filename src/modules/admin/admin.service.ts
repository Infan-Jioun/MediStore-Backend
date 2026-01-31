import { prisma } from "../../lib/prisma"

const getAllUsers = async () => {
    return await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            isBanned: true,
            emailVerified: true,
            createdAt: true
        }
    })
}
const updateUserStatus = async (id: string, isBanned: "ACTIVE" | "BANNED") => {
    return await prisma.user.update({
        where: { id },
        data: { isBanned }
    })
}
export const adminService = {
    getAllUsers,
    updateUserStatus
}