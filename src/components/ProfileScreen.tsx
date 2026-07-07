/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { User as UserIcon, Bell, MapPin, CheckCircle2, Star, ChevronRight, Map, Notebook, Headset, Settings, LogOut, LogIn, Plus, Phone, Mail, ShieldAlert } from 'lucide-react';
import { Screen, User } from '../types';

interface ProfileScreenProps {
  user: User;
  onSetUser: (user: User) => void;
  onNavigate: (screen: Screen) => void;
}

export default function ProfileScreen({ user, onSetUser, onNavigate }: ProfileScreenProps) {
  const [showModal, setShowModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [smsCode, setSmsCode] = useState('');

  const handleLogout = () => {
    // Set logged out state
    onSetUser({
      ...user,
      loggedIn: false,
    });
    onNavigate('profile_logged_out');
  };

  const handleLogin = () => {
    // Set logged in state
    onSetUser({
      ...user,
      loggedIn: true,
    });
    setShowModal(false);
    onNavigate('profile_logged_in');
  };

  return (
    <div className="min-h-screen pb-24 bg-background animate-fade-in">
      {/* Top App Bar */}
      <header className="fixed top-0 left-0 w-full z-50 bg-surface/95 backdrop-blur-md border-b border-surface-variant flex justify-between items-center px-4 h-14">
        <div className="flex items-center gap-1.5">
          <MapPin className="w-5 h-5 text-primary" />
          <span className="text-sm font-display font-extrabold text-primary">同城跑腿</span>
        </div>
        <button className="w-10 h-10 flex items-center justify-center hover:bg-surface-container-low transition-colors rounded-full text-on-surface-variant">
          <Bell className="w-5 h-5" />
        </button>
      </header>

      {/* Main Container */}
      <main className="pt-16 px-4 space-y-6">
        {user.loggedIn ? (
          /* =========================================================================
             LOGGED IN STATE (Screen 3)
             ========================================================================= */
          <>
            {/* User Profile Header */}
            <section className="relative bg-white rounded-2xl p-4 border border-surface-variant overflow-hidden shadow-sm">
              <div className="absolute -right-12 -top-12 w-48 h-48 bg-primary/5 rounded-full blur-3xl"></div>
              <div className="flex items-center gap-4 relative z-10">
                <div className="relative">
                  <img
                    className="w-20 h-20 rounded-full object-cover border-2 border-primary-fixed"
                    alt="User Portrait"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBq_saYAPYg5iquSZK2sYYnD5RfkrUShnjqW72_A-kJsRv3E4qvTtlxfHlQGtkhGHDehPgB-oDgkK-YbbAePjVesqhuBxEX4fEeK5O-kAHbUAJyiAAczcHCg_XsnSjYKzYvYHfsiQz7grbrW4fPqFs1x78aRu88xP1epTIlAdDLQApvnDHOl1HuAnlmPvgFMDNJCv7cxaJYP2FGQfmhYT7lkx_pZrvVWKApJRC58CBqshXMA1_25NG2"
                  />
                  <div className="absolute bottom-0 right-0 bg-secondary text-white rounded-full p-1 border-2 border-white shadow-sm flex items-center justify-center">
                    <CheckCircle2 className="w-3.5 h-3.5 fill-current text-white" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <h1 className="text-xl font-display font-extrabold text-on-surface">{user.name}</h1>
                  <p className="text-xs font-semibold text-on-surface-variant mt-0.5">会员等级：{user.rating}</p>
                  <div className="mt-2 inline-flex items-center gap-1 bg-primary-fixed text-on-primary-fixed px-2.5 py-0.5 rounded-full w-fit">
                    <Star className="w-3 h-3 fill-current text-primary" />
                    <span className="text-[9px] font-black tracking-wider uppercase">PRO USER</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Stats & Balance Section (Professional Polish Design) */}
            <section className="space-y-3">
              {/* Balance Premium Gradient Card */}
              <div className="relative overflow-hidden rounded-2xl p-5 text-white shadow-md bg-gradient-to-br from-[#4F46E5] to-[#7C3AED]">
                <div className="relative z-10">
                  <span className="text-xs opacity-80 font-medium">我的余额</span>
                  <h2 className="text-3xl font-display font-extrabold tracking-tight my-1">
                    ¥ {user.balance.toFixed(2)}
                  </h2>
                  <div className="mt-2.5 inline-flex bg-white/20 backdrop-blur-md text-[10px] font-bold px-2.5 py-1 rounded-lg">
                    累计已省 ¥420.00
                  </div>
                </div>
                <div className="absolute -right-6 -bottom-6 opacity-10 pointer-events-none">
                  <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="2" y="5" width="20" height="14" rx="2" />
                    <line x1="2" y1="10" x2="22" y2="10" />
                  </svg>
                </div>
              </div>

              {/* Sub Stats: Coupons & Points */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white border border-surface-variant p-4 rounded-2xl flex items-center justify-between shadow-sm hover:bg-surface-container-low transition-colors cursor-pointer">
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-on-surface-variant">优惠券</span>
                    <span className="text-[10px] text-outline mt-0.5">即将过期 1 张</span>
                  </div>
                  <span className="text-xl font-display font-black text-primary">{user.coupons} <span className="text-xs font-bold text-outline">张</span></span>
                </div>
                <div className="bg-white border border-surface-variant p-4 rounded-2xl flex items-center justify-between shadow-sm hover:bg-surface-container-low transition-colors cursor-pointer">
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-on-surface-variant">积分</span>
                    <span className="text-[10px] text-outline mt-0.5">可兑换免费券</span>
                  </div>
                  <span className="text-xl font-display font-black text-primary">{user.points.toLocaleString()} <span className="text-xs font-bold text-outline">分</span></span>
                </div>
              </div>
            </section>

            {/* Menu List (Clean Card Style) */}
            <section className="bg-white rounded-2xl border border-surface-variant overflow-hidden shadow-sm">
              <div className="divide-y divide-surface-variant">
                <button className="w-full flex items-center justify-between p-4 hover:bg-surface-container-low transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary-fixed flex items-center justify-center text-primary">
                      <Map className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-bold text-on-surface">地址管理</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-outline transition-transform group-hover:translate-x-0.5" />
                </button>

                <button className="w-full flex items-center justify-between p-4 hover:bg-surface-container-low transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-secondary-container/20 flex items-center justify-center text-secondary">
                      <Notebook className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-bold text-on-surface">常用备注</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-outline transition-transform group-hover:translate-x-0.5" />
                </button>

                <button className="w-full flex items-center justify-between p-4 hover:bg-surface-container-low transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-tertiary-fixed/30 flex items-center justify-center text-tertiary">
                      <Headset className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-bold text-on-surface">联系客服</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold text-primary">在线中</span>
                    <ChevronRight className="w-5 h-5 text-outline transition-transform group-hover:translate-x-0.5" />
                  </div>
                </button>

                <button className="w-full flex items-center justify-between p-4 hover:bg-surface-container-low transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-outline">
                      <Settings className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-bold text-on-surface">设置</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-outline transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </section>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full h-12 bg-white text-error font-bold border border-surface-variant rounded-2xl flex items-center justify-center gap-2 hover:bg-error-container/10 active:scale-[0.98] transition-all"
            >
              <LogOut className="w-5 h-5" />
              退出登录
            </button>
          </>
        ) : (
          /* =========================================================================
             LOGGED OUT STATE (Screen 10)
             ========================================================================= */
          <>
            {/* Profile Header (Unlogged) */}
            <section className="mt-4 py-4 flex flex-col items-center">
              <div className="relative mb-4">
                <div className="w-20 h-20 rounded-full bg-surface-container-highest flex items-center justify-center border-4 border-white shadow-sm text-outline">
                  <UserIcon className="w-10 h-10" />
                </div>
                <button
                  onClick={() => setShowModal(true)}
                  className="absolute bottom-0 right-0 w-6 h-6 bg-primary rounded-full border-2 border-white flex items-center justify-center text-white hover:bg-primary-container active:scale-90 transition-transform"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={() => setShowModal(true)}
                className="text-base font-display font-extrabold text-on-surface hover:text-primary transition-colors focus:outline-none"
              >
                点击登录/注册
              </button>
              <p className="text-xs text-on-surface-variant font-medium mt-1">登录后体验更多功能</p>
            </section>

            {/* Login Call to Action */}
            <section>
              <button
                onClick={() => setShowModal(true)}
                className="w-full h-12 bg-primary text-white rounded-2xl font-bold active:scale-[0.98] transition-all shadow-sm flex items-center justify-center gap-2 hover:bg-primary-container"
              >
                <span>立即登录</span>
                <LogIn className="w-5 h-5" />
              </button>
            </section>

            {/* Stats/Assets Grid (Logged Out State) */}
            <section className="grid grid-cols-3 gap-3">
              <div className="bg-white p-4 rounded-2xl border border-outline-variant flex flex-col items-center shadow-sm">
                <span className="text-lg font-black text-outline">--</span>
                <span className="text-xs font-semibold text-on-surface-variant mt-1">余额</span>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-outline-variant flex flex-col items-center shadow-sm">
                <span className="text-lg font-black text-outline">--</span>
                <span className="text-xs font-semibold text-on-surface-variant mt-1">红包</span>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-outline-variant flex flex-col items-center shadow-sm">
                <span className="text-lg font-black text-outline">--</span>
                <span className="text-xs font-semibold text-on-surface-variant mt-1">积分</span>
              </div>
            </section>

            {/* Feature List */}
            <section className="bg-white rounded-2xl border border-outline-variant overflow-hidden shadow-sm">
              <div
                onClick={() => setShowModal(true)}
                className="flex items-center justify-between p-4 border-b border-surface-variant hover:bg-surface-container-low transition-all cursor-pointer active:scale-[0.99]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-fixed flex items-center justify-center text-primary">
                    <Map className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-bold text-on-surface">收货地址</span>
                </div>
                <ChevronRight className="w-5 h-5 text-outline" />
              </div>

              <div
                onClick={() => setShowModal(true)}
                className="flex items-center justify-between p-4 border-b border-surface-variant hover:bg-surface-container-low transition-all cursor-pointer active:scale-[0.99]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-tertiary-fixed flex items-center justify-center text-tertiary">
                    <Headset className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-bold text-on-surface">客服中心</span>
                </div>
                <ChevronRight className="w-5 h-5 text-outline" />
              </div>

              <div
                onClick={() => setShowModal(true)}
                className="flex items-center justify-between p-4 hover:bg-surface-container-low transition-all cursor-pointer active:scale-[0.99]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-surface-container-highest flex items-center justify-center text-on-surface-variant">
                    <Settings className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-bold text-on-surface">设置</span>
                </div>
                <ChevronRight className="w-5 h-5 text-outline" />
              </div>
            </section>

            {/* Join Runner Banner */}
            <section className="relative overflow-hidden rounded-2xl h-32 flex items-center px-5 shadow-sm bg-gradient-to-br from-primary-fixed to-primary-fixed-dim/40 border border-primary/10">
              <div className="absolute inset-0 z-0 opacity-15">
                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDzP0U2y_64j7weeGJ_UyuWBdOmaaW566zJFeL1SvB_wk4pFf-ywaB4Z5c94-2-ZXlwNBp-2GtfLL35N2EXFy4awqTRmxzCpzvT7Cpn5GA-Jq04HzYfnQidCRGKSrJE5LNIK9V_INQPRLBKpEtDgG-tzUcRuBqlvEvKGTSyn8qKbRw97ECnZSj4oqTaMI4WXN8TtkB3u-yK2dn6DyWWM-LPCjTwLN27w27P0CyvU4ma4xGaWWSzw9SH')" }}></div>
              </div>
              <div className="relative z-10 space-y-1">
                <h3 className="text-base font-display font-extrabold text-on-primary-fixed">加入跑腿员</h3>
                <p className="text-xs text-on-primary-fixed-variant font-medium">自由接单，赚取丰厚报酬</p>
                <button className="mt-2.5 bg-primary text-white text-[10px] px-4.5 py-1.5 rounded-full font-bold active:scale-95 transition-transform shadow-sm">
                  了解详情
                </button>
              </div>
            </section>
          </>
        )}
      </main>

      {/* =========================================================================
         LOGIN MODAL SHEET
         ========================================================================= */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex flex-col justify-end">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setShowModal(false)}
          ></div>

          {/* Bottom Sheet Modal Content */}
          <div className="relative bg-white rounded-t-3xl p-6 pb-8 shadow-2xl transition-transform duration-300 transform translate-y-0 max-w-md mx-auto w-full z-10 border-t border-surface-variant">
            {/* Handle Bar */}
            <div className="w-12 h-1 bg-surface-container-highest rounded-full mx-auto mb-6"></div>

            <h2 className="text-xl font-display font-black text-on-surface mb-1">快捷登录</h2>
            <p className="text-xs text-on-surface-variant font-medium mb-6">登录后可查看订单状态及个人资产</p>

            <div className="space-y-4">
              {/* Phone Input */}
              <div className="relative flex items-center">
                <Phone className="absolute left-4 w-5 h-5 text-outline" />
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full h-14 bg-surface-container-low border border-outline-variant rounded-2xl pl-12 pr-4 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm font-semibold transition-all"
                  placeholder="请输入手机号"
                />
              </div>

              {/* Verification Code */}
              <div className="flex gap-3">
                <div className="relative flex-1 flex items-center">
                  <Mail className="absolute left-4 w-5 h-5 text-outline" />
                  <input
                    type="text"
                    value={smsCode}
                    onChange={(e) => setSmsCode(e.target.value)}
                    className="w-full h-14 bg-surface-container-low border border-outline-variant rounded-2xl pl-12 pr-4 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm font-semibold transition-all"
                    placeholder="验证码"
                  />
                </div>
                <button className="px-4 text-primary font-bold text-xs hover:text-primary-container shrink-0">
                  获取验证码
                </button>
              </div>

              {/* Confirm Login Button */}
              <button
                onClick={handleLogin}
                className="w-full h-14 bg-primary hover:bg-primary-container text-white rounded-2xl font-bold mt-4 shadow-sm active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <span>确认登录</span>
              </button>

              {/* Divider */}
              <div className="flex items-center gap-4 py-4">
                <div className="w-full h-[1px] bg-outline-variant"></div>
                <span className="text-[10px] text-outline font-bold uppercase tracking-wider whitespace-nowrap">其他方式</span>
                <div className="w-full h-[1px] bg-outline-variant"></div>
              </div>

              {/* Third-Party Login Options */}
              <div className="flex justify-center gap-6">
                <button className="w-12 h-12 rounded-full border border-outline-variant flex items-center justify-center active:scale-95 transition-transform hover:bg-surface-container-low">
                  <img
                    alt="WeChat"
                    className="w-6 h-6"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBRdjrXWA_1cAlKan5sIoe2LvoJ6i3vtHdAi8N_jqTD-lIDvtBh2Xet_6hqDVI0ny3O52BLHfAixCgsDD3PhwS2yjw7MxQqec-ZjJBG13ec6PbXFSQ6lgUtogBlNQjKLEIH90ObWbqpFjFddNOQAecNqTlijWZu1nLbJXW6JPdLC03cfMksksj0Eqhdtsnt2lr_PHOYd0ICSnsevwfWjHS1LbJ2E8iNlnYkkbgwHQvXO2BhNWJ7auOZ"
                  />
                </button>
                <button className="w-12 h-12 rounded-full border border-outline-variant flex items-center justify-center active:scale-95 transition-transform hover:bg-surface-container-low">
                  <img
                    alt="Alipay"
                    className="w-6 h-6"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCatA-m7Wio3HPYL_tIrmwYUtMyCWbl8_9kUrgGNP7X6tEm8GJuUfDy4L_Tg-oUnIFWgtdk6QV03JUOFv8AtnjNMIiyNM89OKy3ExX2AGe52dI8TuRxWbvVbrWaYuENisIBwfpGmo9J6eVhvUnlZdGGBuQ57cGaEshlfj6NJSjaKWmeY4xYOZr0fhaDGD9Wa91tNRSqEQTzL9AbJICKZcTUkZLaYNTQ624QJ4byUPaPFpcDLfmQloE-"
                  />
                </button>
              </div>

              {/* Terms Checkbox */}
              <p className="text-[10px] text-center text-outline font-medium pt-4">
                登录即代表您已阅读并同意<span className="text-primary cursor-pointer font-bold">《服务协议》</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
