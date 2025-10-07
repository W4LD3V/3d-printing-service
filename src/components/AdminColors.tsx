"use client";

import { useState } from "react";

export function AdminColors() {
  const [showForm, setShowForm] = useState(false);
  const [editingColor, setEditingColor] = useState<unknown>(null);
  const [formData, setFormData] = useState({
    name: "",
    hexCode: "",
  });

  // TODO: Stop using mock arrays, call the real API instead
  const colors = [
    { id: "1", name: "White", hexCode: "#FFFFFF" },
    { id: "2", name: "Black", hexCode: "#000000" },
    { id: "3", name: "Red", hexCode: "#FF0000" },
    { id: "4", name: "Blue", hexCode: "#0000FF" },
    { id: "5", name: "Green", hexCode: "#00FF00" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    alert("Color saved! (This is a demo)");
    setFormData({ name: "", hexCode: "" });
    setEditingColor(null);
    setShowForm(false);
  };

  const handleEdit = (color: any) => {
    setEditingColor(color);
    setFormData({
      name: color.name,
      hexCode: color.hexCode,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this color?")) {
      alert("Color deleted! (This is a demo)");
    }
  };

  const handleCancel = () => {
    setFormData({ name: "", hexCode: "" });
    setEditingColor(null);
    setShowForm(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Colors</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          Add New Color
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h3 className="text-lg font-medium mb-4">
            {editingColor ? "Edit Color" : "Add New Color"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hex Code
              </label>
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={formData.hexCode}
                  onChange={(e) =>
                    setFormData({ ...formData, hexCode: e.target.value })
                  }
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="#FF0000"
                  required
                />
                <div
                  className="w-12 h-10 border border-gray-300 rounded-md"
                  style={{ backgroundColor: formData.hexCode || "#ffffff" }}
                ></div>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
              >
                {editingColor ? "Update" : "Create"}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Color
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hex Code
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {colors.map((color: any) => (
              <tr key={color.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {color.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div
                    className="w-8 h-8 rounded-full border border-gray-300"
                    style={{ backgroundColor: color.hexCode }}
                  ></div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {color.hexCode}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEdit(color)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(color.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
