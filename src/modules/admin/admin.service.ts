import { is } from "zod/locales"
import { prisma } from "../../lib/prisma"
export interface CreateCategoryInput {
    name: string
    slug: string
    image: string
}
const getAllUsers = async () => {
    return await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            isBanned: true,
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
            slug: data.slug,
            image: data.image

        }
    })
}

const getCategoryService = async () => {
    return await prisma.category.findMany({
        include: {
            medicines: true
        },
        orderBy: {
            createdAt: "desc"
        }
    })
}
const updateCategory = async (id: string, name: string, image: string) => {
    return await prisma.category.update({
        where: { id },
        data: { name, image, slug: name.toLowerCase().replace(/\s+/g, "-") },
    })
}

const deleteCategory = async (id: string) => {
    const category = await prisma.category.findUniqueOrThrow({
        where: { id },
        select: {
            id: true,
            medicines: true
        }
    })

    if (category.medicines.length > 0) {
        throw new Error("Cannot delete category with medicines...")
    }

    return prisma.category.delete({
        where: { id }
    })
}



export const adminService = {
    getAllUsers,
    updateUserStatus,
    getCategoryService,
    createCategoryService,
    updateCategory,
    deleteCategory

}