import { prisma } from "../lib/prisma";
import bcrypt from "bcryptjs";
import { UserRole } from "../middleware/auth";

async function seedAdmin() {
    try {
        const email = "admin@admin1234.com";

        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            console.log("Admin already exists");
            return;
        }

        // const hashedPassword = await bcrypt.hash("admin123456", 10);

        await prisma.user.create({
            data: {
                name: "Admin",
                email,
                // password: hashedPassword,
                role: UserRole.ADMIN,
                emailVerified: true,
            },
        });

        console.log("Admin created successfully");
    } catch (error) {
        console.error(" Admin seed failed:", error);
    } finally {
        await prisma.$disconnect();
    }
}

seedAdmin();
