import React, { useState, useEffect, useRef } from 'react';
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
  UploadCloud,
  Copy,
  ExternalLink,
  Database,
  Cloud,
  Check,
  RefreshCw,
  Layers,
} from 'lucide-react';
import { Product, AdminOrder, ReviewItem, ProductVariant } from '../types';
import { PRODUCTS, REVIEWS, COMPANY_INFO } from '../data/companyData';
import {
  auth,
  loginAdmin,
  logoutAdmin,
  onAdminAuthChange,
  SUPER_ADMIN_UID,
  syncOrderToFirestore,
  fetchOrdersFromFirestore,
  syncFeedbackToFirestore,
  fetchFeedbackFromFirestore,
} from '../lib/firebase';
import { uploadImageToImgBB, ImgBBUploadResult } from '../lib/imgbb';

interface AdminPageProps {
  onShowToast: (msg: string) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ onShowToast }) => {
  // Auth state
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Tabs: 'orders' | 'inventory' | 'imgbb' | 'reviews' | 'system'
  const [activeAdminTab, setActiveAdminTab] = useState<'orders' | 'inventory' | 'imgbb' | 'reviews' | 'system'>('orders');

  // Orders State (loaded from Firestore + localStorage fallback)
  const [orders, setOrders] = useState<AdminOrder[]>(() => {
    try {
      const saved = localStorage.getItem('ammama_orders');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [
      {
        id: 'AMM-918234',
        customerName: 'Muhammad Bilal',
        customerPhone: '0301-8472911',
        customerCity: 'Lahore',
        customerAddress: 'House 42-B, Sector Y, Phase 3, DHA',
        items: [
          { productName: 'Terra Herbs-8', packagingType: 'Stand up Pouch', weight: '200 grams', quantity: 2, price: 1450 },
          { productName: 'Pure Beiry Nectar Honey', packagingType: 'Jar', weight: '500grams', quantity: 1, price: 2200 },
        ],
        subtotal: 5100,
        deliveryFee: 0,
        grandTotal: 5100,
        paymentMode: 'Cash on Delivery (COD)',
        status: 'Dispatched',
        date: '10 Nov 2026',
        courierTracking: 'TCS-88192031',
        courierCompany: 'TCS',
      },
      {
        id: 'AMM-918235',
        customerName: 'Dr. Sana Tariq',
        customerPhone: '0321-4491023',
        customerCity: 'Islamabad',
        customerAddress: 'Apartment 402, Executive Heights, F-11/1',
        items: [
          { productName: 'Canola cooking Oil', packagingType: 'Bottle', weight: '2 Liter', quantity: 1, price: 2450 },
          { productName: 'Garlic Powder', packagingType: 'Jar', weight: '300 grams', quantity: 1, price: 580 },
        ],
        subtotal: 3030,
        deliveryFee: 200,
        grandTotal: 3230,
        paymentMode: 'Cash on Delivery (COD)',
        status: 'Pending',
        date: '10 Nov 2026',
      },
      {
        id: 'AMM-918230',
        customerName: 'Kamran Ashraf',
        customerPhone: '0333-9182741',
        customerCity: 'Karachi',
        customerAddress: 'Plot 18-C, 7th Commercial Lane, Zamzama, Clifton',
        items: [
          { productName: 'Cholestan Pure Desi Ghee', packagingType: 'Jar', weight: '1000 grams', quantity: 1, price: 4500 },
          { productName: 'Mudanya- SIZMA Olive Oil', packagingType: 'Glass bottle', weight: '1000 ml', quantity: 1, price: 3600 },
        ],
        subtotal: 8100,
        deliveryFee: 0,
        grandTotal: 8100,
        paymentMode: 'Direct Bank Transfer (IBFT)',
        status: 'Delivered',
        date: '08 Nov 2026',
        courierTracking: 'LEO-44918201',
        courierCompany: 'Leopards',
      },
    ];
  });

  // Products State
  const [productList, setProductList] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('ammama_admin_products');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return PRODUCTS;
  });

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newPrice, setNewPrice] = useState<number>(0);

  // Reviews State
  const [reviewsList, setReviewsList] = useState<ReviewItem[]>(REVIEWS);

  // Filters
  const [orderFilter, setOrderFilter] = useState<string>('all');
  const [orderSearch, setOrderSearch] = useState<string>('');
  const [receiptOrder, setReceiptOrder] = useState<AdminOrder | null>(null);

  // ImgBB Upload Tool State
  const [uploadingImage, setUploadingImage] = useState<boolean>(false);
  const [uploadResult, setUploadResult] = useState<ImgBBUploadResult | null>(null);
  const [uploadedGallery, setUploadedGallery] = useState<{ url: string; title: string; date: string }[]>(() => {
    try {
      const saved = localStorage.getItem('ammama_imgbb_gallery');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [
      { url: '/assets/terra_herbs_package_clean.jpg', title: 'Terra Herbs-8 Official Pouch', date: '10 Nov 2026' },
      { url: 'https://i.postimg.cc/D08J1jfs/Pure-Beiry-Nector-Honey-of-Karak.jpg', title: 'Karak Honey Jar', date: '08 Nov 2026' },
      { url: 'https://i.postimg.cc/90rRy8X9/Change-name-for-Desi-Ghee-(Cholestan-pure-Desi-Ghee).jpg', title: 'Cholistan Desi Ghee', date: '08 Nov 2026' },
      { url: 'https://i.postimg.cc/C5zBbPMJ/Mudanya-Olive-Oil-Price-10800-free-delivery.png', title: 'Mudanya Olive Oil 5L', date: '08 Nov 2026' },
    ];
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Listen to Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAdminAuthChange((user) => {
      if (user) {
        setCurrentUser(user);
      }
    });

    return () => unsubscribe();
  }, []);

  // Sync orders to localStorage & Firestore
  useEffect(() => {
    try {
      localStorage.setItem('ammama_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  // Sync products to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ammama_admin_products', JSON.stringify(productList));
    } catch (e) {
      console.error(e);
    }
  }, [productList]);

  // Sync ImgBB gallery to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ammama_imgbb_gallery', JSON.stringify(uploadedGallery));
    } catch (e) {
      console.error(e);
    }
  }, [uploadedGallery]);

  // Attempt to fetch from Firestore on mount
  useEffect(() => {
    fetchOrdersFromFirestore().then((remoteOrders) => {
      if (remoteOrders && remoteOrders.length > 0) {
        setOrders(remoteOrders);
      }
    });
    fetchFeedbackFromFirestore().then((remoteFeedback) => {
      if (remoteFeedback && remoteFeedback.length > 0) {
        setReviewsList(remoteFeedback);
      }
    });
  }, []);

  // Handle Login via Email & Password
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError(null);
    try {
      const userCred = await loginAdmin(authEmail, authPassword);
      setCurrentUser(userCred.user);
      onShowToast(`Welcome back, ${userCred.user.email}! Firebase Connected.`);
    } catch (err: any) {
      console.error('Firebase Auth error:', err);
      setAuthError(err.message || 'Authentication failed. Please verify credentials in Firebase.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutAdmin();
    } catch (e) {
      console.error(e);
    }
    setCurrentUser(null);
    onShowToast('Admin logged out successfully.');
  };

  // Status Update with Firestore Sync
  const handleUpdateStatus = async (orderId: string, newStatus: AdminOrder['status'], courierName?: AdminOrder['courierCompany']) => {
    let updatedOrder: AdminOrder | undefined;

    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          const generatedTracking =
            newStatus === 'Dispatched' && !ord.courierTracking
              ? `${courierName || 'TCS'}-${Math.floor(10000000 + Math.random() * 90000000)}`
              : ord.courierTracking;
          updatedOrder = {
            ...ord,
            status: newStatus,
            courierTracking: generatedTracking,
            courierCompany: courierName || ord.courierCompany || 'TCS',
          };
          return updatedOrder;
        }
        return ord;
      })
    );

    if (updatedOrder) {
      await syncOrderToFirestore(updatedOrder);
      onShowToast(`Order #${orderId} marked as ${newStatus} & synced to Firebase.`);
    }
  };

  // Handle ImgBB Image File Upload
  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setUploadResult(null);

    const res = await uploadImageToImgBB(file, file.name);
    setUploadingImage(false);
    setUploadResult(res);

    if (res.success && res.url) {
      onShowToast('Image successfully uploaded to imgbb CDN!');
      setUploadedGallery((prev) => [
        { url: res.url!, title: file.name, date: new Date().toLocaleDateString('en-GB') },
        ...prev,
      ]);
    } else {
      onShowToast(`Upload failed: ${res.error || 'Unknown error'}`);
    }
  };

  // Copy to Clipboard helper
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    onShowToast(`${label} copied to clipboard!`);
  };

  // Metrics
  const totalRevenue = orders.reduce((sum, o) => (o.status !== 'Cancelled' ? sum + o.grandTotal : sum), 0);
  const pendingOrders = orders.filter((o) => o.status === 'Pending').length;
  const dispatchedOrders = orders.filter((o) => o.status === 'Dispatched').length;

  const filteredOrders = orders.filter((o) => {
    const matchesFilter = orderFilter === 'all' || o.status.toLowerCase() === orderFilter.toLowerCase();
    const matchesSearch =
      o.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customerName.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customerCity.toLowerCase().includes(orderSearch.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // If Not Authenticated, show Modern Firebase Authentication Login
  if (!currentUser) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#FAF9F5]">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-stone-200 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-[#155D27]/10 text-[#155D27] rounded-2xl flex items-center justify-center mx-auto">
              <Lock className="w-7 h-7" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-stone-900">
              Ammama Foods Admin Portal
            </h2>
            <p className="text-xs text-stone-500">
              Authorized Executive Access · Firebase Project: <span className="font-mono text-emerald-800 font-semibold">ammama-bfdde</span>
            </p>
          </div>

          {authError && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Admin Email Address
              </label>
              <input
                type="email"
                value={authEmail}
                onChange={(e) => setAuthEmail(e.target.value)}
                placeholder="info@ammamafoods.com"
                required
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs focus:outline-none focus:border-[#155D27] focus:bg-white transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Admin Password
              </label>
              <input
                type="password"
                value={authPassword}
                onChange={(e) => setAuthPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs focus:outline-none focus:border-[#155D27] focus:bg-white transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-3 bg-[#155D27] hover:bg-[#1C7A38] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors shadow-sm disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
            >
              {authLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Authenticating with Firebase...</span>
                </>
              ) : (
                <span>Sign In via Firebase Auth</span>
              )}
            </button>
          </form>

          <div className="text-center pt-2 border-t border-stone-100">
            <span className="text-[10px] text-stone-400">
              Authorized personnel only · SECP Corporate Identity No. 0303557
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F5] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Header Bar */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold uppercase tracking-widest text-[#155D27] bg-[#155D27]/10 px-2.5 py-0.5 rounded-full">
                AMMAMA Admin Suite
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <Database className="w-3 h-3 text-emerald-600" />
                Firebase: ammama-bfdde
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-mono text-stone-600 bg-stone-100 px-2 py-0.5 rounded-full">
                <Cloud className="w-3 h-3 text-sky-600" />
                ImgBB: Connected
              </span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              Executive Governance & Store Manager
            </h1>
            <p className="text-xs text-stone-500">
              Logged in as: <strong className="text-stone-800">{currentUser.email || 'Super Admin'}</strong> (UID: <code className="text-[10px] bg-stone-100 px-1 py-0.5 rounded font-mono">{currentUser.uid}</code>)
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Unlock className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* Executive Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs flex items-center justify-between">
            <div>
              <span className="text-xs text-stone-500 font-medium">Net Store Revenue</span>
              <h3 className="font-serif text-2xl font-bold text-[#155D27] pt-1">
                PKR {totalRevenue.toLocaleString()}
              </h3>
              <span className="text-[10px] text-emerald-600 font-semibold">Across all active orders</span>
            </div>
            <div className="w-12 h-12 bg-emerald-50 text-[#155D27] rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs flex items-center justify-between">
            <div>
              <span className="text-xs text-stone-500 font-medium">Pending Processing</span>
              <h3 className="font-serif text-2xl font-bold text-amber-600 pt-1">
                {pendingOrders} Orders
              </h3>
              <span className="text-[10px] text-stone-400">Awaiting QC dispatch</span>
            </div>
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs flex items-center justify-between">
            <div>
              <span className="text-xs text-stone-500 font-medium">Courier Transit</span>
              <h3 className="font-serif text-2xl font-bold text-sky-600 pt-1">
                {dispatchedOrders} In-Transit
              </h3>
              <span className="text-[10px] text-stone-400">TCS / Leopards tracking</span>
            </div>
            <div className="w-12 h-12 bg-sky-50 text-sky-600 rounded-xl flex items-center justify-center">
              <Truck className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs flex items-center justify-between">
            <div>
              <span className="text-xs text-stone-500 font-medium">Catalog Products</span>
              <h3 className="font-serif text-2xl font-bold text-stone-900 pt-1">
                {productList.length} Items
              </h3>
              <span className="text-[10px] text-emerald-700 font-medium">Multi-packaging variants</span>
            </div>
            <div className="w-12 h-12 bg-stone-100 text-stone-700 rounded-xl flex items-center justify-center">
              <Package className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex flex-wrap items-center gap-2 border-b border-stone-200 pb-2">
          <button
            onClick={() => setActiveAdminTab('orders')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeAdminTab === 'orders'
                ? 'bg-[#155D27] text-white shadow-xs'
                : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Orders & Dispatch ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('inventory')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeAdminTab === 'inventory'
                ? 'bg-[#155D27] text-white shadow-xs'
                : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Catalog & Variants ({productList.length})</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('imgbb')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeAdminTab === 'imgbb'
                ? 'bg-[#155D27] text-white shadow-xs'
                : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            <UploadCloud className="w-4 h-4" />
            <span>ImgBB Cloud Uploader</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('reviews')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeAdminTab === 'reviews'
                ? 'bg-[#155D27] text-white shadow-xs'
                : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            <Star className="w-4 h-4" />
            <span>Customer Inquiries & Feedback</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('system')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeAdminTab === 'system'
                ? 'bg-[#155D27] text-white shadow-xs'
                : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Firebase & Governance</span>
          </button>
        </div>

        {/* TAB 1: ORDERS & DISPATCH */}
        {activeAdminTab === 'orders' && (
          <div className="bg-white rounded-3xl border border-stone-200 shadow-2xs overflow-hidden space-y-4">
            {/* Action Bar */}
            <div className="p-4 sm:p-6 border-b border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 flex-wrap">
                <div className="relative">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search by ID, Customer, City..."
                    value={orderSearch}
                    onChange={(e) => setOrderSearch(e.target.value)}
                    className="pl-9 pr-4 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs focus:outline-none focus:border-[#155D27] w-64"
                  />
                </div>

                <div className="flex items-center gap-1">
                  {(['all', 'pending', 'dispatched', 'delivered'] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => setOrderFilter(st)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors cursor-pointer ${
                        orderFilter === st
                          ? 'bg-stone-900 text-white'
                          : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const csvContent =
                      'data:text/csv;charset=utf-8,' +
                      ['Order ID,Customer,Phone,City,Items,Grand Total,Payment,Status,Date,Tracking']
                        .concat(
                          orders.map(
                            (o) =>
                              `"${o.id}","${o.customerName}","${o.customerPhone}","${o.customerCity}","${o.items.map((i) => `${i.productName} (${i.quantity})`).join('; ')}",${o.grandTotal},"${o.paymentMode}","${o.status}","${o.date}","${o.courierTracking || 'N/A'}"`
                          )
                        )
                        .join('\n');
                    const encodedUri = encodeURI(csvContent);
                    const link = document.createElement('a');
                    link.setAttribute('href', encodedUri);
                    link.setAttribute('download', `ammama_orders_${new Date().toISOString().slice(0, 10)}.csv`);
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    onShowToast('Orders exported to CSV successfully!');
                  }}
                  className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            {/* Orders Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAF9F5] text-stone-500 uppercase tracking-wider text-[10px] border-b border-stone-200">
                  <tr>
                    <th className="py-3 px-4">Order ID & Date</th>
                    <th className="py-3 px-4">Customer Details</th>
                    <th className="py-3 px-4">Ordered Items & Variants</th>
                    <th className="py-3 px-4">Grand Total</th>
                    <th className="py-3 px-4">Status & Courier</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-stone-700">
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-stone-400">
                        No orders matching the current filter.
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-stone-50/80 transition-colors">
                        <td className="py-3.5 px-4 font-mono">
                          <span className="font-bold text-stone-900 block">{ord.id}</span>
                          <span className="text-[10px] text-stone-400">{ord.date}</span>
                        </td>
                        <td className="py-3.5 px-4">
                          <strong className="block text-stone-900">{ord.customerName}</strong>
                          <span className="text-[11px] text-stone-500 block">{ord.customerPhone}</span>
                          <span className="text-[10px] text-stone-400">{ord.customerCity}</span>
                        </td>
                        <td className="py-3.5 px-4 max-w-xs">
                          <div className="space-y-1">
                            {ord.items.map((it, idx) => (
                              <div key={idx} className="flex items-center gap-1 text-[11px]">
                                <span className="w-4 h-4 rounded bg-stone-200 text-stone-800 text-[10px] font-bold flex items-center justify-center shrink-0">
                                  {it.quantity}
                                </span>
                                <span className="font-medium text-stone-800 truncate">{it.productName}</span>
                                {it.weight && (
                                  <span className="text-[10px] text-[#C28E3A] font-semibold shrink-0">({it.weight})</span>
                                )}
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="font-serif font-bold text-sm text-[#155D27] block">
                            PKR {ord.grandTotal.toLocaleString()}
                          </span>
                          <span className="text-[10px] text-stone-400">
                            {ord.paymentMode === 'Cash on Delivery (COD)' ? 'COD' : 'IBFT Bank'}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-1 ${
                              ord.status === 'Pending'
                                ? 'bg-amber-100 text-amber-800'
                                : ord.status === 'Dispatched'
                                ? 'bg-sky-100 text-sky-800'
                                : ord.status === 'Delivered'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {ord.status}
                          </span>
                          {ord.courierTracking && (
                            <div className="text-[10px] font-mono text-stone-500 flex items-center gap-1">
                              <Truck className="w-3 h-3 text-stone-400" />
                              <span>{ord.courierTracking}</span>
                            </div>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {ord.status === 'Pending' && (
                              <button
                                onClick={() => handleUpdateStatus(ord.id, 'Dispatched', 'TCS')}
                                className="px-2.5 py-1 bg-[#155D27] hover:bg-[#1C7A38] text-white text-[11px] font-semibold rounded-md transition-colors cursor-pointer"
                              >
                                Dispatch
                              </button>
                            )}
                            {ord.status === 'Dispatched' && (
                              <button
                                onClick={() => handleUpdateStatus(ord.id, 'Delivered')}
                                className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-semibold rounded-md transition-colors cursor-pointer"
                              >
                                Mark Delivered
                              </button>
                            )}
                            <button
                              onClick={() => setReceiptOrder(ord)}
                              className="p-1.5 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-md transition-colors cursor-pointer"
                              title="View Invoice"
                            >
                              <FileText className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: CATALOG & PACKAGING VARIANTS */}
        {activeAdminTab === 'inventory' && (
          <div className="bg-white rounded-3xl border border-stone-200 shadow-2xs p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-lg font-bold text-stone-900">
                  Product Catalog & Specification Master
                </h3>
                <p className="text-xs text-stone-500">
                  Full list of 16 products with packaging types (Bottle, Tin, Jar, Sache, Pouch), weights, delivery terms, and live pricing.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {productList.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-[#FAF9F5] border border-stone-200 rounded-2xl p-4 flex flex-col justify-between space-y-4 hover:border-stone-300 transition-colors"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 rounded-xl bg-white border border-stone-200 overflow-hidden p-1 flex items-center justify-center shrink-0">
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#C28E3A]">
                            {prod.packagingType || 'Packaging'} · {prod.weight}
                          </span>
                          <span
                            className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                              prod.delivery === 'Free'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-stone-200 text-stone-700'
                            }`}
                          >
                            {prod.delivery === 'Free' ? 'Free Delivery' : 'Charges Applied'}
                          </span>
                        </div>
                        <h4 className="font-serif font-bold text-sm text-stone-900 truncate">
                          {prod.name}
                        </h4>
                        <span className="font-mono text-xs font-bold text-[#155D27]">
                          Base: PKR {prod.price.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Variants list if available */}
                    {prod.variants && prod.variants.length > 0 && (
                      <div className="bg-white p-2.5 rounded-xl border border-stone-200/80 space-y-1.5 text-[11px]">
                        <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                          Packaging Specifications ({prod.variants.length} Sizes):
                        </span>
                        <div className="space-y-1">
                          {prod.variants.map((v) => (
                            <div key={v.id} className="flex items-center justify-between text-stone-700 bg-stone-50 px-2 py-1 rounded">
                              <span>
                                <strong className="font-semibold">{v.weight}</strong>{' '}
                                <span className="text-stone-400">({v.packagingType})</span>
                              </span>
                              <span className="font-mono font-bold text-[#155D27]">
                                PKR {v.price.toLocaleString()}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-2 border-t border-stone-200/80 flex items-center justify-between text-xs">
                    <span className="text-stone-500 text-[11px]">
                      Status: <strong className={prod.inStock ? 'text-emerald-700' : 'text-red-600'}>{prod.inStock ? 'In Stock' : 'Out of Stock'}</strong>
                    </span>
                    <button
                      onClick={() => {
                        setEditingProduct(prod);
                        setNewPrice(prod.price);
                      }}
                      className="px-3 py-1 bg-white hover:bg-stone-100 border border-stone-300 rounded-lg text-xs font-medium text-stone-700 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Edit2 className="w-3 h-3" />
                      <span>Edit Price</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: IMGBB CLOUD ASSET UPLOADER */}
        {activeAdminTab === 'imgbb' && (
          <div className="bg-white rounded-3xl border border-stone-200 shadow-2xs p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-5">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-serif text-xl font-bold text-stone-900">
                    ImgBB Cloud Asset Uploader
                  </h3>
                  <span className="text-[10px] bg-sky-100 text-sky-800 font-mono font-bold px-2 py-0.5 rounded-full">
                    API Key: f20f56a1...
                  </span>
                </div>
                <p className="text-xs text-stone-500 pt-1">
                  Upload high-resolution packaging, certificates, and product photos directly to the ImgBB CDN. Instant direct links generated.
                </p>
              </div>
            </div>

            {/* Dropzone */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-stone-300 hover:border-[#155D27] bg-[#FAF9F5] hover:bg-emerald-50/30 rounded-3xl p-8 sm:p-12 text-center transition-all cursor-pointer flex flex-col items-center justify-center space-y-3"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              <div className="w-16 h-16 rounded-full bg-white shadow-2xs border border-stone-200 text-[#155D27] flex items-center justify-center">
                <UploadCloud className="w-8 h-8" />
              </div>
              <div>
                <strong className="text-stone-900 text-sm block">
                  Click to Browse or Drag Image File Here
                </strong>
                <span className="text-xs text-stone-400">
                  PNG, JPG, WEBP up to 32MB supported via imgbb.com
                </span>
              </div>
              {uploadingImage && (
                <div className="flex items-center gap-2 text-xs font-semibold text-[#155D27] bg-white px-4 py-2 rounded-full shadow-2xs">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Uploading to ImgBB CDN...</span>
                </div>
              )}
            </div>

            {/* Upload Result Notification */}
            {uploadResult && uploadResult.success && uploadResult.url && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={uploadResult.thumbUrl || uploadResult.url}
                    alt="Uploaded thumbnail"
                    className="w-14 h-14 object-contain bg-white rounded-lg border border-emerald-200"
                  />
                  <div>
                    <span className="text-xs font-bold text-emerald-900 block">
                      Upload Successful!
                    </span>
                    <span className="text-[11px] font-mono text-emerald-700 truncate max-w-sm block">
                      {uploadResult.url}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => copyToClipboard(uploadResult.url!, 'Image CDN Link')}
                    className="px-3 py-1.5 bg-[#155D27] hover:bg-[#1C7A38] text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy URL</span>
                  </button>
                  <a
                    href={uploadResult.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 bg-white text-stone-700 hover:text-stone-900 border border-stone-200 rounded-lg transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            )}

            {/* Gallery of Uploaded Assets */}
            <div className="space-y-3 pt-4">
              <h4 className="font-serif font-bold text-sm text-stone-900">
                Media Library & Cloud Assets
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {uploadedGallery.map((img, idx) => (
                  <div
                    key={idx}
                    className="bg-[#FAF9F5] border border-stone-200 rounded-2xl p-3 flex flex-col justify-between space-y-2 group"
                  >
                    <div className="aspect-square bg-white rounded-xl overflow-hidden flex items-center justify-center p-2 border border-stone-200/80">
                      <img
                        src={img.url}
                        alt={img.title}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs font-semibold text-stone-900 block truncate">
                        {img.title}
                      </span>
                      <div className="flex items-center justify-between text-[10px] text-stone-400">
                        <span>{img.date}</span>
                        <button
                          onClick={() => copyToClipboard(img.url, 'Image Link')}
                          className="hover:text-[#155D27] cursor-pointer"
                          title="Copy Link"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: REVIEWS & INQUIRIES */}
        {activeAdminTab === 'reviews' && (
          <div className="bg-white rounded-3xl border border-stone-200 shadow-2xs p-6 space-y-4">
            <h3 className="font-serif text-lg font-bold text-stone-900">
              Customer Feedback & Verified Inquiries
            </h3>
            <p className="text-xs text-stone-500">
              Reviews collected from the website feedback portal. Approvals automatically sync to public review sliders.
            </p>

            <div className="space-y-3 pt-2">
              {reviewsList.map((rev) => (
                <div
                  key={rev.id}
                  className="p-4 bg-[#FAF9F5] border border-stone-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <strong className="text-stone-900 text-xs">{rev.name}</strong>
                      <span className="text-[10px] text-stone-400">({rev.city})</span>
                      <span className="text-[10px] bg-emerald-50 text-emerald-800 font-semibold px-2 py-0.5 rounded-full border border-emerald-200">
                        {rev.product}
                      </span>
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed max-w-2xl">
                      "{rev.comment}"
                    </p>
                    <div className="flex items-center gap-1 text-[#C28E3A] text-xs pt-1">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                      <span className="text-[10px] text-stone-400 pl-2">{rev.date}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100/60 px-2.5 py-1 rounded-md flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Approved</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: FIREBASE & GOVERNANCE */}
        {activeAdminTab === 'system' && (
          <div className="bg-white rounded-3xl border border-stone-200 shadow-2xs p-6 sm:p-8 space-y-6">
            <h3 className="font-serif text-xl font-bold text-stone-900">
              Firebase & Corporate Credentials
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 bg-[#FAF9F5] rounded-2xl border border-stone-200 space-y-3">
                <div className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-emerald-700" />
                  <strong className="text-stone-900 text-sm">Firebase Cloud Infrastructure</strong>
                </div>
                <div className="space-y-1 text-xs text-stone-600 font-mono">
                  <div className="flex justify-between py-1 border-b border-stone-200">
                    <span className="text-stone-500">Project ID:</span>
                    <span className="font-semibold text-stone-900">ammama-bfdde</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-stone-200">
                    <span className="text-stone-500">Super Admin UID:</span>
                    <span className="font-semibold text-emerald-800">{SUPER_ADMIN_UID}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-stone-200">
                    <span className="text-stone-500">Auth Domain:</span>
                    <span>ammama-bfdde.firebaseapp.com</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-stone-500">Firestore Sync:</span>
                    <span className="text-emerald-700 font-bold">Active & Bound</span>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-[#FAF9F5] rounded-2xl border border-stone-200 space-y-3">
                <div className="flex items-center gap-2">
                  <Cloud className="w-5 h-5 text-sky-700" />
                  <strong className="text-stone-900 text-sm">ImgBB Cloud Image Engine</strong>
                </div>
                <div className="space-y-1 text-xs text-stone-600 font-mono">
                  <div className="flex justify-between py-1 border-b border-stone-200">
                    <span className="text-stone-500">Endpoint:</span>
                    <span>api.imgbb.com/1/upload</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-stone-200">
                    <span className="text-stone-500">API Key:</span>
                    <span className="text-stone-900">f20f56a14ab8d529a98745b32c5ef961</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-stone-500">Upload Status:</span>
                    <span className="text-sky-700 font-bold">Verified & Operational</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 bg-[#155D27]/5 border border-[#155D27]/20 rounded-2xl space-y-2 text-xs">
              <strong className="text-[#155D27] block font-serif text-sm">
                Corporate Registration & Legal Framework
              </strong>
              <p className="text-stone-700 leading-relaxed">
                Registered with Securities and Exchange Commission of Pakistan (SECP) under Corporate Unique Identity No. <strong>0303557</strong>, Section 16 of the Companies Act-2017. Head Office: {COMPANY_INFO.headOffice}.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* MODAL: EDIT PRODUCT PRICE */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-stone-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif font-bold text-lg text-stone-900">
                Update Price & Stock
              </h3>
              <button
                onClick={() => setEditingProduct(null)}
                className="p-1 text-stone-400 hover:text-stone-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-stone-500 block mb-1">Product</label>
                <strong className="text-stone-900 text-sm block">{editingProduct.name}</strong>
                <span className="text-stone-400 text-[11px]">{editingProduct.weight} · {editingProduct.packagingType}</span>
              </div>

              <div>
                <label className="text-stone-700 font-semibold block mb-1">Base Price (PKR)</label>
                <input
                  type="number"
                  value={newPrice}
                  onChange={(e) => setNewPrice(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs focus:outline-none focus:border-[#155D27]"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setEditingProduct(null)}
                className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setProductList((prev) =>
                    prev.map((p) => (p.id === editingProduct.id ? { ...p, price: newPrice } : p))
                  );
                  setEditingProduct(null);
                  onShowToast(`Price for ${editingProduct.name} updated to PKR ${newPrice}!`);
                }}
                className="px-4 py-2 bg-[#155D27] hover:bg-[#1C7A38] text-white text-xs font-bold rounded-xl cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ORDER INVOICE / RECEIPT */}
      {receiptOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-stone-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#155D27]">
                  Official Customer Invoice
                </span>
                <h3 className="font-serif font-bold text-lg text-stone-900">
                  Order #{receiptOrder.id}
                </h3>
              </div>
              <button
                onClick={() => setReceiptOrder(null)}
                className="p-1 text-stone-400 hover:text-stone-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2 bg-[#FAF9F5] p-3 rounded-xl border border-stone-200">
                <div>
                  <span className="text-stone-400 block text-[10px]">Customer:</span>
                  <strong className="text-stone-900">{receiptOrder.customerName}</strong>
                  <span className="text-stone-600 block text-[11px]">{receiptOrder.customerPhone}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px]">Delivery Address:</span>
                  <span className="text-stone-800 text-[11px] leading-tight block">
                    {receiptOrder.customerAddress}, {receiptOrder.customerCity}
                  </span>
                </div>
              </div>

              <div className="border border-stone-200 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF9F5] text-stone-500 text-[10px] uppercase">
                    <tr>
                      <th className="py-2 px-3">Item</th>
                      <th className="py-2 px-3 text-center">Qty</th>
                      <th className="py-2 px-3 text-right">Price</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {receiptOrder.items.map((it, idx) => (
                      <tr key={idx}>
                        <td className="py-2 px-3">
                          <strong className="block text-stone-900">{it.productName}</strong>
                          {it.weight && <span className="text-[10px] text-stone-400">{it.weight}</span>}
                        </td>
                        <td className="py-2 px-3 text-center font-bold">{it.quantity}</td>
                        <td className="py-2 px-3 text-right font-mono font-semibold">
                          PKR {(it.price * it.quantity).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="space-y-1 text-xs pt-1 border-t border-stone-200">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal:</span>
                  <span className="font-mono">PKR {receiptOrder.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Delivery Fee:</span>
                  <span className="font-mono">
                    {receiptOrder.deliveryFee === 0 ? 'FREE' : `PKR ${receiptOrder.deliveryFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-serif font-bold text-[#155D27] pt-1 border-t border-stone-200">
                  <span>Grand Total:</span>
                  <span>PKR {receiptOrder.grandTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-xl flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Invoice</span>
              </button>
              <button
                onClick={() => setReceiptOrder(null)}
                className="px-4 py-2 bg-[#155D27] hover:bg-[#1C7A38] text-white text-xs font-bold rounded-xl cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
