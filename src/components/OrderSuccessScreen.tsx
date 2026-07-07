/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { CheckCircle2, ShoppingBag, MapPin, ChevronRight, Package, ArrowUpRight, Compass } from 'lucide-react';
import { Screen } from '../types';

interface OrderSuccessScreenProps {
  onNavigate: (screen: Screen) => void;
}

export default function OrderSuccessScreen({ onNavigate }: OrderSuccessScreenProps) {
  const [dots, setDots] = useState('...');

  // Simulating searching animation
  useEffect(() => {
    const timer = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col font-sans overflow-x-hidden animate-fade-in">
      <main className="flex-grow flex flex-col px-4 pt-10 pb-6">
        {/* Success Content Section */}
        <div className="flex-grow flex flex-col items-center justify-center space-y-6 py-8">
          {/* Animated Success Checkmark */}
          <div className="relative w-24 h-24 mb-2">
            <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse"></div>
            <div className="relative z-10 w-full h-full bg-primary text-white rounded-full flex items-center justify-center shadow-lg animate-success-pop">
              <CheckCircle2 className="w-14 h-14" strokeWidth={1.5} />
            </div>
          </div>

          {/* Headlines */}
          <div className="text-center space-y-1.5">
            <h1 className="text-2xl font-display font-black tracking-tight text-on-surface">下单成功</h1>
            <p className="text-sm font-semibold text-on-surface-variant flex items-center justify-center gap-1.5">
              正在为您寻找附近的骑手{dots}
            </p>
          </div>

          {/* Delivery Visualizer (Asymmetric Pattern) */}
          <div className="w-full max-w-sm mt-4 overflow-hidden rounded-2xl border border-outline-variant bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
                <span className="text-[10px] font-black uppercase tracking-wider text-secondary">实时状态</span>
              </div>
              <span className="text-xs font-bold text-primary">预计 5 分钟内接单</span>
            </div>

            <div className="flex items-center justify-between px-2 py-3">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center mb-1">
                  <ShoppingBag className="w-5 h-5 text-on-surface-variant" />
                </div>
                <span className="text-[11px] font-bold text-outline">取货</span>
              </div>

              {/* Progress Line */}
              <div className="flex-grow h-[2px] bg-outline-variant relative mx-3">
                <div className="absolute inset-0 bg-primary w-1/3 rounded-full"></div>
                <div className="absolute top-1/2 left-1/3 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-white shadow-sm animate-floating-bounce"></div>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center mb-1">
                  <MapPin className="w-5 h-5 text-on-surface-variant" />
                </div>
                <span className="text-[11px] font-bold text-outline">送达</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="w-full max-w-sm flex flex-col gap-3 pt-4">
            <button
              onClick={() => onNavigate('order_waiting')}
              className="w-full bg-primary hover:bg-primary-container text-white font-display font-extrabold text-sm py-4 rounded-2xl shadow-md shadow-primary/20 transition-all active:scale-95 duration-150"
            >
              查看订单
            </button>
            <button
              onClick={() => onNavigate('booking')}
              className="w-full bg-surface-container hover:bg-surface-container-highest text-on-surface-variant font-display font-extrabold text-sm py-4 rounded-2xl transition-all active:scale-95 duration-150"
            >
              返回首页
            </button>
          </div>
        </div>

        {/* Recommended Services (Bento Grid Style) */}
        <section className="mt-auto pt-6 border-t border-outline-variant/30 space-y-4">
          <h2 className="text-base font-display font-bold text-on-surface px-1">常用服务推荐</h2>
          <div className="grid grid-cols-2 gap-3">
            {/* Card 1 */}
            <div
              onClick={() => onNavigate('order_buy')}
              className="bg-surface-container-low p-4 rounded-2xl flex items-center gap-3 active:bg-surface-container-high transition-colors cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed shrink-0">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="font-display font-extrabold text-on-surface text-xs truncate">代买</div>
                <div className="text-[10px] text-on-surface-variant font-semibold truncate mt-0.5">帮买万物</div>
              </div>
            </div>
            {/* Card 2 */}
            <div
              onClick={() => onNavigate('order_send')}
              className="bg-surface-container-low p-4 rounded-2xl flex items-center gap-3 active:bg-surface-container-high transition-colors cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-primary-fixed flex items-center justify-center text-on-primary-fixed shrink-0">
                <Package className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="font-display font-extrabold text-on-surface text-xs truncate">搬运</div>
                <div className="text-[10px] text-on-surface-variant font-semibold truncate mt-0.5">重物省心</div>
              </div>
            </div>
          </div>

          {/* Map Preview Tip (Subtle Glassmorphism) */}
          <div className="relative rounded-2xl overflow-hidden h-24 flex items-end">
            <div className="absolute inset-0 z-0 select-none">
              <div
                className="w-full h-full bg-cover bg-center grayscale opacity-25"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCsIs-i3ovnv8_vqm5TsmUScuQfwK9NeFC6b_yUsKKqS-y8IsaG5gpX9tLoPZKgU8XmDKCrxwnOAfR5L-3PRPdL2JKgEcJ_6iQckyNKq5Hq-z69dX7-CZXPc9hNieK08kJC0BhfUk2N-otG2LvpN-9w_TfacQ_O0dkF4kK0PBsKa8NuneUpZXpbwBwUaSzmmAy5XlVrwOq2mLnFqPwVaDWJSjyRGN9ExydFwNTP4cPOJNftSiM4ax6N')",
                }}
              ></div>
            </div>
            <div className="relative z-10 w-full p-4 bg-white/85 backdrop-blur-md border-t border-outline-variant/25 flex justify-between items-center cursor-pointer hover:bg-white transition-colors">
              <div className="flex items-center gap-2 text-xs font-bold text-on-surface">
                <Compass className="w-4 h-4 text-primary animate-spin" style={{ animationDuration: '20s' }} />
                <span>您还可以查看周边热门跑腿路线</span>
              </div>
              <ChevronRight className="w-4 h-4 text-on-surface-variant" />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
