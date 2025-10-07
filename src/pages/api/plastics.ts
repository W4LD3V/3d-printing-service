import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const plastics = await prisma.plastic.findMany();
      res.status(200).json(plastics);
    } catch (error) {
      console.error("Error fetching plastics:", error);
      res.status(500).json({ error: "Failed to fetch plastics" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
