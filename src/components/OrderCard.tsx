interface OrderCardProps {
  order: {
    id: string;
    modelUrl: string;
    status: string;
    totalPrice: number;
    createdAt: string;
    plastic: {
      id: string;
      name: string;
      price: number;
    };
    color: {
      id: string;
      name: string;
      hexCode: string;
    };
  };
}

export function OrderCard({ order }: OrderCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "PROCESSING":
        return "bg-blue-100 text-blue-800";
      case "COMPLETED":
        return "bg-green-100 text-green-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Order #{order.id.slice(-8)}
        </h3>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
            order.status
          )}`}
        >
          {order.status}
        </span>
      </div>

      <div className="space-y-3">
        <div>
          <p className="text-sm text-gray-600">Model URL:</p>
          <a
            href={order.modelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 text-sm break-all"
          >
            {order.modelUrl}
          </a>
        </div>

        <div className="flex justify-between">
          <div>
            <p className="text-sm text-gray-600">Plastic:</p>
            <p className="font-medium">{order.plastic.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Color:</p>
            <div className="flex items-center space-x-2">
              <div
                className="w-4 h-4 rounded-full border border-gray-300"
                style={{ backgroundColor: order.color.hexCode }}
              ></div>
              <span className="font-medium">{order.color.name}</span>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Total Price:</span>
            <span className="text-lg font-bold text-gray-900">
              ${order.totalPrice.toFixed(2)}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Created: {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}

