import { ENV } from "@config/env.js";
import { Response } from "express";

export const setTokenCookie = (
  res: Response,
  name: "accessToken" | "refreshToken",
  token: string,
  expiresInSeconds: number,
) => {
  const isProduction = ENV.NODE_ENV === "production";
  res.cookie(name, token, {
    httpOnly: true, // XSS protection
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax", // CSRF protection for modern browsers
    maxAge: expiresInSeconds * 1000, // Convert to milliseconds
  });
};
