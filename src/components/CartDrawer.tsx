import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { CartItem } from '../types';
import { COMPANY_INFO } from '../data/companyData';

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
  const [customerCity, setCustomerCity] = useState('Islamabad');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'ibft'>('cod');
  const [orderNumber, setOrderNumber] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const deliveryFee = subtotal >= 3500 || items.length === 0 ? 0 : 250;
  const grandTotal = subtotal + deliveryFee;

  const handleWhatsAppCheckout = () => {
    if (items.length === 0) return;

    const itemsSummary = items
      .map((item) => `• ${item.product.name} (Qty: ${item.quantity}) - PKR ${(item.product.price * item.quantity).toLocaleString()}`)
      .join('\n');

    const message = `Assalam-o-Alaikum Ammama Wellness Shelf (UCI: ${COMPANY_INFO.uci})\n\nI would like to place an order:\n${itemsSummary}\n\nSubtotal: PKR ${subtotal.toLocaleString()}\nDelivery: ${deliveryFee === 0 ? 'FREE' : `PKR ${deliveryFee}`}\nGrand Total: PKR ${grandTotal.toLocaleString()}\n\nMy details:\nName: ${customerName || '[Your Name]'}\nCity: ${customerCity}\nAddress: ${customerAddress || '[Delivery Address]'}\nPayment: Cash on Delivery (COD)`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encoded}`, '_blank');
    onShowToast('Connecting you with Ammama Wellness Shelf WhatsApp helpline...');
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !customerAddress) {
      alert('Please fill out all delivery fields');
      return;
    }

    const generatedId = `AMM-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(generatedId);

    // Save to local storage for Admin Panel
    try {
      const existing = localStorage.getItem('ammama_orders');
      const orderList = existing ? JSON.parse(existing) : [];
      const newOrder = {
        id: generatedId,
        customerName,
        customerPhone,
        customerCity,
        customerAddress,
        items: items.map((i) => ({
          productName: i.product.name,
          quantity: i.quantity,
          price: i.product.price,
        })),
        subtotal,
        deliveryFee,
        grandTotal,
        paymentMode: paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : 'Direct Bank Transfer (IBFT)',
        status: 'Pending',
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      };
      localStorage.setItem('ammama_orders', JSON.stringify([newOrder, ...orderList]));
    } catch (err) {
      console.error('Could not save order:', err);
    }

    setCheckoutStep('success');
    onClearCart();
    onShowToast(`Order #${generatedId} booked successfully!`);
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
              className="p-2 text-stone-500 hover:text-stone-800 rounded-md transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {checkoutStep === 'cart' && (
              <>
                {items.length === 0 ? (
                  <div className="py-16 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-stone-100 mx-auto flex items-center justify-center text-stone-400">
                      <ShieldCheck className="w-8 h-8" />
                    </div>
                    <p className="text-stone-600 font-medium">Your shopping cart is empty.</p>
                    <p className="text-xs text-stone-500">
                      Explore our flagship Terra Herbs-8 and pure organic products.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div
                        key={item.product.id}
                        className="flex gap-4 p-3 bg-white rounded-lg border border-stone-200 shadow-2xs"
                      >
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-18 h-18 object-cover rounded-md bg-stone-100 shrink-0 border border-stone-100"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-serif font-bold text-sm text-stone-900 truncate">
                            {item.product.name}
                          </h4>
                          <p className="text-xs text-stone-500">{item.product.weight}</p>
                          <p className="text-sm font-semibold text-[#1C432E] mt-1">
                            PKR {item.product.price.toLocaleString()}
                          </p>

                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center border border-stone-200 rounded-md bg-stone-50">
                              <button
                                onClick={() =>
                                  onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))
                                }
                                className="px-2 py-0.5 text-stone-600 hover:text-stone-900"
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
                                className="px-2 py-0.5 text-stone-600 hover:text-stone-900"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <button
                              onClick={() => onRemoveItem(item.product.id)}
                              className="text-stone-400 hover:text-rose-600 transition-colors p-1"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Subtotal & Free Delivery Progress */}
                {items.length > 0 && (
                  <div className="p-4 bg-[#F2EDE4] rounded-lg border border-[#E2D8C6] space-y-2 text-xs text-stone-700">
                    <div className="flex justify-between font-medium">
                      <span>Products Subtotal</span>
                      <span className="font-mono text-stone-900 font-semibold">
                        PKR {subtotal.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Fee (Nationwide)</span>
                      <span>{deliveryFee === 0 ? <strong className="text-emerald-700">FREE</strong> : `PKR ${deliveryFee}`}</span>
                    </div>
                    {subtotal < 3500 && (
                      <p className="text-[11px] text-stone-600 pt-1 border-t border-[#E2D8C6]">
                        Add <strong>PKR {(3500 - subtotal).toLocaleString()}</strong> more to get Free Nationwide Delivery!
                      </p>
                    )}
                  </div>
                )}
              </>
            )}

            {checkoutStep === 'checkout' && (
              <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-4">
                <div className="p-3 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-md text-xs">
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
                    placeholder="e.g. Tariq Mehmood"
                    className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-md focus:border-[#1C432E] focus:outline-none"
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
                    placeholder="0300 1234567"
                    className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-md focus:border-[#1C432E] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      City *
                    </label>
                    <select
                      value={customerCity}
                      onChange={(e) => setCustomerCity(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-md focus:border-[#1C432E] focus:outline-none"
                    >
                      <option value="Islamabad">Islamabad</option>
                      <option value="Rawalpindi">Rawalpindi</option>
                      <option value="Lahore">Lahore</option>
                      <option value="Karachi">Karachi</option>
                      <option value="Peshawar">Peshawar</option>
                      <option value="Faisalabad">Faisalabad</option>
                      <option value="Multan">Multan</option>
                      <option value="Quetta">Quetta</option>
                      <option value="Other">Other City</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Payment Mode
                    </label>
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value as 'cod' | 'ibft')}
                      className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-md focus:border-[#1C432E] focus:outline-none"
                    >
                      <option value="cod">Cash on Delivery (COD)</option>
                      <option value="ibft">Direct Bank Transfer (IBFT)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Complete Street Address *
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    placeholder="House / Apartment #, Street #, Sector / Area"
                    className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-md focus:border-[#1C432E] focus:outline-none"
                  />
                </div>

                <div className="p-3 bg-stone-100 rounded-md text-xs space-y-1">
                  <div className="flex justify-between font-semibold text-stone-900">
                    <span>Payable on Delivery:</span>
                    <span className="font-mono text-sm text-[#1C432E]">
                      PKR {grandTotal.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-500">
                    Inspected & packed in accordance with PSQCA food packaging norms.
                  </p>
                </div>
              </form>
            )}

            {checkoutStep === 'success' && (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#1C432E] mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-serif text-xl font-bold text-stone-900">
                  Order Successfully Booked!
                </h3>
                <p className="text-xs text-stone-600">
                  Thank you, <strong>{customerName}</strong>. Your order has been registered in the AMMAMA Foods dispatch queue.
                </p>
                <div className="p-4 bg-white border border-stone-200 rounded-lg text-left text-xs space-y-1.5">
                  <p className="text-stone-500">
                    Order Reference:{' '}
                    <strong className="font-mono text-stone-900 text-sm">{orderNumber}</strong>
                  </p>
                  <p className="text-stone-500">
                    Delivery City: <strong className="text-stone-800">{customerCity}</strong>
                  </p>
                  <p className="text-stone-500">
                    Payment: <strong className="text-stone-800">Cash on Delivery (PKR {grandTotal.toLocaleString()})</strong>
                  </p>
                  <p className="text-stone-500">
                    Corporate Entity: <strong>AMMAMA FOODS (PVT.) LTD. (UCI 0303557)</strong>
                  </p>
                </div>
                <p className="text-[11px] text-stone-500">
                  Our dispatch coordinator will contact your number ({customerPhone}) prior to courier handover.
                </p>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="p-6 border-t border-stone-200 bg-white space-y-3">
            {checkoutStep === 'cart' && items.length > 0 && (
              <>
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-sm text-stone-600">Estimated Total</span>
                  <span className="font-serif text-xl font-bold text-[#1C432E]">
                    PKR {grandTotal.toLocaleString()}
                  </span>
                </div>

                <button
                  onClick={() => setCheckoutStep('checkout')}
                  className="w-full py-3 px-4 bg-[#1C432E] text-white rounded-md font-semibold text-sm hover:bg-[#25573C] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  Proceed to Checkout <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={handleWhatsAppCheckout}
                  className="w-full py-2.5 px-4 bg-[#25D366] text-white rounded-md font-semibold text-xs hover:bg-[#1EBE5D] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  Order Directly via WhatsApp
                </button>
              </>
            )}

            {checkoutStep === 'checkout' && (
              <div className="space-y-2">
                <button
                  type="submit"
                  form="checkout-form"
                  className="w-full py-3 px-4 bg-[#1C432E] text-white rounded-md font-semibold text-sm hover:bg-[#25573C] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  Confirm Cash on Delivery Order
                </button>
                <button
                  type="button"
                  onClick={() => setCheckoutStep('cart')}
                  className="w-full py-2 text-xs text-stone-600 hover:text-stone-900 font-medium"
                >
                  Back to Cart
                </button>
              </div>
            )}

            {checkoutStep === 'success' && (
              <button
                onClick={() => {
                  setCheckoutStep('cart');
                  onClose();
                }}
                className="w-full py-3 px-4 bg-[#1C432E] text-white rounded-md font-semibold text-sm hover:bg-[#25573C] transition-colors"
              >
                Continue Browsing
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
