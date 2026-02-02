import type { Request, Response } from "express"
export const getMe = async (req: Request, res: Response) => {
    if (!req.user) {
        return res.status(401).json({
            message: "Not authenticated",
        });
    }

    res.status(200).json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
        phone: req.user.phone,
        address: req.user.address,
    });
};
