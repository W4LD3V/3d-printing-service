"use client";

import { useState, useEffect } from "react";

interface CreateOrderModalProps {
  userId: string;
  onClose: () => void;
}

export function CreateOrderModal({ userId, onClose }: CreateOrderModalProps) {
  const [formData, setFormData] = useState({
    modelUrl: "",
    plasticId: "",
    colorId: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [plastics, setPlastics] = useState<any[]>([]);
  const [colors, setColors] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [plasticsRes, colorsRes] = await Promise.all([
          fetch("/api/plastics"),
          fetch("/api/colors"),
        ]);

        const plasticsData = await plasticsRes.json();
        const colorsData = await colorsRes.json();

        setPlastics(plasticsData);
        setColors(colorsData);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.modelUrl || !formData.plasticId || !formData.colorId) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          modelUrl: formData.modelUrl,
          plasticId: formData.plasticId,
          colorId: formData.colorId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create order");
      }

      setLoading(false);
      onClose();
      // Refresh the page to show the new order
      window.location.reload();
    } catch (err: any) {
      setError(err.message || "Failed to create order");
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <h2 className="text-xl font-bold mb-4">Create New Order</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="modelUrl"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Model URL
            </label>
            <input
              type="url"
              id="modelUrl"
              name="modelUrl"
              value={formData.modelUrl}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com/model.stl"
              required
            />
          </div>

          <div>
            <label
              htmlFor="plasticId"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Plastic Type
            </label>
            <select
              id="plasticId"
              name="plasticId"
              value={formData.plasticId}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select a plastic type</option>
              {plastics.map((plastic: any) => (
                <option key={plastic.id} value={plastic.id}>
                  {plastic.name} - ${plastic.price}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="colorId"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Color
            </label>
            <select
              id="colorId"
              name="colorId"
              value={formData.colorId}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select a color</option>
              {colors.map((color: any) => (
                <option key={color.id} value={color.id}>
                  {color.name}
                </option>
              ))}
            </select>
          </div>

          {error && <div className="text-red-600 text-sm">{error}</div>}

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Order"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
