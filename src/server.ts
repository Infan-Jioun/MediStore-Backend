import { app } from "./app";
import { prisma } from "../lib/prisma"
const PORT = process.env.PORT || 5000;
async function main() {
    try {
        console.log("Succesfully Connect to database");
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);

        })
    } catch {
        console.error("Doesn't connect to database");
        await prisma.$disconnect();
        process.exit(1)
    }
}


main();