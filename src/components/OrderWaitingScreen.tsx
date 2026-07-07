/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { ArrowLeft, Bell, MapPin, Flag, Package, Clock, Zap, HelpCircle, Flame, Plus, CheckCircle, Navigation } from 'lucide-react';
import { Screen, Order } from '../types';

interface OrderWaitingScreenProps {
  order: Order | null;
  onNavigate: (screen: Screen) => void;
  onCancelOrder: (orderId: string) => void;
  onAddTip: (orderId: string, amount: number) => void;
  onSimulateAcceptance: (orderId: string) => void;
}

export default function OrderWaitingScreen({
  order,
  onNavigate,
  onCancelOrder,
  onAddTip,
  onSimulateAcceptance,
}: OrderWaitingScreenProps) {
  const [ridersCount, setRidersCount] = useState(12);

  useEffect(() => {
    // Periodically fluctuate rider count slightly to seem organic
    const timer = setInterval(() => {
      setRidersCount((prev) => {
        const delta = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
        const next = prev + delta;
        return next < 5 ? 5 : next > 20 ? 20 : next;
      });
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-on-surface-variant font-semibold">
        加载中...
      </div>
    );
  }

  const handleCancel = () => {
    onCancelOrder(order.id);
    onNavigate('orders');
  };

  const handleAddTipLocal = () => {
    onAddTip(order.id, 5.00);
  };

  const triggerSimulatedAccept = () => {
    onSimulateAcceptance(order.id);
    onNavigate('order_details_ongoing');
  };

  return (
    <div className="min-h-screen pb-28 bg-background flex flex-col font-sans animate-fade-in relative">
      {/* Simulation Chip */}
      <div className="fixed top-16 right-4 z-50">
        <button
          onClick={triggerSimulatedAccept}
          className="bg-secondary text-white text-[10px] px-3.5 py-1.5 rounded-full font-bold shadow-md hover:bg-secondary/90 active:scale-95 transition-transform flex items-center gap-1 cursor-pointer"
        >
          <Zap className="w-3 h-3 fill-current" />
          <span>点击模拟: 骑手接单</span>
        </button>
      </div>

      {/* TopAppBar */}
      <header className="bg-surface sticky top-0 z-40 border-b border-surface-variant flex justify-between items-center w-full px-4 h-14">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('orders')}
            className="p-1.5 rounded-full text-primary hover:bg-surface-container-low transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-base font-display font-bold text-primary">等待接单</h1>
        </div>
        <button className="hover:bg-surface-container-low transition-colors p-2 rounded-full active:scale-95 duration-150 text-on-surface-variant">
          <Bell className="w-5 h-5" />
        </button>
      </header>

      {/* Content Scroll Area */}
      <main className="flex-grow pb-12">
        {/* Radar pulsing section */}
        <section className="px-4 py-8 flex flex-col items-center justify-center text-center">
          <div className="relative w-32 h-32 mb-4 flex items-center justify-center select-none pointer-events-none">
            {/* Pulsing circles */}
            <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse-radar"></div>
            <div className="absolute inset-0 bg-primary/5 rounded-full animate-pulse-radar" style={{ animationDelay: '1s' }}></div>

            {/* Centered speed logo */}
            <div className="relative w-20 h-20 bg-primary rounded-full flex items-center justify-center shadow-lg z-10 text-white">
              <Zap className="w-10 h-10 fill-current" strokeWidth={1.5} />
            </div>

            {/* Rotating dot ring */}
            <div className="absolute inset-0 animate-rotate-radar">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-primary-fixed rounded-full border-2 border-white shadow-sm"></div>
            </div>
          </div>

          <h2 className="text-xl font-display font-black text-on-surface mb-1">等待骑手接单...</h2>
          <p className="text-xs font-semibold text-on-surface-variant">
            周边已有 <span className="text-primary font-black text-sm">{ridersCount}</span> 位骑手，预计 3 分钟内接单
          </p>
        </section>

        {/* Order Detail Card */}
        <div className="px-4">
          <div className="bg-white rounded-2xl border border-outline-variant p-4 flex flex-col gap-4 shadow-sm">
            <div className="flex justify-between items-start">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-outline uppercase tracking-wider">订单编号</span>
                <span className="text-sm font-black text-on-surface mt-0.5">{order.id}</span>
              </div>
              <div className="bg-primary-fixed text-on-primary-fixed px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                待接单
              </div>
            </div>

            {/* Route Info */}
            <div className="flex gap-3 relative">
              <div className="flex flex-col items-center py-1 shrink-0">
                <div className="w-3 h-3 rounded-full bg-primary ring-4 ring-primary/10"></div>
                <div className="w-px flex-grow border-l-2 border-dotted border-outline-variant my-1"></div>
                <div className="w-3 h-3 rounded-full bg-secondary ring-4 ring-secondary/10"></div>
              </div>
              <div className="flex flex-col gap-4 w-full min-w-0 text-xs">
                <div>
                  <span className="text-[10px] text-outline font-bold uppercase tracking-wider">取货地址</span>
                  <p className="text-sm font-bold text-on-surface truncate mt-0.5">{order.pickup}</p>
                </div>
                <div>
                  <span className="text-[10px] text-outline font-bold uppercase tracking-wider">送货地址</span>
                  <p className="text-sm font-bold text-on-surface truncate mt-0.5">{order.dropoff}</p>
                </div>
              </div>
            </div>

            <hr className="border-surface-variant" />

            {/* Item & Time */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-outline shrink-0" />
                <div className="flex flex-col min-w-0">
                  <span className="text-[9px] text-outline font-bold uppercase tracking-wider leading-none">配送物品</span>
                  <span className="text-xs font-bold text-on-surface truncate mt-0.5">{order.items || '普通物品'}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-outline shrink-0" />
                <div className="flex flex-col min-w-0">
                  <span className="text-[9px] text-outline font-bold uppercase tracking-wider leading-none">下单时间</span>
                  <span className="text-xs font-bold text-on-surface truncate mt-0.5">今天 14:32</span>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="mt-2 rounded-xl overflow-hidden h-32 relative border border-outline-variant shadow-inner">
              <div
                className="absolute inset-0 bg-surface-container flex items-center justify-center select-none bg-cover bg-center grayscale"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB6W5m2H6yqZ4xa65x4ooIo0w2UCSzSkfYJ9XhV9sj9F1TF3NNXwN16RZOdiXFAadb9JFRvc6MQRaL9n-tesg0OKOUu7QfDjEN4dtWX1YqHe5EnrULx9XG7zptl6C5pcLQQfyhuZyZzLRGkWpmXWRS0sIRhR9HBqhxY0eVyIE-7RxD5PN53s7EYvUslu7fzJZ-yhOVCpUqTBb6XAFJEOsKAqPuei1kPnyTSYNgloAiuHW941UJPZPY9')",
                }}
              >
                <div className="bg-white/85 backdrop-blur-md px-4 py-2 rounded-full shadow-sm text-xs font-bold text-outline flex items-center gap-2 border border-outline-variant/30">
                  <Navigation className="w-3.5 h-3.5 text-primary animate-bounce" />
                  <span>实时骑手定位加载中...</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tip Suggestion Banner */}
        <div className="px-4 mt-6">
          <div className="bg-secondary-fixed/35 border border-secondary-fixed rounded-2xl p-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="bg-secondary-fixed text-on-secondary-fixed p-2 rounded-xl shrink-0">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-on-secondary-fixed">加小费极速接单</p>
                <p className="text-[10px] font-bold text-on-secondary-fixed/80 mt-0.5">骑手接单概率提升 85%</p>
              </div>
            </div>
            <button
              onClick={handleAddTipLocal}
              className="bg-secondary hover:bg-secondary/90 text-white px-4 py-2 rounded-full text-xs font-extrabold active:scale-95 transition-transform flex items-center gap-0.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>¥ 5.00</span>
            </button>
          </div>
        </div>
      </main>

      {/* Bottom Actions Fixed Bar */}
      <footer className="fixed bottom-0 left-0 w-full z-50 bg-white border-t border-surface-variant px-4 py-4 pb-safe grid grid-cols-2 gap-3 shadow-[0_-4px_16px_rgba(0,0,0,0.04)]">
        <button
          onClick={handleCancel}
          className="border border-outline-variant text-on-surface-variant font-bold py-3.5 rounded-xl flex items-center justify-center gap-1.5 active:scale-95 transition-transform hover:bg-surface-container-low text-xs"
        >
          <span>取消订单</span>
        </button>
        <button
          onClick={handleAddTipLocal}
          className="bg-primary hover:bg-primary-container text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-1.5 active:scale-95 transition-transform shadow-md shadow-primary/20 text-xs"
        >
          <span>加小费</span>
        </button>
      </footer>
    </div>
  );
}
