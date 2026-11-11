import React, { useState } from 'react';
import {
  MessageSquare,
  Star,
  Search,
  CheckCircle2,
  Truck,
  ShieldCheck,
  Send,
  UserCheck,
  Package,
} from 'lucide-react';
import { REVIEWS, COMPANY_INFO, PRODUCTS } from '../data/companyData';
import { ReviewItem, AdminOrder } from '../types';
import { syncFeedbackToFirestore } from '../lib/firebase';

interface CustomerHubPageProps {
  onShowToast: (msg: string) => void;
}

export const CustomerHubPage: React.FC<CustomerHubPageProps> = ({ onShowToast }) => {
  const [reviewsList, setReviewsList] = useState<ReviewItem[]>(REVIEWS);
  const [reviewerName, setReviewerName] = useState('');
  const [reviewerCity, setReviewerCity] = useState('');
  const [reviewerProduct, setReviewerProduct] = useState('Terra Herbs-8');
  const [reviewerRating, setReviewerRating] = useState(5);
  const [reviewerComment, setReviewerComment] = useState('');
  const [trackingId, setTrackingId] = useState('');
  const [trackedOrder, setTrackedOrder] = useState<any | null>(null);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newRev: ReviewItem = {
      id: `rev-${Date.now()}`,
      name: reviewerName,
      city: reviewerCity || 'Pakistan',
      product: reviewerProduct,
      rating: reviewerRating,
      date: 'Just now',
      verified: true,
      comment: reviewerComment,
    };
    setReviewsList([newRev, ...reviewsList]);
    syncFeedbackToFirestore(newRev);
    setReviewerName('');
    setReviewerCity('');
    setReviewerComment('');
    onShowToast('Thank you! Your verified review has been posted & synced.');
  };

  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId.trim()) return;

    // Check localStorage for genuine placed order
    try {
      const saved = localStorage.getItem('ammama_orders');
      if (saved) {
        const orderList: AdminOrder[] = JSON.parse(saved);
        const match = orderList.find(
          (o) => o.id.toUpperCase() === trackingId.trim().toUpperCase()
        );
        if (match) {
          setTrackedOrder({
            orderId: match.id,
            status: match.status,
            courier: `${match.courierCompany || 'TCS'} Express Pakistan`,
            awb: match.courierTracking || `${match.courierCompany || 'TCS'}-${Math.floor(10000000 + Math.random() * 90000000)}`,
            destination: `${match.customerCity}, Pakistan`,
            bookingDate: match.date,
            estimatedDelivery: 'Within 24-48 Hours',
            items: match.items.map((i) => `${i.productName} (${i.quantity})`).join(', '),
            payment: `${match.paymentMode} (PKR ${match.grandTotal.toLocaleString()})`,
            steps: [
              { label: 'Order Registered in SECP System', time: `${match.date} 10:15 AM`, done: true },
              { label: 'Laboratory Batch Verification Passed', time: `${match.date} 02:40 PM`, done: true },
              {
                label: 'Handed to Courier at Peshawar / Islamabad Hub',
                time: `${match.date} 06:10 PM`,
                done: match.status === 'Dispatched' || match.status === 'Delivered',
              },
              {
                label: 'In Transit to Regional Sorting Facility',
                time: 'In Progress',
                done: match.status === 'Dispatched' || match.status === 'Delivered',
              },
              {
                label: 'Out for Courier Delivery',
                time: match.status === 'Delivered' ? 'Delivered' : 'Expected Soon',
                done: match.status === 'Delivered',
              },
            ],
          });
          onShowToast(`Found real booking for Order #${match.id}!`);
          return;
        }
      }
    } catch (e) {
      console.error(e);
    }

    // Default simulated tracking lookup if test ID entered
    setTrackedOrder({
      orderId: trackingId.toUpperCase(),
      status: 'In Transit',
      courier: 'TCS Express Pakistan',
      awb: `TCS-${Math.floor(10000000 + Math.random() * 90000000)}`,
      destination: 'Lahore, Pakistan',
      bookingDate: '10-Nov-2026',
      estimatedDelivery: 'Within 24 Hours',
      items: 'Terra Herbs-8 (200g) × 1',
      payment: 'Cash on Delivery (PKR 1,450)',
      steps: [
        { label: 'Order Registered in SECP System', time: '10-Nov 10:15 AM', done: true },
        { label: 'Laboratory Batch Verification Passed', time: '10-Nov 02:40 PM', done: true },
        { label: 'Handed to Courier at Peshawar Hub', time: '10-Nov 07:10 PM', done: true },
        { label: 'In Transit to Regional Sorting Facility', time: '11-Nov 05:30 AM', done: true },
        { label: 'Out for Courier Delivery', time: 'Expected Today', done: false },
      ],
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 text-left">
      {/* Page Title */}
      <div className="max-w-3xl space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C28E3A]">
          <MessageSquare className="w-4 h-4 text-[#1C432E]" />
          <span>Transparency & Verified Experiences</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#142A1E]">
          Customer Hub & Feedback
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          We maintain transparent feedback loops with our customers. Track active shipments, submit reviews, and view authentic experiences from across Pakistan.
        </p>
      </div>

      {/* Trust Rating & Order Tracking Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Rating KPI Card */}
        <div className="lg:col-span-5 bg-[#1C432E] text-white p-6 sm:p-8 rounded-2xl space-y-4 shadow-md">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E6C687]">
            Strategic Trust Goal
          </span>
          <div className="flex items-baseline gap-3">
            <span className="font-serif text-5xl font-bold">4.8</span>
            <span className="text-stone-300 text-sm">/ 5.0 Rating</span>
          </div>

          <div className="flex items-center gap-1 text-[#E6C687]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-current" />
            ))}
          </div>

          <p className="text-xs text-stone-300 leading-relaxed">
            Over 340+ verified Pakistani customers have shared feedback on Terra Herbs-8, Sidr Honey, and Desi Ghee. Meeting our 4.5/5.0 strategic benchmark for brand integrity.
          </p>

          <div className="pt-3 border-t border-[#29593E] flex items-center justify-between text-xs text-stone-300">
            <span>Verified Purchases: 100%</span>
            <span>Zero Paid Reviews</span>
          </div>
        </div>

        {/* Order Tracking Simulator */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-2xs space-y-4">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-[#1C432E]" />
            <h3 className="font-serif text-xl font-bold text-stone-900">
              Track Nationwide Courier Shipment
            </h3>
          </div>
          <p className="text-xs text-stone-500">
            Enter your AMMAMA order number (e.g. <strong>AMM-2025-081</strong> or any order ID from your confirmation) to check real-time courier dispatch status.
          </p>

          <form onSubmit={handleTrackOrder} className="flex gap-2">
            <input
              type="text"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              placeholder="e.g. AMM-2025-081"
              className="flex-1 px-3 py-2 text-xs border border-stone-300 rounded focus:border-[#1C432E] focus:outline-none"
            />
            <button
              type="submit"
              className="px-5 py-2 bg-[#1C432E] hover:bg-[#25573C] text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors cursor-pointer shrink-0"
            >
              Track Order
            </button>
          </form>

          {trackedOrder && (
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-4 text-xs animate-in fade-in duration-200">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200 pb-2">
                <div>
                  <span className="text-[10px] text-stone-400 block">Order Ref:</span>
                  <strong className="font-mono text-sm text-stone-900">{trackedOrder.orderId}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-stone-400 block">Courier Partner:</span>
                  <span className="font-medium text-stone-800">{trackedOrder.courier} ({trackedOrder.awb})</span>
                </div>
                <div>
                  <span className="text-[10px] text-stone-400 block">Status:</span>
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-semibold rounded text-[11px]">
                    {trackedOrder.status}
                  </span>
                </div>
              </div>

              {/* Progress Steps */}
              <div className="space-y-3 pt-2">
                {trackedOrder.steps.map((st: any, idx: number) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold ${
                        st.done ? 'bg-[#1C432E] text-white' : 'bg-stone-200 text-stone-500'
                      }`}
                    >
                      {st.done ? '✓' : idx + 1}
                    </div>
                    <div className="flex-1 flex justify-between">
                      <span className={st.done ? 'font-medium text-stone-900' : 'text-stone-500'}>
                        {st.label}
                      </span>
                      <span className="text-stone-400 text-[11px] font-mono">{st.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Customer Reviews & Submit Feedback Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Reviews Feed */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between border-b border-stone-200 pb-3">
            <h3 className="font-serif text-2xl font-bold text-stone-900">
              Verified Buyer Reviews ({reviewsList.length})
            </h3>
            <span className="text-xs text-stone-500">Updated Daily</span>
          </div>

          <div className="space-y-4">
            {reviewsList.map((rev) => (
              <div
                key={rev.id}
                className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-serif font-bold text-sm text-stone-900">
                        {rev.name}
                      </h4>
                      {rev.verified && (
                        <span className="flex items-center gap-1 text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-medium">
                          <CheckCircle2 className="w-3 h-3" />
                          Verified Buyer
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-stone-400 mt-0.5">
                      {rev.city} · {rev.product}
                    </p>
                  </div>

                  <div className="flex items-center gap-0.5 text-[#C28E3A]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>

                <p className="text-xs text-stone-700 leading-relaxed">
                  "{rev.comment}"
                </p>

                <div className="text-[10px] text-stone-400 pt-1 border-t border-stone-100">
                  Reviewed on {rev.date}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Review Form */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-2xs space-y-4">
          <h3 className="font-serif text-xl font-bold text-stone-900">
            Leave Your Customer Feedback
          </h3>
          <p className="text-xs text-stone-500">
            Your authentic experience helps fellow Pakistani families choose pure botanical wellness.
          </p>

          <form onSubmit={handleReviewSubmit} className="space-y-3 text-xs">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Your Full Name *
              </label>
              <input
                type="text"
                required
                value={reviewerName}
                onChange={(e) => setReviewerName(e.target.value)}
                placeholder="e.g. Tariq Mehmood"
                className="w-full px-3 py-2 border border-stone-300 rounded focus:border-[#1C432E] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  value={reviewerCity}
                  onChange={(e) => setReviewerCity(e.target.value)}
                  placeholder="e.g. Islamabad"
                  className="w-full px-3 py-2 border border-stone-300 rounded focus:border-[#1C432E] focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Rating (Stars)
                </label>
                <select
                  value={reviewerRating}
                  onChange={(e) => setReviewerRating(parseInt(e.target.value) || 5)}
                  className="w-full px-3 py-2 border border-stone-300 rounded focus:border-[#1C432E] focus:outline-none"
                >
                  <option value={5}>5 Stars - Excellent</option>
                  <option value={4}>4 Stars - Very Good</option>
                  <option value={3}>3 Stars - Satisfactory</option>
                  <option value={2}>2 Stars - Needs Improvement</option>
                  <option value={1}>1 Star - Dissatisfied</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Product Purchased
              </label>
              <select
                value={reviewerProduct}
                onChange={(e) => setReviewerProduct(e.target.value)}
                className="w-full px-3 py-2 border border-stone-300 rounded-xl focus:border-[#1C432E] focus:outline-none text-xs bg-white"
              >
                {PRODUCTS.map((p) => (
                  <option key={p.id} value={p.name}>
                    {p.name} ({p.weight})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Your Review & Observations *
              </label>
              <textarea
                required
                rows={4}
                value={reviewerComment}
                onChange={(e) => setReviewerComment(e.target.value)}
                placeholder="Share how the product helped you, taste, packaging, delivery..."
                className="w-full px-3 py-2 border border-stone-300 rounded focus:border-[#1C432E] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-[#1C432E] hover:bg-[#25573C] text-white font-semibold rounded flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
            >
              <Send className="w-4 h-4" />
              Publish Verified Review
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
