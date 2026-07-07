/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowLeft, Bell, CheckCircle2, Star, MapPin, Package, ClipboardCheck, ChevronRight, HelpCircle } from 'lucide-react';
import { Screen, Order } from '../types';

interface OrderDetailCompletedProps {
  order: Order | null;
  onNavigate: (screen: Screen) => void;
}

export default function OrderDetailCompleted({ order, onNavigate }: OrderDetailCompletedProps) {
  const [rating, setRating] = useState(4);
  const [activeTags, setActiveTags] = useState<string[]>(['送货准时', '态度友好']);
  const [comment, setComment] = useState('');
  const [logsExpanded, setLogsExpanded] = useState(false);

  const tags = ['送货准时', '态度友好', '包装完好', '风雨无阻', '着装整洁'];

  const toggleTag = (tag: string) => {
    if (activeTags.includes(tag)) {
      setActiveTags(activeTags.filter((t) => t !== tag));
    } else {
      setActiveTags([...activeTags, tag]);
    }
  };

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-on-surface-variant font-semibold">
        加载中...
      </div>
    );
  }

  // Pre-load default completed details if none are populated
  const displayRider = order.rider || {
    name: '王师傅',
    phone: '13900139000',
    rating: 4.8,
    completedCount: 1242,
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBq_saYAPYg5iquSZK2sYYnD5RfkrUShnjqW72_A-kJsRv3E4qvTtlxfHlQGtkhGHDehPgB-oDgkK-YbbAePjVesqhuBxEX4fEeK5O-kAHbUAJyiAAczcHCg_XsnSjYKzYvYHfsiQz7grbrW4fPqFs1x78aRu88xP1epTIlAdDLQApvnDHOl1HuAnlmPvgFMDNJCv7cxaJYP2FGQfmhYT7lkx_pZrvVWKApJRC58CBqshXMA1_25NG2',
  };

  const displayPickup = order.pickup && order.pickup !== '就近购买'
    ? order.pickup
    : '上海市静安区南京西路 1266 号恒隆广场 1 期';
  const displayDropoff = order.dropoff || '上海市徐汇区虹桥路 1 号港汇恒隆广场';

  return (
    <div className="min-h-screen pb-32 bg-background font-sans animate-fade-in">
      {/* Top AppBar */}
      <header className="bg-surface border-b border-surface-variant flex justify-between items-center w-full px-4 h-14 sticky top-0 z-50 bg-white/95 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <button
            aria-label="返回"
            onClick={() => onNavigate('orders')}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-container-low transition-colors text-primary active:scale-90"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-base font-display font-bold text-on-surface">订单详情</h1>
        </div>
        <button className="p-2 text-on-surface-variant hover:opacity-80">
          <Bell className="w-5 h-5" />
        </button>
      </header>

      <main className="max-w-md mx-auto space-y-4 mt-4 px-4 pb-20">
        {/* Order Status Hero Section */}
        <section className="bg-white p-6 rounded-2xl border border-outline-variant flex flex-col items-center text-center shadow-sm">
          <div className="w-16 h-16 bg-secondary-container text-on-secondary-container rounded-full flex items-center justify-center mb-3.5 shadow-inner">
            <CheckCircle2 className="w-10 h-10 fill-current text-secondary animate-success-pop" strokeWidth={1.5} />
          </div>
          <h2 className="text-xl font-display font-black text-on-surface mb-0.5">已送达</h2>
          <p className="text-xs font-semibold text-on-surface-variant">感谢您使用同城跑腿，期待再次为您服务</p>
          <div className="mt-4 flex gap-2">
            <span className="bg-surface-container text-on-surface-variant font-bold px-3 py-1 rounded-full text-[10px]">
              送达时间: 14:32
            </span>
            <span className="bg-surface-container text-on-surface-variant font-bold px-3 py-1 rounded-full text-[10px]">
              准时率 99.8%
            </span>
          </div>
        </section>

        {/* Evaluation Module */}
        <section className="bg-white p-4 rounded-2xl border border-outline-variant shadow-sm space-y-4">
          <h3 className="text-sm font-display font-bold text-on-surface">评价骑手</h3>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-surface-variant">
              <img
                className="w-full h-full object-cover"
                alt="Driver Profile"
                src={displayRider.avatar}
              />
            </div>
            <div>
              <p className="font-bold text-sm text-on-surface">{displayRider.name}</p>
              <p className="text-[10px] text-outline font-semibold mt-0.5">已为您配送 {displayRider.completedCount} 次</p>
            </div>
            <div className="ml-auto flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((starIndex) => (
                <button
                  key={starIndex}
                  onClick={() => setRating(starIndex)}
                  className="focus:outline-none cursor-pointer p-0.5"
                >
                  <Star
                    className={`w-5 h-5 ${
                      starIndex <= rating ? 'fill-amber-400 text-amber-500' : 'text-outline-variant hover:text-amber-300'
                    } transition-colors`}
                  />
                </button>
              ))}
            </div>
          </div>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full h-20 bg-surface rounded-xl border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary p-3 text-xs font-semibold text-on-surface placeholder:text-outline/80 resize-none transition-all"
            placeholder="写下您的评价，帮助骑手做得更好..."
          />

          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => {
              const active = activeTags.includes(tag);
              return (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1 rounded-full text-[10px] font-bold border transition-all active:scale-95 ${
                    active
                      ? 'bg-primary-fixed text-primary border-primary/20 shadow-sm'
                      : 'bg-white text-on-surface-variant border-outline-variant hover:bg-surface-container-low'
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </section>

        {/* Address Info (Review) */}
        <section className="bg-white p-4 rounded-2xl border border-outline-variant overflow-hidden shadow-sm">
          <div className="flex items-start gap-3 relative">
            <div className="flex flex-col items-center gap-1 shrink-0 pt-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-primary shadow-sm"></div>
              <div className="w-px h-14 border-l border-dashed border-outline-variant my-1"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-secondary shadow-sm"></div>
            </div>
            <div className="flex-1 space-y-5 min-w-0 text-xs">
              <div>
                <p className="text-[10px] text-outline font-bold uppercase tracking-wider">取件地址</p>
                <p className="text-sm font-bold text-on-surface mt-0.5 truncate leading-relaxed">
                  {displayPickup}
                </p>
                <p className="text-[10px] text-outline font-medium mt-0.5">陈先生 138****8888</p>
              </div>
              <div>
                <p className="text-[10px] text-outline font-bold uppercase tracking-wider">送件地址</p>
                <p className="text-sm font-bold text-on-surface mt-0.5 truncate leading-relaxed">
                  {displayDropoff}
                </p>
                <p className="text-[10px] text-outline font-medium mt-0.5">李女士 139****9999</p>
              </div>
            </div>
          </div>
        </section>

        {/* Items Info */}
        <section className="bg-white p-4 rounded-2xl border border-outline-variant shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-display font-bold text-on-surface">物品信息</h3>
            <span className="text-[9px] font-black tracking-wide text-primary bg-primary-fixed border border-primary/10 px-2 py-0.5 rounded uppercase">
              电子产品
            </span>
          </div>
          <div className="flex gap-4">
            <div className="w-20 h-20 bg-surface border border-outline-variant rounded-xl overflow-hidden shrink-0 shadow-inner">
              <img
                className="w-full h-full object-cover"
                alt="Package Bubblewrap Box"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuClMpGW1yeIqszLYpazcP1-hFCilEBuSBXD6ybeSy8V1eeKn1Hh_PvJgU0X4No3MojxqoMlnZDE2ejDVpo-KHN8_jkBKo04h2dhmf1GmSz64_cLbmSZfOCWt9Gq_P3Jr4i6goQJ_rfzjtzV-DHnH-DLTVjMV6icDqMDCgxQf6OoLgukUT2IyvA-nkYAqoZnYtKDGvumkqGEosXJk8XocqQ9P3hxOjFT8Z_XJsTLEpt7RHEz44brRtlh"
              />
            </div>
            <div className="flex-1 flex flex-col justify-center text-xs">
              <p className="font-bold text-on-surface">重量：约 1.5kg</p>
              <p className="text-outline font-semibold mt-1 leading-relaxed">
                备注：精密仪器，请轻拿轻放，保持水平运输。
              </p>
            </div>
          </div>
        </section>

        {/* Price Details */}
        <section className="bg-white p-4 rounded-2xl border border-outline-variant shadow-sm">
          <h3 className="text-sm font-display font-bold text-on-surface mb-3 pb-2 border-b border-surface-variant/40">
            费用明细
          </h3>
          <div className="space-y-2.5 text-xs font-semibold">
            <div className="flex justify-between items-center text-on-surface-variant">
              <span>基础配送费 (4.2km)</span>
              <span className="text-on-surface">¥ 18.00</span>
            </div>
            <div className="flex justify-between items-center text-on-surface-variant">
              <span>重量加价</span>
              <span className="text-on-surface">¥ 2.00</span>
            </div>
            <div className="flex justify-between items-center text-on-surface-variant">
              <span>夜间/峰值费</span>
              <span className="text-on-surface">¥ 0.00</span>
            </div>
            <div className="flex justify-between items-center text-on-surface-variant">
              <span>优惠券减免</span>
              <span className="text-error font-extrabold">-¥ 5.00</span>
            </div>
            <div className="pt-3 border-t border-surface-variant flex justify-between items-center font-bold">
              <span className="text-sm text-on-surface">最终支付</span>
              <span className="text-lg text-primary font-black">¥ 15.00</span>
            </div>
          </div>
        </section>

        {/* Order Timeline Log */}
        <section className="bg-white p-4 rounded-2xl border border-outline-variant shadow-sm space-y-4">
          <h3 className="text-sm font-display font-bold text-on-surface">订单日志</h3>
          <div className="space-y-4 text-xs font-semibold">
            <div className="flex gap-4 items-start">
              <div className="text-outline w-12 pt-0.5 shrink-0">14:32</div>
              <div className="flex-1">
                <p className="text-on-surface font-bold">订单已送达</p>
                <p className="text-outline font-medium mt-0.5 leading-relaxed">配送任务顺利完成，祝您生活愉快</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="text-outline w-12 pt-0.5 shrink-0">14:15</div>
              <div className="flex-1">
                <p className="text-outline font-bold">骑手正在为您快马加鞭</p>
              </div>
            </div>

            {logsExpanded && (
              <>
                <div className="flex gap-4 items-start animate-slide-down">
                  <div className="text-outline w-12 pt-0.5 shrink-0">14:05</div>
                  <div className="flex-1">
                    <p className="text-outline font-bold">骑手已到达取件地</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start animate-slide-down">
                  <div className="text-outline w-12 pt-0.5 shrink-0">14:00</div>
                  <div className="flex-1">
                    <p className="text-outline font-bold">订单已被骑手接单</p>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="pt-2 border-t border-surface-variant/40 text-center">
            <button
              onClick={() => setLogsExpanded(!logsExpanded)}
              className="text-xs font-bold text-primary flex items-center justify-center gap-1 mx-auto hover:underline focus:outline-none"
            >
              <span>{logsExpanded ? '收起记录' : '展开更多记录'}</span>
              <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${logsExpanded ? '-rotate-90' : 'rotate-90'}`} />
            </button>
          </div>
        </section>
      </main>

      {/* Action Buttons Fixed Footer */}
      <footer className="fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-md border-t border-surface-variant flex gap-3 z-40 max-w-md mx-auto shadow-[0_-4px_16px_rgba(0,0,0,0.04)] pb-safe">
        <button className="flex-1 h-12 rounded-xl border border-outline-variant text-primary font-bold text-xs hover:bg-surface-container-low transition-all active:scale-95">
          申请售后
        </button>
        <button
          onClick={() => onNavigate('order_send')}
          className="flex-1 h-12 rounded-xl bg-primary text-white font-bold text-xs shadow-md shadow-primary/20 hover:bg-primary-container transition-all active:scale-95"
        >
          再来一单
        </button>
      </footer>
    </div>
  );
}
