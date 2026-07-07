/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Truck, ShoppingBag, ClipboardList, ChevronRight, Phone, MessageSquare, History, Star, RefreshCw } from 'lucide-react';
import { Screen, Order, User } from '../types';

interface OrdersScreenProps {
  orders: Order[];
  onNavigate: (screen: Screen) => void;
  onSelectOrder: (orderId: string, targetScreen: Screen) => void;
}

type TabType = 'all' | 'ongoing' | 'pending_rate';

export default function OrdersScreen({ orders, onNavigate, onSelectOrder }: OrdersScreenProps) {
  const [activeTab, setActiveTab] = useState<TabType>('all');

  const filteredOrders = orders.filter((order) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'ongoing') return order.status === 'ongoing' || order.status === 'waiting';
    if (activeTab === 'pending_rate') return order.status === 'pending_rate';
    return true;
  });

  const getIcon = (type: string, status: string) => {
    switch (type) {
      case 'send':
        return (
          <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary">
            <Truck className="w-5 h-5" />
          </div>
        );
      case 'buy':
        return (
          <div className="w-10 h-10 rounded-full bg-secondary-fixed-dim/20 flex items-center justify-center text-secondary">
            <ShoppingBag className="w-5 h-5" />
          </div>
        );
      default:
        return (
          <div className="w-10 h-10 rounded-full bg-tertiary-fixed flex items-center justify-center text-tertiary">
            <ClipboardList className="w-5 h-5" />
          </div>
        );
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'waiting':
        return <span className="text-xs font-semibold px-2.5 py-1 bg-primary-fixed text-primary rounded-full animate-pulse">待接单</span>;
      case 'ongoing':
        return <span className="text-xs font-semibold px-2.5 py-1 bg-secondary-container text-on-secondary-container rounded-full">配送中</span>;
      case 'completed':
        return <span className="text-xs font-semibold px-2.5 py-1 bg-surface-container text-on-surface-variant rounded-full">已完成</span>;
      case 'pending_rate':
        return <span className="text-xs font-semibold px-2.5 py-1 bg-tertiary-fixed text-tertiary font-bold rounded-full">待评价</span>;
      case 'cancelled':
        return <span className="text-xs font-semibold px-2.5 py-1 bg-error-container text-on-error-container rounded-full">已取消</span>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen pb-24 bg-background animate-fade-in">
      {/* Top App Bar */}
      <header className="fixed top-0 left-0 w-full z-50 bg-surface/95 backdrop-blur-md border-b border-surface-variant flex justify-between items-center px-4 h-14">
        <div className="flex items-center gap-1.5">
          <Truck className="w-5 h-5 text-primary" />
          <h1 className="text-base font-display font-bold text-primary">同城跑腿</h1>
        </div>
        <button className="p-2 rounded-full hover:bg-surface-container-low transition-colors text-on-surface-variant">
          <BellIcon />
        </button>
      </header>

      {/* Main Container */}
      <main className="pt-14">
        {/* Tab Navigation */}
        <nav className="sticky top-14 bg-surface z-40 px-4 py-3 border-b border-surface-variant flex justify-around items-center">
          <button
            onClick={() => setActiveTab('all')}
            className={`text-sm font-bold px-5 py-1.5 rounded-full transition-all duration-200 ${
              activeTab === 'all'
                ? 'bg-primary text-white shadow-sm shadow-primary/10'
                : 'text-on-surface-variant hover:bg-surface-container-low'
            }`}
          >
            全部
          </button>
          <button
            onClick={() => setActiveTab('ongoing')}
            className={`text-sm font-bold px-5 py-1.5 rounded-full transition-all duration-200 ${
              activeTab === 'ongoing'
                ? 'bg-primary text-white shadow-sm shadow-primary/10'
                : 'text-on-surface-variant hover:bg-surface-container-low'
            }`}
          >
            进行中
          </button>
          <button
            onClick={() => setActiveTab('pending_rate')}
            className={`text-sm font-bold px-5 py-1.5 rounded-full transition-all duration-200 ${
              activeTab === 'pending_rate'
                ? 'bg-primary text-white shadow-sm shadow-primary/10'
                : 'text-on-surface-variant hover:bg-surface-container-low'
            }`}
          >
            待评价
          </button>
        </nav>

        {/* Orders Content List */}
        <section className="p-4 space-y-4">
          {filteredOrders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center text-outline">
              <ClipboardList className="w-16 h-16 opacity-30 mb-2" />
              <p className="text-sm">暂无此分类下的订单</p>
            </div>
          ) : (
            filteredOrders.map((order, idx) => {
              // Custom class so xpath: `//div[contains(@class, 'order-card')][1]` works
              const targetDetailScreen: Screen =
                order.status === 'ongoing' || order.status === 'waiting'
                  ? order.status === 'waiting'
                    ? 'order_waiting'
                    : 'order_details_ongoing'
                  : 'order_details_completed';

              return (
                <div
                  key={order.id}
                  id={`order-card-${order.id}`}
                  className="order-card bg-white border border-outline-variant rounded-2xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer active:scale-[0.99] duration-150"
                  onClick={() => onSelectOrder(order.id, targetDetailScreen)}
                >
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-2.5">
                      {getIcon(order.type, order.status)}
                      <span className="font-display font-extrabold text-on-surface">{order.title}</span>
                    </div>
                    {getStatusBadge(order.status)}
                  </div>

                  {order.type === 'send' ? (
                    <div className="space-y-3 mb-4 text-xs">
                      <div className="flex items-start gap-3">
                        <div className="flex flex-col items-center pt-1 shrink-0">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                          <div className="w-0.5 h-6 bg-surface-variant my-1"></div>
                          <div className="w-2 h-2 rounded-full bg-secondary"></div>
                        </div>
                        <div className="flex-1 min-w-0 space-y-2">
                          <div>
                            <p className="text-[10px] text-outline font-semibold uppercase tracking-wider">取件地址</p>
                            <p className="font-bold text-on-surface truncate mt-0.5">{order.pickup}</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-outline font-semibold uppercase tracking-wider">送达地址</p>
                            <p className="font-bold text-on-surface truncate mt-0.5">{order.dropoff}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-between items-start mb-4 text-xs">
                      <div className="space-y-1 min-w-0 flex-1 pr-3">
                        <p className="font-bold text-on-surface truncate text-sm">{order.pickup}</p>
                        <p className="text-[10px] text-outline font-medium">下单时间: {order.time}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-base font-display font-black text-on-surface">¥ {order.price.toFixed(2)}</p>
                        {order.type === 'buy' && <p className="text-[9px] text-outline font-semibold">含配送费</p>}
                      </div>
                    </div>
                  )}

                  <div className="border-t border-surface-variant pt-3 flex justify-between items-center text-xs">
                    <div className="text-outline font-medium">
                      订单号: {order.id}
                    </div>
                    <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                      {order.status === 'ongoing' && (
                        <button
                          onClick={() => onSelectOrder(order.id, 'order_details_ongoing')}
                          className="px-4 py-1.5 border border-primary text-primary text-[11px] rounded-full font-bold hover:bg-primary-fixed/50 transition-colors"
                        >
                          联系骑手
                        </button>
                      )}
                      {order.status === 'completed' && (
                        <>
                          <button
                            onClick={() => onNavigate('order_send')}
                            className="px-4 py-1.5 bg-primary text-white text-[11px] rounded-full font-bold active:scale-95 transition-all shadow-sm"
                          >
                            再来一单
                          </button>
                        </>
                      )}
                      {order.status === 'pending_rate' && (
                        <>
                          <button
                            onClick={() => onSelectOrder(order.id, 'order_details_completed')}
                            className="px-4 py-1.5 bg-primary text-white text-[11px] rounded-full font-bold active:scale-95 transition-all shadow-sm"
                          >
                            立即评价
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}

          {/* Graphic Placeholder for No More Orders */}
          <div className="flex flex-col items-center justify-center pt-8 opacity-45">
            <History className="w-8 h-8 text-outline mb-1.5" />
            <p className="text-[11px] text-outline font-semibold">仅显示近一个月的订单</p>
          </div>
        </section>
      </main>
    </div>
  );
}

function BellIcon() {
  return (
    <div className="relative">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bell">
        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
      </svg>
      <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-error rounded-full"></span>
    </div>
  );
}
