import React from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

const testimonials = [
{
  name: 'Priya Sharma',
  role: 'Skincare Enthusiast · San Francisco, CA',
  quote: 'My skin has never looked better. After 3 weeks of using the HydraGlow Serum, my hyperpigmentation faded by almost half. Completely obsessed.',
  rating: 5,
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1fd05d413-1772074755141.png",
  avatarAlt: 'South Asian woman smiling with glowing skin against soft light background',
  product: 'HydraGlow Serum'
},
{
  name: 'Maya Johnson',
  role: 'Wellness Coach · Austin, TX',
  quote: 'I\'ve tried dozens of "natural" brands, but EcoGlow is the only one that actually delivers. The Bamboo Scrub is my Sunday ritual now.',
  rating: 5,
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_153f63fbd-1772079974830.png",
  avatarAlt: 'African American woman with natural hair and bright smile in natural light',
  product: 'Bamboo Scrub'
},
{
  name: 'Chloe Beaumont',
  role: 'Esthetician · New York, NY',
  quote: 'As a licensed esthetician, I\'m extremely picky. EcoGlow\'s ingredient lists are immaculate — I recommend it to all my clients with sensitive skin.',
  rating: 5,
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_118b236b8-1772642991917.png",
  avatarAlt: 'White woman with blonde hair and professional appearance against light background',
  product: 'Rose Hip Oil'
}];


export default function TestimonialsSection() {
  return (
    <section className="py-20 px-4 sm:px-6 bg-muted/40">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-xs font-bold uppercase tracking-[0.4em] text-primary block mb-3">
            Real Results
          </span>
          <h2 className="text-display font-extrabold text-foreground tracking-tight">
            50,000+ Glowing <span className="text-primary italic font-light">Reviews.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials?.map((t, i) =>
          <div key={i} className="bg-card rounded-3xl border border-border p-8 flex flex-col gap-5 hover:border-accent transition-colors">
              <div className="flex gap-1">
                {Array.from({ length: t?.rating })?.map((_, s) =>
              <Icon key={s} name="StarIcon" size={14} variant="solid" className="text-amber-400" />
              )}
              </div>
              <blockquote className="text-sm leading-relaxed text-muted-foreground flex-1">
                "{t?.quote}"
              </blockquote>
              <div className="flex items-center gap-3 pt-2 border-t border-border">
                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                  <AppImage
                  src={t?.avatar}
                  alt={t?.avatarAlt}
                  width={40}
                  height={40}
                  className="object-cover w-full h-full" />
                
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">{t?.name}</p>
                  <p className="text-xs text-muted-foreground">{t?.role}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

}