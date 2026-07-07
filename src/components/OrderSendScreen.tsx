/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowLeft, Bell, MapPin, Flag, ChevronRight, Package, Calendar, MessageSquare, Tag, ShieldCheck } from 'lucide-react';
import { Screen, Order } from '../types';

interface OrderSendScreenProps {
  onNavigate: (screen: Screen) => void;
  onAddOrder: (order: Omit<Order, 'id' | 'time'>) => void;
}

export default function OrderSendScreen({ onNavigate, onAddOrder }: OrderSendScreenProps) {
  const [pickup, setPickup] = useState('静安区南京西路1601号 芮欧百货 B2层');
  const [dropoff, setDropoff] = useState('黄浦区淮海中路300号 K11购物艺术中心 5楼');
  const [itemType, setItemType] = useState('鲜花');
  const [weight, setWeight] = useState('2kg内');
  const [time, setTime] = useState('立即取件');
  const [notes, setNotes] = useState('放在前台即可，到达请电话联系，谢谢。');

  const [showTypeSelect, setShowTypeSelect] = useState(false);
  const [showWeightSelect, setShowWeightSelect] = useState(false);

  const handleSubmit = () => {
    // Call parent to add order
    onAddOrder({
      type: 'send',
      title: '即时帮送',
      status: 'waiting',
      pickup: pickup || '请输入取件地址',
      dropoff: dropoff || '请输入收件地址',
      price: 10.00,
      items: `${itemType} / ${weight}`,
      notes: notes,
      rider: {
        name: '王力宏',
        phone: '13800138000',
        rating: 4.9,
        completedCount: 3248,
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnGI6kp3xLfOr2CKXwEMuG6ZvYp6NK6MfGuqCdbdTghLHy8V9jZuWD5t5loVQHhsUWkps6OVFKZ8NjkdIogLxdRuw7GBSl_A1fHJHgkL7eLewpoLsUU1D54rZ8LvOvkvXy9R8OLZFjdBEQrEEtOPkWDPUMkiMQLHH2U7A2yljLiJrXqdd0KsJvHkH6ue8AGf3bLAldwcRaXyT0qTyw24-jl6wjoo7jSsjCArF1Pog-OQBL3q-frtW-',
      },
    });
    // Navigation to success is handled in App.tsx by the callback
  };

  return (
    <div className="min-h-screen pb-32 bg-background animate-fade-in relative">
      {/* Top App Bar */}
      <header className="fixed top-0 left-0 w-full z-50 bg-surface border-b border-surface-variant flex justify-between items-center px-4 h-14">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('booking')}
            className="p-2 -ml-2 rounded-full hover:bg-surface-container-low active:scale-95 transition-transform text-primary"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-base font-display font-bold text-primary">帮我送</h1>
        </div>
        <button className="p-2 text-primary hover:opacity-85">
          <Bell className="w-5 h-5" />
        </button>
      </header>

      {/* Main Container */}
      <main className="pt-18 px-4 space-y-4 max-w-md mx-auto">
        {/* Address Section */}
        <section className="bg-white rounded-2xl border border-surface-variant p-4 space-y-4 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="flex flex-col items-center pt-1 shrink-0">
              <MapPin className="w-5 h-5 text-primary" />
              <div className="w-px h-12 border-l-2 border-dotted border-outline-variant my-1"></div>
              <Flag className="w-5 h-5 text-secondary" />
            </div>
            <div className="flex-grow space-y-4 min-w-0">
              {/* Pickup Address */}
              <div>
                <p className="text-[10px] text-outline font-bold uppercase tracking-wider">从哪里取</p>
                <div className="flex justify-between items-center mt-1">
                  <input
                    type="text"
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    placeholder="请输入取件地址"
                    className="w-full bg-transparent border-none p-0 focus:ring-0 text-sm font-bold text-on-surface"
                  />
                </div>
              </div>
              <hr className="border-surface-variant" />
              {/* Dropoff Address */}
              <div>
                <p className="text-[10px] text-outline font-bold uppercase tracking-wider">送到哪里</p>
                <div className="flex justify-between items-center mt-1">
                  <input
                    type="text"
                    value={dropoff}
                    onChange={(e) => setDropoff(e.target.value)}
                    placeholder="请输入收件地址"
                    className="w-full bg-transparent border-none p-0 focus:ring-0 text-sm font-bold text-on-surface"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Item Details Card */}
        <section className="bg-white rounded-2xl border border-surface-variant p-4 space-y-4 shadow-sm relative">
          <h2 className="text-sm font-display font-extrabold text-on-surface flex items-center gap-2">
            <Package className="w-5 h-5 text-primary" />
            物品信息
          </h2>

          <div className="grid grid-cols-2 gap-3 relative">
            {/* Item Type */}
            <div
              onClick={() => {
                setShowTypeSelect(!showTypeSelect);
                setShowWeightSelect(false);
              }}
              className="p-3 bg-surface border border-surface-variant rounded-xl cursor-pointer hover:bg-surface-container-low transition-colors relative"
            >
              <p className="text-[10px] text-outline font-bold uppercase tracking-wider mb-0.5">物品类型</p>
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-on-surface">{itemType || '请选择'}</span>
                <ChevronRight className="w-4 h-4 text-outline rotate-90" />
              </div>

              {showTypeSelect && (
                <div className="absolute top-16 left-0 w-full bg-white border border-outline-variant rounded-xl shadow-lg z-30 py-1 divide-y divide-surface-variant">
                  {['鲜花', '文件', '生活用品', '数码配件', '美食'].map((t) => (
                    <div
                      key={t}
                      onClick={(e) => {
                        e.stopPropagation();
                        setItemType(t);
                        setShowTypeSelect(false);
                      }}
                      className="px-3 py-2 text-xs font-semibold hover:bg-surface-container text-on-surface cursor-pointer"
                    >
                      {t}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Weight */}
            <div
              onClick={() => {
                setShowWeightSelect(!showWeightSelect);
                setShowTypeSelect(false);
              }}
              className="p-3 bg-surface border border-surface-variant rounded-xl cursor-pointer hover:bg-surface-container-low transition-colors relative"
            >
              <p className="text-[10px] text-outline font-bold uppercase tracking-wider mb-0.5">重量</p>
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-on-surface">{weight}</span>
                <ChevronRight className="w-4 h-4 text-outline rotate-90" />
              </div>

              {showWeightSelect && (
                <div className="absolute top-16 left-0 w-full bg-white border border-outline-variant rounded-xl shadow-lg z-30 py-1 divide-y divide-surface-variant">
                  {['2kg内', '5kg以下', '10kg以下', '15kg以下'].map((w) => (
                    <div
                      key={w}
                      onClick={(e) => {
                        e.stopPropagation();
                        setWeight(w);
                        setShowWeightSelect(false);
                      }}
                      className="px-3 py-2 text-xs font-semibold hover:bg-surface-container text-on-surface cursor-pointer"
                    >
                      {w}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Time Selection */}
          <div className="flex items-center justify-between p-3 bg-surface rounded-xl border border-surface-variant">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-on-surface-variant" />
              <div>
                <p className="text-[10px] text-outline font-bold uppercase tracking-wider">取件时间</p>
                <p className="text-xs font-bold text-on-surface mt-0.5">{time}</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-outline" />
          </div>

          {/* Remarks */}
          <div className="p-3 bg-surface rounded-xl border border-surface-variant flex items-start gap-2">
            <MessageSquare className="w-5 h-5 text-on-surface-variant mt-1 shrink-0" />
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-transparent border-none p-0 text-xs font-semibold text-on-surface focus:ring-0 placeholder:text-outline/80 resize-none"
              placeholder="给骑手留言（如：放外卖柜、电话联系等）"
              rows={2}
            />
          </div>
        </section>

        {/* Fees & Coupons */}
        <section className="bg-white rounded-2xl border border-surface-variant p-4 space-y-3 shadow-sm">
          <div className="flex justify-between items-center pb-2 border-b border-surface-variant">
            <div className="flex items-center gap-2 text-xs font-bold">
              <Tag className="w-4 h-4 text-primary" />
              <span>优惠券</span>
            </div>
            <div className="flex items-center gap-1 cursor-pointer hover:opacity-85">
              <span className="bg-error-container text-on-error-container text-[9px] px-2.5 py-0.5 rounded-full font-bold">
                1张可用
              </span>
              <ChevronRight className="w-4 h-4 text-outline" />
            </div>
          </div>
          <div className="space-y-2 pt-1 text-xs">
            <div className="flex justify-between font-semibold">
              <span className="text-on-surface-variant">配送费</span>
              <span className="text-on-surface">¥15.00</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span className="text-on-surface-variant">优惠减免</span>
              <span className="text-error font-extrabold">-¥5.00</span>
            </div>
          </div>
        </section>

        {/* Safety Notice */}
        <div className="flex items-start gap-2 px-1">
          <ShieldCheck className="w-4 h-4 text-primary mt-0.5 shrink-0" />
          <p className="text-[11px] leading-relaxed text-on-surface-variant font-medium">
            下单即表示您已同意 <a className="text-primary font-bold hover:underline" href="#">《跑腿服务协议》</a>，我们将全力保障您的物品安全及配送时效。
          </p>
        </div>
      </main>

      {/* Fixed Bottom Action Bar */}
      <footer className="fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-md border-t border-surface-variant shadow-[0_-4px_16px_rgba(0,0,0,0.04)] px-4 pt-3 pb-safe z-50">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1">
              <span className="text-xs font-semibold text-on-surface-variant">合计</span>
              <span className="text-2xl font-display font-black text-primary">¥10.00</span>
            </div>
            <span className="text-[9px] text-outline font-bold">已优惠 ¥5.00</span>
          </div>
          <button
            onClick={handleSubmit}
            className="bg-primary hover:bg-primary-container text-white text-sm font-bold px-12 py-3.5 rounded-full shadow-md shadow-primary/25 transition-all active:scale-95"
          >
            立即下单
          </button>
        </div>
      </footer>
    </div>
  );
}
