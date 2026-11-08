import React, { useState, useEffect } from 'react';
import {
  Package,
  ShoppingBag,
  TrendingUp,
  Truck,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  Download,
  Printer,
  Plus,
  Trash2,
  Edit2,
  Save,
  X,
  Search,
  Filter,
  Eye,
  ShieldCheck,
  Star,
  MessageCircle,
  Lock,
  Unlock,
} from 'lucide-react';
import { Product, AdminOrder, ReviewItem } from '../types';
import { PRODUCTS, REVIEWS, COMPANY_INFO } from '../data/companyData';

interface AdminPageProps {
  onShowToast: (msg: string) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ onShowToast }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [activeAdminTab, setActiveAdminTab] = useState<'orders' | 'inventory' | 'reviews' | 'compliance'>('orders');

  // Orders State (stored in localStorage)
  const [orders, setOrders] = useState<AdminOrder[]>(() => {
    try {
      const saved = localStorage.getItem('ammama_orders');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    // Default initial mock orders if none exist
    return [
      {
        id: 'AMM-918234',
        customerName: 'Muhammad Bilal',
        customerPhone: '0301-8472911',
        customerCity: 'Lahore',
        customerAddress: 'House 42-B, Sector Y, Phase 3, DHA',
        items: [
          { productName: 'Terra Herbs-8 (200g)', quantity: 2, price: 1950 },
          { productName: 'Wild Potohar Sidr Honey (500g)', quantity: 1, price: 2450 },
        ],
        subtotal: 6350,
        deliveryFee: 0,
        grandTotal: 6350,
        paymentMode: 'Cash on Delivery (COD)',
        status: 'Dispatched',
        date: '08 Nov 2026',
        courierTracking: 'TCS-88192031',
      },
      {
        id: 'AMM-918235',
        customerName: 'Dr. Sana Tariq',
        customerPhone: '0321-4491023',
        customerCity: 'Islamabad',
        customerAddress: 'Apartment 402, Executive Heights, F-11/1',
        items: [{ productName: 'Terra Herbs-8 (200g)', quantity: 1, price: 1950 }],
        subtotal: 1950,
        deliveryFee: 250,
        grandTotal: 2200,
        paymentMode: 'Cash on Delivery (COD)',
        status: 'Pending',
        date: '08 Nov 2026',
      },
      {
        id: 'AMM-918230',
        customerName: 'Kamran Ashraf',
        customerPhone: '0333-9182741',
        customerCity: 'Karachi',
        customerAddress: 'Plot 18-C, 7th Commercial Lane, Zamzama, Clifton',
        items: [
          { productName: 'A2 Vedic Bilona Desi Ghee (450g)', quantity: 2, price: 2850 },
          { productName: 'Organic Moringa Powder (150g)', quantity: 1, price: 1250 },
        ],
        subtotal: 6950,
        deliveryFee: 0,
        grandTotal: 6950,
        paymentMode: 'Direct Bank Transfer (IBFT)',
        status: 'Delivered',
        date: '06 Nov 2026',
        courierTracking: 'LEO-44918201',
      },
    ];
  });

  // Products State
  const [productList, setProductList] = useState<Product[]>(PRODUCTS);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newPrice, setNewPrice] = useState<number>(0);

  // Reviews State
  const [reviewsList, setReviewsList] = useState<ReviewItem[]>(REVIEWS);

  // Filter state for orders
  const [orderFilter, setOrderFilter] = useState<string>('all');
  const [orderSearch, setOrderSearch] = useState<string>('');

  // Selected Order for Receipt / Details Modal
  const [receiptOrder, setReceiptOrder] = useState<AdminOrder | null>(null);

  // Sync orders to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ammama_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  // Order Status update
  const handleUpdateStatus = (orderId: string, newStatus: AdminOrder['status']) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          return {
            ...ord,
            status: newStatus,
            courierTracking:
              newStatus === 'Dispatched' && !ord.courierTracking
                ? `TCS-${Math.floor(10000000 + Math.random() * 90000000)}`
                : ord.courierTracking,
          };
        }
        return ord;
      })
    );
    onShowToast(`Order ${orderId} updated to "${newStatus}"`);
  };

  // Delete Order
  const handleDeleteOrder = (orderId: string) => {
    if (window.confirm(`Delete order ${orderId}?`)) {
      setOrders((prev) => prev.filter((o) => o.id !== orderId));
      onShowToast(`Order ${orderId} removed.`);
    }
  };

  // Add Simulated Order for testing
  const handleAddSampleOrder = () => {
    const cities = ['Rawalpindi', 'Peshawar', 'Faisalabad', 'Multan', 'Quetta', 'Sialkot'];
    const names = ['Hamza Zubair', 'Zahid Qureshi', 'Farhan Ali', 'Amina Begum', 'Usman Javed'];
    const randomCity = cities[Math.floor(Math.random() * cities.length)];
    const randomName = names[Math.floor(Math.random() * names.length)];
    const newId = `AMM-${Math.floor(100000 + Math.random() * 900000)}`;

    const newOrd: AdminOrder = {
      id: newId,
      customerName: randomName,
      customerPhone: `030${Math.floor(Math.random() * 9)}-${Math.floor(1000000 + Math.random() * 9000000)}`,
      customerCity: randomCity,
      customerAddress: `Street 14, Sector C, ${randomCity}`,
      items: [{ productName: 'Terra Herbs-8 (200g)', quantity: 1, price: 1950 }],
      subtotal: 1950,
      deliveryFee: 250,
      grandTotal: 2200,
      paymentMode: 'Cash on Delivery (COD)',
      status: 'Pending',
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    };

    setOrders([newOrd, ...orders]);
    onShowToast(`Test Order ${newId} created!`);
  };

  // WhatsApp Customer Dispatch Message (strictly NO phone number in button text)
  const handleWhatsAppDispatch = (order: AdminOrder) => {
    const text = `Assalam-o-Alaikum ${order.customerName},\nThis is AMMAMA Foods (SECP UCI: ${COMPANY_INFO.uci}) regarding your order #${order.id}.\nStatus: ${order.status}\nItems: ${order.items.map((i) => `${i.productName} x${i.quantity}`).join(', ')}\nTotal: PKR ${order.grandTotal.toLocaleString()} (${order.paymentMode})\nCourier: ${order.courierTracking || 'TCS Express Pakistan'}\nThank you for choosing pure botanical wellness!`;
    const cleanPhone = order.customerPhone.replace(/[^0-9]/g, '');
    const waPhone = cleanPhone.startsWith('0') ? `92${cleanPhone.slice(1)}` : cleanPhone;
    window.open(`https://wa.me/${waPhone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  // Export Orders as CSV
  const handleExportCSV = () => {
    const headers = ['Order ID', 'Date', 'Customer Name', 'Phone', 'City', 'Address', 'Items', 'Grand Total (PKR)', 'Payment', 'Status', 'Tracking'];
    const rows = orders.map((o) => [
      o.id,
      o.date,
      `"${o.customerName}"`,
      o.customerPhone,
      o.customerCity,
      `"${o.customerAddress}"`,
      `"${o.items.map((i) => `${i.productName} (${i.quantity})`).join('; ')}"`,
      o.grandTotal,
      `"${o.paymentMode}"`,
      o.status,
      o.courierTracking || 'N/A',
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `AMMAMA_Orders_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onShowToast('Orders exported to CSV file.');
  };

  // Filtered orders
  const filteredOrders = orders.filter((o) => {
    const matchesFilter = orderFilter === 'all' || o.status.toLowerCase() === orderFilter.toLowerCase();
    const matchesSearch =
      o.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customerName.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customerCity.toLowerCase().includes(orderSearch.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Inventory toggle stock
  const handleToggleStock = (productId: string) => {
    setProductList((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, inStock: !p.inStock } : p))
    );
    onShowToast('Product inventory status updated.');
  };

  // Inventory update price
  const handleSavePrice = (productId: string) => {
    if (newPrice > 0) {
      setProductList((prev) =>
        prev.map((p) => (p.id === productId ? { ...p, price: newPrice } : p))
      );
      setEditingProduct(null);
      onShowToast(`Price updated to PKR ${newPrice.toLocaleString()}`);
    }
  };

  // KPI Calculations
  const totalRevenue = orders
    .filter((o) => o.status !== 'Cancelled')
    .reduce((sum, o) => sum + o.grandTotal, 0);
  const pendingOrdersCount = orders.filter((o) => o.status === 'Pending').length;
  const dispatchedCount = orders.filter((o) => o.status === 'Dispatched').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 text-left">
      {/* Admin Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C28E3A]">
            <ShieldCheck className="w-4 h-4 text-[#1C432E]" />
            <span>Store Command & Operations</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#122A1C] mt-1">
            AMMAMA Foods Admin Portal
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            SECP Corporate UCI: <strong>0303557</strong> · Real-time order dispatch, inventory & customer review moderation.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleAddSampleOrder}
            className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Sample Order</span>
          </button>
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 bg-[#1C432E] hover:bg-[#25573C] text-white text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-xs text-stone-500">
            <span>Total Gross Revenue</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="font-serif text-2xl font-bold text-[#1C432E]">
            PKR {totalRevenue.toLocaleString()}
          </div>
          <span className="text-[11px] text-stone-400">From {orders.length} orders recorded</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-xs text-stone-500">
            <span>Pending Verification</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="font-serif text-2xl font-bold text-amber-700">
            {pendingOrdersCount} Orders
          </div>
          <span className="text-[11px] text-stone-400">Awaiting lab / dispatch clearance</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-xs text-stone-500">
            <span>In Courier Transit</span>
            <Truck className="w-4 h-4 text-[#1C432E]" />
          </div>
          <div className="font-serif text-2xl font-bold text-stone-900">
            {dispatchedCount} Dispatched
          </div>
          <span className="text-[11px] text-stone-400">With TCS & Leopards couriers</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-xs text-stone-500">
            <span>Customer Satisfaction</span>
            <Star className="w-4 h-4 text-[#C28E3A] fill-current" />
          </div>
          <div className="font-serif text-2xl font-bold text-[#1C432E]">
            4.8 / 5.0
          </div>
          <span className="text-[11px] text-emerald-700 font-medium">Goal: ≥ 4.5 Target Achieved</span>
        </div>
      </div>

      {/* Main Admin Tabs */}
      <div className="flex border-b border-stone-200 gap-6 text-sm font-semibold">
        <button
          onClick={() => setActiveAdminTab('orders')}
          className={`pb-3 transition-colors cursor-pointer flex items-center gap-2 ${
            activeAdminTab === 'orders'
              ? 'border-b-2 border-[#1C432E] text-[#1C432E]'
              : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Orders Management ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('inventory')}
          className={`pb-3 transition-colors cursor-pointer flex items-center gap-2 ${
            activeAdminTab === 'inventory'
              ? 'border-b-2 border-[#1C432E] text-[#1C432E]'
              : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Product Inventory ({productList.length})</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('reviews')}
          className={`pb-3 transition-colors cursor-pointer flex items-center gap-2 ${
            activeAdminTab === 'reviews'
              ? 'border-b-2 border-[#1C432E] text-[#1C432E]'
              : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          <Star className="w-4 h-4" />
          <span>Customer Reviews ({reviewsList.length})</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('compliance')}
          className={`pb-3 transition-colors cursor-pointer flex items-center gap-2 ${
            activeAdminTab === 'compliance'
              ? 'border-b-2 border-[#1C432E] text-[#1C432E]'
              : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>SECP Compliance Logs</span>
        </button>
      </div>

      {/* TAB 1: ORDERS MANAGEMENT */}
      {activeAdminTab === 'orders' && (
        <div className="space-y-4">
          {/* Controls: Search and Status Filters */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-stone-200">
            <div className="flex items-center gap-2 flex-1 max-w-sm">
              <Search className="w-4 h-4 text-stone-400 shrink-0" />
              <input
                type="text"
                value={orderSearch}
                onChange={(e) => setOrderSearch(e.target.value)}
                placeholder="Search by Order ID, customer, city..."
                className="w-full text-xs bg-transparent focus:outline-none"
              />
            </div>

            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              {['all', 'Pending', 'QC Verified', 'Dispatched', 'Delivered', 'Cancelled'].map((st) => (
                <button
                  key={st}
                  onClick={() => setOrderFilter(st)}
                  className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                    orderFilter === st
                      ? 'bg-[#1C432E] text-white shadow-2xs'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {st === 'all' ? 'All Orders' : st}
                </button>
              ))}
            </div>
          </div>

          {/* Orders Table */}
          <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-stone-700">
                <thead className="bg-[#FAF8F5] text-stone-600 font-bold uppercase tracking-wider text-[10px] border-b border-stone-200">
                  <tr>
                    <th className="py-3.5 px-4">Order ID & Date</th>
                    <th className="py-3.5 px-4">Customer Details</th>
                    <th className="py-3.5 px-4">Items Ordered</th>
                    <th className="py-3.5 px-4">Payable Amount</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-stone-500">
                        No orders match the current filter.
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-stone-50/70 transition-colors">
                        <td className="py-3.5 px-4 align-top">
                          <span className="font-mono font-bold text-stone-900 block text-xs">
                            {ord.id}
                          </span>
                          <span className="text-[11px] text-stone-400">{ord.date}</span>
                          {ord.courierTracking && (
                            <span className="text-[10px] text-emerald-800 font-mono block mt-1">
                              Track: {ord.courierTracking}
                            </span>
                          )}
                        </td>

                        <td className="py-3.5 px-4 align-top">
                          <strong className="text-stone-900 block">{ord.customerName}</strong>
                          <span className="font-mono text-stone-500 block text-[11px]">{ord.customerPhone}</span>
                          <span className="text-stone-400 text-[11px] block">{ord.customerCity}</span>
                        </td>

                        <td className="py-3.5 px-4 align-top max-w-xs">
                          {ord.items.map((item, idx) => (
                            <div key={idx} className="truncate text-stone-800 text-[11px]">
                              • {item.productName} × <strong>{item.quantity}</strong>
                            </div>
                          ))}
                        </td>

                        <td className="py-3.5 px-4 align-top">
                          <span className="font-mono font-bold text-[#1C432E] text-sm block">
                            PKR {ord.grandTotal.toLocaleString()}
                          </span>
                          <span className="text-[10px] text-stone-500">{ord.paymentMode}</span>
                        </td>

                        <td className="py-3.5 px-4 align-top">
                          <select
                            value={ord.status}
                            onChange={(e) =>
                              handleUpdateStatus(ord.id, e.target.value as AdminOrder['status'])
                            }
                            className={`px-2 py-1 rounded text-[11px] font-semibold border cursor-pointer ${
                              ord.status === 'Delivered'
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                : ord.status === 'Dispatched'
                                ? 'bg-blue-50 text-blue-800 border-blue-200'
                                : ord.status === 'QC Verified'
                                ? 'bg-purple-50 text-purple-800 border-purple-200'
                                : ord.status === 'Cancelled'
                                ? 'bg-rose-50 text-rose-800 border-rose-200'
                                : 'bg-amber-50 text-amber-800 border-amber-200'
                            }`}
                          >
                            <option value="Pending">Pending</option>
                            <option value="QC Verified">QC Verified</option>
                            <option value="Dispatched">Dispatched</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>

                        <td className="py-3.5 px-4 align-top text-right space-x-1 whitespace-nowrap">
                          {/* Direct WhatsApp notify - strictly NO phone number in button text */}
                          <button
                            onClick={() => handleWhatsAppDispatch(ord)}
                            className="p-1.5 text-emerald-700 hover:bg-emerald-50 rounded"
                            title="Send dispatch notification on WhatsApp"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => setReceiptOrder(ord)}
                            className="p-1.5 text-stone-600 hover:bg-stone-100 rounded"
                            title="View / Print Order Receipt"
                          >
                            <Printer className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => handleDeleteOrder(ord.id)}
                            className="p-1.5 text-stone-400 hover:text-rose-600 rounded"
                            title="Delete order"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: INVENTORY & PRODUCTS */}
      {activeAdminTab === 'inventory' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg font-bold text-stone-900">
              Active Catalog Inventory
            </h3>
            <span className="text-xs text-stone-500">Live prices in PKR</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {productList.map((prod) => (
              <div
                key={prod.id}
                className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs flex gap-4 items-center"
              >
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="w-20 h-20 object-cover rounded-lg bg-stone-100 shrink-0 border border-stone-200"
                />

                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#C28E3A]">
                      {prod.category} · {prod.weight}
                    </span>
                    <button
                      onClick={() => handleToggleStock(prod.id)}
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold cursor-pointer ${
                        prod.inStock
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {prod.inStock ? 'In Stock' : 'Out of Stock'}
                    </button>
                  </div>

                  <h4 className="font-serif font-bold text-stone-900 truncate">{prod.name}</h4>

                  {/* Price Editor */}
                  {editingProduct?.id === prod.id ? (
                    <div className="flex items-center gap-2 pt-1">
                      <span className="text-xs font-mono">PKR</span>
                      <input
                        type="number"
                        value={newPrice}
                        onChange={(e) => setNewPrice(parseInt(e.target.value) || 0)}
                        className="w-24 px-2 py-0.5 border border-stone-300 rounded text-xs"
                      />
                      <button
                        onClick={() => handleSavePrice(prod.id)}
                        className="p-1 bg-[#1C432E] text-white rounded hover:bg-[#25573C]"
                      >
                        <Save className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setEditingProduct(null)}
                        className="p-1 text-stone-500 hover:text-stone-800"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between pt-1">
                      <span className="font-serif text-base font-bold text-[#1C432E]">
                        PKR {prod.price.toLocaleString()}
                      </span>
                      <button
                        onClick={() => {
                          setEditingProduct(prod);
                          setNewPrice(prod.price);
                        }}
                        className="text-xs text-stone-500 hover:text-[#1C432E] flex items-center gap-1 cursor-pointer"
                      >
                        <Edit2 className="w-3 h-3" />
                        <span>Edit Price</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: REVIEWS MODERATION */}
      {activeAdminTab === 'reviews' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg font-bold text-stone-900">
              Customer Feedback & Moderation
            </h3>
            <span className="text-xs text-stone-500">Moderating public testimonials</span>
          </div>

          <div className="space-y-3">
            {reviewsList.map((rev) => (
              <div
                key={rev.id}
                className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs flex flex-col sm:flex-row sm:items-start justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <strong className="text-stone-900 text-sm">{rev.name}</strong>
                    <span className="text-stone-400 text-xs">({rev.city})</span>
                    <span className="text-xs text-[#1C432E] font-medium">• {rev.product}</span>
                  </div>

                  <div className="flex items-center gap-0.5 text-[#C28E3A]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>

                  <p className="text-xs text-stone-700 leading-relaxed italic">
                    "{rev.comment}"
                  </p>
                  <span className="text-[10px] text-stone-400 block">{rev.date}</span>
                </div>

                <div className="flex sm:flex-col items-center gap-2 shrink-0">
                  <span className="text-[10px] font-semibold px-2 py-0.5 bg-emerald-50 text-emerald-800 rounded">
                    Approved
                  </span>
                  <button
                    onClick={() => {
                      setReviewsList((prev) => prev.filter((r) => r.id !== rev.id));
                      onShowToast('Review removed from public list.');
                    }}
                    className="p-1 text-stone-400 hover:text-rose-600 rounded"
                    title="Remove review"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: COMPLIANCE LOGS */}
      {activeAdminTab === 'compliance' && (
        <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-6">
          <div className="border-b border-stone-200 pb-4">
            <h3 className="font-serif text-xl font-bold text-stone-900">
              Corporate & Regulatory Status
            </h3>
            <p className="text-xs text-stone-500">Official statutory compliance records.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-stone-700">
            <div className="p-4 bg-[#FAF8F5] rounded-xl border border-stone-200 space-y-2">
              <span className="font-bold text-stone-900 block text-sm">SECP Corporate Registration</span>
              <p>Corporate Unique Identity: <strong>{COMPANY_INFO.uci}</strong></p>
              <p>Act: <strong>{COMPANY_INFO.secpAct}</strong></p>
              <p>Incorporated: <strong>{COMPANY_INFO.incorporationDate}</strong></p>
              <p>Authority: <strong>{COMPANY_INFO.registrationAuthority}</strong></p>
            </div>

            <div className="p-4 bg-[#FAF8F5] rounded-xl border border-stone-200 space-y-2">
              <span className="font-bold text-stone-900 block text-sm">PSQCA & Quality Benchmarks</span>
              <p>Batch Verification: <strong>Passed (Zero Heavy Metals / ICP-MS Cleared)</strong></p>
              <p>Standard Monograph: <strong>Pakistan Pure Food Rules 2011 / PSQCA</strong></p>
              <p>Facility: <strong>{COMPANY_INFO.packagingFacility}</strong></p>
            </div>
          </div>
        </div>
      )}

      {/* Order Receipt Modal */}
      {receiptOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div
            className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs"
            onClick={() => setReceiptOrder(null)}
          />

          <div className="min-h-full flex items-center justify-center p-4">
            <div className="relative bg-white max-w-lg w-full rounded-2xl p-6 sm:p-8 space-y-6 border border-stone-200 shadow-2xl">
              <button
                onClick={() => setReceiptOrder(null)}
                className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center border-b border-stone-200 pb-4">
                <span className="font-serif text-lg font-bold text-[#1C432E]">
                  AMMAMA FOODS (PVT.) LTD.
                </span>
                <p className="text-[10px] text-stone-400">
                  SECP UCI 0303557 · Section 16 Companies Act 2017
                </p>
                <h3 className="font-serif text-xl font-bold text-stone-900 mt-2">
                  Official Dispatch Slip
                </h3>
              </div>

              <div className="space-y-3 text-xs text-stone-700">
                <div className="flex justify-between font-mono">
                  <span>Order Ref: <strong>{receiptOrder.id}</strong></span>
                  <span>Date: {receiptOrder.date}</span>
                </div>
                <div className="p-3 bg-stone-50 rounded border border-stone-200 space-y-1">
                  <p><strong>Customer:</strong> {receiptOrder.customerName} ({receiptOrder.customerPhone})</p>
                  <p><strong>Shipping Address:</strong> {receiptOrder.customerAddress}, {receiptOrder.customerCity}</p>
                  <p><strong>Payment Mode:</strong> {receiptOrder.paymentMode}</p>
                </div>

                <div className="space-y-2 pt-2">
                  <span className="font-bold text-stone-900 block">Ordered Items:</span>
                  {receiptOrder.items.map((i, idx) => (
                    <div key={idx} className="flex justify-between border-b border-stone-100 pb-1">
                      <span>{i.productName} × {i.quantity}</span>
                      <span className="font-mono">PKR {(i.price * i.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                  <div className="flex justify-between font-bold text-stone-900 pt-2 text-sm">
                    <span>Payable on Delivery:</span>
                    <span className="font-mono text-[#1C432E]">PKR {receiptOrder.grandTotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-200 flex gap-2">
                <button
                  onClick={() => window.print()}
                  className="flex-1 py-2.5 bg-[#1C432E] hover:bg-[#25573C] text-white text-xs font-semibold rounded flex items-center justify-center gap-1.5"
                >
                  <Printer className="w-4 h-4" />
                  Print Receipt
                </button>
                <button
                  onClick={() => setReceiptOrder(null)}
                  className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
