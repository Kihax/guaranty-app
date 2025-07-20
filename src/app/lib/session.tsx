// lib/session.ts
import { SessionOptions, getIronSession } from "iron-session";
import { NextApiRequest, NextApiResponse } from "next";

export type UserSession = {
  id?: number;
  email?: string;
  token?: string;
  fullName?: string;
  emailVerified?: boolean;
};

export const sessionOptions: SessionOptions = {
  password: process.env.NEXT_ENCRYPTION_KEY as string,
  cookieName: "guaranty_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

// helper pour accéder à la session depuis une API route
export function getSession(req: NextApiRequest, res: NextApiResponse) {
  return getIronSession<UserSession>(req, res, sessionOptions);
}