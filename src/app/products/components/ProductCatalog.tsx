'use client';
import React, { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

const allProducts = [
{ id: 1, name: 'HydraGlow Serum', category: 'Serums', price: 48, rating: 4.9, reviews: 312, badge: 'Bestseller', image: 'https://images.unsplash.com/photo-1656147962464-5060440361c4', alt: 'Clear glass dropper serum bottle with gold cap surrounded by aloe vera leaves on sage green background' },
{ id: 2, name: 'Rose Hip Oil', category: 'Oils', price: 36, rating: 4.8, reviews: 218, badge: 'New', image: 'https://images.unsplash.com/photo-1644641811682-0439fd0185d0', alt: 'Amber glass dropper bottle with rosehip oil beside dried rose petals on cream linen' },
{ id: 3, name: 'Bamboo Scrub', category: 'Scrubs', price: 28, rating: 4.7, reviews: 189, badge: null, image: 'https://images.unsplash.com/photo-1575853106858-9f065c79bbf2', alt: 'Open bamboo jar of green exfoliating scrub beside fresh eucalyptus and bamboo stalks' },
{ id: 4, name: 'Green Tea Toner', category: 'Toners', price: 24, rating: 4.8, reviews: 274, badge: 'Fan Fave', image: 'https://img.rocket.new/generatedImages/rocket_gen_img_19827f612-1772648183994.png', alt: 'Frosted glass spray bottle with green tea toner beside fresh green tea leaves on white marble' },
{ id: 5, name: 'Vitamin C Cream', category: 'Moisturizers', price: 52, rating: 4.9, reviews: 401, badge: 'Top Rated', image: 'https://img.rocket.new/generatedImages/rocket_gen_img_187a63991-1772732306826.png', alt: 'White ceramic jar of vitamin C brightening cream beside sliced oranges on light wood surface' },
{ id: 6, name: 'Aloe Vera Gel', category: 'Moisturizers', price: 18, rating: 4.6, reviews: 156, badge: null, image: 'https://img.rocket.new/generatedImages/rocket_gen_img_139d01340-1772071544003.png', alt: 'Clear blue gel jar with fresh aloe vera plant cutting beside it on white background' },
{ id: 7, name: 'Niacinamide Serum', category: 'Serums', price: 42, rating: 4.8, reviews: 287, badge: null, image: 'https://images.unsplash.com/photo-1695632918788-cfb29b9a0de8', alt: 'Sleek white serum bottle with minimalist label on clean white marble surface' },
{ id: 8, name: 'Jojoba Face Oil', category: 'Oils', price: 32, rating: 4.7, reviews: 143, badge: null, image: 'https://images.unsplash.com/photo-1637524725461-bff1afdb946e', alt: 'Golden jojoba oil in small glass bottle beside dried botanicals on wooden tray' },
{ id: 9, name: 'Clay Detox Mask', category: 'Masks', price: 34, rating: 4.8, reviews: 231, badge: 'New', image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1bb298f2f-1772073735691.png', alt: 'Grey clay mask jar beside kaolin clay powder and eucalyptus leaves on slate surface' },
{ id: 10, name: 'SPF 50 Sunscreen', category: 'Moisturizers', price: 38, rating: 4.9, reviews: 502, badge: 'Bestseller', image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1b34f185c-1770660070631.png', alt: 'White mineral sunscreen tube beside tropical leaves on bright white background' },
{ id: 11, name: 'Retinol Night Cream', category: 'Moisturizers', price: 58, rating: 4.7, reviews: 178, badge: null, image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1ff6c0679-1765104987808.png', alt: 'Deep navy night cream jar with gold lid on dark background with scattered botanicals' },
{ id: 12, name: 'Micellar Water', category: 'Toners', price: 22, rating: 4.6, reviews: 197, badge: null, image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1123b7038-1772071556621.png', alt: 'Large clear bottle of micellar cleansing water beside cotton pads on white surface' },
{ id: 13, name: 'Honey & Shea Lip Balm', category: 'Lip Balms', price: 12, rating: 4.9, reviews: 324, badge: 'Bestseller', image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1bf0ba2b5-1772072310275.png', alt: 'Small round tin of honey and shea butter lip balm beside honeycomb and dried flowers on wooden surface' },
{ id: 14, name: 'Peppermint Lip Balm', category: 'Lip Balms', price: 10, rating: 4.8, reviews: 211, badge: 'New', image: "https://img.rocket.new/generatedImages/rocket_gen_img_1a1bd1c1a-1779386249654.png", alt: 'Slim tube of peppermint lip balm beside fresh mint leaves on light green background' },
{ id: 15, name: 'Rose Petal Lip Butter', category: 'Lip Balms', price: 14, rating: 4.7, reviews: 178, badge: null, image: 'https://img.rocket.new/generatedImages/rocket_gen_img_12dcf4cb2-1772072287430.png', alt: 'Pink glass pot of rose petal lip butter beside dried rose petals on marble surface' },
{ id: 16, name: 'SPF 30 Tinted Lip Balm', category: 'Lip Balms', price: 16, rating: 4.8, reviews: 143, badge: 'Fan Fave', image: "https://img.rocket.new/generatedImages/rocket_gen_img_1f50b445e-1779386253356.png", alt: 'Tinted lip balm stick in coral shade beside tropical flowers on white background' },
{ id: 17, name: 'Dot & Key Ceramide + Peptide Lip Balm SPF 50+', category: 'Lip Balms', price: 18, rating: 4.8, reviews: 267, badge: 'New', image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1bbdd23e9-1772472765055.png', alt: 'Dot & Key ceramide peptide lip balm tube with SPF 50 protection on clean white background' },
{ id: 18, name: 'Dot & Key Watermelon Cooling Lip Balm', category: 'Lip Balms', price: 15, rating: 4.7, reviews: 198, badge: null, image: 'https://images.unsplash.com/photo-1596578424344-d3dbd191ed8c', alt: 'Pink watermelon flavored cooling lip balm tube beside fresh watermelon slices on light background' },
{ id: 19, name: 'Dot & Key Vitamin C Brightening Lip Balm', category: 'Lip Balms', price: 16, rating: 4.9, reviews: 312, badge: 'Bestseller', image: 'https://img.rocket.new/generatedImages/rocket_gen_img_19565fc92-1774527881050.png', alt: 'Bright yellow vitamin C lip balm tube beside orange slices on white marble surface' },
{ id: 20, name: 'Dot & Key Berry Tinted Lip Balm', category: 'Lip Balms', price: 17, rating: 4.6, reviews: 154, badge: null, image: 'https://images.unsplash.com/photo-1692873870035-998829add598', alt: 'Berry tinted lip balm stick in deep pink shade beside fresh berries on wooden surface' },
{ id: 21, name: 'Dot & Key Overnight Lip Mask', category: 'Lip Balms', price: 22, rating: 4.8, reviews: 221, badge: 'Fan Fave', image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1c16e5275-1772158643250.png', alt: 'Small glass pot of overnight lip mask with pink lid on marble surface beside rose petals' },
{ id: 22, name: 'Mars Hydrating Lip Balm SPF 15', category: 'Lip Balms', price: 14, rating: 4.7, reviews: 189, badge: null, image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1e82ea22a-1779385478527.png', alt: 'Mars hydrating lip balm stick with SPF 15 protection on clean pastel background' },
{ id: 23, name: 'Mars Tinted Strawberry Lip Balm', category: 'Lip Balms', price: 13, rating: 4.8, reviews: 243, badge: 'New', image: 'https://images.unsplash.com/photo-1719228245321-f7b2107e0942', alt: 'Mars strawberry tinted lip balm in red-pink shade beside fresh strawberries on white surface' },
{ id: 24, name: 'Mars Matte Lip Balm', category: 'Lip Balms', price: 15, rating: 4.6, reviews: 167, badge: null, image: 'https://img.rocket.new/generatedImages/rocket_gen_img_10c67ba33-1766108830918.png', alt: 'Mars matte finish lip balm stick in nude shade on minimalist white background' },
{ id: 25, name: 'Mars Vitamin E Nourishing Lip Balm', category: 'Lip Balms', price: 12, rating: 4.9, reviews: 298, badge: 'Bestseller', image: 'https://img.rocket.new/generatedImages/rocket_gen_img_18e946388-1779385478713.png', alt: 'Mars vitamin E lip balm tube with nourishing formula beside almond oil on wooden tray' },
{ id: 26, name: 'Lakmē Lip Love Lip Mask', category: 'Lip Balms', price: 19, rating: 4.8, reviews: 334, badge: 'New', image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1b9d81388-1772773985479.png', alt: 'Lakme Lip Love lip mask jar with moisturizing formula on pink background beside rose petals' },
{ id: 27, name: 'Lakmē Lip Love Lip Scrub', category: 'Lip Balms', price: 19, rating: 4.7, reviews: 276, badge: null, image: 'https://images.unsplash.com/photo-1626636380419-3d0e55b9a032', alt: 'Lakme Lip Love exfoliating lip scrub jar with sugar crystals on white marble surface' },
{ id: 28, name: 'Lakmē Lip Love Lip & Cheek Tint', category: 'Lip Balms', price: 17, rating: 4.6, reviews: 198, badge: null, image: 'https://images.unsplash.com/photo-1654828819719-b38d729ed9cc', alt: 'Lakme Lip Love dual-use lip and cheek tint in downtown nude shade on light background' },
{ id: 29, name: 'Lakmē 9to5 Overtime Shine Tinted Lip Oil', category: 'Lip Balms', price: 24, rating: 4.9, reviews: 412, badge: 'Bestseller', image: 'https://images.unsplash.com/photo-1648729800687-7316ea086e8f', alt: 'Lakme 9to5 overtime shine tinted lip oil in pink bloom shade with glossy finish on white surface' },
{ id: 30, name: 'Lakmē Absolute Sheer Lip Mousse', category: 'Lip Balms', price: 26, rating: 4.8, reviews: 187, badge: 'Fan Fave', image: 'https://img.rocket.new/generatedImages/rocket_gen_img_103c79258-1770568581867.png', alt: 'Lakme Absolute sheer lip mousse in crimson sky shade with lightweight formula on marble background' }];


const categories = ['All', 'Serums', 'Moisturizers', 'Toners', 'Oils', 'Scrubs', 'Masks', 'Lip Balms'];
const sortOptions = ['Newest', 'Price: Low to High', 'Price: High to Low', 'Top Rated'];

// Groups products into rows of 3 for the shelf layout
function chunkArray<T>(arr: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

interface FlyingProduct {
  id: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

interface ProductCardProps {
  product: typeof allProducts[0];
  isWishlisted: boolean;
  isAdded: boolean;
  onWishlist: (id: number) => void;
  onAdd: (id: number, e: React.MouseEvent<HTMLButtonElement>) => void;
  cartIconRef: React.RefObject<HTMLDivElement | null>;
}

function ProductCard({ product, isWishlisted, isAdded, onWishlist, onAdd, cartIconRef }: ProductCardProps) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: -dy * 8, y: dx * 8 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div
      className="relative group"
      style={{ perspective: '800px' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}>
      
      <div
        className="bg-card rounded-3xl overflow-hidden border border-border"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${isHovered ? 'translateZ(12px)' : 'translateZ(0px)'}`,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.15s ease-out, box-shadow 0.15s ease-out',
          boxShadow: isHovered ?
          '0 24px 48px rgba(45,106,79,0.22), 0 8px 16px rgba(0,0,0,0.1)' :
          '0 4px 12px rgba(0,0,0,0.06)'
        }}>
        
        <Link href={`/product/${product.id}`} className="block">
          <div className="relative aspect-[4/3] overflow-hidden bg-muted">
            <AppImage
              src={product.image}
              alt={product.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700" />
            
            {product.badge &&
            <span className="absolute top-3 left-3 badge-eco px-3 py-1 rounded-full text-xs font-bold">
                {product.badge}
              </span>
            }
            <button
              onClick={(e) => {e.preventDefault();onWishlist(product.id);}}
              className="absolute top-3 right-3 w-9 h-9 rounded-full glass-card flex items-center justify-center hover:scale-110 transition-all"
              aria-label="Toggle wishlist">
              
              <Icon
                name="HeartIcon"
                size={15}
                variant={isWishlisted ? 'solid' : 'outline'}
                className={isWishlisted ? 'text-red-500' : 'text-muted-foreground'} />
              
            </button>
          </div>
          <div className="p-5">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">
              {product.category}
            </p>
            <h3 className="text-sm font-bold text-foreground mb-2">{product.name}</h3>
            <div className="flex items-center gap-1 mb-4">
              <Icon name="StarIcon" size={12} variant="solid" className="text-amber-400" />
              <span className="text-xs font-bold text-foreground">{product.rating}</span>
              <span className="text-xs text-muted-foreground">({product.reviews})</span>
            </div>
          </div>
        </Link>
        <div className="px-5 pb-5 flex items-center justify-between -mt-2">
          <span className="text-lg font-extrabold text-foreground">${product.price}</span>
          <button
            onClick={(e) => onAdd(product.id, e)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all ${
            isAdded ?
            'bg-accent text-accent-foreground' :
            'bg-primary text-primary-foreground hover:bg-primary/90'}`
            }>
            
            <Icon
              name={isAdded ? 'CheckIcon' : 'ShoppingBagIcon'}
              size={13}
              className={isAdded ? 'text-accent-foreground' : 'text-primary-foreground'} />
            
            {isAdded ? 'Added!' : 'Add'}
          </button>
        </div>
      </div>
    </div>);

}

// Shelf row: 3 products sitting on a rendered wooden/glass shelf
function ShelfRow({ products, wishlist, added, onWishlist, onAdd, cartIconRef






}: {products: typeof allProducts;wishlist: number[];added: number[];onWishlist: (id: number) => void;onAdd: (id: number, e: React.MouseEvent<HTMLButtonElement>) => void;cartIconRef: React.RefObject<HTMLDivElement | null>;}) {
  return (
    <div className="relative mb-10" style={{ perspective: '1200px' }}>
      {/* Products sitting on the shelf */}
      <div
        className="grid gap-5 pb-4"
        style={{
          gridTemplateColumns: `repeat(${products.length}, 1fr)`,
          transform: 'rotateX(2deg)',
          transformOrigin: 'bottom center',
          transformStyle: 'preserve-3d'
        }}>
        
        {products.map((product) =>
        <ProductCard
          key={product.id}
          product={product}
          isWishlisted={wishlist.includes(product.id)}
          isAdded={added.includes(product.id)}
          onWishlist={onWishlist}
          onAdd={onAdd}
          cartIconRef={cartIconRef} />

        )}
        {/* Fill empty slots */}
        {products.length < 3 &&
        Array.from({ length: 3 - products.length }).map((_, i) =>
        <div key={`empty-${i}`} />
        )}
      </div>

      {/* Wooden shelf plank */}
      <div
        className="relative w-full"
        style={{
          height: '22px',
          background: 'linear-gradient(180deg, #c8a96e 0%, #a0784a 35%, #8b6035 60%, #6b4423 100%)',
          borderRadius: '4px 4px 6px 6px',
          boxShadow: '0 6px 20px rgba(0,0,0,0.28), 0 2px 4px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,220,150,0.4)',
          transform: 'rotateX(-2deg)',
          transformOrigin: 'top center'
        }}>
        
        {/* Wood grain lines */}
        <div style={{
          position: 'absolute', inset: 0, borderRadius: '4px 4px 6px 6px', overflow: 'hidden',
          background: 'repeating-linear-gradient(90deg, transparent 0px, transparent 18px, rgba(0,0,0,0.04) 18px, rgba(0,0,0,0.04) 19px)'
        }} />
        {/* Shelf front edge highlight */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '6px',
          background: 'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.35) 100%)',
          borderRadius: '0 0 6px 6px'
        }} />
        {/* Glass reflection strip */}
        <div style={{
          position: 'absolute', top: '2px', left: '5%', right: '5%', height: '3px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.5) 30%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0.5) 70%, transparent 100%)',
          borderRadius: '2px'
        }} />
      </div>

      {/* Shelf underside shadow */}
      <div style={{
        height: '10px',
        background: 'linear-gradient(180deg, rgba(0,0,0,0.18) 0%, transparent 100%)',
        borderRadius: '0 0 8px 8px',
        marginTop: '0px'
      }} />
    </div>);

}

export default function ProductCatalog() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Newest');
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [added, setAdded] = useState<number[]>([]);
  const [flyingProducts, setFlyingProducts] = useState<FlyingProduct[]>([]);
  const cartIconRef = useRef<HTMLDivElement | null>(null);

  const toggleWishlist = (id: number) => {
    setWishlist((prev) =>
    prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id]
    );
  };

  const handleAdd = useCallback((id: number, e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    const btnRect = btn.getBoundingClientRect();

    // Find cart icon position
    const cartEl = document.querySelector('[data-cart-icon]');
    if (!cartEl) {
      setAdded((prev) => [...prev, id]);
      setTimeout(() => setAdded((prev) => prev.filter((a) => a !== id)), 1500);
      return;
    }
    const cartRect = cartEl.getBoundingClientRect();

    const flyId = `fly-${id}-${Date.now()}`;
    const newFly: FlyingProduct = {
      id: flyId,
      startX: btnRect.left + btnRect.width / 2,
      startY: btnRect.top + btnRect.height / 2,
      endX: cartRect.left + cartRect.width / 2,
      endY: cartRect.top + cartRect.height / 2
    };

    setFlyingProducts((prev) => [...prev, newFly]);

    setTimeout(() => {
      setFlyingProducts((prev) => prev.filter((f) => f.id !== flyId));
      setAdded((prev) => [...prev, id]);
      setTimeout(() => setAdded((prev) => prev.filter((a) => a !== id)), 1500);
    }, 700);
  }, []);

  const filtered = allProducts.
  filter((p) => activeCategory === 'All' || p.category === activeCategory).
  sort((a, b) => {
    if (sortBy === 'Price: Low to High') return a.price - b.price;
    if (sortBy === 'Price: High to Low') return b.price - a.price;
    if (sortBy === 'Top Rated') return b.rating - a.rating;
    return b.id - a.id;
  });

  const shelfRows = chunkArray(filtered, 3);

  return (
    <section className="pb-20 px-4 sm:px-6">
      {/* Flying product animation portal */}
      {flyingProducts.map((fly) =>
      <div
        key={fly.id}
        style={{
          position: 'fixed',
          left: fly.startX,
          top: fly.startY,
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #2D6A4F, #74C69D)',
          zIndex: 9999,
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '14px',
          boxShadow: '0 4px 16px rgba(45,106,79,0.5)',
          animation: 'cartThrow 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
          '--end-x': `${fly.endX - fly.startX}px`,
          '--end-y': `${fly.endY - fly.startY}px`
        } as React.CSSProperties}>
        
          🛍️
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Filter + Sort Bar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-8 pt-4">
          <div className="flex items-center gap-2 flex-wrap">
            {categories.map((cat) =>
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all ${
              activeCategory === cat ?
              'bg-primary text-primary-foreground' :
              'bg-card border border-border text-muted-foreground hover:border-primary hover:text-primary'}`
              }>
              
                {cat}
              </button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input-eco px-4 py-2 text-xs font-bold text-foreground cursor-pointer">
              
              {sortOptions.map((opt) =>
              <option key={opt} value={opt}>{opt}</option>
              )}
            </select>
          </div>
        </div>

        {/* Results count */}
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-8">
          {filtered.length} Products
        </p>

        {/* 3D Shelf Layout */}
        <div
          className="relative rounded-2xl p-6 pt-8"
          style={{
            background: 'linear-gradient(180deg, #f5f0e8 0%, #ede5d8 50%, #e0d5c5 100%)',
            boxShadow: 'inset 0 2px 12px rgba(0,0,0,0.06), 0 4px 24px rgba(0,0,0,0.08)'
          }}>
          
          {/* Back wall texture */}
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              background: 'repeating-linear-gradient(0deg, transparent 0px, transparent 39px, rgba(0,0,0,0.025) 39px, rgba(0,0,0,0.025) 40px)',
              borderRadius: 'inherit'
            }} />
          

          {/* Shelf rows */}
          <div className="relative z-10">
            {shelfRows.map((row, rowIdx) =>
            <ShelfRow
              key={rowIdx}
              products={row}
              wishlist={wishlist}
              added={added}
              onWishlist={toggleWishlist}
              onAdd={handleAdd}
              cartIconRef={cartIconRef} />

            )}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes cartThrow {
          0% {
            transform: translate(0, 0) scale(1) rotate(0deg);
            opacity: 1;
          }
          40% {
            transform: translate(calc(var(--end-x) * 0.5), calc(var(--end-y) * 0.5 - 80px)) scale(1.2) rotate(15deg);
            opacity: 1;
          }
          80% {
            transform: translate(calc(var(--end-x) * 0.9), calc(var(--end-y) * 0.9)) scale(0.7) rotate(25deg);
            opacity: 0.8;
          }
          100% {
            transform: translate(var(--end-x), var(--end-y)) scale(0.2) rotate(30deg);
            opacity: 0;
          }
        }
      `}</style>
    </section>);

}