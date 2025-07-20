import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "@/lib/session";

import type { IronSession } from "iron-session";
import type { UserSession } from "@/lib/session"; // adjust the import path if needed

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== "POST") {
		return res.status(405).json({ message: "Method not allowed" });
	}

	const { token } = req.body;

	if (!token) {
		return res.status(400).json({ message: "Token is missing" });
	}

	fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error("Failed to fetch user");
			}
			return response.json();
		})
		.then(async (user) => {
			const session: IronSession<UserSession> = await getSession(req, res);

      session.token = token;
			session.id = user.id;
      session.email = user.email;
      session.fullName = user.fullName;
      session.emailVerified = user.emailVerified;

			await session.save();
			return res.status(200).json({ message: "Login successful" });
		})
		.catch((error) => {
			return res.status(500).json({ message: error.message });
		});
}
