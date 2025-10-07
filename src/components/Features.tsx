export function Features() {
  const features = [
    {
      title: "Upload Your Model",
      description:
        "Simply provide a URL to your 3D model file and we'll handle the rest.",
      icon: "📁",
    },
    {
      title: "Choose Materials",
      description:
        "Select from a variety of high-quality plastics and colors for your print.",
      icon: "🎨",
    },
    {
      title: "Track Orders",
      description:
        "Monitor your order status from submission to completion in real-time.",
      icon: "📊",
    },
    {
      title: "Fast Delivery",
      description:
        "Get your custom 3D prints delivered quickly and safely to your door.",
      icon: "🚚",
    },
  ];

  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Our Platform?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We make 3D printing accessible, affordable, and convenient for
            everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-lg hover:shadow-lg transition duration-300"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
