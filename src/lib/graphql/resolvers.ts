import { prisma } from "../prisma";
import bcrypt from "bcryptjs";

export const resolvers = {
  Query: {
    users: async () => {
      return await prisma.user.findMany({
        include: {
          orders: true,
        },
      });
    },
    user: async (_: any, { id }: { id: string }) => {
      return await prisma.user.findUnique({
        where: { id },
        include: {
          orders: {
            include: {
              plastic: true,
              color: true,
            },
          },
        },
      });
    },
    orders: async () => {
      return await prisma.order.findMany({
        include: {
          user: true,
          plastic: true,
          color: true,
        },
      });
    },
    order: async (_: any, { id }: { id: string }) => {
      return await prisma.order.findUnique({
        where: { id },
        include: {
          user: true,
          plastic: true,
          color: true,
        },
      });
    },
    userOrders: async (_: any, { userId }: { userId: string }) => {
      return await prisma.order.findMany({
        where: { userId },
        include: {
          plastic: true,
          color: true,
        },
      });
    },
    plastics: async () => {
      return await prisma.plastic.findMany({
        include: {
          orders: true,
        },
      });
    },
    plastic: async (_: any, { id }: { id: string }) => {
      return await prisma.plastic.findUnique({
        where: { id },
        include: {
          orders: true,
        },
      });
    },
    colors: async () => {
      return await prisma.color.findMany({
        include: {
          orders: true,
        },
      });
    },
    color: async (_: any, { id }: { id: string }) => {
      return await prisma.color.findUnique({
        where: { id },
        include: {
          orders: true,
        },
      });
    },
  },
  Mutation: {
    createUser: async (
      _: any,
      {
        email,
        name,
        password,
      }: { email: string; name?: string; password: string }
    ) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      return await prisma.user.create({
        data: {
          email,
          name,
          password: hashedPassword,
        },
      });
    },
    updateUser: async (
      _: any,
      { id, email, name }: { id: string; email?: string; name?: string }
    ) => {
      return await prisma.user.update({
        where: { id },
        data: {
          ...(email && { email }),
          ...(name && { name }),
        },
      });
    },
    deleteUser: async (_: any, { id }: { id: string }) => {
      await prisma.user.delete({
        where: { id },
      });
      return true;
    },
    createOrder: async (
      _: any,
      {
        userId,
        modelUrl,
        plasticId,
        colorId,
      }: {
        userId: string;
        modelUrl: string;
        plasticId: string;
        colorId: string;
      }
    ) => {
      const plastic = await prisma.plastic.findUnique({
        where: { id: plasticId },
      });
      if (!plastic) throw new Error("Plastic not found");

      return await prisma.order.create({
        data: {
          userId,
          modelUrl,
          plasticId,
          colorId,
          totalPrice: plastic.price,
        },
        include: {
          user: true,
          plastic: true,
          color: true,
        },
      });
    },
    updateOrder: async (
      _: any,
      { id, status }: { id: string; status?: string }
    ) => {
      return await prisma.order.update({
        where: { id },
        data: {
          ...(status && { status: status as any }),
        },
        include: {
          user: true,
          plastic: true,
          color: true,
        },
      });
    },
    deleteOrder: async (_: any, { id }: { id: string }) => {
      await prisma.order.delete({
        where: { id },
      });
      return true;
    },
    createPlastic: async (
      _: any,
      {
        name,
        price,
        description,
      }: { name: string; price: number; description?: string }
    ) => {
      return await prisma.plastic.create({
        data: {
          name,
          price,
          description,
        },
      });
    },
    updatePlastic: async (
      _: any,
      {
        id,
        name,
        price,
        description,
      }: { id: string; name?: string; price?: number; description?: string }
    ) => {
      return await prisma.plastic.update({
        where: { id },
        data: {
          ...(name && { name }),
          ...(price && { price }),
          ...(description && { description }),
        },
      });
    },
    deletePlastic: async (_: any, { id }: { id: string }) => {
      await prisma.plastic.delete({
        where: { id },
      });
      return true;
    },
    createColor: async (
      _: any,
      { name, hexCode }: { name: string; hexCode: string }
    ) => {
      return await prisma.color.create({
        data: {
          name,
          hexCode,
        },
      });
    },
    updateColor: async (
      _: any,
      { id, name, hexCode }: { id: string; name?: string; hexCode?: string }
    ) => {
      return await prisma.color.update({
        where: { id },
        data: {
          ...(name && { name }),
          ...(hexCode && { hexCode }),
        },
      });
    },
    deleteColor: async (_: any, { id }: { id: string }) => {
      await prisma.color.delete({
        where: { id },
      });
      return true;
    },
  },
};
