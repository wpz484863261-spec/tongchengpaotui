/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { ArrowLeft, Bell, Phone, MessageSquare, MapPin, Truck, Check, HelpCircle, Star } from 'lucide-react';
import { Screen, Order } from '../types';

interface OrderDetailOngoingProps {
  order: Order | null;
  onNavigate: (screen: Screen) => void;
  onCompleteOrder?: (orderId: string) => void; // To simulate completing order
}

export default function OrderDetailOngoing({ order, onNavigate, onCompleteOrder }: OrderDetailOngoingProps) {
  useEffect(() => {
    // Subtle map scale interaction simulation
    const mapImg = document.getElementById('ongoing-map-img');
    if (mapImg) {
      let pos = 0;
      const interval = setInterval(() => {
        pos = (pos + 0.05) % 360;
        mapImg.style.transform = `scale(1.05) translate(${Math.sin(pos) * 1.5}px, ${Math.cos(pos) * 1.5}px)`;
      }, 120);
      return () => clearInterval(interval);
    }
  }, []);

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-on-surface-variant font-semibold">
        加载中...
      </div>
    );
  }

  const handleCompleteSimulation = () => {
    if (onCompleteOrder) {
      onCompleteOrder(order.id);
    }
    onNavigate('order_details_completed');
  };

  return (
    <div className="min-h-screen pb-32 bg-background text-on-surface selection:bg-primary-fixed selection:text-on-primary-fixed animate-fade-in relative">
      {/* Simulation Chip */}
      <div className="fixed top-16 right-4 z-50">
        <button
          onClick={handleCompleteSimulation}
          className="bg-secondary text-white text-[10px] px-3.5 py-1.5 rounded-full font-bold shadow-md hover:bg-secondary/90 active:scale-95 transition-transform flex items-center gap-1 cursor-pointer"
        >
          <Check className="w-3.5 h-3.5" />
          <span>点击模拟: 骑手送达</span>
        </button>
      </div>

      {/* Top App Bar */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md flex justify-between items-center px-4 h-14 border-b border-surface-variant">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('orders')}
            className="p-1.5 rounded-full hover:bg-surface-container-low transition-colors active:scale-95 text-primary"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-base font-display font-bold text-primary">订单详情</h1>
        </div>
        <button className="p-2 rounded-full hover:bg-surface-container-low transition-colors text-on-surface-variant">
          <Bell className="w-5 h-5" />
        </button>
      </header>

      {/* Main Container */}
      <main className="pt-14 pb-20">
        {/* Live Map Display */}
        <section className="relative w-full h-[320px] overflow-hidden bg-surface-dim">
          <div className="absolute inset-0 z-0">
            <img
              id="ongoing-map-img"
              className="w-full h-full object-cover transition-transform duration-100 ease-linear"
              alt="Interactive Map Overview"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHAtD5GbdpVB6poAeaIzSUR_5vf0KhtPWpYnjUszfVrEXHnOmTe-oAJ1nxt6oq0F5JLvmpfSWAfoxYTIRsx5K14DWDy-4Fr16Rr0DWVGiA9Ey4L_Qh1gaZ6EE8xd1-0nD5rXonR8inPv58Zl1f_9-0iFxF9LK5l6hSouy9p864TFyYYiKjlz0nQ15CCgHNukCRlvHWx7mGaYjiqIIB1pTUkIvxv3cKGqdolV19vcxRDtaMdIkfurlB"
            />
          </div>
          {/* Map Overlays */}
          <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none"></div>

          {/* Floating Status Badge */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary-container text-white shadow-md border border-white/10">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
              <span className="text-[10px] font-bold uppercase tracking-wider">骑手正在全速配送中...</span>
            </div>
          </div>
        </section>

        {/* Order Content Overlay */}
        <div className="px-4 -mt-8 relative z-30 space-y-4">
          {/* Rider Information Card */}
          <div className="bg-white border border-surface-variant rounded-2xl p-4 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-full border-2 border-primary-fixed overflow-hidden shrink-0">
                  <img
                    className="w-full h-full object-cover"
                    alt="Rider Portrait"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnGI6kp3xLfOr2CKXwEMuG6ZvYp6NK6MfGuqCdbdTghLHy8V9jZuWD5t5loVQHhsUWkps6OVFKZ8NjkdIogLxdRuw7GBSl_A1fHJHgkL7eLewpoLsUU1D54rZ8LvOvkvXy9R8OLZFjdBEQrEEtOPkWDPUMkiMQLHH2U7A2yljLiJrXqdd0KsJvHkH6ue8AGf3bLAldwcRaXyT0qTyw24-jl6wjoo7jSsjCArF1Pog-OQBL3q-frtW-"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-display font-extrabold text-on-surface">王力宏</h2>
                    <span className="bg-secondary-container text-on-secondary-container text-[9px] font-black px-2 py-0.5 rounded tracking-wide uppercase">
                      金牌跑腿
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-on-surface-variant text-[11px] font-semibold mt-1">
                    <Star className="w-3 h-3 fill-current text-amber-500" />
                    <span>4.9 分</span>
                    <span className="text-outline">•</span>
                    <span>已配送 3,248 单</span>
                  </div>
                </div>
              </div>
              <a
                className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary hover:bg-primary-container hover:text-white transition-all shadow-sm active:scale-90"
                href={`tel:${order.rider?.phone || '13800138000'}`}
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>

            <div className="p-3 bg-surface rounded-xl border border-surface-variant/70 flex items-start gap-2">
              <MessageSquare className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <p className="text-xs font-semibold text-on-surface-variant line-clamp-1">
                “您好，已取到包裹，预计 8 分钟内到达。”
              </p>
            </div>
          </div>

          {/* Delivery Details Bento Grid */}
          <div className="grid grid-cols-1 gap-4">
            {/* Status & Progress */}
            <div className="bg-white border border-surface-variant rounded-2xl p-4 shadow-sm">
              <div className="flex justify-between items-center mb-5 pb-2 border-b border-surface-variant/40">
                <span className="text-[10px] font-bold text-outline uppercase tracking-wider">配送进度</span>
                <span className="text-primary font-display font-extrabold text-sm">配送中</span>
              </div>

              <div className="relative pl-8 space-y-6">
                {/* Vertical Connector Line */}
                <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-surface-variant"></div>

                {/* Step 1 (Active) */}
                <div className="relative">
                  <div className="absolute -left-[27px] top-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center ring-4 ring-primary-fixed shadow-sm">
                    <Truck className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-on-surface">正在配送</span>
                    <span className="text-outline">14:25</span>
                  </div>
                  <p className="text-[11px] font-semibold text-on-surface-variant mt-0.5">骑手正前往您的收货地址</p>
                </div>

                {/* Step 2 (Completed) */}
                <div className="relative opacity-65">
                  <div className="absolute -left-[27px] top-0 w-6 h-6 rounded-full bg-surface-variant flex items-center justify-center shadow-sm">
                    <Check className="w-3.5 h-3.5 text-on-surface-variant" />
                  </div>
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-on-surface-variant">骑手已到店</span>
                    <span className="text-outline">14:15</span>
                  </div>
                </div>

                {/* Step 3 (Completed) */}
                <div className="relative opacity-65">
                  <div className="absolute -left-[27px] top-0 w-6 h-6 rounded-full bg-surface-variant flex items-center justify-center shadow-sm">
                    <Check className="w-3.5 h-3.5 text-on-surface-variant" />
                  </div>
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-on-surface-variant">订单已支付</span>
                    <span className="text-outline">14:02</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Specifics */}
            <div className="bg-white border border-surface-variant rounded-2xl overflow-hidden shadow-sm">
              <div className="px-4 py-3 bg-surface-container border-b border-surface-variant">
                <h3 className="text-xs font-display font-extrabold text-on-surface uppercase tracking-wider">订单信息</h3>
              </div>
              <div className="p-4 space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <span className="block text-[10px] text-outline font-bold uppercase tracking-wider">配送地址</span>
                    <p className="text-xs font-bold text-on-surface mt-0.5 leading-relaxed">
                      {order.dropoff || '上海市浦东新区陆家嘴环路1000号恒生银行大厦 25楼'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-3 border-t border-surface-variant/40">
                  <div>
                    <span className="block text-[10px] text-outline font-bold uppercase tracking-wider">流水号</span>
                    <p className="text-xs font-bold text-on-surface mt-0.5">{order.id}</p>
                  </div>
                  <div>
                    <span className="block text-[10px] text-outline font-bold uppercase tracking-wider">下单时间</span>
                    <p className="text-xs font-bold text-on-surface mt-0.5">2023-10-24 14:02</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-surface-variant/40">
                  <span className="block text-[10px] text-outline font-bold uppercase tracking-wider">订单备注</span>
                  <p className="text-xs font-extrabold text-primary italic mt-1 leading-relaxed">
                    “放在前台即可，到达请电话联系，谢谢。”
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Fixed Bottom Action Bar */}
      <footer className="fixed bottom-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md px-4 py-4 pb-safe border-t border-surface-variant shadow-[0_-4px_16px_rgba(0,0,0,0.04)]">
        <div className="flex gap-3 max-w-md mx-auto">
          <button className="flex-1 flex items-center justify-center gap-1.5 py-3 px-4 rounded-xl bg-surface-container border border-outline-variant text-on-surface-variant font-bold text-xs hover:bg-surface-container-high active:scale-95 transition-all">
            <HelpCircle className="w-4 h-4" />
            <span>联系客服</span>
          </button>
          <button className="flex-[1.5] flex items-center justify-center gap-1.5 py-3 px-4 rounded-xl bg-primary text-white font-bold text-xs shadow-md shadow-primary/20 hover:bg-primary-container active:scale-95 transition-all">
            <MessageSquare className="w-4 h-4 fill-current" />
            <span>联系骑手</span>
          </button>
        </div>
      </footer>
    </div>
  );
}
