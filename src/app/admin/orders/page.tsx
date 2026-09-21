'use client';

import React, { useState } from 'react';
import { ShoppingBag, Truck, CheckCircle2, Clock, Search, Filter } from 'lucide-react';
import { formatINR } from '@/lib/utils';

interface MockOrder {
  id: string;
  customerName: string;
  customerPhone: string;
  date: string;
  items: string;
  total: number;
  paymentMode: string;
  status: 'Processing' | 'Shipped' | 'Delivered';
}

const INITIAL_ORDERS: MockOrder[] = [
  { id: 'EF-ORD-882190', customerName: 'Alex Morgan', customerPhone: '+91 98301 23456', date: '18 Sep 2026', items: 'Heavyweight Oversized Tee (L, Onyx) + Hydro-Flask', total: 3198, paymentMode: 'UPI', status: 'Shipped' },
  { id: 'EF-ORD-882191', customerName: 'Rohan Sen', customerPhone: '+91 98305 67890', date: '19 Sep 2026', items: 'Raw Grip Leather Lifting Straps + Whey Isolate (2kg)', total: 5498, paymentMode: 'UPI', status: 'Processing' },
  { id: 'EF-ORD-882188', customerName: 'Pooja Bannerjee', customerPhone: '+91 98311 44556', date: '15 Sep 2026', items: 'Tactical Duffel Gym Bag (45L)', total: 3299, paymentMode: 'Card', status: 'Delivered' },
  { id: 'EF-ORD-882185', customerName: 'Vikramaditya Roy', customerPhone: '+91 98322 99887', date: '14 Sep 2026', items: 'Kinetic Heavy Resistance Loop Band Set', total: 1499, paymentMode: 'Gym Front Desk', status: 'Delivered' },
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<MockOrder[]>(INITIAL_ORDERS);
  const [selectedStatus, setSelectedStatus] = useState('All');

  const filteredOrders = orders.filter((o) => {
    if (selectedStatus === 'All') return true;
    return o.status === selectedStatus;
  });

  const handleAdvanceStatus = (orderId: string) => {
    setOrders(
      orders.map((o) => {
        if (o.id === orderId) {
          const nextStatus = o.status === 'Processing' ? 'Shipped' : 'Delivered';
          return { ...o, status: nextStatus };
        }
        return o;
      })
    );
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <span className="text-[10px] font-mono text-[#E2F163] font-bold uppercase tracking-widest">
          STORE FULFILLMENT & DISPATCH
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-white font-display uppercase">
          PRO STORE ORDERS ({orders.length})
        </h2>
      </div>

      {/* Orders Table */}
      <div className="rounded-3xl bg-[#111119] border border-white/10 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-white/5 text-zinc-400">
                <th className="p-4 font-semibold">Order ID</th>
                <th className="p-4 font-semibold">Athlete</th>
                <th className="p-4 font-semibold">Items Dispatched</th>
                <th className="p-4 font-semibold">Date</th>
                <th className="p-4 font-semibold">Total</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold text-right">Fulfillment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-4 font-mono font-bold text-white">{ord.id}</td>
                  <td className="p-4">
                    <div className="font-bold text-white">{ord.customerName}</div>
                    <span className="text-[10px] text-zinc-400">{ord.customerPhone}</span>
                  </td>
                  <td className="p-4 text-zinc-300 max-w-xs">{ord.items}</td>
                  <td className="p-4 text-zinc-400">{ord.date}</td>
                  <td className="p-4 font-bold text-[#E2F163]">{formatINR(ord.total)}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                      ord.status === 'Processing' ? 'bg-amber-500/10 text-amber-400' :
                      ord.status === 'Shipped' ? 'bg-[#00F0FF]/10 text-[#00F0FF]' :
                      'bg-emerald-500/10 text-emerald-400'
                    }`}>
                      {ord.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    {ord.status !== 'Delivered' ? (
                      <button
                        onClick={() => handleAdvanceStatus(ord.id)}
                        className="px-3 py-1.5 rounded-lg bg-[#E2F163] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#d6e752] transition-all"
                      >
                        Mark {ord.status === 'Processing' ? 'Shipped' : 'Delivered'}
                      </button>
                    ) : (
                      <span className="text-zinc-500 font-semibold text-[11px]">Fulfilled ✓</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
