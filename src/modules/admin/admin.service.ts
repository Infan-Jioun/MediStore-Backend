import { prisma } from "../../lib/prisma"
export interface CreateCategoryInput {
    name: string
    slug: string
}
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

const createCategoryService = async (data: CreateCategoryInput) => {
    return await prisma.category.create({
        data: {
            name: data.name,
            slug: data.slug
        }
    })
}

const getCategoryService = async () => {
    return await prisma.category.findMany({
        orderBy: {
            createdAt: "desc"
        }
    })
}

export const adminService = {
    getAllUsers,
    updateUserStatus,
    getCategoryService,
    createCategoryService

}