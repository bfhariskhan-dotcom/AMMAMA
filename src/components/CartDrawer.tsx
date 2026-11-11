import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, CheckCircle2, MessageCircle } from 'lucide-react';
import { CartItem, AdminOrder } from '../types';
import { COMPANY_INFO } from '../data/companyData';
import { syncOrderToFirestore } from '../lib/firebase';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onShowToast: (message: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onShowToast,
}) => {
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerCity, setCustomerCity] = useState('Peshawar');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'ibft'>('cod');
  const [orderNumber, setOrderNumber] = useState('');

  if (!isOpen) return null;

  // Calculate pricing based on variants if selected
  const subtotal = items.reduce((sum, item) => {
    const unitPrice = item.selectedVariant ? item.selectedVariant.price : item.product.price;
    return sum + unitPrice * item.quantity;
  }, 0);

  // Check if all items qualify for Free delivery
  const allFreeDelivery = items.length > 0 && items.every((i) => {
    const itemDelivery = i.selectedVariant?.delivery || i.product.delivery;
    return itemDelivery === 'Free';
  });

  const deliveryFee = allFreeDelivery || subtotal >= 5000 || items.length === 0 ? 0 : 200;
  const grandTotal = subtotal + deliveryFee;

  const handleWhatsAppCheckout = () => {
    if (items.length === 0) return;

    const itemsSummary = items
      .map((item) => {
        const unitPrice = item.selectedVariant ? item.selectedVariant.price : item.product.price;
        const spec = item.selectedVariant ? ` (${item.selectedVariant.packagingType} · ${item.selectedVariant.weight})` : ` (${item.product.weight})`;
        return `• ${item.product.name}${spec} (Qty: ${item.quantity}) - PKR ${(unitPrice * item.quantity).toLocaleString()}`;
      })
      .join('\n');

    const message = `Assalam-o-Alaikum Ammama Wellness Shelf (SECP UCI: ${COMPANY_INFO.uci})\n\nI would like to place an order:\n${itemsSummary}\n\nSubtotal: PKR ${subtotal.toLocaleString()}\nDelivery: ${deliveryFee === 0 ? 'FREE' : `PKR ${deliveryFee}`}\nGrand Total: PKR ${grandTotal.toLocaleString()}\n\nMy details:\nName: ${customerName || '[Your Name]'}\nCity: ${customerCity}\nAddress: ${customerAddress || '[Delivery Address]'}\nPayment: Cash on Delivery (COD)`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encoded}`, '_blank');
    onShowToast('Connecting you with Ammama Wellness Shelf WhatsApp helpline...');
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !customerAddress) {
      onShowToast('Please fill out all required delivery fields');
      return;
    }

    const generatedId = `AMM-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(generatedId);

    const newOrder: AdminOrder = {
      id: generatedId,
      customerName,
      customerPhone,
      customerCity,
      customerAddress,
      items: items.map((i) => ({
        productName: i.product.name,
        packagingType: i.selectedVariant?.packagingType || i.product.packagingType,
        weight: i.selectedVariant?.weight || i.product.weight,
        quantity: i.quantity,
        price: i.selectedVariant ? i.selectedVariant.price : i.product.price,
      })),
      subtotal,
      deliveryFee,
      grandTotal,
      paymentMode: paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : 'Direct Bank Transfer (IBFT)',
      status: 'Pending',
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    };

    // Save to local storage
    try {
      const existing = localStorage.getItem('ammama_orders');
      const orderList = existing ? JSON.parse(existing) : [];
      localStorage.setItem('ammama_orders', JSON.stringify([newOrder, ...orderList]));
    } catch (err) {
      console.error('Could not save order locally:', err);
    }

    // Sync to Firebase Firestore live
    syncOrderToFirestore(newOrder);

    setCheckoutStep('success');
    onClearCart();
    onShowToast(`Order #${generatedId} placed and synced to Firebase!`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-900/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] shadow-2xl flex flex-col border-l border-stone-200">
          {/* Header */}
          <div className="px-6 py-5 border-b border-stone-200 flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <span className="font-serif text-lg font-bold text-[#1C432E]">
                {checkoutStep === 'cart'
                  ? `Your Cart (${items.length})`
                  : checkoutStep === 'checkout'
                  ? 'Complete Delivery Order'
                  : 'Order Confirmation'}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-stone-500 hover:text-stone-800 rounded-md transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {checkoutStep === 'cart' && (
              <>
                {items.length === 0 ? (
                  <div className="py-16 text-center space-y-3">
                    <p className="text-stone-500 text-sm">Your shopping cart is currently empty.</p>
                    <button
                      onClick={onClose}
                      className="px-4 py-2 bg-[#1C432E] text-white text-xs font-semibold uppercase tracking-wider rounded-md hover:bg-[#25573C] cursor-pointer"
                    >
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.map((item, idx) => {
                      const unitPrice = item.selectedVariant ? item.selectedVariant.price : item.product.price;
                      const spec = item.selectedVariant
                        ? `${item.selectedVariant.packagingType} · ${item.selectedVariant.weight}`
                        : item.product.weight;

                      return (
                        <div
                          key={`${item.product.id}-${idx}`}
                          className="flex gap-4 p-3 bg-white rounded-xl border border-stone-200 shadow-2xs"
                        >
                          <div className="w-16 h-16 bg-[#F4EFE6] rounded-lg overflow-hidden flex items-center justify-center p-1 shrink-0">
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="w-full h-full object-contain"
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <h4 className="font-serif font-bold text-sm text-stone-900 truncate">
                              {item.product.name}
                            </h4>
                            <p className="text-[11px] text-[#C28E3A] font-semibold">{spec}</p>
                            <p className="text-xs font-bold text-[#1C432E] mt-0.5">
                              PKR {unitPrice.toLocaleString()}
                            </p>

                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center border border-stone-200 rounded-md bg-stone-50">
                                <button
                                  onClick={() =>
                                    onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))
                                  }
                                  className="px-2 py-0.5 text-stone-600 hover:text-stone-900 cursor-pointer"
                                  aria-label="Decrease quantity"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="px-2 text-xs font-mono font-medium">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    onUpdateQuantity(item.product.id, item.quantity + 1)
                                  }
                                  className="px-2 py-0.5 text-stone-600 hover:text-stone-900 cursor-pointer"
                                  aria-label="Increase quantity"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>

                              <button
                                onClick={() => onRemoveItem(item.product.id)}
                                className="text-stone-400 hover:text-rose-600 transition-colors p-1 cursor-pointer"
                                aria-label="Remove item"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Subtotal & Free Delivery Progress */}
                {items.length > 0 && (
                  <div className="p-4 bg-[#F2EDE4] rounded-xl border border-[#E2D8C6] space-y-2 text-xs text-stone-700">
                    <div className="flex justify-between font-medium">
                      <span>Products Subtotal</span>
                      <span className="font-mono text-stone-900 font-semibold">
                        PKR {subtotal.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Nationwide Delivery</span>
                      <span>
                        {deliveryFee === 0 ? (
                          <strong className="text-emerald-700 font-bold">FREE</strong>
                        ) : (
                          `PKR ${deliveryFee}`
                        )}
                      </span>
                    </div>
                    {deliveryFee > 0 && subtotal < 5000 && (
                      <p className="text-[11px] text-stone-600 pt-1 border-t border-[#E2D8C6]">
                        Add <strong>PKR {(5000 - subtotal).toLocaleString()}</strong> more for Free Nationwide Delivery!
                      </p>
                    )}
                  </div>
                )}
              </>
            )}

            {checkoutStep === 'checkout' && (
              <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-4">
                <div className="p-3 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-xl text-xs">
                  Pay securely via <strong>Cash on Delivery (COD)</strong> upon receiving your sealed parcel anywhere in Pakistan.
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Muhammad Bilal"
                    className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-xl focus:border-[#1C432E] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    WhatsApp / Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="0314-8973162"
                    className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-xl focus:border-[#1C432E] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    City *
                  </label>
                  <select
                    value={customerCity}
                    onChange={(e) => setCustomerCity(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-xl focus:border-[#1C432E] focus:outline-none"
                  >
                    <option value="Peshawar">Peshawar</option>
                    <option value="Islamabad">Islamabad</option>
                    <option value="Rawalpindi">Rawalpindi</option>
                    <option value="Lahore">Lahore</option>
                    <option value="Karachi">Karachi</option>
                    <option value="Faisalabad">Faisalabad</option>
                    <option value="Multan">Multan</option>
                    <option value="Quetta">Quetta</option>
                    <option value="Other City">Other Nationwide Destination</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Complete Street Address *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    placeholder="House/Shop No, Street, Sector, Landmark..."
                    className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-xl focus:border-[#1C432E] focus:outline-none"
                  />
                </div>

                <div className="space-y-2 pt-2 border-t border-stone-200">
                  <span className="block text-xs font-semibold text-stone-700">
                    Payment Method
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cod')}
                      className={`p-2.5 rounded-xl border text-center font-semibold cursor-pointer ${
                        paymentMethod === 'cod'
                          ? 'border-[#1C432E] bg-[#1C432E]/10 text-[#1C432E]'
                          : 'border-stone-200 bg-white text-stone-600'
                      }`}
                    >
                      Cash on Delivery
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('ibft')}
                      className={`p-2.5 rounded-xl border text-center font-semibold cursor-pointer ${
                        paymentMethod === 'ibft'
                          ? 'border-[#1C432E] bg-[#1C432E]/10 text-[#1C432E]'
                          : 'border-stone-200 bg-white text-stone-600'
                      }`}
                    >
                      Bank Transfer
                    </button>
                  </div>
                </div>
              </form>
            )}

            {checkoutStep === 'success' && (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif text-xl font-bold text-stone-900">
                    Order Booked Successfully!
                  </h3>
                  <p className="text-xs text-stone-500">
                    Your tracking reference ID is:
                  </p>
                  <div className="inline-block px-3 py-1 bg-stone-100 border border-stone-300 rounded font-mono font-bold text-sm text-[#1C432E]">
                    {orderNumber}
                  </div>
                </div>

                <p className="text-xs text-stone-600 max-w-xs mx-auto leading-relaxed">
                  Our dispatch team will verify your parcel with PSQCA batch lab testing and dispatch via courier. You will receive an SMS confirmation shortly.
                </p>

                <div className="pt-4 flex flex-col gap-2">
                  <button
                    onClick={() => {
                      setCheckoutStep('cart');
                      onClose();
                    }}
                    className="w-full py-2.5 bg-[#1C432E] text-white text-xs font-semibold uppercase tracking-wider rounded-xl cursor-pointer"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          {items.length > 0 && checkoutStep !== 'success' && (
            <div className="p-6 bg-white border-t border-stone-200 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-stone-600">Total Payable:</span>
                <span className="font-serif font-bold text-xl text-[#1C432E]">
                  PKR {grandTotal.toLocaleString()}
                </span>
              </div>

              {checkoutStep === 'cart' ? (
                <div className="space-y-2">
                  <button
                    onClick={() => setCheckoutStep('checkout')}
                    className="w-full py-3.5 px-4 bg-[#1C432E] hover:bg-[#25573C] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    <span>Proceed to Delivery Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleWhatsAppCheckout}
                    className="w-full py-2.5 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Quick Order on WhatsApp</span>
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setCheckoutStep('cart')}
                    className="py-3 px-4 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    form="checkout-form"
                    className="flex-1 py-3 px-4 bg-[#1C432E] hover:bg-[#25573C] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer shadow-xs"
                  >
                    Confirm & Place Order
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
