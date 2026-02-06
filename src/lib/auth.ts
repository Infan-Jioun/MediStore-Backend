import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
// If your Prisma file is located elsewhere, you can change the path
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  trustedOrigins: [process.env.APP_URL! || "http://localhost:5000"],

  user: {
    additionalFields: {
      address: {
        type: "string",
        required: false
      },
      phone: {
        type: "string",
        required: false
      },
      role: {
        type: "string",
        defaultValue: "CUSTOMER",
        required: false
      },
      isBanned: {
        type: "string",
        defaultValue: "ACTIVE",
        required: false
      }
    }

  },
  cookies: {
    secure: true,
    sameSite: "none",
    httpOnly: true,
    path: "/"

  },
  emailAndPassword: {
    enabled: true,
  },
});