// lib/session.ts
import { SessionOptions, getIronSession } from "iron-session";
import { NextApiRequest, NextApiResponse } from "next";

export type UserSession = {
  id?: string;
  email?: string;
  token?: string;
};

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET as string,
  cookieName: "guaranty_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

// helper pour accéder à la session depuis une API route
export function getSession(req: NextApiRequest, res: NextApiResponse) {
  return getIronSession<UserSession>(req, res, sessionOptions);
}