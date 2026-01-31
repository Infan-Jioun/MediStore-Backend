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
export const adminService = {
    getAllUsers
}