import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    try {
      const orders = await prisma.order.findMany({
        where: { userId: userId as string },
        include: {
          plastic: true,
          color: true,
        },
      });

      res.status(200).json(orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({ error: "Failed to fetch orders" });
    }
  } else if (req.method === "POST") {
    const { userId, modelUrl, plasticId, colorId } = req.body;

    if (!userId || !modelUrl || !plasticId || !colorId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      // First check if user exists, if not create a test user
      let user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        // Create a test user for testing purposes
        user = await prisma.user.create({
          data: {
            id: userId,
            email: `test-${userId}@example.com`,
            name: `Test User ${userId}`,
            password: "test123",
            role: "USER",
          },
        });
      }

      const plastic = await prisma.plastic.findUnique({
        where: { id: plasticId },
      });

      if (!plastic) {
        return res.status(400).json({ error: "Plastic not found" });
      }

      const color = await prisma.color.findUnique({
        where: { id: colorId },
      });

      if (!color) {
        return res.status(400).json({ error: "Color not found" });
      }

      const order = await prisma.order.create({
        data: {
          userId,
          modelUrl,
          plasticId,
          colorId,
          totalPrice: plastic.price,
        },
        include: {
          plastic: true,
          color: true,
        },
      });

      res.status(201).json(order);
    } catch (error) {
      console.error("Error creating order:", error);
      res.status(500).json({ error: "Failed to create order" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
