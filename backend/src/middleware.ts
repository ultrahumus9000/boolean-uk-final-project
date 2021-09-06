import { NextFunction, Request, Response } from "express";
import { validateToken } from "./authgenerator";
import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      currentUser:
        | { id: number; username: string }
        | JwtPayload
        | undefined
        | string;
    }
  }
}

export default (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.cookies;

  let userData = token && validateToken(token);
  userData = {
    id: 2,
    username: "Ceasar.Pollichbcom",
  };
  console.log("line 25", userData);
  if (userData) {
    req.currentUser = userData;
    console.log("line 27", userData);
    next();
  } else {
    res.status(401).json("You need to be logged in to access this data");
  }
};
