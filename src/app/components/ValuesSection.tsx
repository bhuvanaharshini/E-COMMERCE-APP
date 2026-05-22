import React from 'react';
import Icon from '@/components/ui/AppIcon';

const values = [
  {
    icon: 'SparklesIcon',
    title: 'Clean Ingredients',
    desc: 'Every formula is free from parabens, sulfates, and synthetic fragrances. Just pure botanical power.',
  },
  {
    icon: 'GlobeAltIcon',
    title: 'Eco Packaging',
    desc: 'Recycled glass, biodegradable wrapping, and carbon-neutral shipping on every single order.',
  },
  {
    icon: 'TruckIcon',
    title: 'Free Shipping',
    desc: 'No minimums, no surprises. Every order ships free to your door, anywhere in the US.',
  },
  {
    icon: 'ShieldCheckIcon',
    title: 'Dermatologist Tested',
    desc: 'Clinically tested and approved for all skin types, including sensitive and acne-prone skin.',
  },
];

export default function ValuesSection() {
  return (
    <section className="py-20 px-4 sm:px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-xs font-bold uppercase tracking-[0.4em] text-primary block mb-3">
            Why EcoGlow
          </span>
          <h2 className="text-display font-extrabold text-foreground tracking-tight">
            Beauty That Does <span className="text-primary italic font-light">Good.</span>
          </h2>
        </div>

        {/* Asymmetric bento layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {values.map((v, i) => (
            <div
              key={i}
              className={`p-8 rounded-3xl border border-border transition-all duration-300 hover:border-accent hover:shadow-lg hover:shadow-primary/5 group ${
                i === 0 ? 'bg-primary text-primary-foreground' : 'bg-card'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${
                  i === 0 ? 'bg-primary-foreground/20' : 'bg-muted'
                }`}
              >
                <Icon
                  name={v.icon as Parameters<typeof Icon>[0]['name']}
                  size={22}
                  className={i === 0 ? 'text-primary-foreground' : 'text-primary'}
                />
              </div>
              <h3
                className={`text-lg font-bold mb-3 ${
                  i === 0 ? 'text-primary-foreground' : 'text-foreground'
                }`}
              >
                {v.title}
              </h3>
              <p
                className={`text-sm leading-relaxed ${
                  i === 0 ? 'text-primary-foreground/70' : 'text-muted-foreground'
                }`}
              >
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}