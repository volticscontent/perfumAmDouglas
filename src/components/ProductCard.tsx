'use client';

import Link from 'next/link';
import { Perfume } from '@/data/perfumes';

interface ProductCardProps {
  perfume: Perfume;
}

const ProductCard = ({ perfume }: ProductCardProps) => {
  const discountPercentage = perfume.discount;
  const pricePerLiter = (perfume.currentPrice / parseFloat(perfume.size.replace(' ml', ''))) * 1000;

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
      <Link href={`/product/${perfume.slug}`}>
        <div className="relative">
          {/* Product Image */}
          <div className="aspect-square bg-gray-50 flex items-center justify-center p-4">
            <div className="w-32 h-32 bg-gradient-to-br from-pink-100 to-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-gray-400 text-xs text-center">
                {perfume.brand}<br/>{perfume.name}
              </span>
            </div>
          </div>

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {discountPercentage && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                -{discountPercentage}%
              </span>
            )}
            {perfume.isGift && (
              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">
                Geschenk
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gray-50">
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>

        {/* Product Info */}
        <div className="p-4">
          {/* Product Type and Gender */}
          <div className="font-thin text-gray-500 mb-1">
            {perfume.type} für {perfume.gender}
          </div>

          {/* Brand and Product Name */}
          <div className="mb-2">
            <div className="font-thin text-gray-900 mb-1">
              {perfume.brand}
            </div>
            <div className="font-thin text-gray-700">
              {perfume.name}
            </div>
            <div className="font-thin text-gray-500">
              {perfume.type}
            </div>
          </div>

          {/* Price */}
          <div className="mb-3">
            <div className="flex items-center gap-2 mb-1">
              {perfume.originalPrice !== perfume.currentPrice && (
                <span className="font-thin text-gray-400 line-through">
                  {perfume.originalPrice.toFixed(2)} €
                </span>
              )}
              <span className="font-thin text-black">
                {perfume.currentPrice.toFixed(2)} €
              </span>
            </div>
            <div className="font-thin text-gray-500">
              {perfume.size} ({pricePerLiter.toFixed(2)} € / 1 l)
            </div>
          </div>

          {/* Add to Cart Button */}
          <button className="w-full bg-black text-white py-2 px-4 rounded font-thin hover:bg-gray-800 transition-colors duration-200">
            In den Warenkorb
          </button>

          {/* Quick Actions */}
          <div className="flex justify-between items-center mt-3 font-thin">
            <button className="text-gray-600 hover:text-black flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Ansehen
            </button>
            <button className="text-gray-600 hover:text-black flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
              Teilen
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;