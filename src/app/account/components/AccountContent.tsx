'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

type Section = 'profile' | 'addresses' | 'wishlist';

const wishlistItems = [
{ id: 2, name: 'Rose Hip Oil', price: 36, image: "https://images.unsplash.com/photo-1644641811682-0439fd0185d0", alt: 'Amber rose hip oil dropper bottle beside dried rose petals on cream linen' },
{ id: 4, name: 'Green Tea Toner', price: 24, image: "https://img.rocket.new/generatedImages/rocket_gen_img_19827f612-1772648183994.png", alt: 'Frosted green tea toner spray bottle beside fresh green tea leaves on white marble' },
{ id: 9, name: 'Clay Detox Mask', price: 34, image: "https://img.rocket.new/generatedImages/rocket_gen_img_1bb298f2f-1772073735691.png", alt: 'Grey clay mask jar beside kaolin clay powder and eucalyptus leaves on slate surface' }];


export default function AccountContent() {
  const [activeSection, setActiveSection] = useState<Section>('profile');
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    fullName: 'Emma Rodriguez',
    email: 'emma.rodriguez@email.com',
    phone: '(503) 234-5678',
    birthday: '1992-04-15'
  });
  const [savedProfile, setSavedProfile] = useState({ ...profile });
  const [wishlist, setWishlist] = useState(wishlistItems);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    setSavedProfile({ ...profile });
    setEditing(false);
  };

  const removeWishlist = (id: number) => {
    setWishlist((prev) => prev.filter((w) => w.id !== id));
  };

  const navItems: {id: Section;label: string;icon: string;}[] = [
  { id: 'profile', label: 'Profile', icon: 'UserCircleIcon' },
  { id: 'addresses', label: 'Addresses', icon: 'MapPinIcon' },
  { id: 'wishlist', label: 'Wishlist', icon: 'HeartIcon' }];


  return (
    <div className="pt-28 pb-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <span className="text-xs font-bold uppercase tracking-[0.4em] text-primary block mb-2">My Account</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">Account Dashboard</h1>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
          { label: 'Total Orders', value: '4', icon: 'ShoppingBagIcon' },
          { label: 'Wishlist Items', value: String(wishlist.length), icon: 'HeartIcon' },
          { label: 'Member Since', value: 'Jan 2026', icon: 'CalendarIcon' }].
          map((stat) =>
          <div key={stat.label} className="bg-card rounded-2xl border border-border p-4 sm:p-5 text-center">
              <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center mx-auto mb-3">
                <Icon name={stat.icon as Parameters<typeof Icon>[0]['name']} size={18} className="text-primary" />
              </div>
              <p className="text-lg sm:text-xl font-extrabold text-foreground">{stat.value}</p>
              <p className="text-[10px] sm:text-xs font-bold text-muted-foreground uppercase tracking-wider mt-1">{stat.label}</p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-3">
            {/* Avatar Card */}
            <div className="bg-card rounded-3xl border border-border p-6 text-center mb-4">
              <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-3 border-4 border-secondary">
                <AppImage
                  src="https://img.rocket.new/generatedImages/rocket_gen_img_1fd05d413-1772074755141.png"
                  alt="Emma Rodriguez profile photo - South Asian woman with glowing skin and warm smile"
                  width={80}
                  height={80}
                  className="object-cover w-full h-full" />
                
              </div>
              <p className="font-bold text-base text-foreground">{savedProfile.fullName}</p>
              <p className="text-xs text-muted-foreground mt-1 truncate">{savedProfile.email}</p>
              <div className="mt-3 badge-eco rounded-full px-3 py-1 text-xs font-bold inline-block">
                🌿 Eco Member
              </div>
            </div>

            {/* Nav */}
            <nav className="bg-card rounded-3xl border border-border p-3 space-y-1">
              {navItems.map((item) =>
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all text-left ${
                activeSection === item.id ?
                'bg-primary text-primary-foreground' :
                'text-muted-foreground hover:bg-muted hover:text-foreground'}`
                }>
                
                  <Icon
                  name={item.icon as Parameters<typeof Icon>[0]['name']}
                  size={18}
                  className={activeSection === item.id ? 'text-primary-foreground' : 'text-muted-foreground'} />
                
                  {item.label}
                </button>
              )}
              <div className="h-px bg-border my-2" />
              <Link
                href="/orders"
                className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-muted-foreground hover:bg-muted hover:text-foreground transition-all">
                
                <Icon name="ShoppingBagIcon" size={18} className="text-muted-foreground" />
                Order History
              </Link>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-red-500 hover:bg-red-50 transition-all">
                <Icon name="ArrowRightOnRectangleIcon" size={18} className="text-red-500" />
                Sign Out
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9">

            {/* Profile Section */}
            {activeSection === 'profile' &&
            <div className="bg-card rounded-3xl border border-border p-8">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xl font-extrabold text-foreground">Personal Information</h2>
                  <button
                  onClick={() => editing ? handleSave() : setEditing(true)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                  editing ?
                  'bg-primary text-primary-foreground hover:bg-primary/90' :
                  'border-2 border-border text-foreground hover:border-primary hover:text-primary'}`
                  }>
                  
                    <Icon
                    name={editing ? 'CheckIcon' : 'PencilIcon'}
                    size={15}
                    className={editing ? 'text-primary-foreground' : 'text-foreground'} />
                  
                    {editing ? 'Save Changes' : 'Edit Profile'}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                { name: 'fullName', label: 'Full Name', type: 'text' },
                { name: 'email', label: 'Email Address', type: 'email' },
                { name: 'phone', label: 'Phone Number', type: 'tel' },
                { name: 'birthday', label: 'Birthday', type: 'date' }].
                map((field) =>
                <div key={field.name}>
                      <label className="block text-xs font-bold text-foreground mb-2 uppercase tracking-wider">
                        {field.label}
                      </label>
                      {editing ?
                  <input
                    name={field.name}
                    type={field.type}
                    value={profile[field.name as keyof typeof profile]}
                    onChange={handleProfileChange}
                    className="input-eco w-full px-4 py-3 text-sm text-foreground" /> :


                  <div className="bg-muted rounded-2xl px-4 py-3 text-sm font-medium text-foreground">
                          {savedProfile[field.name as keyof typeof savedProfile]}
                        </div>
                  }
                    </div>
                )}
                </div>

                {editing &&
              <button
                onClick={() => {setProfile({ ...savedProfile });setEditing(false);}}
                className="mt-5 text-sm font-bold text-muted-foreground hover:text-foreground transition-colors">
                
                    Cancel
                  </button>
              }

                {/* Password Change */}
                <div className="mt-8 pt-8 border-t border-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-foreground">Password</h3>
                      <p className="text-xs text-muted-foreground mt-1">Last changed 3 months ago</p>
                    </div>
                    <button className="px-5 py-2.5 border-2 border-border text-foreground rounded-full text-sm font-bold hover:border-primary hover:text-primary transition-all">
                      Change Password
                    </button>
                  </div>
                </div>

                {/* Preferences */}
                <div className="mt-8 pt-8 border-t border-border space-y-4">
                  <h3 className="text-base font-bold text-foreground">Notification Preferences</h3>
                  {[
                { label: 'Order updates & shipping notifications', defaultChecked: true },
                { label: 'New product launches & restocks', defaultChecked: true },
                { label: 'Exclusive member offers & promotions', defaultChecked: false }].
                map((pref, idx) =>
                <label key={idx} className="flex items-center justify-between cursor-pointer">
                      <span className="text-sm text-muted-foreground">{pref.label}</span>
                      <div className="relative flex-shrink-0 ml-4">
                        <input type="checkbox" defaultChecked={pref.defaultChecked} className="sr-only peer" />
                        <div className="w-10 h-5 bg-border rounded-full peer peer-checked:bg-primary transition-colors" />
                        <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform peer-checked:translate-x-5" />
                      </div>
                    </label>
                )}
                </div>
              </div>
            }

            {/* Addresses Section */}
            {activeSection === 'addresses' &&
            <div className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl font-extrabold text-foreground">Saved Addresses</h2>
                  <button className="flex items-center gap-2 px-5 py-2.5 border-2 border-border text-foreground rounded-full text-sm font-bold hover:border-primary hover:text-primary transition-all">
                    <Icon name="PlusIcon" size={15} className="text-foreground" />
                    Add Address
                  </button>
                </div>

                {[
              {
                label: 'Home',
                defaultAddr: true,
                name: 'Emma Rodriguez',
                address: '123 Green Valley Drive',
                city: 'Portland, OR 97201',
                country: 'United States',
                phone: '(503) 234-5678'
              },
              {
                label: 'Work',
                defaultAddr: false,
                name: 'Emma Rodriguez',
                address: '500 SW Morrison Street, Suite 200',
                city: 'Portland, OR 97204',
                country: 'United States',
                phone: '(503) 234-5678'
              }].
              map((addr, idx) =>
              <div
                key={idx}
                className={`bg-card rounded-3xl border p-6 flex flex-col sm:flex-row sm:items-start gap-4 transition-colors ${
                addr.defaultAddr ? 'border-primary/30' : 'border-border'}`
                }>
                
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 bg-muted rounded-xl flex items-center justify-center">
                          <Icon name="MapPinIcon" size={16} className="text-primary" />
                        </div>
                        <span className="text-sm font-extrabold text-foreground">{addr.label}</span>
                        {addr.defaultAddr &&
                    <span className="badge-eco px-2.5 py-0.5 rounded-full text-xs font-bold">Default</span>
                    }
                      </div>
                      <p className="text-sm font-bold text-foreground">{addr.name}</p>
                      <p className="text-sm text-muted-foreground">{addr.address}</p>
                      <p className="text-sm text-muted-foreground">{addr.city}</p>
                      <p className="text-sm text-muted-foreground">{addr.country}</p>
                      <p className="text-sm text-muted-foreground mt-1">{addr.phone}</p>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button className="px-4 py-2 border border-border rounded-xl text-xs font-bold text-muted-foreground hover:border-primary hover:text-primary transition-all">
                        Edit
                      </button>
                      {!addr.defaultAddr &&
                  <button className="px-4 py-2 border border-border rounded-xl text-xs font-bold text-red-500 hover:bg-red-50 transition-all">
                          Remove
                        </button>
                  }
                      {!addr.defaultAddr &&
                  <button className="px-4 py-2 border border-border rounded-xl text-xs font-bold text-muted-foreground hover:border-primary hover:text-primary transition-all">
                          Set Default
                        </button>
                  }
                    </div>
                  </div>
              )}

                {/* Free Shipping Note */}
                <div className="badge-eco rounded-2xl px-5 py-4 flex items-center gap-3">
                  <Icon name="TruckIcon" size={18} className="text-primary flex-shrink-0" />
                  <p className="text-sm font-bold text-primary">
                    Free shipping to all US addresses — no minimum order required.
                  </p>
                </div>
              </div>
            }

            {/* Wishlist Section */}
            {activeSection === 'wishlist' &&
            <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-extrabold text-foreground">
                    Wishlist
                    <span className="ml-2 text-base font-bold text-muted-foreground">({wishlist.length})</span>
                  </h2>
                  <Link
                  href="/products"
                  className="flex items-center gap-1.5 text-sm font-bold text-primary hover:gap-2.5 transition-all">
                  
                    Browse More
                    <Icon name="ArrowRightIcon" size={14} className="text-primary" />
                  </Link>
                </div>

                {wishlist.length === 0 ?
              <div className="text-center py-16 space-y-4 bg-card rounded-3xl border border-border">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                      <Icon name="HeartIcon" size={28} className="text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground">Your wishlist is empty</h3>
                    <p className="text-sm text-muted-foreground">Save products you love for later.</p>
                    <Link
                  href="/products"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full text-sm font-bold hover:bg-primary/90 transition-all">
                  
                      Browse Products
                    </Link>
                  </div> :

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {wishlist.map((item) =>
                <div
                  key={item.id}
                  className="bg-card rounded-3xl border border-border overflow-hidden group product-card-hover">
                  
                        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                          <AppImage
                      src={item.image}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700" />
                    
                          <button
                      onClick={() => removeWishlist(item.id)}
                      className="absolute top-3 right-3 w-9 h-9 rounded-full glass-card flex items-center justify-center hover:scale-110 transition-all"
                      aria-label="Remove from wishlist">
                      
                            <Icon name="HeartIcon" size={15} variant="solid" className="text-red-500" />
                          </button>
                        </div>
                        <div className="p-5">
                          <h3 className="text-sm font-bold text-foreground mb-1">{item.name}</h3>
                          <p className="text-lg font-extrabold text-foreground mb-4">${item.price}</p>
                          <Link
                      href="/cart"
                      className="w-full flex items-center justify-center gap-2 py-2.5 bg-primary text-primary-foreground rounded-full text-xs font-bold tracking-wide hover:bg-primary/90 transition-all">
                      
                            <Icon name="ShoppingBagIcon" size={13} className="text-primary-foreground" />
                            Add to Cart
                          </Link>
                        </div>
                      </div>
                )}
                  </div>
              }
              </div>
            }
          </div>
        </div>
      </div>
    </div>);

}