import { NextFunction, Request, Response } from "express";
import { authenticateUser } from "./auth.service.js";
import { Errors } from "@common/utils/errors.js";

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token: string | undefined;

  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies?.accessToken) {
    token = req.cookies.accessToken;
  }

  if (!token) {
    return next(
      // new AppError(HTTP_STATUS.UNAUTHORIZED, "You are not logged in")
      Errors.unauthorized("You are not logged in."),
    );
  }

  try {
    const user = await authenticateUser(token);

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

export const requireVerification = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user?.isVerified) {
    return next(Errors.forbidden("Please verify your email address."));
  }
  next();
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (
    req.user &&
    req.user.role === "ADMIN"
    // || req.user.role === "MODERATOR"
  ) {
    next();
  } else {
    throw Errors.forbidden("Access denied. Admins only.");
  }
};

export const isModerator = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && (req.user.role === "MODERATOR" || req.user.role === "ADMIN")) {
    next();
  } else {
    throw Errors.forbidden("Access denied. Moderators or Admins only.");
  }
};

// Utility to compare role hierarchy: ADMIN > MODERATOR > USER
export const roleRank = (role: string | undefined) => {
  switch (role) {
    case "ADMIN":
      return 3;
    case "MODERATOR":
      return 2;
    case "USER":
    default:
      return 1;
  }
};
