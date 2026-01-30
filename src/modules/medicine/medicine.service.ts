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
}

const createMedicineService = async  (data : CreateMedicineInput) => {
  return await prisma.medicine.create({
    data : {
        name : data.name,
        price : data.price,
        stock : data.stock ?? 0,
        categoryId : data.categoryId,
        sellerId : data.sellerId,
        description : data.description ?? null,
        manufacturer : data.manufacturer,
        dosage : data.dosage ?? null,
        imageUrl : data.imageUrl
    }
  })
} 
 export const medicineService = {
     createMedicineService
 }