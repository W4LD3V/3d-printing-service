"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Navbar } from "../../components/Navbar";
import { OrderList } from "../../components/OrderList";
import { CreateOrderModal } from "../../components/CreateOrderModal";

export default function OrdersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/auth/signin");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar session={session} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium"
          >
            Create New Order
          </button>
        </div>

        <OrderList userId={session.user?.id || ""} />

        {showCreateModal && (
          <CreateOrderModal
            userId={session.user?.id || ""}
            onClose={() => setShowCreateModal(false)}
          />
        )}
      </div>
    </div>
  );
}
