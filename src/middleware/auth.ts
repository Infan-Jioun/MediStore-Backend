import type { NextFunction, Request, Response } from "express";
import { auth as betterAuth } from "../lib/auth";

export enum UserRole {
    ADMIN = "ADMIN",
    SELLER = "SELLER",
    CUSTOMER = "CUSTOMER",
}

// Extend Express Request type
declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                email: string;
                name: string;
                emailVerified: boolean;
                role: UserRole;
                address: string;
                phone: string;
            };
        }
    }
}

// Auth middleware
export const auth = (...roles: UserRole[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Get session from betterAuth
            const session = await betterAuth.api.getSession({
                headers: req.headers as any,
            });

            // No session => not logged in
            if (!session) {
                return res.status(401).json({
                    success: false,
                    message: "You are not authorized",
                });
            }

            // Email not verified
            if (!session.user.emailVerified) {
                return res.status(401).json({
                    success: false,
                    message: "Email verification required",
                });
            }

            // Make sure role exists in session
            const userRole = (session.user as any).role as UserRole;
            if (!userRole) {
                return res.status(403).json({
                    success: false,
                    message: "User role not found in session",
                });
            }

            // Attach user to req
            req.user = {
                id: session.user.id,
                email: session.user.email,
                name: session.user.name,
                role: userRole,
                emailVerified: session.user.emailVerified,
                address: session.user.address ?? "",
                phone: session.user.phone ?? "",
            };

            // Role check
            // if (roles.length && !roles.includes(req.user.role)) {
            //     return res.status(403).json({
            //         success: false,
            //         message: "Forbidden access! You don't have permission",
            //     });
            // }

            // All good, next middleware/controller
            next();
        } catch (err) {
            console.error("Auth middleware error:", err);
            next(err);
        }
    };
};
