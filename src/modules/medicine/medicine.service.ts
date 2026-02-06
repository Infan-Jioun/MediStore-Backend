import { prisma } from "../../lib/prisma"

export interface CreateMedicineInput {
  name: string;
  price: number;
  stock?: number;
  categoryId: string;
  sellerId: string;
  description?: string | null;
  manufacturer: string;
  dosage?: string | null;
  imageUrl: string;
  slug: string;
}

const createMedicineService = async (data: CreateMedicineInput) => {
  return await prisma.medicine.create({
    data: {
      name: data.name,
      price: data.price,
      stock: data.stock ?? 0,
      categoryId: data.categoryId,
      sellerId: data.sellerId,
      description: data.description ?? null,
      manufacturer: data.manufacturer,
      dosage: data.dosage ?? null,
      imageUrl: data.imageUrl,
      slug: data.slug
    }
  })
}
const getAllMedicines = async () => {
  return await prisma.medicine.findMany({
    include: {
      seller: {
        select: { id: true, email: true, name: true },
      },
      category: {
        select: {
          id: true, name: true

        }
      }
    },
    orderBy: { createdAt: "desc" }
  })
}
const getMedicinedById = async (id: string) => {
  const medcine = await prisma.medicine.findUniqueOrThrow({
    where: { id },
    include: {
      category: true,
      seller: {
        select: {
          id: true,
          name: true
        }
      }
    }
  })
  if (!medcine) {
    throw new Error("Medinens not found....")
  }
  return medcine;
}
export const medicineService = {
  createMedicineService,
  getAllMedicines,
  getMedicinedById
}