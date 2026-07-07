/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Gauge, ReceiptText, User } from 'lucide-react';
import { Screen } from '../types';

interface BottomNavProps {
  currentScreen: Screen;
  userLoggedIn: boolean;
  onNavigate: (screen: Screen) => void;
}

export default function BottomNav({ currentScreen, userLoggedIn, onNavigate }: BottomNavProps) {
  // Determine active tab index
  const isBookingActive = currentScreen === 'booking';
  const isOrdersActive = currentScreen === 'orders';
  const isProfileActive = currentScreen === 'profile_logged_in' || currentScreen === 'profile_logged_out';

  // Only show BottomNav on root-level screens to keep transactional flows focused (per "Shell Visibility" rule)
  const showNav = isBookingActive || isOrdersActive || isProfileActive;

  if (!showNav) return null;

  const handleProfileTabClick = () => {
    if (userLoggedIn) {
      onNavigate('profile_logged_in');
    } else {
      onNavigate('profile_logged_out');
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 bg-white border-t border-surface-variant flex justify-around items-center px-4 py-2 pb-safe shadow-[0_-2px_12px_rgba(0,0,0,0.02)] rounded-t-2xl max-w-md mx-auto right-0">
      {/* Tab 1: 预约 */}
      <button
        onClick={() => onNavigate('booking')}
        className={`flex flex-col items-center justify-center py-1 transition-all duration-200 cursor-pointer ${
          isBookingActive
            ? 'text-primary bg-primary-fixed rounded-full px-5 py-1 scale-95 font-bold'
            : 'text-on-surface-variant hover:bg-surface-container-low px-5 py-1 scale-90'
        }`}
      >
        <Gauge className="w-5 h-5 shrink-0" />
        <span className="text-[10px] mt-0.5 tracking-wide">预约</span>
      </button>

      {/* Tab 2: 订单 */}
      <button
        onClick={() => onNavigate('orders')}
        className={`flex flex-col items-center justify-center py-1 transition-all duration-200 cursor-pointer ${
          isOrdersActive
            ? 'text-primary bg-primary-fixed rounded-full px-5 py-1 scale-95 font-bold'
            : 'text-on-surface-variant hover:bg-surface-container-low px-5 py-1 scale-90'
        }`}
      >
        <ReceiptText className="w-5 h-5 shrink-0" />
        <span className="text-[10px] mt-0.5 tracking-wide">订单</span>
      </button>

      {/* Tab 3: 我的 */}
      <button
        onClick={handleProfileTabClick}
        className={`flex flex-col items-center justify-center py-1 transition-all duration-200 cursor-pointer ${
          isProfileActive
            ? 'text-primary bg-primary-fixed rounded-full px-5 py-1 scale-95 font-bold'
            : 'text-on-surface-variant hover:bg-surface-container-low px-5 py-1 scale-90'
        }`}
      >
        <User className="w-5 h-5 shrink-0" />
        <span className="text-[10px] mt-0.5 tracking-wide">我的</span>
      </button>
    </nav>
  );
}
