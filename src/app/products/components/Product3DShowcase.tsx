'use client';
import React, { useEffect, useRef, useState } from 'react';

const FloatingIcon = ({
  emoji,
  label,
  style,
  delay,
}: {
  emoji: string;
  label: string;
  style: React.CSSProperties;
  delay: number;
}) => {
  return (
    <div
      className="absolute flex flex-col items-center gap-1 select-none pointer-events-none"
      style={{
        ...style,
        animation: `float3d ${3.5 + delay * 0.4}s ease-in-out infinite`,
        animationDelay: `${delay * 0.6}s`,
      }}
    >
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-lg"
        style={{
          background: 'rgba(255,255,255,0.18)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.35)',
          boxShadow: '0 8px 32px rgba(45,106,79,0.18), inset 0 1px 0 rgba(255,255,255,0.4)',
        }}
      >
        {emoji}
      </div>
      <span
        className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
        style={{
          background: 'rgba(45,106,79,0.15)',
          color: '#2D6A4F',
          backdropFilter: 'blur(8px)',
        }}
      >
        {label}
      </span>
    </div>
  );
};

export default function Product3DShowcase() {
  const lipBalmRef = useRef<HTMLDivElement>(null);
  const [rotateY, setRotateY] = useState(0);
  const animFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const [hovered, setHovered] = useState(false);
  const [mouseRot, setMouseRot] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      setRotateY((elapsed / 6000) * 360);
      animFrameRef.current = requestAnimationFrame(animate);
    };
    animFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setMouseRot({ x: -dy * 18, y: dx * 18 });
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setMouseRot({ x: 0, y: 0 });
  };

  const ingredients = [
    { emoji: '🍯', label: 'Honey', style: { top: '12%', left: '4%' }, delay: 0 },
    { emoji: '🍊', label: 'Vitamin C', style: { top: '8%', right: '6%' }, delay: 1 },
    { emoji: '🛡️', label: 'SPF Shield', style: { bottom: '22%', left: '2%' }, delay: 2 },
    { emoji: '🌿', label: 'Aloe', style: { bottom: '18%', right: '4%' }, delay: 1.5 },
    { emoji: '💧', label: 'Hydra', style: { top: '42%', left: '1%' }, delay: 0.7 },
    { emoji: '✨', label: 'Glow', style: { top: '38%', right: '2%' }, delay: 2.2 },
  ];

  return (
    <div
      className="relative w-full overflow-hidden rounded-3xl mb-10"
      style={{
        background: 'linear-gradient(135deg, #e8f5ee 0%, #d4edda 40%, #c8e6c9 70%, #b2dfdb 100%)',
        minHeight: '340px',
      }}
    >
      {/* Ambient blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute w-64 h-64 rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, #74C69D 0%, transparent 70%)',
            top: '-40px',
            left: '-40px',
          }}
        />
        <div
          className="absolute w-48 h-48 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, #2D6A4F 0%, transparent 70%)',
            bottom: '-20px',
            right: '-20px',
          }}
        />
        <div
          className="absolute w-32 h-32 rounded-full opacity-25"
          style={{
            background: 'radial-gradient(circle, #95D5B2 0%, transparent 70%)',
            top: '30%',
            right: '20%',
          }}
        />
      </div>

      {/* Floating ingredient icons */}
      {ingredients.map((ing) => (
        <FloatingIcon
          key={ing.label}
          emoji={ing.emoji}
          label={ing.label}
          style={ing.style}
          delay={ing.delay}
        />
      ))}

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center justify-center py-10 px-4">
        <div className="text-center mb-6">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary block mb-1">
            Featured
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            Honey &amp; Shea Lip Balm
          </h2>
          <p className="text-xs text-muted-foreground mt-1">Natural • SPF 15 • Bestseller</p>
        </div>

        {/* 3D Pedestal + Rotating Product */}
        <div
          className="relative flex flex-col items-center cursor-pointer"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={handleMouseLeave}
          style={{ perspective: '600px' }}
        >
          {/* Rotating lip balm */}
          <div
            ref={lipBalmRef}
            style={{
              transform: hovered
                ? `rotateX(${mouseRot.x}deg) rotateY(${mouseRot.y}deg)`
                : `rotateY(${rotateY % 360}deg)`,
              transformStyle: 'preserve-3d',
              transition: hovered ? 'transform 0.1s ease-out' : 'none',
              width: '90px',
              height: '140px',
              position: 'relative',
            }}
          >
            {/* Tube body */}
            <div
              style={{
                width: '90px',
                height: '140px',
                borderRadius: '45px 45px 18px 18px',
                background:
                  'linear-gradient(160deg, #f9e4b7 0%, #f4c842 30%, #e8a020 60%, #c47a15 100%)',
                boxShadow:
                  '4px 8px 32px rgba(45,106,79,0.35), inset -6px 0 18px rgba(0,0,0,0.12), inset 6px 0 18px rgba(255,255,255,0.25)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Shine streak */}
              <div
                style={{
                  position: 'absolute',
                  top: '10%',
                  left: '18%',
                  width: '18px',
                  height: '60%',
                  background:
                    'linear-gradient(180deg, rgba(255,255,255,0.55) 0%, transparent 100%)',
                  borderRadius: '10px',
                  transform: 'rotate(-8deg)',
                }}
              />
              {/* Label band */}
              <div
                style={{
                  position: 'absolute',
                  top: '35%',
                  left: 0,
                  right: 0,
                  height: '38%',
                  background: 'rgba(255,255,255,0.22)',
                  backdropFilter: 'blur(4px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                }}
              >
                <span
                  style={{
                    fontSize: '7px',
                    fontWeight: 900,
                    color: '#2D6A4F',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                  }}
                >
                  EcoGlow
                </span>
                <span
                  style={{
                    fontSize: '6px',
                    fontWeight: 700,
                    color: '#555',
                    letterSpacing: '0.08em',
                  }}
                >
                  Honey &amp; Shea
                </span>
              </div>
              {/* Cap */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '22%',
                  borderRadius: '45px 45px 0 0',
                  background: 'linear-gradient(160deg, #2D6A4F 0%, #1b4332 100%)',
                  boxShadow: 'inset 0 -3px 8px rgba(0,0,0,0.2)',
                }}
              />
            </div>
          </div>

          {/* Pedestal shadow */}
          <div
            style={{
              width: '100px',
              height: '12px',
              marginTop: '4px',
              background: 'radial-gradient(ellipse, rgba(45,106,79,0.35) 0%, transparent 75%)',
              borderRadius: '50%',
              animation: 'shadowPulse 3s ease-in-out infinite',
            }}
          />

          {/* Pedestal base tier 1 */}
          <div
            style={{
              width: '110px',
              height: '18px',
              marginTop: '2px',
              background:
                'linear-gradient(180deg, rgba(255,255,255,0.6) 0%, rgba(200,230,210,0.8) 100%)',
              borderRadius: '8px',
              boxShadow:
                '0 4px 16px rgba(45,106,79,0.2), inset 0 1px 0 rgba(255,255,255,0.8)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.5)',
            }}
          />
          {/* Pedestal base tier 2 */}
          <div
            style={{
              width: '130px',
              height: '10px',
              marginTop: '2px',
              background:
                'linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(180,220,195,0.7) 100%)',
              borderRadius: '6px',
              boxShadow: '0 4px 12px rgba(45,106,79,0.15)',
              border: '1px solid rgba(255,255,255,0.4)',
            }}
          />
        </div>

        {/* Price + CTA */}
        <div className="flex items-center gap-4 mt-6">
          <span className="text-2xl font-extrabold text-foreground">$12</span>
          <button className="px-6 py-2.5 bg-primary text-primary-foreground rounded-full text-xs font-bold tracking-wide hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
            Add to Cart
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes float3d {
          0%,
          100% {
            transform: translateY(0px) translateZ(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-10px) translateZ(8px) rotate(3deg);
          }
          66% {
            transform: translateY(-5px) translateZ(4px) rotate(-2deg);
          }
        }
        @keyframes shadowPulse {
          0%,
          100% {
            transform: scaleX(1);
            opacity: 0.5;
          }
          50% {
            transform: scaleX(0.85);
            opacity: 0.3;
          }
        }
      `}</style>
    </div>
  );
}
