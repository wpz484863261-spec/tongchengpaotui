/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowLeft, Bell, Sparkles, Store, MapPin, Clock, Ticket, Coins, Bolt, Camera, ChevronRight } from 'lucide-react';
import { Screen, Order } from '../types';

interface OrderBuyScreenProps {
  onNavigate: (screen: Screen) => void;
  onAddOrder: (order: Omit<Order, 'id' | 'time'>) => void;
}

export default function OrderBuyScreen({ onNavigate, onAddOrder }: OrderBuyScreenProps) {
  const [productDetails, setProductDetails] = useState('星巴克咖啡 (静安寺店) - 燕麦拿铁大杯');
  const [estPrice, setEstPrice] = useState('');
  const [purchaseLocation, setPurchaseLocation] = useState('就近购买（推荐，更快捷）');
  const [deliveryLocation, setDeliveryLocation] = useState('北京市朝阳区三里屯街道 SOHO A座');
  const [recipient, setRecipient] = useState('王先生 138****0000');
  const [time, setTime] = useState('立即送出');
  const [tip, setTip] = useState<number>(0);

  const basePrice = 12.00;
  const totalPrice = basePrice + tip;

  const handleSubmit = () => {
    onAddOrder({
      type: 'buy',
      title: '帮我买',
      status: 'waiting',
      pickup: purchaseLocation || '就近购买',
      dropoff: deliveryLocation || '请输入收件地址',
      price: totalPrice,
      items: productDetails || '代买商品',
      notes: `预估商品价: ¥${estPrice || '0.00'}. 小费: ¥${tip}.`,
      rider: {
        name: '王师傅',
        phone: '13900139000',
        rating: 4.8,
        completedCount: 1242,
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDM8LhJgixSNy3OoMUzx69pHSIZun4AMptDC34gqlMEtIbQR2gzeqzGpYfJWuEk9xuaideJqZD3KCsV2IS-O1nyaadHjrvR_0krzdM1TcU0RtdkAK-r3SmRc_E6KogbLEbycbpNdOxDBgcjmrsXcRVQU27ruwXr_efbI1lf1uRDSxqDmvMaee8kLF3gW-lP_mB8ZLL8Lmb1R7Vg3BustEIlqV330XYzKfmGZi0_GyYS5WWtQaSIVqyb',
      },
    });
  };

  return (
    <div className="min-h-screen pb-32 bg-background animate-fade-in">
      {/* Top App Bar */}
      <header className="fixed top-0 left-0 w-full z-50 bg-surface border-b border-surface-variant flex justify-between items-center px-4 h-14">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('booking')}
            className="p-2 -ml-2 rounded-full hover:bg-surface-container-low transition-colors active:scale-95 text-on-surface"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-base font-display font-bold text-on-surface">帮我买</h1>
        </div>
        <button className="p-2 text-primary hover:opacity-85">
          <Bell className="w-5 h-5" />
        </button>
      </header>

      {/* Main Container */}
      <main className="pt-14 px-4 space-y-4 max-w-md mx-auto">
        {/* Animated Banner */}
        <div className="relative w-full h-28 rounded-2xl overflow-hidden mt-4 bg-gradient-to-r from-primary-fixed to-primary-fixed-dim/30 shadow-sm">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/15 to-transparent flex flex-col justify-center p-5">
            <h2 className="text-xl font-display font-extrabold text-on-primary-fixed">快捷购</h2>
            <p className="text-xs text-on-primary-fixed-variant/90 font-semibold mt-1">足不出户，代劳万事</p>
          </div>
        </div>

        {/* Section: Item Description */}
        <section className="bg-white p-4 rounded-2xl border border-outline-variant shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-display font-bold text-on-surface">想买什么</h3>
            <span className="text-primary text-xs font-bold cursor-pointer hover:underline">常用清单</span>
          </div>
          <textarea
            value={productDetails}
            onChange={(e) => setProductDetails(e.target.value)}
            className="w-full h-24 p-3 bg-surface-container-low rounded-xl border-none focus:ring-1 focus:ring-primary text-xs font-semibold text-on-surface placeholder:text-outline transition-all resize-none"
            placeholder="请输入想买的商品名称、规格、数量（如：瑞幸生椰拿铁，去冰少糖，1杯）"
          />
          {/* Item Photos */}
          <div className="flex gap-3 overflow-x-auto no-scrollbar pt-1">
            <div className="w-16 h-16 rounded-xl bg-surface-container-high flex flex-col items-center justify-center border border-dashed border-outline hover:bg-surface-container-highest cursor-pointer shrink-0 active:scale-95 transition-transform">
              <Camera className="w-5 h-5 text-outline" />
              <span className="text-[9px] text-outline font-extrabold mt-1">上传照片</span>
            </div>
            <div
              className="w-16 h-16 rounded-xl bg-cover bg-center shrink-0 shadow-inner border border-surface-variant"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCWV06oY2dPF8yUWCixAZBk7O9P6DlKdveUKgbgOcVFHKBiDJH9US4G7EgoHVZ87_kE6GBjzJ4eyx9-goC_afBQl-sLkf1VTw1xgvD_mBKoeMvtZD3D7Ss2ZipZelnU6yYcW1AmpQBU8GX5gpiAdvN7tBIdaDAXl0TNf_KSjweEchJ6Qosttths4huKbnol7hd3cO0XG9dsNtPNIxrE-QHOXSS9IreJi8xu0_6QM9Zwpy31MsDLTBOr')",
              }}
              alt="Preloaded coffee pastry preview"
            ></div>
          </div>
        </section>

        {/* Section: Price & Location */}
        <section className="bg-white rounded-2xl border border-outline-variant divide-y divide-surface-variant overflow-hidden shadow-sm">
          {/* Estimated Item Price */}
          <div className="flex items-center justify-between p-4 bg-white">
            <div className="flex items-center gap-2 text-xs font-bold text-on-surface">
              <Coins className="w-5 h-5 text-tertiary" />
              <span>预估商品价格</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-outline">￥</span>
              <input
                type="number"
                value={estPrice}
                onChange={(e) => setEstPrice(e.target.value)}
                className="w-20 text-right border-none p-0 focus:ring-0 text-sm font-black text-on-surface bg-transparent placeholder:text-outline-variant"
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Purchase Location */}
          <div className="p-4 bg-white hover:bg-surface-container-low transition-colors cursor-pointer group">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-2.5 min-w-0">
                <Store className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <p className="text-xs font-bold text-on-surface">购买地址</p>
                  <input
                    type="text"
                    value={purchaseLocation}
                    onChange={(e) => setPurchaseLocation(e.target.value)}
                    className="text-outline text-[11px] font-semibold mt-0.5 w-full bg-transparent p-0 border-none focus:ring-0 truncate"
                    placeholder="请输入购买网点或就近购买"
                  />
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-outline shrink-0 transition-transform group-hover:translate-x-0.5" />
            </div>
          </div>

          {/* Delivery Location */}
          <div className="p-4 bg-white hover:bg-surface-container-low transition-colors cursor-pointer group">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-2.5 min-w-0">
                <MapPin className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <p className="text-xs font-bold text-on-surface">收货地址</p>
                  <input
                    type="text"
                    value={deliveryLocation}
                    onChange={(e) => setDeliveryLocation(e.target.value)}
                    className="text-on-surface text-xs font-bold mt-0.5 w-full bg-transparent p-0 border-none focus:ring-0 truncate"
                    placeholder="请输入收货地址"
                  />
                  <input
                    type="text"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    className="text-outline text-[10px] font-semibold mt-1 w-full bg-transparent p-0 border-none focus:ring-0 truncate"
                    placeholder="联系人信息"
                  />
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-outline shrink-0 transition-transform group-hover:translate-x-0.5" />
            </div>
          </div>
        </section>

        {/* Section: Logistics & Time */}
        <section className="bg-white rounded-2xl border border-outline-variant divide-y divide-surface-variant overflow-hidden shadow-sm">
          <div className="flex items-center justify-between p-4 hover:bg-surface-container-low transition-colors cursor-pointer group">
            <div className="flex items-center gap-2.5 text-xs font-bold">
              <Clock className="w-5 h-5 text-on-surface-variant" />
              <span>配送时效</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-primary text-xs font-bold">{time}</span>
              <ChevronRight className="w-5 h-5 text-outline transition-transform group-hover:translate-x-0.5" />
            </div>
          </div>

          <div className="flex items-center justify-between p-4 hover:bg-surface-container-low transition-colors cursor-pointer group">
            <div className="flex items-center gap-2.5 text-xs font-bold">
              <Ticket className="w-5 h-5 text-on-surface-variant" />
              <span>优惠券</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-outline text-xs font-medium">暂无可用</span>
              <ChevronRight className="w-5 h-5 text-outline transition-transform group-hover:translate-x-0.5" />
            </div>
          </div>
        </section>

        {/* Fee Details Card */}
        <div className="p-4 bg-primary-fixed/30 rounded-2xl border border-primary/10 space-y-3 shadow-sm">
          <div className="flex justify-between items-center text-xs font-semibold">
            <span className="text-outline">配送费</span>
            <span className="text-on-surface font-extrabold">￥{basePrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-outline font-semibold">小费 (激励骑手)</span>
            <div className="flex gap-2">
              <button
                onClick={() => setTip(tip === 2 ? 0 : 2)}
                className={`px-3 py-1 rounded-lg border text-[10px] font-bold transition-all ${
                  tip === 2
                    ? 'bg-primary text-white border-primary shadow-sm'
                    : 'bg-white text-on-surface border-outline-variant hover:bg-surface-container'
                }`}
              >
                +2元
              </button>
              <button
                onClick={() => setTip(tip === 5 ? 0 : 5)}
                className={`px-3 py-1 rounded-lg border text-[10px] font-bold transition-all ${
                  tip === 5
                    ? 'bg-primary text-white border-primary shadow-sm'
                    : 'bg-white text-on-surface border-outline-variant hover:bg-surface-container'
                }`}
              >
                +5元
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Order Bar */}
      <footer className="fixed bottom-0 left-0 w-full bg-white border-t border-surface-variant px-4 py-3 pb-safe z-50 shadow-[0_-4px_16px_rgba(0,0,0,0.04)]">
        <div className="max-w-md mx-auto flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1">
              <span className="text-xs font-semibold text-primary">合计</span>
              <span className="text-2xl font-display font-black text-primary">￥{totalPrice.toFixed(2)}</span>
            </div>
            <p className="text-[9px] text-outline font-bold leading-tight">未含预估商品费，按实付款结清</p>
          </div>
          <button
            onClick={handleSubmit}
            className="flex-1 bg-primary hover:bg-primary-container text-white py-4 rounded-full font-display font-extrabold text-sm shadow-md shadow-primary/25 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <span>立即下单</span>
            <Bolt className="w-4 h-4 fill-current" />
          </button>
        </div>
      </footer>
    </div>
  );
}
