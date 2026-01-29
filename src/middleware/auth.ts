import type { NextFunction, Request, Response } from "express";
import { auth as betterAuth } from "../lib/auth"


export enum UserRole {
    ADMIN = "ADMIN", SELLER = "SELLER" , CUSTOMER = "CUSTOMER" , 
}
declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string,
                email: string,
                name: string,
                emailVerified: boolean,
                role: string,
                address : string,
                phone : string
            }
        }
    }
}
export const auth = (...roles: UserRole[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        console.log(roles);
        try {
            const session = await betterAuth.api.getSession({
                headers: req.headers as any
            })
            console.log(session);
            if (!session) {
                return res.status(401).json({
                    success: false,
                    message: "Your Are Not Autorized"
                })
            }
            if (!session.user.emailVerified) {
                return res.status(401).json({
                    success: false,
                    message: "Email Verifcation Required. Please verify your email"
                })
            }
            req.user = {
                id: session.user.id,
                email: session.user.email,
                name: session.user.name,
                role: (session.user as any).role as string,
                emailVerified: session.user.emailVerified,
                address : session.user.address  as string,
                phone : session.user.phone  as string
            }
            // checker for admin 
            if (!roles.length && !roles.includes(req.user.role as UserRole)) {
                return res.status(401).json({
                    success: false,
                    message: "Forbidden Access! You Don't have permission for Access"
                })
            }
            next();
        } catch (err) {
            next(err)
        }
    }
}