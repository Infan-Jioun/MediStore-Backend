import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
// If your Prisma file is located elsewhere, you can change the path
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  // trustedOrigins: [process.env.APP_URL! || "https://medi-stores-backend.vercel.app"],
  trustedOrigins: async (request) => {
    const origin = request?.headers.get("origin");

    const allowedOrigins = [
      process.env.APP_URL! || "https://medi-store-frontend-seven.vercel.app",
      process.env.BETTER_AUTH_URL! || "https://medi-stores-backend.vercel.app",
      "http://localhost:3000",
      "http://localhost:5000",
      "https://medi-store-frontend-seven.vercel.app",
      "https://medi-stores-backend.vercel.app",
    ].filter(Boolean);


    if (
      !origin ||
      allowedOrigins.includes(origin) ||
      /^https:\/\/.*\.vercel\.app$/.test(origin)
    ) {
      return [origin];
    }

    return [];
  },
  basePath: "/api/auth",
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
  // cookies: {
  //   secure: true,
  //   sameSite: "none",
  //   httpOnly: true,
  //   path: "/"
  // },

  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minutes
    },
  },
  advanced: {
    cookiePrefix: "better-auth",
    useSecureCookies: process.env.NODE_ENV === "production",
    crossSubDomainCookies: {
      enabled: false,
    },
    disableCSRFCheck: true,
  },
  crossSubDomainCookies: {
    enabled: false,
  },
  disableCSRFCheck: {
    disableCSRFCheck: true
  },
  emailAndPassword: {
    enabled: true,
  },
});