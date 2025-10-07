import Link from "next/link";

export function Hero() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Bring Your 3D Models to Life
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Upload your 3D model, choose your plastic and color, and get your
            custom 3D prints delivered to your door.
          </p>
          <div className="space-x-4">
            <Link
              href="/auth/signup"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg text-lg font-semibold transition duration-300"
            >
              Get Started
            </Link>
            <Link
              href="/orders"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold transition duration-300"
            >
              View Orders
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
