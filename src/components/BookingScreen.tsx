/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { MapPin, Bell, Truck, ShoppingCart, Sparkles, History, MapPinPlus, ChevronRight, Gift, Umbrella } from 'lucide-react';
import { Screen, User } from '../types';

interface BookingScreenProps {
  user: User;
  onNavigate: (screen: Screen) => void;
}

export default function BookingScreen({ user, onNavigate }: BookingScreenProps) {
  return (
    <div className="min-h-screen pb-24 bg-background animate-fade-in">
      {/* Top App Bar */}
      <header className="fixed top-0 left-0 w-full z-50 bg-surface/95 backdrop-blur-md border-b border-surface-variant flex justify-between items-center px-4 h-14">
        <div className="flex items-center gap-1.5 cursor-pointer hover:opacity-80 transition-opacity">
          <MapPin className="w-5 h-5 text-primary" />
          <span className="text-xs font-semibold text-primary">深圳市南山区科兴科学园...</span>
        </div>
        <h1 className="text-lg font-display font-bold text-primary tracking-tight">同城跑腿</h1>
        <button className="relative hover:bg-surface-container-low transition-colors p-2 rounded-full active:scale-95 duration-150">
          <Bell className="w-5 h-5 text-primary" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full ring-2 ring-surface"></span>
        </button>
      </header>

      {/* Main Container */}
      <main className="pt-18 px-4 space-y-6">
        {/* Promotional Banner */}
        <section className="relative overflow-hidden rounded-2xl h-40 bg-gradient-to-br from-primary to-primary-container text-white shadow-sm transition-all duration-300 hover:shadow-md">
          <div className="absolute inset-0 opacity-15">
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-white rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-secondary-fixed rounded-full blur-3xl"></div>
          </div>
          <div className="relative z-10 h-full p-5 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-display font-extrabold tracking-tight mb-1">今日极速达</h2>
              <p className="text-xs text-white/90 font-medium">平均送达时间 <span className="text-secondary-fixed font-bold text-sm">28</span> 分钟</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="bg-white/15 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-medium tracking-wide border border-white/10">
                已累计服务 1.2w+ 用户
              </span>
              <span className="bg-white/15 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-medium tracking-wide border border-white/10">
                好评率 99.8%
              </span>
            </div>
          </div>
          <div className="absolute right-2 bottom-0 w-32 h-32 select-none pointer-events-none">
            <img
              className="w-full h-full object-contain drop-shadow-xl"
              alt="Isometric Delivery Scooter"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD82pD6MP_WVVDm0vF8I6JVnlEWiTPmysb5dI8b6LJamy4xiQED90K_b48WiylzCo5bF1j6_BcGJnFRYOexVjd_Q6hEyWLz5s1L8uqjp65zblgrPy9TAGWd6Vre6GHwjSLxRUNtCtkBTlvZ1ydtwPQQoSIHNg_869ETbLxnfpv1Uqf1DMV_nctJjjbSOvfkrpLqGjKsC7QHnlGpWWFvgn7j7Gy4uo7ySg-H1kvKE0ned4gKiPisFBbe"
            />
          </div>
        </section>

        {/* Service Selection Bento Grid */}
        <section>
          <div className="grid grid-cols-2 grid-rows-2 gap-3 h-[320px]">
            {/* Main Service: Pick up & Deliver (帮我送) */}
            <button
              onClick={() => onNavigate('order_send')}
              className="bento-item-large col-span-1 row-span-2 bg-primary text-white rounded-2xl p-5 flex flex-col justify-between items-start transition-all hover:translate-y-[-2px] active:scale-[0.98] duration-150 text-left relative overflow-hidden group shadow-sm hover:shadow-md"
            >
              <div className="relative z-10 space-y-2">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center border border-white/10">
                  <Truck className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-display font-extrabold tracking-tight">取送件</h3>
                <p className="text-xs text-white/80 leading-relaxed font-medium">文件/生活用品/鲜花</p>
              </div>
              <span className="relative z-10 text-[11px] font-bold bg-white/20 hover:bg-white/30 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-white/10 tracking-wide transition-colors">
                极速发单
              </span>
              <div className="absolute -bottom-6 -right-6 opacity-10 group-hover:scale-110 transition-transform duration-300">
                <Truck className="w-36 h-36" />
              </div>
            </button>

            {/* Service: Buy for me (帮我买) */}
            <button
              onClick={() => onNavigate('order_buy')}
              className="bg-secondary-container text-on-secondary-container rounded-2xl p-4 flex flex-col justify-between items-start transition-all hover:translate-y-[-2px] active:scale-[0.98] duration-150 text-left relative overflow-hidden group shadow-sm hover:shadow-md"
            >
              <div className="relative z-10 space-y-1">
                <div className="w-10 h-10 bg-on-secondary-container/10 rounded-xl flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6 text-on-secondary-container" />
                </div>
                <h3 className="text-base font-display font-bold">代买</h3>
              </div>
              <p className="relative z-10 text-[11px] font-semibold opacity-85">买菜/网红店/药品</p>
              <div className="absolute -bottom-4 -right-4 opacity-5 group-hover:rotate-12 transition-transform duration-300">
                <ShoppingCart className="w-20 h-20" />
              </div>
            </button>

            {/* Service: Help with anything (万能帮) */}
            <button
              onClick={() => onNavigate('order_send')} // Goes to order send for simplicity or custom flow
              className="bg-tertiary-fixed text-on-tertiary-fixed-variant rounded-2xl p-4 flex flex-col justify-between items-start transition-all hover:translate-y-[-2px] active:scale-[0.98] duration-150 text-left relative overflow-hidden group shadow-sm hover:shadow-md"
            >
              <div className="relative z-10 space-y-1">
                <div className="w-10 h-10 bg-on-tertiary-fixed-variant/10 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-on-tertiary-fixed-variant" />
                </div>
                <h3 className="text-base font-display font-bold">万能帮</h3>
              </div>
              <p className="relative z-10 text-[11px] font-semibold opacity-85">排队/挂号/遛狗</p>
              <div className="absolute -bottom-4 -right-4 opacity-5 group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="w-20 h-20" />
              </div>
            </button>
          </div>
        </section>

        {/* Quick Entry Section */}
        <section className="bg-white border border-surface-variant rounded-2xl p-5 shadow-sm">
          <div className="flex items-center mb-4">
            <div className="w-1 h-5 bg-primary rounded-full mr-3"></div>
            <h3 className="text-base font-display font-bold text-on-surface">常用地址</h3>
          </div>
          <div className="space-y-4">
            {/* Start Point */}
            <div
              onClick={() => onNavigate('order_send')}
              className="flex items-center gap-4 group cursor-pointer"
            >
              <div className="flex flex-col items-center">
                <div className="w-2.5 h-2.5 rounded-full border-2 border-primary"></div>
                <div className="w-px h-8 border-l border-dashed border-outline-variant my-1"></div>
              </div>
              <div className="flex-1 pb-2 border-b border-surface-variant group-hover:opacity-85 transition-opacity">
                <p className="text-[10px] text-outline font-semibold uppercase tracking-wider mb-0.5">出发地</p>
                <p className="text-sm font-semibold text-on-surface">从哪里取件？</p>
              </div>
              <History className="w-5 h-5 text-outline group-hover:text-primary transition-colors" />
            </div>

            {/* Destination Point */}
            <div
              onClick={() => onNavigate('order_send')}
              className="flex items-center gap-4 group cursor-pointer"
            >
              <div className="flex flex-col items-center">
                <div className="w-2.5 h-2.5 rounded-full bg-secondary"></div>
              </div>
              <div className="flex-1 group-hover:opacity-85 transition-opacity">
                <p className="text-[10px] text-outline font-semibold uppercase tracking-wider mb-0.5">目的地</p>
                <p className="text-sm font-semibold text-on-surface">要送到哪里？</p>
              </div>
              <MapPinPlus className="w-5 h-5 text-outline group-hover:text-secondary transition-colors" />
            </div>
          </div>
        </section>

        {/* Promotion Cards Scroll */}
        <section className="pb-4">
          <div className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth">
            {/* Card 1 */}
            <div className="flex-shrink-0 w-64 h-32 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 p-4 text-white flex flex-col justify-between overflow-hidden relative shadow-sm">
              <div className="relative z-10">
                <p className="text-[10px] font-bold uppercase tracking-wider opacity-80 mb-0.5">新用户专享</p>
                <h4 className="text-sm font-display font-extrabold">首单立减 15 元</h4>
              </div>
              <button className="relative z-10 w-fit bg-white text-primary text-[10px] px-4 py-1.5 rounded-full font-extrabold shadow-sm active:scale-95 transition-transform">
                立即领取
              </button>
              <div className="absolute -right-4 -bottom-4 opacity-10">
                <Gift className="w-24 h-24" />
              </div>
            </div>

            {/* Card 2 */}
            <div className="flex-shrink-0 w-64 h-32 rounded-2xl bg-gradient-to-br from-orange-400 to-red-500 p-4 text-white flex flex-col justify-between overflow-hidden relative shadow-sm">
              <div className="relative z-10">
                <p className="text-[10px] font-bold uppercase tracking-wider opacity-80 mb-0.5">雨天配送</p>
                <h4 className="text-sm font-display font-extrabold">全城加急，不误时</h4>
              </div>
              <button className="relative z-10 w-fit bg-white text-tertiary text-[10px] px-4 py-1.5 rounded-full font-extrabold shadow-sm active:scale-95 transition-transform">
                了解详情
              </button>
              <div className="absolute -right-4 -bottom-4 opacity-10">
                <Umbrella className="w-24 h-24" />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
