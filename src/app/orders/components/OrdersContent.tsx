'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

type OrderStatus = 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

interface OrderItem {
  name: string;
  price: number;
  qty: number;
  image: string;
  alt: string;
}

interface Order {
  id: string;
  date: string;
  status: OrderStatus;
  total: number;
  items: OrderItem[];
  address: string;
  tracking?: string;
}

const orders: Order[] = [
{
  id: 'EG-2026-0421',
  date: 'May 18, 2026',
  status: 'Shipped',
  total: 100,
  tracking: '1Z999AA10123456784',
  address: '123 Green Valley Drive, Portland, OR 97201',
  items: [
  { name: 'HydraGlow Serum', price: 48, qty: 1, image: "https://img.rocket.new/generatedImages/rocket_gen_img_1d677b008-1767289040310.png", alt: 'HydraGlow serum bottle' },
  { name: 'Vitamin C Cream', price: 52, qty: 1, image: "https://img.rocket.new/generatedImages/rocket_gen_img_1ae0eba2f-1772593906015.png", alt: 'Vitamin C cream jar' }]

},
{
  id: 'EG-2026-0389',
  date: 'May 5, 2026',
  status: 'Delivered',
  total: 62,
  address: '123 Green Valley Drive, Portland, OR 97201',
  items: [
  { name: 'Bamboo Scrub', price: 28, qty: 1, image: "https://images.unsplash.com/photo-1632127421044-d918b3268071", alt: 'Bamboo scrub jar' },
  { name: 'Green Tea Toner', price: 24, qty: 1, image: "https://img.rocket.new/generatedImages/rocket_gen_img_1c0f3d6fb-1772593905198.png", alt: 'Green tea toner bottle' }]

},
{
  id: 'EG-2026-0301',
  date: 'Apr 12, 2026',
  status: 'Delivered',
  total: 54,
  address: '123 Green Valley Drive, Portland, OR 97201',
  items: [
  { name: 'Rose Hip Oil', price: 36, qty: 1, image: "https://images.unsplash.com/photo-1649423469940-757a559bb485", alt: 'Rose hip oil bottle' },
  { name: 'Aloe Vera Gel', price: 18, qty: 1, image: "https://img.rocket.new/generatedImages/rocket_gen_img_1d1fc525b-1775043160580.png", alt: 'Aloe vera gel jar' }]

},
{
  id: 'EG-2026-0247',
  date: 'Mar 28, 2026',
  status: 'Processing',
  total: 58,
  address: '123 Green Valley Drive, Portland, OR 97201',
  items: [
  { name: 'Retinol Night Cream', price: 58, qty: 1, image: "https://images.unsplash.com/photo-1728487891797-b7281995165b", alt: 'Retinol night cream jar' }]

}];


const statusStyles: Record<OrderStatus, string> = {
  Processing: 'status-processing',
  Shipped: 'status-shipped',
  Delivered: 'status-delivered',
  Cancelled: 'status-cancelled'
};

const statusIcons: Record<OrderStatus, string> = {
  Processing: 'ClockIcon',
  Shipped: 'TruckIcon',
  Delivered: 'CheckCircleIcon',
  Cancelled: 'XCircleIcon'
};

export default function OrdersContent() {
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggle = (id: string) => setExpanded((prev) => prev === id ? null : id);

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.4em] text-primary block mb-2">My Account</span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">Order History</h1>
          </div>
          <div className="badge-eco rounded-full px-4 py-2 flex items-center gap-2">
            <Icon name="TruckIcon" size={14} className="text-primary" />
            <span className="text-xs font-bold text-primary">Free shipping on all orders</span>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {orders.map((order) =>
          <div key={order.id} className="bg-card rounded-3xl border border-border overflow-hidden">
              {/* Order Header */}
              <button
              onClick={() => toggle(order.id)}
              className="w-full p-6 flex flex-col sm:flex-row sm:items-center gap-4 text-left hover:bg-muted/30 transition-colors">
              
                <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Order</p>
                    <p className="text-sm font-bold text-foreground">{order.id}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Date</p>
                    <p className="text-sm font-bold text-foreground">{order.date}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Total</p>
                    <p className="text-sm font-bold text-foreground">${order.total}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Status</p>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${statusStyles[order.status]}`}>
                      <Icon
                      name={statusIcons[order.status] as Parameters<typeof Icon>[0]['name']}
                      size={12}
                      className="" />
                    
                      {order.status}
                    </span>
                  </div>
                </div>

                {/* Item Thumbnails */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <div className="flex -space-x-2">
                    {order.items.slice(0, 3).map((item, idx) =>
                  <div key={idx} className="w-9 h-9 rounded-xl overflow-hidden border-2 border-card">
                        <AppImage src={item.image} alt={item.alt} width={36} height={36} className="object-cover w-full h-full" />
                      </div>
                  )}
                  </div>
                  <Icon
                  name={expanded === order.id ? 'ChevronUpIcon' : 'ChevronDownIcon'}
                  size={18}
                  className="text-muted-foreground ml-2" />
                
                </div>
              </button>

              {/* Expanded Detail */}
              {expanded === order.id &&
            <div className="px-6 pb-6 border-t border-border pt-5 space-y-5">
                  {/* Items */}
                  <div className="space-y-3">
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Items</p>
                    {order.items.map((item, idx) =>
                <div key={idx} className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl overflow-hidden flex-shrink-0 bg-muted">
                          <AppImage src={item.image} alt={item.alt} width={56} height={56} className="object-cover w-full h-full" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-bold text-foreground">{item.name}</p>
                          <p className="text-xs text-muted-foreground">Qty: {item.qty}</p>
                        </div>
                        <span className="text-sm font-bold text-foreground">${item.price}</span>
                      </div>
                )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                    {/* Shipping */}
                    <div className="bg-muted rounded-2xl p-4 space-y-2">
                      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Shipping Address</p>
                      <p className="text-sm text-foreground leading-relaxed">{order.address}</p>
                      <div className="flex items-center gap-1.5 text-primary">
                        <Icon name="TruckIcon" size={14} className="text-primary" />
                        <span className="text-xs font-bold">Free Shipping</span>
                      </div>
                    </div>

                    {/* Tracking */}
                    <div className="bg-muted rounded-2xl p-4 space-y-2">
                      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Tracking</p>
                      {order.tracking ?
                  <>
                          <p className="text-sm font-bold text-foreground font-mono">{order.tracking}</p>
                          <button className="text-xs font-bold text-primary hover:underline">
                            Track Package →
                          </button>
                        </> :

                  <p className="text-sm text-muted-foreground">
                          {order.status === 'Processing' ? 'Tracking will be available once shipped.' : 'No tracking available.'}
                        </p>
                  }
                    </div>
                  </div>

                  {order.status === 'Delivered' &&
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full text-sm font-bold hover:bg-primary/90 transition-all">
                
                      <Icon name="ArrowPathIcon" size={14} className="text-primary-foreground" />
                      Reorder Items
                    </Link>
              }
                </div>
            }
            </div>
          )}
        </div>
      </div>
    </div>);

}