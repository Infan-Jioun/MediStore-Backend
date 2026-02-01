import { prisma } from "../../lib/prisma"

const getCategory = async () => {
    const category = await prisma.category.findMany({
        orderBy: { name: "asc" }
    })
    if (!category) {
        throw new Error("Category unavilable")
    }
    return category;
}
export const categoryService = {
    getCategory
}