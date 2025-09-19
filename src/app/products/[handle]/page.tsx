'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { getProductByHandle, getRelatedProducts, formatPrice, Product } from '../../../utils/products';
import { useParallax } from '@/hooks/useParallax';
import '@/styles/product-parallax.css';

export default function ProductPage() {
  const params = useParams();
  const handle = Array.isArray(params.handle) ? params.handle[0] : params.handle;
  
  const [selectedImage, setSelectedImage] = useState<string>('')
  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const { scrollY, isScrolling, hasReachedPhotoLimit, photoLimit } = useParallax()
  
  useEffect(() => {
    if (handle) {
      const productData = getProductByHandle(handle);
      if (productData) {
        setProduct(productData);
        setSelectedImage(productData.images[0] || '');
        
        // Carregar produtos relacionados
        const related = getRelatedProducts(handle, 4);
        setRelatedProducts(related);
      }
    }
  }, [handle]);
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center p-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-xl font-medium text-gray-900 mb-2">Produto não encontrado</h1>
            <p className="text-gray-500 mb-6">O produto que você está procurando não existe ou foi removido.</p>
            <Link href="/products" className="inline-block bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors">
              Ver todos os produtos
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="parallax-container">
      {/* Seção da foto com header e breadcrumb integrados */}
      <section className="photo-section">
        {/* Header integrado na foto */}
        <div className="header-overlay">
          <Header />
        </div>
        
        {/* Breadcrumb sobreposto na foto */}
        <div className="breadcrumb-overlay">
          <div className="container mx-auto px-4">
            <nav className="flex items-center space-x-2 text-sm">
              <Link href="/" className="text-white/80 hover:text-white transition-colors">
                Início
              </Link>
              <span className="text-white/60">/</span>
              <Link href="/products" className="text-white/80 hover:text-white transition-colors">
                Produtos
              </Link>
              <span className="text-white/60">/</span>
              <span className="text-white font-medium">{product.title}</span>
            </nav>
          </div>
        </div>

        {/* Container das imagens */}
        <div className="product-images-container">
          <div className="max-w-2xl w-full">
            {/* Imagem principal */}
            <div className="relative aspect-square mb-4">
              {selectedImage ? (
                <Image
                  src={selectedImage}
                  alt={product.title}
                  fill
                  className="object-cover rounded-lg"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
                  <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
            
            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-2 justify-center">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(image)}
                    className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === image ? 'border-white' : 'border-white/30'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Seção de conteúdo */}
      <section className="product-content-section">
        <div className="max-w-4xl pb-12">
          {/* Drag Handle */}
          <div className="flex justify-center">
            <div className="drag-handle"></div>
          </div>

          {/* Brand */}
          <div className="text-sm text-gray-500 uppercase tracking-wide mb-2 text-center">
            {product.primary_brand}
          </div>
          
          {/* Title */}
          <h1 className="product-title">
            {product.title}
          </h1>
          
          {/* Price */}
          <div className="product-price">
            {product.price > 0 ? (
              <div>
                {formatPrice(product.price, product.currency)}
              </div>
            ) : (
              <div className="text-2xl font-medium text-green-600">
                Sonderangebot
              </div>
            )}
          </div>
          
          {/* Description */}
          <div className="prose prose-lg text-gray-700 mb-8 text-left max-w-2xl mx-auto">
            <p>{product.description}</p>
          </div>
          
          {/* Category & Gender */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <span className="px-4 py-2 bg-gray-100 text-gray-800 text-sm rounded-full">
              {product.category.name}
            </span>
            <span className="px-4 py-2 bg-gray-100 text-gray-800 text-sm rounded-full">
              {product.category.gender === 'unisex' ? 'Unisex' : 
               product.category.gender === 'men' ? 'Herren' : 'Damen'}
            </span>
          </div>
          
          {/* Shipping Info */}
          <div className="border-t border-gray-200 pt-8 text-center">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
              <span>
                {product.availability.in_stock ? 
                  `Lieferzeit: ${product.availability.shipping_time}` : 
                  'Derzeit nicht verfügbar'}
              </span>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-medium text-gray-900 mb-8 text-center">Das könnte Ihnen auch gefallen</h2>
              <div className="related-products-grid">
                {relatedProducts.map((relatedProduct) => (
                  <Link 
                    key={relatedProduct.id} 
                    href={`/products/${relatedProduct.handle}`}
                    className="related-product-card group"
                  >
                    {/* Product Image */}
                    <div className="aspect-square relative overflow-hidden rounded-lg">
                      {relatedProduct.images && relatedProduct.images.length > 0 ? (
                        <Image
                          src={relatedProduct.images[0]}
                          alt={relatedProduct.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100">
                          <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                    
                    {/* Product Info */}
                    <div className="p-4">
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                        {relatedProduct.primary_brand}
                      </p>
                      <h3 className="font-medium text-sm text-gray-900 mb-1 line-clamp-2">
                        {relatedProduct.title}
                      </h3>
                      <div className="text-sm font-medium text-gray-900">
                        {formatPrice(relatedProduct.price, relatedProduct.currency)}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
          
          {/* Footer integrado na seção de conteúdo */}
          <Footer />
        </div>
      </section>

      {/* Botão Add to Cart fixo na parte inferior */}
      <div className="fixed-cart-button">
        <button className="fixed-add-to-cart-button">
          <span className="flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6M17 21a2 2 0 100-4 2 2 0 000 4zM9 21a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
            In den Warenkorb - {formatPrice(product.price)}
          </span>
        </button>
      </div>
    </div>
  );
}