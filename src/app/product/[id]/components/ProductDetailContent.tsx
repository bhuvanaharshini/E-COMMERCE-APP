'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

// ─── Shared product data (same as ProductCatalog) ───────────────────────────
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


// ─── Per-product enrichment data ─────────────────────────────────────────────
function getProductDetails(id: number) {
  const base = allProducts.find((p) => p.id === id);
  if (!base) return null;

  const variantsByCategory: Record<string, {label: string;color: string;}[]> = {
    'Lip Balms': [
    { label: 'Original', color: '#f4c842' },
    { label: 'Tinted Rose', color: '#e8a0a0' },
    { label: 'Berry', color: '#9b4f7a' },
    { label: 'Clear SPF', color: '#d4edda' }],

    Serums: [
    { label: '15ml', color: '#74C69D' },
    { label: '30ml', color: '#2D6A4F' },
    { label: '50ml', color: '#1b4332' }],

    Moisturizers: [
    { label: '50g', color: '#95D5B2' },
    { label: '100g', color: '#52B788' },
    { label: '200g', color: '#2D6A4F' }],

    default: [
    { label: 'Standard', color: '#74C69D' },
    { label: 'Travel Size', color: '#95D5B2' }]

  };

  const ingredientsByCategory: Record<string, {emoji: string;name: string;benefit: string;}[]> = {
    'Lip Balms': [
    { emoji: '🍯', name: 'Beeswax', benefit: 'Seals moisture, forms protective barrier' },
    { emoji: '🥥', name: 'Coconut Oil', benefit: 'Deep hydration, antibacterial properties' },
    { emoji: '🌿', name: 'Shea Butter', benefit: 'Nourishes, reduces inflammation' },
    { emoji: '🍊', name: 'Vitamin E', benefit: 'Antioxidant, repairs lip tissue' },
    { emoji: '🌸', name: 'Rose Extract', benefit: 'Soothes, adds natural fragrance' },
    { emoji: '🛡️', name: 'SPF Filter', benefit: 'Protects against UV damage' }],

    Serums: [
    { emoji: '💧', name: 'Hyaluronic Acid', benefit: 'Holds 1000× its weight in water' },
    { emoji: '🌿', name: 'Niacinamide', benefit: 'Minimises pores, evens skin tone' },
    { emoji: '🍊', name: 'Vitamin C', benefit: 'Brightens, fights free radicals' },
    { emoji: '🌱', name: 'Peptides', benefit: 'Boosts collagen production' },
    { emoji: '✨', name: 'Retinol', benefit: 'Accelerates cell turnover' },
    { emoji: '🌸', name: 'Aloe Vera', benefit: 'Calms redness, hydrates' }],

    Moisturizers: [
    { emoji: '🥑', name: 'Avocado Oil', benefit: 'Rich in fatty acids, deeply nourishing' },
    { emoji: '🌿', name: 'Aloe Vera', benefit: 'Soothes and hydrates skin' },
    { emoji: '💧', name: 'Glycerin', benefit: 'Draws moisture to skin surface' },
    { emoji: '🌸', name: 'Rose Water', benefit: 'Tones and refreshes skin' },
    { emoji: '🍊', name: 'Vitamin C', benefit: 'Brightens and protects' },
    { emoji: '🛡️', name: 'Ceramides', benefit: 'Restores skin barrier function' }],

    default: [
    { emoji: '🌿', name: 'Aloe Vera', benefit: 'Soothes and hydrates' },
    { emoji: '💧', name: 'Hyaluronic Acid', benefit: 'Deep moisture retention' },
    { emoji: '🍊', name: 'Vitamin C', benefit: 'Brightening antioxidant' },
    { emoji: '✨', name: 'Niacinamide', benefit: 'Pore minimising, tone evening' },
    { emoji: '🌸', name: 'Rose Extract', benefit: 'Calming, anti-inflammatory' },
    { emoji: '🛡️', name: 'SPF 15', benefit: 'Daily UV protection' }]

  };

  const specsByCategory: Record<string, {label: string;value: string;}[]> = {
    'Lip Balms': [
    { label: 'Net Weight', value: '4.5g' },
    { label: 'SPF', value: 'SPF 15–50+' },
    { label: 'Finish', value: 'Glossy / Matte / Tinted' },
    { label: 'Shelf Life', value: '24 months' },
    { label: 'Cruelty Free', value: '✓ Yes' },
    { label: 'Vegan', value: '✓ Yes' }],

    Serums: [
    { label: 'Volume', value: '30ml' },
    { label: 'Texture', value: 'Lightweight fluid' },
    { label: 'Skin Type', value: 'All skin types' },
    { label: 'Shelf Life', value: '18 months' },
    { label: 'Cruelty Free', value: '✓ Yes' },
    { label: 'Dermatologist Tested', value: '✓ Yes' }],

    default: [
    { label: 'Volume / Weight', value: '50ml / 50g' },
    { label: 'Skin Type', value: 'All skin types' },
    { label: 'Shelf Life', value: '24 months' },
    { label: 'Cruelty Free', value: '✓ Yes' },
    { label: 'Vegan', value: '✓ Yes' },
    { label: 'Dermatologist Tested', value: '✓ Yes' }]

  };

  const cat = base.category;
  return {
    ...base,
    description: `Experience the power of nature with ${base.name}. Formulated with premium botanical ingredients, this ${cat.toLowerCase()} product delivers visible results while staying gentle on your skin and the planet.`,
    variants: variantsByCategory[cat] ?? variantsByCategory.default,
    ingredients: ingredientsByCategory[cat] ?? ingredientsByCategory.default,
    specs: specsByCategory[cat] ?? specsByCategory.default,
    reviews_data: [
    { name: 'Priya S.', rating: 5, date: 'Mar 2025', text: `Absolutely love this! My skin feels so much better after just two weeks of use. The texture is perfect and it absorbs quickly.` },
    { name: 'Ananya R.', rating: 5, date: 'Feb 2025', text: `Best ${cat.toLowerCase()} I've ever used. The natural ingredients really make a difference. Will definitely repurchase!` },
    { name: 'Meera K.', rating: 4, date: 'Jan 2025', text: `Great product overall. Noticed improvement in about a week. Packaging is beautiful too — very premium feel.` },
    { name: 'Divya T.', rating: 5, date: 'Dec 2024', text: `I was skeptical at first but this exceeded all my expectations. Highly recommend to anyone looking for clean beauty.` }],

    relatedIds: allProducts.
    filter((p) => p.category === cat && p.id !== id).
    slice(0, 4).
    map((p) => p.id)
  };
}

// ─── 3D Product Viewer ────────────────────────────────────────────────────────
function Product3DViewer({ image, alt, name }: {image: string;alt: string;name: string;}) {
  const [rotateY, setRotateY] = useState(0);
  const [rotateX, setRotateX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const lastMouseRef = useRef({ x: 0, y: 0 });
  const animRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const rotateYRef = useRef(0);

  useEffect(() => {
    if (!autoRotate) return;
    const animate = (ts: number) => {
      if (!startTimeRef.current) startTimeRef.current = ts;
      const elapsed = ts - startTimeRef.current;
      const newY = elapsed / 8000 * 360;
      rotateYRef.current = newY;
      setRotateY(newY % 360);
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => {if (animRef.current) cancelAnimationFrame(animRef.current);};
  }, [autoRotate]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setAutoRotate(false);
    lastMouseRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - lastMouseRef.current.x;
    const dy = e.clientY - lastMouseRef.current.y;
    setRotateY((prev) => prev + dx * 0.6);
    setRotateX((prev) => Math.max(-30, Math.min(30, prev - dy * 0.4)));
    lastMouseRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    setAutoRotate(false);
    lastMouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const dx = e.touches[0].clientX - lastMouseRef.current.x;
    const dy = e.touches[0].clientY - lastMouseRef.current.y;
    setRotateY((prev) => prev + dx * 0.6);
    setRotateX((prev) => Math.max(-30, Math.min(30, prev - dy * 0.4)));
    lastMouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  return (
    <div
      className="relative w-full rounded-3xl overflow-hidden select-none"
      style={{
        background: 'linear-gradient(135deg, #e8f5ee 0%, #d4edda 50%, #c8e6c9 100%)',
        minHeight: '420px',
        cursor: isDragging ? 'grabbing' : 'grab'
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={() => {}}>
      
      {/* Ambient blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-72 h-72 rounded-full opacity-25" style={{ background: 'radial-gradient(circle, #74C69D 0%, transparent 70%)', top: '-60px', left: '-60px' }} />
        <div className="absolute w-56 h-56 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #2D6A4F 0%, transparent 70%)', bottom: '-30px', right: '-30px' }} />
      </div>

      {/* Drag hint */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest"
      style={{ background: 'rgba(45,106,79,0.12)', color: '#2D6A4F', backdropFilter: 'blur(8px)' }}>
        <Icon name="ArrowPathIcon" size={11} className="text-primary" />
        Drag to rotate
      </div>

      {/* Auto-rotate toggle */}
      <button
        onClick={() => setAutoRotate((v) => !v)}
        className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all"
        style={{
          background: autoRotate ? 'rgba(45,106,79,0.85)' : 'rgba(255,255,255,0.7)',
          color: autoRotate ? '#fff' : '#2D6A4F',
          backdropFilter: 'blur(8px)'
        }}>
        
        <Icon name="PlayIcon" size={11} />
        {autoRotate ? 'Auto' : 'Manual'}
      </button>

      {/* 3D product stage */}
      <div className="relative z-10 flex flex-col items-center justify-center py-16 px-8" style={{ perspective: '900px' }}>
        <div
          style={{
            transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
            transformStyle: 'preserve-3d',
            transition: isDragging ? 'none' : 'transform 0.05s linear',
            width: '220px',
            height: '220px',
            position: 'relative'
          }}>
          
          {/* Front face — product image */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '24px',
              overflow: 'hidden',
              backfaceVisibility: 'hidden',
              boxShadow: '0 32px 64px rgba(45,106,79,0.3), 0 8px 24px rgba(0,0,0,0.12)'
            }}>
            
            <AppImage src={image} alt={alt} fill sizes="220px" className="object-cover" />
            {/* Shine overlay */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, transparent 50%, rgba(0,0,0,0.08) 100%)',
              borderRadius: '24px'
            }} />
          </div>

          {/* Back face */}
          <div
            style={{
              position: 'absolute', inset: 0, borderRadius: '24px',
              background: 'linear-gradient(135deg, #2D6A4F 0%, #1b4332 100%)',
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 32px 64px rgba(45,106,79,0.3)'
            }}>
            
            <span style={{ color: '#fff', fontSize: '11px', fontWeight: 900, letterSpacing: '0.3em', textTransform: 'uppercase', textAlign: 'center', padding: '0 16px' }}>
              EcoGlow<br />
              <span style={{ fontSize: '8px', fontWeight: 600, opacity: 0.7 }}>Pure · Natural · Sustainable</span>
            </span>
          </div>

          {/* Left face */}
          <div style={{
            position: 'absolute', top: 0, left: 0, width: '40px', height: '100%',
            background: 'linear-gradient(180deg, #1b4332 0%, #2D6A4F 100%)',
            transform: 'rotateY(-90deg) translateZ(0px)',
            transformOrigin: 'left center',
            backfaceVisibility: 'hidden',
            borderRadius: '24px 0 0 24px'
          }} />

          {/* Right face */}
          <div style={{
            position: 'absolute', top: 0, right: 0, width: '40px', height: '100%',
            background: 'linear-gradient(180deg, #52B788 0%, #2D6A4F 100%)',
            transform: 'rotateY(90deg) translateZ(0px)',
            transformOrigin: 'right center',
            backfaceVisibility: 'hidden',
            borderRadius: '0 24px 24px 0'
          }} />
        </div>

        {/* Pedestal shadow */}
        <div style={{
          width: '160px', height: '16px', marginTop: '12px',
          background: 'radial-gradient(ellipse, rgba(45,106,79,0.3) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(4px)'
        }} />
      </div>
    </div>);

}

// ─── Star rating display ──────────────────────────────────────────────────────
function Stars({ rating, size = 14 }: {rating: number;size?: number;}) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) =>
      <Icon
        key={i}
        name="StarIcon"
        size={size}
        variant={i <= Math.round(rating) ? 'solid' : 'outline'}
        className={i <= Math.round(rating) ? 'text-amber-400' : 'text-muted-foreground/40'} />

      )}
    </div>);

}

// ─── Main component ───────────────────────────────────────────────────────────
export default function ProductDetailContent({ productId }: {productId: string;}) {
  const id = parseInt(productId, 10);
  const product = getProductDetails(id);

  const [selectedVariant, setSelectedVariant] = useState(0);
  const [qty, setQty] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [activeTab, setActiveTab] = useState<'ingredients' | 'specs' | 'reviews'>('ingredients');
  const [wishlist, setWishlist] = useState(false);

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 pt-24">
        <p className="text-2xl font-bold text-foreground">Product not found</p>
        <Link href="/products" className="px-6 py-3 bg-primary text-primary-foreground rounded-full text-sm font-bold">
          Back to Shop
        </Link>
      </div>);

  }

  const relatedProducts = product.relatedIds.
  map((rid) => allProducts.find((p) => p.id === rid)).
  filter(Boolean) as typeof allProducts;

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-semibold text-muted-foreground mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <Icon name="ChevronRightIcon" size={12} className="text-muted-foreground/50" />
          <Link href="/products" className="hover:text-primary transition-colors">Shop</Link>
          <Icon name="ChevronRightIcon" size={12} className="text-muted-foreground/50" />
          <span className="text-foreground">{product.name}</span>
        </nav>

        {/* ── Main grid: 3D viewer + purchase panel ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">

          {/* Left — 3D viewer */}
          <div className="flex flex-col gap-4">
            <Product3DViewer image={product.image} alt={product.alt} name={product.name} />
            <p className="text-center text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
              High-res 3D · Drag to rotate · Pinch to zoom
            </p>
          </div>

          {/* Right — product info */}
          <div className="flex flex-col gap-6">
            {/* Badge + category */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary">{product.category}</span>
              {product.badge &&
              <span className="badge-eco px-3 py-1 rounded-full text-[10px] font-bold">{product.badge}</span>
              }
            </div>

            {/* Name */}
            <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <Stars rating={product.rating} size={16} />
              <span className="text-sm font-bold text-foreground">{product.rating}</span>
              <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>

            {/* Variants */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
                Variant — <span className="text-foreground">{product.variants[selectedVariant].label}</span>
              </p>
              <div className="flex items-center gap-3 flex-wrap">
                {product.variants.map((v, i) =>
                <button
                  key={v.label}
                  onClick={() => setSelectedVariant(i)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold border-2 transition-all ${
                  selectedVariant === i ?
                  'border-primary bg-primary/10 text-primary' : 'border-border text-muted-foreground hover:border-primary/50'}`
                  }>
                  
                    <span
                    className="w-3.5 h-3.5 rounded-full border border-white/50 shadow-sm"
                    style={{ background: v.color }} />
                  
                    {v.label}
                  </button>
                )}
              </div>
            </div>

            {/* Price + Qty + CTA */}
            <div className="flex flex-col gap-4 pt-2">
              <div className="flex items-end gap-3">
                <span className="text-4xl font-extrabold text-foreground">${product.price}</span>
                <span className="text-sm text-muted-foreground line-through mb-1">${Math.round(product.price * 1.2)}</span>
                <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full mb-1">Save 17%</span>
              </div>

              <div className="flex items-center gap-4">
                {/* Qty selector */}
                <div className="flex items-center gap-0 rounded-full border border-border overflow-hidden">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-muted transition-colors text-foreground font-bold">
                    
                    <Icon name="MinusIcon" size={14} />
                  </button>
                  <span className="w-10 text-center text-sm font-bold text-foreground">{qty}</span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    className="w-10 h-10 flex items-center justify-center hover:bg-muted transition-colors text-foreground font-bold">
                    
                    <Icon name="PlusIcon" size={14} />
                  </button>
                </div>

                {/* Add to cart */}
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-full text-sm font-bold tracking-wide transition-all ${
                  addedToCart ?
                  'bg-accent text-accent-foreground' :
                  'bg-primary text-primary-foreground hover:bg-primary/90'}`
                  }>
                  
                  <Icon name={addedToCart ? 'CheckIcon' : 'ShoppingBagIcon'} size={16} />
                  {addedToCart ? 'Added to Cart!' : 'Add to Cart'}
                </button>

                {/* Wishlist */}
                <button
                  onClick={() => setWishlist((v) => !v)}
                  className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:border-red-300 transition-all"
                  aria-label="Toggle wishlist">
                  
                  <Icon
                    name="HeartIcon"
                    size={18}
                    variant={wishlist ? 'solid' : 'outline'}
                    className={wishlist ? 'text-red-500' : 'text-muted-foreground'} />
                  
                </button>
              </div>

              {/* Trust badges */}
              <div className="flex items-center gap-4 pt-2 flex-wrap">
                {['🌿 Vegan', '🐰 Cruelty-Free', '♻️ Eco Packaging', '🧪 Dermatologist Tested'].map((badge) =>
                <span key={badge} className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">
                    {badge}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── Tabs: Ingredients / Specs / Reviews ── */}
        <div className="mb-16">
          {/* Tab bar */}
          <div className="flex items-center gap-1 border-b border-border mb-8">
            {(['ingredients', 'specs', 'reviews'] as const).map((tab) =>
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm font-bold capitalize tracking-wide transition-all border-b-2 -mb-px ${
              activeTab === tab ?
              'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`
              }>
              
                {tab === 'reviews' ? `Reviews (${product.reviews})` : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            )}
          </div>

          {/* Ingredients tab */}
          {activeTab === 'ingredients' &&
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {product.ingredients.map((ing) =>
            <div
              key={ing.name}
              className="flex items-start gap-4 p-5 rounded-2xl border border-border bg-card hover:border-primary/30 transition-all">
              
                  <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{
                  background: 'linear-gradient(135deg, #e8f5ee 0%, #d4edda 100%)',
                  boxShadow: '0 4px 12px rgba(45,106,79,0.12)'
                }}>
                
                    {ing.emoji}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground mb-1">{ing.name}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{ing.benefit}</p>
                  </div>
                </div>
            )}
            </div>
          }

          {/* Specs tab */}
          {activeTab === 'specs' &&
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
              {product.specs.map((spec) =>
            <div
              key={spec.label}
              className="flex items-center justify-between p-4 rounded-2xl bg-card border border-border">
              
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{spec.label}</span>
                  <span className="text-sm font-bold text-foreground">{spec.value}</span>
                </div>
            )}
            </div>
          }

          {/* Reviews tab */}
          {activeTab === 'reviews' &&
          <div className="flex flex-col gap-5 max-w-3xl">
              {/* Summary bar */}
              <div className="flex items-center gap-6 p-6 rounded-2xl bg-card border border-border mb-2">
                <div className="text-center">
                  <p className="text-5xl font-extrabold text-foreground">{product.rating}</p>
                  <Stars rating={product.rating} size={14} />
                  <p className="text-xs text-muted-foreground mt-1">{product.reviews} reviews</p>
                </div>
                <div className="flex-1 flex flex-col gap-1.5">
                  {[5, 4, 3, 2, 1].map((star) => {
                  const pct = star === 5 ? 72 : star === 4 ? 18 : star === 3 ? 7 : star === 2 ? 2 : 1;
                  return (
                    <div key={star} className="flex items-center gap-2">
                        <span className="text-xs font-bold text-muted-foreground w-4">{star}</span>
                        <Icon name="StarIcon" size={10} variant="solid" className="text-amber-400" />
                        <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                          <div className="h-full rounded-full bg-amber-400" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="text-xs text-muted-foreground w-8 text-right">{pct}%</span>
                      </div>);

                })}
                </div>
              </div>

              {product.reviews_data?.map((review: {name: string;rating: number;date: string;text: string;}, i: number) =>
            <div key={i} className="p-5 rounded-2xl bg-card border border-border">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-sm font-bold text-foreground">{review.name}</p>
                      <p className="text-xs text-muted-foreground">{review.date}</p>
                    </div>
                    <Stars rating={review.rating} size={12} />
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{review.text}</p>
                </div>
            )}
            </div>
          }
        </div>

        {/* ── Related Products ── */}
        {relatedProducts.length > 0 &&
        <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-extrabold text-foreground">You May Also Like</h2>
              <Link href="/products" className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
                View All <Icon name="ArrowRightIcon" size={12} className="text-primary" />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {relatedProducts.map((rp) =>
            <Link
              key={rp.id}
              href={`/product/${rp.id}`}
              className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/40 hover:shadow-lg transition-all">
              
                  <div className="relative aspect-square overflow-hidden bg-muted">
                    <AppImage
                  src={rp.image}
                  alt={rp.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500" />
                
                    {rp.badge &&
                <span className="absolute top-2 left-2 badge-eco px-2 py-0.5 rounded-full text-[9px] font-bold">
                        {rp.badge}
                      </span>
                }
                  </div>
                  <div className="p-3">
                    <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground mb-0.5">{rp.category}</p>
                    <p className="text-xs font-bold text-foreground line-clamp-2 mb-1">{rp.name}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-extrabold text-foreground">${rp.price}</span>
                      <div className="flex items-center gap-0.5">
                        <Icon name="StarIcon" size={10} variant="solid" className="text-amber-400" />
                        <span className="text-[10px] font-bold text-foreground">{rp.rating}</span>
                      </div>
                    </div>
                  </div>
                </Link>
            )}
            </div>
          </div>
        }
      </div>
    </div>);

}