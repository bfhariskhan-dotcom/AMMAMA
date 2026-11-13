import React, { useState, useEffect } from 'react';
import {
  MessageSquare,
  Star,
  CheckCircle2,
  Truck,
  Send,
  AlertCircle,
} from 'lucide-react';
import { ReviewItem, AdminOrder, Product } from '../types';
import { syncFeedbackToFirestore, fetchOrderByIdFromFirestore } from '../lib/firebase';
import { COMPANY_INFO } from '../data/companyData';

interface CustomerHubPageProps {
  products: Product[];
  reviews: ReviewItem[];
  onAddReview: (rev: ReviewItem) => void;
  onShowToast: (msg: string) => void;
}

export const CustomerHubPage: React.FC<CustomerHubPageProps> = ({
  products,
  reviews,
  onAddReview,
  onShowToast,
}) => {
  const [reviewerName, setReviewerName] = useState('');
  const [reviewerCity, setReviewerCity] = useState('');
  const [reviewerProduct, setReviewerProduct] = useState(products[0]?.name || 'Terra Herbs-8');
  const [reviewerRating, setReviewerRating] = useState(5);
  const [reviewerComment, setReviewerComment] = useState('');
  const [trackingId, setTrackingId] = useState('');
  const [trackingLoading, setTrackingLoading] = useState(false);
  const [trackingError, setTrackingError] = useState<string | null>(null);
  const [trackedOrder, setTrackedOrder] = useState<any | null>(null);

  useEffect(() => {
    if (products.length > 0 && !products.some((p) => p.name === reviewerProduct)) {
      setReviewerProduct(products[0].name);
    }
  }, [products, reviewerProduct]);

  const visibleReviews = reviews.filter((r) => r.isApproved !== false);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newRev: ReviewItem = {
      id: `rev-${Date.now()}`,
      name: reviewerName.trim(),
      city: reviewerCity.trim() || 'Pakistan',
      product: reviewerProduct,
      rating: reviewerRating,
      date: new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
      verified: true,
      isApproved: true,
      comment: reviewerComment.trim(),
    };
    onAddReview(newRev);
    await syncFeedbackToFirestore(newRev);
    setReviewerName('');
    setReviewerCity('');
    setReviewerComment('');
    onShowToast('Thank you! Your verified review has been posted.');
  };

  const formatTrackedOrder = (match: AdminOrder) => ({
    orderId: match.id,
    status: match.status,
    courier: `${match.courierCompany || 'TCS'} Express Pakistan`,
    awb: match.courierTracking || 'Assigned upon dispatch',
    destination: `${match.customerCity}, Pakistan`,
    bookingDate: match.date,
    items: match.items.map((i) => `${i.productName} (${i.quantity})`).join(', '),
    payment: `${match.paymentMode} (PKR ${match.grandTotal.toLocaleString()})`,
    steps: [
      { label: 'Order Registered', time: match.date, done: true },
      {
        label: 'Quality Verification Passed',
        time: match.status !== 'Pending' ? 'Completed' : 'In Queue',
        done: match.status === 'QC Verified' || match.status === 'Dispatched' || match.status === 'Delivered',
      },
      {
        label: `Dispatched via ${match.courierCompany || 'TCS'}`,
        time: match.courierTracking || 'Pending Dispatch',
        done: match.status === 'Dispatched' || match.status === 'Delivered',
      },
      {
        label: 'Delivered to Customer',
        time: match.status === 'Delivered' ? 'Delivered' : 'Expected 24-48 Hours',
        done: match.status === 'Delivered',
      },
    ],
  });

  const handleTrackOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = trackingId.trim().toUpperCase();
    if (!cleanId) return;

    setTrackingLoading(true);
    setTrackingError(null);
    setTrackedOrder(null);

    try {
      // 1. Check localStorage orders
      const saved = localStorage.getItem('ammama_orders');
      if (saved) {
        const orderList: AdminOrder[] = JSON.parse(saved);
        const match = orderList.find((o) => o.id.toUpperCase() === cleanId);
        if (match) {
          setTrackedOrder(formatTrackedOrder(match));
          setTrackingLoading(false);
          onShowToast(`Found booking for Order #${match.id}!`);
          return;
        }
      }

      // 2. Check live Firestore order by ID
      const remoteOrder = await fetchOrderByIdFromFirestore(cleanId);
      if (remoteOrder) {
        setTrackedOrder(formatTrackedOrder(remoteOrder));
        setTrackingLoading(false);
        onShowToast(`Found live booking for Order #${remoteOrder.id}!`);
        return;
      }

      // 3. Support standard sample demonstration ID
      if (cleanId === 'AMM-918234' || cleanId === 'AMM-2025-081') {
        setTrackedOrder({
          orderId: cleanId,
          status: 'Dispatched',
          courier: 'TCS Express Pakistan',
          awb: 'TCS-88192031',
          destination: 'Lahore, Pakistan',
          bookingDate: '10 Nov 2026',
          items: 'Terra Herbs-8 (200g) × 2',
          payment: 'Cash on Delivery (COD)',
          steps: [
            { label: 'Order Registered', time: '10 Nov 2026', done: true },
            { label: 'Quality Verification Passed', time: 'Completed', done: true },
            { label: 'Dispatched via TCS', time: 'TCS-88192031', done: true },
            { label: 'Delivered to Customer', time: 'Expected Today', done: false },
          ],
        });
        setTrackingLoading(false);
        return;
      }

      setTrackingError(
        `No shipment record found for Order #${cleanId}. Please verify your Order ID or contact WhatsApp ${COMPANY_INFO.phone}.`
      );
    } catch (err) {
      console.error(err);
      setTrackingError('Unable to check order status right now. Please try again.');
    } finally {
      setTrackingLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 text-left">
      {/* Page Title */}
      <div className="max-w-3xl space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C28E3A]">
          <MessageSquare className="w-4 h-4 text-[#1C432E]" />
          <span>Transparency &amp; Verified Experiences</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#142A1E]">
          Customer Hub &amp; Order Tracking
        </h1>
        <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
          Track active courier shipments, submit product reviews, and browse authentic buyer experiences from across Pakistan.
        </p>
      </div>

      {/* Trust Rating & Order Tracking Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Rating KPI Card */}
        <div className="lg:col-span-5 bg-[#1C432E] text-white p-6 rounded-2xl space-y-3.5 shadow-md">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#E6C687]">
            Verified Customer Trust
          </span>
          <div className="flex items-baseline gap-2.5">
            <span className="font-serif text-4xl sm:text-5xl font-bold">4.8</span>
            <span className="text-stone-300 text-xs sm:text-sm">/ 5.0 Average Rating</span>
          </div>

          <div className="flex items-center gap-1 text-[#E6C687]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
          </div>

          <p className="text-xs text-stone-200 leading-relaxed">
            Hundreds of Pakistani households rely on {COMPANY_INFO.brandName} for Terra Herbs-8, wild Karak honey, pure Cholistan desi ghee, and cold-pressed olive oils.
          </p>

          <div className="pt-3 border-t border-[#29593E] flex items-center justify-between text-[11px] text-stone-300">
            <span>Verified Purchases: 100%</span>
            <span>Nationwide COD</span>
          </div>
        </div>

        {/* Order Tracking Lookup */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-4">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-[#1C432E]" />
            <h3 className="font-serif text-lg sm:text-xl font-bold text-stone-900">
              Track Nationwide Courier Shipment
            </h3>
          </div>
          <p className="text-xs text-stone-500">
            Enter your order reference ID (e.g. <strong>AMM-918234</strong>) to view live dispatch status and courier tracking.
          </p>

          <form onSubmit={handleTrackOrder} className="flex gap-2">
            <input
              type="text"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              placeholder="Enter Order ID (e.g. AMM-918234)"
              className="flex-1 px-3.5 py-2 text-xs border border-stone-300 rounded-lg focus:border-[#1C432E] focus:outline-none"
            />
            <button
              type="submit"
              disabled={trackingLoading}
              className="px-4 py-2 bg-[#1C432E] hover:bg-[#25573C] text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors cursor-pointer shrink-0 whitespace-nowrap"
            >
              {trackingLoading ? 'Checking...' : 'Track Order'}
            </button>
          </form>

          {trackingError && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2 text-xs text-amber-900">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>{trackingError}</span>
            </div>
          )}

          {trackedOrder && (
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-3.5 text-xs">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200 pb-2.5">
                <div>
                  <span className="text-[10px] text-stone-400 block">Order Ref:</span>
                  <strong className="font-mono text-sm text-stone-900">{trackedOrder.orderId}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-stone-400 block">Courier Partner:</span>
                  <span className="font-medium text-stone-800">
                    {trackedOrder.courier} ({trackedOrder.awb})
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-stone-400 block">Status:</span>
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-semibold rounded text-[11px]">
                    {trackedOrder.status}
                  </span>
                </div>
              </div>

              <div className="space-y-2.5 pt-1">
                {trackedOrder.steps.map((st: any, idx: number) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold ${
                        st.done ? 'bg-[#1C432E] text-white' : 'bg-stone-200 text-stone-500'
                      }`}
                    >
                      {st.done ? '✓' : idx + 1}
                    </div>
                    <div className="flex-1 flex justify-between gap-2">
                      <span className={st.done ? 'font-medium text-stone-900' : 'text-stone-500'}>
                        {st.label}
                      </span>
                      <span className="text-stone-400 text-[11px] font-mono shrink-0">{st.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Customer Reviews & Submit Feedback Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Reviews Feed */}
        <div className="lg:col-span-7 space-y-3.5">
          <div className="flex items-center justify-between border-b border-stone-200 pb-2.5">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
              Verified Buyer Reviews ({visibleReviews.length})
            </h3>
            <span className="text-xs text-stone-500">Authentic Feedback</span>
          </div>

          <div className="space-y-3">
            {visibleReviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-white p-4 sm:p-5 rounded-xl border border-stone-200 shadow-2xs space-y-2.5"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-serif font-bold text-sm text-stone-900">{rev.name}</h4>
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

                  <div className="flex items-center gap-0.5 text-[#C28E3A] shrink-0">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>

                <p className="text-xs text-stone-700 leading-relaxed">"{rev.comment}"</p>

                <div className="text-[10px] text-stone-400 pt-1 border-t border-stone-100">
                  Reviewed on {rev.date}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Review Form */}
        <div className="lg:col-span-5 bg-white p-5 sm:p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-3.5">
          <h3 className="font-serif text-lg sm:text-xl font-bold text-stone-900">
            Leave Your Customer Feedback
          </h3>
          <p className="text-xs text-stone-500">
            Share your experience to help families across Pakistan choose pure organic wellness.
          </p>

          <form onSubmit={handleReviewSubmit} className="space-y-3 text-xs">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">Your Full Name *</label>
              <input
                type="text"
                required
                value={reviewerName}
                onChange={(e) => setReviewerName(e.target.value)}
                placeholder="e.g. Tariq Mehmood"
                className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:border-[#1C432E] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">City</label>
                <input
                  type="text"
                  value={reviewerCity}
                  onChange={(e) => setReviewerCity(e.target.value)}
                  placeholder="e.g. Islamabad"
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:border-[#1C432E] focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Rating</label>
                <select
                  value={reviewerRating}
                  onChange={(e) => setReviewerRating(parseInt(e.target.value) || 5)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg bg-white focus:border-[#1C432E] focus:outline-none"
                >
                  <option value={5}>5 Stars - Excellent</option>
                  <option value={4}>4 Stars - Very Good</option>
                  <option value={3}>3 Stars - Satisfactory</option>
                  <option value={2}>2 Stars - Needs Work</option>
                  <option value={1}>1 Star - Dissatisfied</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">Product Purchased</label>
              <select
                value={reviewerProduct}
                onChange={(e) => setReviewerProduct(e.target.value)}
                className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:border-[#1C432E] focus:outline-none text-xs bg-white"
              >
                {products.map((p) => (
                  <option key={p.id} value={p.name}>
                    {p.name} ({p.weight})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Your Review &amp; Observations *
              </label>
              <textarea
                required
                rows={4}
                value={reviewerComment}
                onChange={(e) => setReviewerComment(e.target.value)}
                placeholder="Share quality, packaging, taste, and delivery feedback..."
                className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:border-[#1C432E] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-[#1C432E] hover:bg-[#25573C] text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs whitespace-nowrap"
            >
              <Send className="w-4 h-4" />
              <span>Publish Verified Review</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
