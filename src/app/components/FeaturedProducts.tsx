'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

const products = [
{
  id: 1,
  name: 'HydraGlow Serum',
  category: 'Serums',
  price: 48,
  rating: 4.9,
  reviews: 312,
  badge: 'Bestseller',
  image: "https://images.unsplash.com/photo-1656147962464-5060440361c4",
  alt: 'Clear glass dropper serum bottle with gold cap surrounded by aloe vera leaves on sage green background'
},
{
  id: 2,
  name: 'Rose Hip Oil',
  category: 'Oils',
  price: 36,
  rating: 4.8,
  reviews: 218,
  badge: 'New',
  image: "https://images.unsplash.com/photo-1644641811682-0439fd0185d0",
  alt: 'Amber glass dropper bottle with rosehip oil beside dried rose petals on cream linen'
},
{
  id: 3,
  name: 'Bamboo Scrub',
  category: 'Scrubs',
  price: 28,
  rating: 4.7,
  reviews: 189,
  badge: null,
  image: "https://images.unsplash.com/photo-1626636380419-3d0e55b9a032",
  alt: 'Open bamboo jar of green exfoliating scrub beside fresh eucalyptus and bamboo stalks'
},
{
  id: 4,
  name: 'Green Tea Toner',
  category: 'Toners',
  price: 24,
  rating: 4.8,
  reviews: 274,
  badge: 'Fan Fave',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_19827f612-1772648183994.png",
  alt: 'Frosted glass spray bottle with green tea toner beside fresh green tea leaves on white marble'
},
{
  id: 5,
  name: 'Vitamin C Cream',
  category: 'Moisturizers',
  price: 52,
  rating: 4.9,
  reviews: 401,
  badge: 'Top Rated',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_187a63991-1772732306826.png",
  alt: 'White ceramic jar of vitamin C brightening cream beside sliced oranges on light wood surface'
},
{
  id: 6,
  name: 'Aloe Vera Gel',
  category: 'Moisturizers',
  price: 18,
  rating: 4.6,
  reviews: 156,
  badge: null,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_139d01340-1772071544003.png",
  alt: 'Clear blue gel jar with fresh aloe vera plant cutting beside it on white background'
}];


export default function FeaturedProducts() {
  const [wishlist, setWishlist] = useState<number[]>([]);

  const toggleWishlist = (id: number) => {
    setWishlist((prev) => prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id]);
  };

  return (
    <section className="py-20 px-4 sm:px-6 bg-muted/40">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.4em] text-primary block mb-3">
              Featured Collection
            </span>
            <h2 className="text-display font-extrabold text-foreground tracking-tight">
              Nature's Best,<br />
              <span className="text-primary italic font-light">Carefully Curated.</span>
            </h2>
          </div>
          <Link
            href="/products"
            className="flex items-center gap-2 text-sm font-bold text-primary hover:gap-3 transition-all">
            
            View All Products
            <Icon name="ArrowRightIcon" size={16} className="text-primary" />
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) =>
          <div
            key={product.id}
            className="bg-card rounded-3xl overflow-hidden border border-border product-card-hover group">
            
              {/* Image */}
              <Link href={`/product/${product.id}`} className="block">
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <AppImage
                  src={product.image}
                  alt={product.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700" />
                
                  {product.badge &&
                <span className="absolute top-3 left-3 badge-eco px-3 py-1 rounded-full text-xs font-bold">
                      {product.badge}
                    </span>
                }
                  <button
                  onClick={(e) => { e.preventDefault(); toggleWishlist(product.id); }}
                  className="absolute top-3 right-3 w-9 h-9 rounded-full glass-card flex items-center justify-center transition-all hover:scale-110"
                  aria-label={`${wishlist.includes(product.id) ? 'Remove from' : 'Add to'} wishlist`}>
                  
                    <Icon
                    name="HeartIcon"
                    size={16}
                    variant={wishlist.includes(product.id) ? 'solid' : 'outline'}
                    className={wishlist.includes(product.id) ? 'text-red-500' : 'text-muted-foreground'} />
                  
                  </button>
                </div>

                {/* Content */}
                <div className="p-5">
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">
                    {product.category}
                  </p>
                  <h3 className="text-base font-bold text-foreground mb-2">{product.name}</h3>
                  <div className="flex items-center gap-1.5 mb-4">
                    <Icon name="StarIcon" size={14} variant="solid" className="text-amber-400" />
                    <span className="text-sm font-bold text-foreground">{product.rating}</span>
                    <span className="text-xs text-muted-foreground">({product.reviews})</span>
                  </div>
                </div>
              </Link>
              <div className="px-5 pb-5 flex items-center justify-between -mt-2">
                <span className="text-xl font-extrabold text-foreground">${product.price}</span>
                <Link
                href="/cart"
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-full text-xs font-bold tracking-wide hover:bg-primary/90 transition-all">
                
                  <Icon name="ShoppingBagIcon" size={14} className="text-primary-foreground" />
                  Add to Cart
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

}