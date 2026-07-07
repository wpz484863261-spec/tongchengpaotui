/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Screen =
  | 'booking'
  | 'orders'
  | 'profile_logged_in'
  | 'profile_logged_out'
  | 'order_send'
  | 'order_buy'
  | 'order_success'
  | 'order_waiting'
  | 'order_details_ongoing'
  | 'order_details_completed';

export interface Rider {
  name: string;
  phone: string;
  rating: number;
  completedCount: number;
  avatar: string;
}

export interface Order {
  id: string;
  type: 'send' | 'buy' | 'task';
  title: string;
  status: 'waiting' | 'ongoing' | 'completed' | 'pending_rate' | 'cancelled';
  pickup: string;
  dropoff: string;
  price: number;
  time: string;
  items: string;
  notes: string;
  rider?: Rider;
  ratingGiven?: number;
  evaluationTags?: string[];
  evaluationComment?: string;
}

export interface User {
  loggedIn: boolean;
  name: string;
  rating: string;
  avatar: string;
  balance: number;
  coupons: number;
  points: number;
}
