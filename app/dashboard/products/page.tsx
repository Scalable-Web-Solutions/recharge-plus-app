'use client';

import { useRouter } from 'next/navigation';

export default function ProductsPage() {
  const router = useRouter();

  const products = [
    {
      name: "Lavender Essential Oil",
      description: "Pure lavender oil for relaxation and stress relief",
      price: "$45",
      image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400&h=300&fit=crop&crop=center"
    },
    {
      name: "Meditation Cushion",
      description: "Premium organic cotton meditation cushion",
      price: "$89",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&crop=center"
    },
    {
      name: "Adaptogen Blend",
      description: "Natural stress-reducing supplement blend",
      price: "$65",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop&crop=center"
    },
    {
      name: "Himalayan Salt Lamp",
      description: "Authentic crystal salt lamp for air purification",
      price: "$125",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center"
    }
  ];

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="text-center pt-16 pb-12 px-6">
        <button
          onClick={() => router.push('/dashboard/home')}
          className="inline-flex items-center gap-2 text-gray-text hover:text-navy transition-colors mb-8"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="font-medium">Back</span>
        </button>
        
        <div className="border-t border-b border-navy/20 py-8 mb-8 max-w-md mx-auto">
          <h1 className="text-4xl font-light text-navy tracking-[0.2em] mb-2">WELLNESS SHOP</h1>
          <p className="text-sm text-gray-text font-medium tracking-widest uppercase">Curated Products</p>
        </div>
        <p className="text-xl text-navy font-light leading-relaxed max-w-sm mx-auto">
          Discover premium wellness essentials.
        </p>
      </div>

      {/* Products */}
      <div className="px-6 space-y-4 mb-12">
        {products.map((product, index) => (
          <div
            key={index}
            className="w-full bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden transition-all duration-300 hover:bg-white hover:luxury-shadow-lg luxury-border"
          >
            {/* Product Image */}
            <div className="w-full h-48 bg-gray-100">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Product Info */}
            <div className="p-6 flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-navy mb-1">{product.name}</h3>
                <p className="text-sm text-gray-text leading-relaxed">{product.description}</p>
              </div>
              <div className="text-right ml-4">
                <p className="text-xl font-bold text-navy mb-2">{product.price}</p>
                <button className="bg-transparent border border-navy text-navy px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 hover:bg-navy hover:text-white">
                  Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Continue Shopping Button */}
      <div className="px-6 pb-8">
        <button
          onClick={() => router.push('/dashboard/home')}
          className="w-full bg-transparent border-2 border-navy text-navy py-4 rounded-full text-lg font-semibold tracking-wide transition-all duration-300 hover:bg-navy hover:text-white"
        >
          CONTINUE SHOPPING
        </button>
      </div>
    </div>
  );
}