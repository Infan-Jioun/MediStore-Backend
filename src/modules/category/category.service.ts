import { prisma } from "../../lib/prisma"

export interface CreateCategoryInput {
    name: string
    slug: string
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
export const categoryService = {
    createCategoryService,
    getCategoryService
} 