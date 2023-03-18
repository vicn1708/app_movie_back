import { NextFunction, Request, Response } from "express";

export const Role = {
  checkAdminRole(req: Request, res: Response, next: NextFunction) {
    if (req.user && req.user.role === "admin") {
      return next(); // the user has the admin role, continue with the next middleware function
    } else {
      return res.status(401).json({ message: "Unauthorized" }); // the user doesn't have the admin role, return an error response
    }
  },
};
