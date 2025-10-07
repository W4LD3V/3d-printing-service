"use client";

import { OrderCard } from "./OrderCard";

interface OrderListProps {
  userId: string;
}

export function OrderList({ userId }: OrderListProps) {
  // Mock data for now - replace with actual API calls later
  const orders: any[] = [];

  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg mb-4">No orders yet</div>
        <p className="text-gray-400">Create your first order to get started!</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {orders.map((order: any) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
}
