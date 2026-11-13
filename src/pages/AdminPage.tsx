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
  Star,
  Lock,
  Unlock,
  UploadCloud,
  Copy,
  RefreshCw,
  Layers,
  FolderTree,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Image as ImageIcon,
  Eye,
  EyeOff,
  Tag,
  AlertTriangle,
} from 'lucide-react';
import { Product, AdminOrder, ReviewItem, ProductVariant, CategoryItem } from '../types';
import { COMPANY_INFO } from '../data/companyData';
import {
  loginAdmin,
  logoutAdmin,
  onAdminAuthChange,
  syncOrderToFirestore,
  fetchOrdersFromFirestore,
  deleteOrderFromFirestore,
  saveProductToFirestore,
  deleteProductFromFirestore,
  syncAllProductsToFirestore,
  saveCategoryToFirestore,
  deleteCategoryFromFirestore,
  syncAllCategoriesToFirestore,
  syncFeedbackToFirestore,
  fetchFeedbackFromFirestore,
  deleteFeedbackFromFirestore,
} from '../lib/firebase';
import { uploadImageToImgBB } from '../lib/imgbb';

interface AdminPageProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  categories: CategoryItem[];
  setCategories: React.Dispatch<React.SetStateAction<CategoryItem[]>>;
  reviews: ReviewItem[];
  setReviews: React.Dispatch<React.SetStateAction<ReviewItem[]>>;
  onShowToast: (msg: string) => void;
}

const DEFAULT_SAMPLE_ORDERS: AdminOrder[] = [
  {
    id: 'AMM-918234',
    customerName: 'Muhammad Bilal',
    customerPhone: '0301-8472911',
    customerCity: 'Lahore',
    customerAddress: 'House 42-B, Sector Y, Phase 3, DHA',
    items: [
      { productName: 'Terra Herbs-8', packagingType: 'Stand up Pouch', weight: '200 grams', quantity: 2, price: 1450 },
      { productName: 'Pure Berry Honey - Karak', packagingType: 'Jar', weight: '500 grams', quantity: 1, price: 2200 },
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
      { productName: 'Mudanya Extra Virgin Olive Oil (SIZMA)', packagingType: 'Tin', weight: '5 Liter', quantity: 1, price: 10800 },
    ],
    subtotal: 10800,
    deliveryFee: 0,
    grandTotal: 10800,
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
      { productName: 'Mundial Extra Virgin & Culinary Olive Oil', packagingType: 'Tin', weight: '5 Liter', quantity: 1, price: 10500 },
    ],
    subtotal: 15000,
    deliveryFee: 0,
    grandTotal: 15000,
    paymentMode: 'Direct Bank Transfer (IBFT)',
    status: 'Delivered',
    date: '08 Nov 2026',
    courierTracking: 'LEO-44918201',
    courierCompany: 'Leopards',
  },
];

interface ProductFormState {
  id: string;
  isNew: boolean;
  name: string;
  subtitle: string;
  category: string;
  sku: string;
  packagingType: string;
  weight: string;
  price: string;
  compareAtPrice: string;
  delivery: 'Free' | 'Charges applied';
  badge: string;
  isFlagship: boolean;
  inStock: boolean;
  images: string[];
  variants: ProductVariant[];
  shortDescription: string;
  fullDescription: string;
  benefitsText: string;
  directions: string;
  createdAt?: number;
}

export const AdminPage: React.FC<AdminPageProps> = ({
  products,
  setProducts,
  categories,
  setCategories,
  reviews,
  setReviews,
  onShowToast,
}) => {
  // Auth state
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Clean 4-tab navigation
  const [activeAdminTab, setActiveAdminTab] = useState<'orders' | 'products' | 'categories' | 'reviews'>('orders');

  // Orders State
  const [orders, setOrders] = useState<AdminOrder[]>(() => {
    try {
      const saved = localStorage.getItem('ammama_orders');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_SAMPLE_ORDERS;
  });

  const [orderFilter, setOrderFilter] = useState<string>('all');
  const [orderSearch, setOrderSearch] = useState<string>('');
  const [receiptOrder, setReceiptOrder] = useState<AdminOrder | null>(null);
  const [trackingDrafts, setTrackingDrafts] = useState<Record<string, string>>({});

  // Products Filters & Editor Modal
  const [productSearch, setProductSearch] = useState('');
  const [productCatFilter, setProductCatFilter] = useState('all');
  const [productModal, setProductModal] = useState<ProductFormState | null>(null);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [uploadingImages, setUploadingImages] = useState(false);
  const [savingProduct, setSavingProduct] = useState(false);
  const productImageInputRef = useRef<HTMLInputElement>(null);

  // Categories Manager State
  const [catName, setCatName] = useState('');
  const [catDesc, setCatDesc] = useState('');
  const [editingCat, setEditingCat] = useState<CategoryItem | null>(null);

  // Reviews Filter
  const [reviewSearch, setReviewSearch] = useState('');

  // In-UI Confirm Delete Modal (no window.confirm)
  const [confirmDelete, setConfirmDelete] = useState<{
    type: 'product' | 'category' | 'order' | 'review';
    id: string;
    title: string;
    detail?: string;
  } | null>(null);

  // Listen to Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAdminAuthChange((user) => {
      setCurrentUser(user || null);
    });
    return () => unsubscribe();
  }, []);

  // Sync orders to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ammama_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  // Fetch Orders & Feedback from Firestore once logged in
  useEffect(() => {
    if (!currentUser) return;
    fetchOrdersFromFirestore().then((remoteOrders) => {
      if (remoteOrders && remoteOrders.length > 0) {
        setOrders(remoteOrders);
      }
    });
    fetchFeedbackFromFirestore().then((remoteFeedback) => {
      if (remoteFeedback && remoteFeedback.length > 0) {
        setReviews(remoteFeedback);
      }
    });
  }, [currentUser, setReviews]);

  // Login Handler
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError(null);
    try {
      const userCred = await loginAdmin(authEmail.trim(), authPassword);
      setCurrentUser(userCred.user);
      onShowToast(`Signed in as ${userCred.user.email}`);
    } catch (err: any) {
      console.error('Firebase Auth error:', err);
      setAuthError(err.message || 'Authentication failed. Please check your email and password.');
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
    onShowToast('Signed out from Admin Portal.');
  };

  // =====================
  // ORDERS HANDLERS
  // =====================
  const handleUpdateOrder = async (
    orderId: string,
    updates: Partial<AdminOrder>,
    toastMsg?: string
  ) => {
    let updatedOrder: AdminOrder | undefined;
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          const nextStatus = updates.status || ord.status;
          const nextCourier = updates.courierCompany || ord.courierCompany || 'TCS';
          const generatedTracking =
            updates.courierTracking !== undefined
              ? updates.courierTracking
              : nextStatus === 'Dispatched' && !ord.courierTracking
              ? `${nextCourier}-${Math.floor(10000000 + Math.random() * 90000000)}`
              : ord.courierTracking;
          updatedOrder = {
            ...ord,
            ...updates,
            status: nextStatus,
            courierCompany: nextCourier,
            courierTracking: generatedTracking,
          };
          return updatedOrder;
        }
        return ord;
      })
    );
    if (updatedOrder) {
      await syncOrderToFirestore(updatedOrder);
      onShowToast(toastMsg || `Order #${orderId} updated & synced to Firebase.`);
    }
  };

  // =====================
  // PRODUCTS HANDLERS
  // =====================
  const openCreateProductModal = () => {
    setNewImageUrl('');
    setProductModal({
      id: `prod-${Date.now()}`,
      isNew: true,
      name: '',
      subtitle: '',
      category: categories[0]?.id || 'formula',
      sku: `AMM-${Math.floor(1000 + Math.random() * 9000)}`,
      packagingType: 'Bottle',
      weight: '200 grams',
      price: '',
      compareAtPrice: '',
      delivery: 'Charges applied',
      badge: '',
      isFlagship: false,
      inStock: true,
      images: [],
      variants: [],
      shortDescription: '',
      fullDescription: '',
      benefitsText: '',
      directions: '',
      createdAt: Date.now(),
    });
  };

  const openEditProductModal = (prod: Product) => {
    setNewImageUrl('');
    const gallery =
      prod.images && prod.images.length > 0
        ? [...prod.images]
        : prod.image
        ? [prod.image]
        : [];
    setProductModal({
      id: prod.id,
      isNew: false,
      name: prod.name,
      subtitle: prod.subtitle || '',
      category: prod.category,
      sku: prod.sku || '',
      packagingType: prod.packagingType || 'Bottle',
      weight: prod.weight || '',
      price: String(prod.price),
      compareAtPrice: prod.compareAtPrice ? String(prod.compareAtPrice) : '',
      delivery: prod.delivery || 'Charges applied',
      badge: prod.badge || '',
      isFlagship: Boolean(prod.isFlagship),
      inStock: prod.inStock,
      images: gallery.slice(0, 15),
      variants: prod.variants ? prod.variants.map((v) => ({ ...v })) : [],
      shortDescription: prod.shortDescription || '',
      fullDescription: prod.fullDescription || '',
      benefitsText: (prod.benefits || []).join('\n'),
      directions: prod.directions || '',
      createdAt: prod.createdAt || Date.now(),
    });
  };

  const handleProductFilesUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0 || !productModal) return;

    const remainingSlots = 15 - productModal.images.length;
    if (remainingSlots <= 0) {
      onShowToast('Maximum 15 images allowed per product.');
      return;
    }

    const filesToUpload = Array.from(files).slice(0, remainingSlots);
    setUploadingImages(true);
    const uploadedUrls: string[] = [];

    for (const file of filesToUpload) {
      const res = await uploadImageToImgBB(file, file.name);
      if (res.success && res.url) {
        uploadedUrls.push(res.url);
      }
    }

    setUploadingImages(false);
    if (productImageInputRef.current) {
      productImageInputRef.current.value = '';
    }

    if (uploadedUrls.length > 0) {
      setProductModal((prev) =>
        prev
          ? {
              ...prev,
              images: [...prev.images, ...uploadedUrls].slice(0, 15),
            }
          : null
      );
      onShowToast(`${uploadedUrls.length} image${uploadedUrls.length > 1 ? 's' : ''} uploaded successfully.`);
    } else {
      onShowToast('Image upload failed. Please try again or paste an image URL.');
    }
  };

  const handleAddImageUrl = () => {
    if (!productModal || !newImageUrl.trim()) return;
    if (productModal.images.length >= 15) {
      onShowToast('Maximum 15 images reached.');
      return;
    }
    setProductModal({
      ...productModal,
      images: [...productModal.images, newImageUrl.trim()],
    });
    setNewImageUrl('');
  };

  const handleSetTopImage = (idx: number) => {
    if (!productModal || idx === 0) return;
    const next = [...productModal.images];
    const [picked] = next.splice(idx, 1);
    next.unshift(picked);
    setProductModal({ ...productModal, images: next });
    onShowToast('Image set as Top / Primary product photo.');
  };

  const handleMoveImage = (idx: number, dir: -1 | 1) => {
    if (!productModal) return;
    const target = idx + dir;
    if (target < 0 || target >= productModal.images.length) return;
    const next = [...productModal.images];
    const temp = next[idx];
    next[idx] = next[target];
    next[target] = temp;
    setProductModal({ ...productModal, images: next });
  };

  const handleRemoveImage = (idx: number) => {
    if (!productModal) return;
    setProductModal({
      ...productModal,
      images: productModal.images.filter((_, i) => i !== idx),
    });
  };

  const handleAddVariantRow = () => {
    if (!productModal) return;
    const newVar: ProductVariant = {
      id: `var-${Date.now()}-${Math.floor(Math.random() * 100)}`,
      packagingType: productModal.packagingType || 'Bottle',
      weight: '',
      price: Number(productModal.price) || 0,
      delivery: productModal.delivery,
    };
    setProductModal({
      ...productModal,
      variants: [...productModal.variants, newVar],
    });
  };

  const handleUpdateVariantRow = (idx: number, field: keyof ProductVariant, value: any) => {
    if (!productModal) return;
    const next = productModal.variants.map((v, i) => (i === idx ? { ...v, [field]: value } : v));
    setProductModal({ ...productModal, variants: next });
  };

  const handleRemoveVariantRow = (idx: number) => {
    if (!productModal) return;
    setProductModal({
      ...productModal,
      variants: productModal.variants.filter((_, i) => i !== idx),
    });
  };

  const handleSaveProductModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productModal) return;

    if (!productModal.name.trim()) {
      onShowToast('Please enter a product title.');
      return;
    }
    const parsedPrice = Number(productModal.price);
    if (!parsedPrice || parsedPrice <= 0) {
      onShowToast('Please enter a valid price in PKR.');
      return;
    }
    if (productModal.images.length === 0) {
      onShowToast('Please upload or add at least 1 product image.');
      return;
    }

    setSavingProduct(true);
    const existingOrig = !productModal.isNew
      ? products.find((p) => p.id === productModal.id)
      : undefined;

    const cleanBenefits = productModal.benefitsText
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);

    const cleanVariants = productModal.variants.filter(
      (v) => v.weight.trim() !== '' && Number(v.price) > 0
    );

    const finalProduct: Product = {
      ...(existingOrig || {}),
      id: productModal.id,
      name: productModal.name.trim(),
      subtitle: productModal.subtitle.trim() || '100% Pure Organic Wellness',
      category: productModal.category || categories[0]?.id || 'formula',
      sku: productModal.sku.trim() || undefined,
      packagingType: productModal.packagingType.trim() || 'Bottle',
      weight: productModal.weight.trim() || 'Standard',
      price: parsedPrice,
      compareAtPrice:
        productModal.compareAtPrice && Number(productModal.compareAtPrice) > parsedPrice
          ? Number(productModal.compareAtPrice)
          : undefined,
      delivery: productModal.delivery,
      badge: productModal.badge.trim() || undefined,
      isFlagship: productModal.isFlagship,
      inStock: productModal.inStock,
      image: productModal.images[0],
      images: productModal.images,
      variants: cleanVariants.length > 0 ? cleanVariants : undefined,
      shortDescription:
        productModal.shortDescription.trim() || productModal.subtitle.trim() || productModal.name.trim(),
      fullDescription:
        productModal.fullDescription.trim() ||
        productModal.shortDescription.trim() ||
        productModal.name.trim(),
      benefits: cleanBenefits.length > 0 ? cleanBenefits : ['100% Pure & Natural Quality'],
      directions: productModal.directions.trim() || 'Store in a cool, dry place away from direct sunlight.',
      createdAt: productModal.createdAt || Date.now(),
    };

    const nextProducts = productModal.isNew
      ? [finalProduct, ...products]
      : products.map((p) => (p.id === finalProduct.id ? finalProduct : p));

    setProducts(nextProducts);
    await syncAllProductsToFirestore(nextProducts);
    await saveProductToFirestore(finalProduct);
    setSavingProduct(false);
    setProductModal(null);
    onShowToast(
      productModal.isNew
        ? `"${finalProduct.name}" added to store & synced to Firebase!`
        : `"${finalProduct.name}" updated & synced to Firebase!`
    );
  };

  const handleDuplicateProduct = async (prod: Product) => {
    const newId = `${prod.id}-copy-${Date.now().toString().slice(-4)}`;
    const duplicated: Product = {
      ...prod,
      id: newId,
      name: `${prod.name} (Copy)`,
      sku: prod.sku ? `${prod.sku}-COPY` : `AMM-${Math.floor(1000 + Math.random() * 9000)}`,
      isFlagship: false,
      variants: prod.variants ? prod.variants.map((v, i) => ({ ...v, id: `${newId}-v${i}` })) : undefined,
      createdAt: Date.now(),
    };

    const nextProducts = [duplicated, ...products];
    setProducts(nextProducts);
    await syncAllProductsToFirestore(nextProducts);
    await saveProductToFirestore(duplicated);
    onShowToast(`Duplicated "${prod.name}"!`);
  };

  const handleToggleStock = async (prod: Product) => {
    const updated: Product = { ...prod, inStock: !prod.inStock };
    const nextProducts = products.map((p) => (p.id === prod.id ? updated : p));
    setProducts(nextProducts);
    await syncAllProductsToFirestore(nextProducts);
    await saveProductToFirestore(updated);
    onShowToast(`"${prod.name}" marked ${updated.inStock ? 'In Stock' : 'Out of Stock'}.`);
  };

  // =====================
  // CATEGORIES HANDLERS
  // =====================
  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!catName.trim()) {
      onShowToast('Category name is required.');
      return;
    }

    if (editingCat) {
      const updatedCat: CategoryItem = {
        ...editingCat,
        name: catName.trim(),
        description: catDesc.trim(),
      };
      const nextCats = categories.map((c) => (c.id === editingCat.id ? updatedCat : c));
      setCategories(nextCats);
      await syncAllCategoriesToFirestore(nextCats);
      await saveCategoryToFirestore(updatedCat);
      setEditingCat(null);
      setCatName('');
      setCatDesc('');
      onShowToast(`Category "${updatedCat.name}" updated.`);
    } else {
      const slug =
        catName
          .trim()
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '') || `cat-${Date.now()}`;
      const uniqueId = categories.some((c) => c.id === slug) ? `${slug}-${Date.now().toString().slice(-3)}` : slug;
      const newCat: CategoryItem = {
        id: uniqueId,
        name: catName.trim(),
        description: catDesc.trim() || 'Organic Wellness Category',
        order: categories.length + 1,
      };
      const nextCats = [...categories, newCat];
      setCategories(nextCats);
      await syncAllCategoriesToFirestore(nextCats);
      await saveCategoryToFirestore(newCat);
      setCatName('');
      setCatDesc('');
      onShowToast(`Category "${newCat.name}" created & synced!`);
    }
  };

  // =====================
  // CONFIRM DELETE EXECUTION
  // =====================
  const executeConfirmDelete = async () => {
    if (!confirmDelete) return;

    if (confirmDelete.type === 'product') {
      const nextProducts = products.filter((p) => p.id !== confirmDelete.id);
      setProducts(nextProducts);
      await syncAllProductsToFirestore(nextProducts);
      await deleteProductFromFirestore(confirmDelete.id);
      onShowToast(`Product deleted from store & Firebase.`);
    } else if (confirmDelete.type === 'category') {
      const nextCats = categories.filter((c) => c.id !== confirmDelete.id);
      setCategories(nextCats);
      await syncAllCategoriesToFirestore(nextCats);
      await deleteCategoryFromFirestore(confirmDelete.id);
      onShowToast(`Category deleted.`);
    } else if (confirmDelete.type === 'order') {
      setOrders((prev) => prev.filter((o) => o.id !== confirmDelete.id));
      await deleteOrderFromFirestore(confirmDelete.id);
      onShowToast(`Order #${confirmDelete.id} deleted.`);
    } else if (confirmDelete.type === 'review') {
      setReviews((prev) => prev.filter((r) => r.id !== confirmDelete.id));
      await deleteFeedbackFromFirestore(confirmDelete.id);
      onShowToast(`Customer review removed.`);
    }

    setConfirmDelete(null);
  };

  // =====================
  // REVIEWS HANDLERS
  // =====================
  const handleToggleReviewApproval = async (rev: ReviewItem) => {
    const nextApproved = rev.isApproved === false ? true : false;
    const updated: ReviewItem = { ...rev, isApproved: nextApproved };
    setReviews((prev) => prev.map((r) => (r.id === rev.id ? updated : r)));
    await syncFeedbackToFirestore(updated);
    onShowToast(nextApproved ? 'Review approved for public storefront.' : 'Review hidden from storefront.');
  };

  // Computed metrics & filters
  const totalRevenue = orders.reduce((sum, o) => (o.status !== 'Cancelled' ? sum + o.grandTotal : sum), 0);
  const pendingOrders = orders.filter((o) => o.status === 'Pending').length;
  const dispatchedOrders = orders.filter((o) => o.status === 'Dispatched').length;

  const filteredOrders = orders.filter((o) => {
    const matchesFilter = orderFilter === 'all' || o.status.toLowerCase() === orderFilter.toLowerCase();
    const matchesSearch =
      o.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customerName.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customerCity.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customerPhone.toLowerCase().includes(orderSearch.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const filteredProducts = products.filter((p) => {
    const matchesCat = productCatFilter === 'all' || p.category === productCatFilter;
    const q = productSearch.toLowerCase();
    const matchesSearch =
      p.name.toLowerCase().includes(q) ||
      p.subtitle.toLowerCase().includes(q) ||
      (p.sku || '').toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  const filteredReviews = reviews.filter((r) => {
    const q = reviewSearch.toLowerCase();
    return (
      r.name.toLowerCase().includes(q) ||
      r.product.toLowerCase().includes(q) ||
      r.city.toLowerCase().includes(q) ||
      r.comment.toLowerCase().includes(q)
    );
  });

  const getCategoryName = (catId: string) => {
    return categories.find((c) => c.id === catId)?.name || catId;
  };

  // =====================
  // UNAUTHENTICATED LOGIN SCREEN
  // =====================
  if (!currentUser) {
    return (
      <div className="min-h-[82vh] flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8 bg-[#FAF9F5]">
        <div className="max-w-md w-full bg-white rounded-2xl p-7 sm:p-8 border border-stone-200 shadow-lg space-y-5">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-[#155D27]/10 text-[#155D27] rounded-xl flex items-center justify-center mx-auto">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-stone-900">
              Ammama Store Admin
            </h2>
            <p className="text-xs text-stone-500">
              Sign in with your administrator email and password
            </p>
          </div>

          {authError && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleEmailLogin} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Admin Email
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
                Password
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
              className="w-full py-2.5 bg-[#155D27] hover:bg-[#1C7A38] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors shadow-sm disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap"
            >
              {authLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </button>
          </form>

          <div className="text-center pt-2 border-t border-stone-100">
            <span className="text-[10px] text-stone-400">
              {COMPANY_INFO.brandName} · Protected Store Management
            </span>
          </div>
        </div>
      </div>
    );
  }

  // =====================
  // AUTHENTICATED ADMIN DASHBOARD
  // =====================
  return (
    <div className="min-h-screen bg-[#FAF9F5] py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
        {/* Clean Executive Header */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-stone-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-[#155D27] bg-[#155D27]/10 px-2.5 py-0.5 rounded-full">
              {COMPANY_INFO.brandName} · Admin Console
            </span>
            <h1 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
              Store, Catalog &amp; Order Manager
            </h1>
            <p className="text-xs text-stone-500">
              Signed in as <strong className="text-stone-800">{currentUser.email}</strong>
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={openCreateProductModal}
              className="px-3.5 py-2 bg-[#155D27] hover:bg-[#1C7A38] text-white text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Product</span>
            </button>
            <button
              onClick={handleLogout}
              className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <Unlock className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs flex items-center justify-between gap-2">
            <div>
              <span className="text-[11px] text-stone-500 font-medium">Net Revenue</span>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#155D27] pt-0.5">
                PKR {totalRevenue.toLocaleString()}
              </h3>
            </div>
            <div className="w-10 h-10 bg-emerald-50 text-[#155D27] rounded-xl flex items-center justify-center shrink-0">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs flex items-center justify-between gap-2">
            <div>
              <span className="text-[11px] text-stone-500 font-medium">Pending Orders</span>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-amber-600 pt-0.5">
                {pendingOrders} Orders
              </h3>
            </div>
            <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs flex items-center justify-between gap-2">
            <div>
              <span className="text-[11px] text-stone-500 font-medium">In Transit</span>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-sky-600 pt-0.5">
                {dispatchedOrders} Dispatched
              </h3>
            </div>
            <div className="w-10 h-10 bg-sky-50 text-sky-600 rounded-xl flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs flex items-center justify-between gap-2">
            <div>
              <span className="text-[11px] text-stone-500 font-medium">Live Catalog</span>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-stone-900 pt-0.5">
                {products.length} Products
              </h3>
            </div>
            <div className="w-10 h-10 bg-stone-100 text-stone-700 rounded-xl flex items-center justify-center shrink-0">
              <Package className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* 4 Clean Business Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-stone-200 pb-2.5">
          <button
            onClick={() => setActiveAdminTab('orders')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeAdminTab === 'orders'
                ? 'bg-[#155D27] text-white shadow-xs'
                : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Orders &amp; Dispatch ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('products')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeAdminTab === 'products'
                ? 'bg-[#155D27] text-white shadow-xs'
                : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Products ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('categories')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeAdminTab === 'categories'
                ? 'bg-[#155D27] text-white shadow-xs'
                : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            <FolderTree className="w-3.5 h-3.5" />
            <span>Categories ({categories.length})</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('reviews')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeAdminTab === 'reviews'
                ? 'bg-[#155D27] text-white shadow-xs'
                : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            <Star className="w-3.5 h-3.5" />
            <span>Customer Inquiries ({reviews.length})</span>
          </button>
        </div>

        {/* ========================================= */}
        {/* TAB 1: ORDERS & DISPATCH */}
        {/* ========================================= */}
        {activeAdminTab === 'orders' && (
          <div className="bg-white rounded-2xl border border-stone-200 shadow-2xs overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-stone-200 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="flex items-center gap-2 flex-wrap">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search ID, Customer, City..."
                    value={orderSearch}
                    onChange={(e) => setOrderSearch(e.target.value)}
                    className="pl-8 pr-3 py-1.5 bg-stone-50 border border-stone-300 rounded-lg text-xs focus:outline-none focus:border-[#155D27] w-56"
                  />
                </div>

                <div className="flex items-center gap-1 flex-wrap">
                  {(['all', 'pending', 'qc verified', 'dispatched', 'delivered', 'cancelled'] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => setOrderFilter(st)}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-semibold capitalize transition-colors cursor-pointer whitespace-nowrap ${
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

              <button
                onClick={() => {
                  const csvContent =
                    'data:text/csv;charset=utf-8,' +
                    ['Order ID,Customer,Phone,City,Items,Grand Total,Payment,Status,Date,Courier,Tracking']
                      .concat(
                        orders.map(
                          (o) =>
                            `"${o.id}","${o.customerName}","${o.customerPhone}","${o.customerCity}","${o.items
                              .map((i) => `${i.productName} (${i.quantity})`)
                              .join('; ')}",${o.grandTotal},"${o.paymentMode}","${o.status}","${o.date}","${
                              o.courierCompany || 'N/A'
                            }","${o.courierTracking || 'N/A'}"`
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
                  onShowToast('Orders exported to CSV!');
                }}
                className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap self-start md:self-auto"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAF9F5] text-stone-500 uppercase tracking-wider text-[10px] border-b border-stone-200">
                  <tr>
                    <th className="py-3 px-4">Order ID</th>
                    <th className="py-3 px-4">Customer</th>
                    <th className="py-3 px-4">Items</th>
                    <th className="py-3 px-4">Total</th>
                    <th className="py-3 px-4">Status &amp; Courier</th>
                    <th className="py-3 px-4">Tracking #</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-stone-700">
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-stone-400">
                        No orders matching the selected filter.
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-stone-50/70 transition-colors align-top">
                        <td className="py-3 px-4 font-mono whitespace-nowrap">
                          <span className="font-bold text-stone-900 block">{ord.id}</span>
                          <span className="text-[10px] text-stone-400">{ord.date}</span>
                        </td>
                        <td className="py-3 px-4">
                          <strong className="block text-stone-900">{ord.customerName}</strong>
                          <span className="text-[11px] text-stone-500 block">{ord.customerPhone}</span>
                          <span className="text-[10px] text-stone-400">{ord.customerCity}</span>
                        </td>
                        <td className="py-3 px-4 max-w-[220px]">
                          <div className="space-y-1">
                            {ord.items.map((it, idx) => (
                              <div key={idx} className="flex items-center gap-1 text-[11px]">
                                <span className="w-4 h-4 rounded bg-stone-200 text-stone-800 text-[10px] font-bold flex items-center justify-center shrink-0">
                                  {it.quantity}
                                </span>
                                <span className="font-medium text-stone-800 truncate">{it.productName}</span>
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap">
                          <span className="font-serif font-bold text-sm text-[#155D27] block">
                            PKR {ord.grandTotal.toLocaleString()}
                          </span>
                          <span className="text-[10px] text-stone-400">
                            {ord.paymentMode === 'Cash on Delivery (COD)' ? 'COD' : 'IBFT'}
                          </span>
                        </td>
                        <td className="py-3 px-4 space-y-1.5">
                          <select
                            value={ord.status}
                            onChange={(e) =>
                              handleUpdateOrder(ord.id, { status: e.target.value as AdminOrder['status'] })
                            }
                            className="px-2 py-1 text-[11px] font-semibold rounded-md border border-stone-300 bg-white focus:outline-none focus:border-[#155D27]"
                          >
                            <option value="Pending">Pending</option>
                            <option value="QC Verified">QC Verified</option>
                            <option value="Dispatched">Dispatched</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                          <div>
                            <select
                              value={ord.courierCompany || 'TCS'}
                              onChange={(e) =>
                                handleUpdateOrder(ord.id, {
                                  courierCompany: e.target.value as AdminOrder['courierCompany'],
                                })
                              }
                              className="px-2 py-0.5 text-[10px] rounded border border-stone-200 bg-stone-50 text-stone-600 focus:outline-none"
                            >
                              <option value="TCS">TCS Express</option>
                              <option value="Leopards">Leopards</option>
                              <option value="M&P">M&amp;P</option>
                              <option value="Call Courier">Call Courier</option>
                              <option value="Trax">Trax</option>
                            </select>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1">
                            <input
                              type="text"
                              value={
                                trackingDrafts[ord.id] !== undefined
                                  ? trackingDrafts[ord.id]
                                  : ord.courierTracking || ''
                              }
                              onChange={(e) =>
                                setTrackingDrafts((prev) => ({ ...prev, [ord.id]: e.target.value }))
                              }
                              placeholder="Tracking #"
                              className="w-28 px-2 py-1 text-[11px] font-mono border border-stone-200 rounded bg-stone-50 focus:bg-white focus:outline-none focus:border-[#155D27]"
                            />
                            {trackingDrafts[ord.id] !== undefined &&
                              trackingDrafts[ord.id] !== (ord.courierTracking || '') && (
                                <button
                                  onClick={() => {
                                    handleUpdateOrder(
                                      ord.id,
                                      { courierTracking: trackingDrafts[ord.id] },
                                      `Tracking saved for #${ord.id}`
                                    );
                                  }}
                                  className="px-2 py-1 bg-[#155D27] text-white text-[10px] font-semibold rounded cursor-pointer whitespace-nowrap"
                                >
                                  Save
                                </button>
                              )}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => setReceiptOrder(ord)}
                              className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 text-[11px] font-semibold rounded-md transition-colors cursor-pointer inline-flex items-center gap-1 whitespace-nowrap"
                              title="View Invoice"
                            >
                              <FileText className="w-3 h-3" />
                              <span>Invoice</span>
                            </button>
                            <button
                              onClick={() =>
                                setConfirmDelete({
                                  type: 'order',
                                  id: ord.id,
                                  title: `Delete Order #${ord.id}?`,
                                  detail: `Customer: ${ord.customerName} (${ord.customerCity})`,
                                })
                              }
                              className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
                              title="Delete Order"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
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

        {/* ========================================= */}
        {/* TAB 2: FULL PRODUCT CATALOG MANAGER */}
        {/* ========================================= */}
        {activeAdminTab === 'products' && (
          <div className="bg-white rounded-2xl border border-stone-200 shadow-2xs p-4 sm:p-6 space-y-5">
            {/* Toolbar */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-stone-200 pb-4">
              <div>
                <h3 className="font-serif text-lg font-bold text-stone-900">
                  Product Catalog Manager ({filteredProducts.length})
                </h3>
                <p className="text-xs text-stone-500">
                  Add products with up to 15 images, set primary top image, duplicate, edit variants, or delete.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search products or SKU..."
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    className="pl-8 pr-3 py-1.5 bg-stone-50 border border-stone-300 rounded-lg text-xs focus:outline-none focus:border-[#155D27] w-48"
                  />
                </div>

                <select
                  value={productCatFilter}
                  onChange={(e) => setProductCatFilter(e.target.value)}
                  className="px-2.5 py-1.5 bg-stone-50 border border-stone-300 rounded-lg text-xs focus:outline-none focus:border-[#155D27]"
                >
                  <option value="all">All Categories</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>

                <button
                  onClick={openCreateProductModal}
                  className="px-3.5 py-1.5 bg-[#155D27] hover:bg-[#1C7A38] text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>New Product</span>
                </button>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="py-12 text-center text-stone-500 space-y-2">
                <Package className="w-8 h-8 mx-auto text-stone-300" />
                <p className="text-sm font-semibold">No products found.</p>
                <button
                  onClick={openCreateProductModal}
                  className="px-4 py-2 bg-[#155D27] text-white text-xs font-bold rounded-lg cursor-pointer whitespace-nowrap"
                >
                  + Add Your First Product
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredProducts.map((prod) => {
                  const galleryCount = prod.images?.length || (prod.image ? 1 : 0);
                  return (
                    <div
                      key={prod.id}
                      className="bg-[#FAF9F5] border border-stone-200 rounded-2xl p-4 flex flex-col justify-between space-y-3 hover:border-[#155D27]/40 transition-colors"
                    >
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="relative w-20 h-24 rounded-xl bg-white border border-stone-200 overflow-hidden p-1.5 flex items-center justify-center shrink-0">
                            <img
                              src={prod.image}
                              alt={prod.name}
                              className="w-full h-full object-contain"
                            />
                            <span className="absolute bottom-1 right-1 bg-stone-900/75 text-white text-[9px] font-mono px-1.5 py-0.5 rounded">
                              {galleryCount} img{galleryCount !== 1 ? 's' : ''}
                            </span>
                          </div>

                          <div className="min-w-0 flex-1 space-y-1">
                            <div className="flex items-center justify-between gap-1">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-[#C28E3A] truncate">
                                {getCategoryName(prod.category)}
                              </span>
                              <button
                                onClick={() => handleToggleStock(prod)}
                                className={`text-[9px] font-bold px-2 py-0.5 rounded-full cursor-pointer whitespace-nowrap ${
                                  prod.inStock
                                    ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                    : 'bg-red-100 text-red-700 hover:bg-red-200'
                                }`}
                                title="Click to toggle stock status"
                              >
                                {prod.inStock ? 'In Stock' : 'Out of Stock'}
                              </button>
                            </div>

                            <h4 className="font-serif font-bold text-sm text-stone-900 line-clamp-2 leading-snug">
                              {prod.name}
                            </h4>

                            <div className="flex items-baseline gap-2">
                              <span className="font-mono text-xs font-bold text-[#155D27]">
                                PKR {prod.price.toLocaleString()}
                              </span>
                              {prod.compareAtPrice && prod.compareAtPrice > prod.price && (
                                <span className="font-mono text-[10px] text-stone-400 line-through">
                                  PKR {prod.compareAtPrice.toLocaleString()}
                                </span>
                              )}
                            </div>

                            <div className="text-[10px] text-stone-500 flex items-center gap-2 flex-wrap">
                              <span>{prod.weight}</span>
                              <span>·</span>
                              <span>{prod.packagingType || 'Pack'}</span>
                              {prod.sku && (
                                <>
                                  <span>·</span>
                                  <span className="font-mono">{prod.sku}</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        {prod.variants && prod.variants.length > 0 && (
                          <div className="bg-white p-2 rounded-xl border border-stone-200/80 text-[10px] space-y-1">
                            <span className="font-bold text-stone-400 uppercase tracking-wider block">
                              Variants ({prod.variants.length})
                            </span>
                            <div className="flex flex-wrap gap-1">
                              {prod.variants.map((v) => (
                                <span
                                  key={v.id}
                                  className="px-2 py-0.5 bg-stone-50 border border-stone-200 rounded text-stone-700 font-medium"
                                >
                                  {v.weight} — PKR {v.price.toLocaleString()}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Single-line Compact Actions */}
                      <div className="pt-2.5 border-t border-stone-200/80 flex items-center justify-between gap-1.5">
                        <button
                          onClick={() => openEditProductModal(prod)}
                          className="flex-1 px-2.5 py-1.5 bg-white hover:bg-stone-100 border border-stone-300 rounded-lg text-[11px] font-semibold text-stone-800 transition-colors flex items-center justify-center gap-1 cursor-pointer whitespace-nowrap"
                        >
                          <Edit2 className="w-3 h-3" />
                          <span>Edit</span>
                        </button>

                        <button
                          onClick={() => handleDuplicateProduct(prod)}
                          className="flex-1 px-2.5 py-1.5 bg-white hover:bg-emerald-50 border border-stone-300 hover:border-emerald-300 rounded-lg text-[11px] font-semibold text-stone-700 hover:text-[#155D27] transition-colors flex items-center justify-center gap-1 cursor-pointer whitespace-nowrap"
                        >
                          <Copy className="w-3 h-3" />
                          <span>Duplicate</span>
                        </button>

                        <button
                          onClick={() =>
                            setConfirmDelete({
                              type: 'product',
                              id: prod.id,
                              title: `Delete "${prod.name}"?`,
                              detail: 'This will permanently remove the product from your store and Firebase.',
                            })
                          }
                          className="px-2.5 py-1.5 bg-white hover:bg-red-50 border border-stone-300 hover:border-red-300 rounded-lg text-[11px] font-semibold text-red-600 transition-colors flex items-center justify-center gap-1 cursor-pointer whitespace-nowrap"
                          title="Delete Product"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ========================================= */}
        {/* TAB 3: CATEGORIES MANAGER */}
        {/* ========================================= */}
        {activeAdminTab === 'categories' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* Add / Edit Category Form */}
            <div className="lg:col-span-4 bg-white rounded-2xl border border-stone-200 shadow-2xs p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-lg font-bold text-stone-900">
                  {editingCat ? 'Edit Category' : 'Add Category'}
                </h3>
                {editingCat && (
                  <button
                    onClick={() => {
                      setEditingCat(null);
                      setCatName('');
                      setCatDesc('');
                    }}
                    className="text-xs text-stone-500 hover:text-stone-800 cursor-pointer"
                  >
                    Cancel Edit
                  </button>
                )}
              </div>

              <form onSubmit={handleSaveCategory} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Category Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={catName}
                    onChange={(e) => setCatName(e.target.value)}
                    placeholder="e.g. Organic Herbal Teas"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:border-[#155D27] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Short Description
                  </label>
                  <textarea
                    rows={3}
                    value={catDesc}
                    onChange={(e) => setCatDesc(e.target.value)}
                    placeholder="Brief description shown in store filters..."
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:border-[#155D27] focus:bg-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#155D27] hover:bg-[#1C7A38] text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{editingCat ? 'Update Category' : 'Create Category'}</span>
                </button>
              </form>
            </div>

            {/* Categories List */}
            <div className="lg:col-span-8 bg-white rounded-2xl border border-stone-200 shadow-2xs p-5 space-y-4">
              <div>
                <h3 className="font-serif text-lg font-bold text-stone-900">
                  Active Store Categories ({categories.length})
                </h3>
                <p className="text-xs text-stone-500">
                  Categories dynamically populate navbar dropdowns and store filters.
                </p>
              </div>

              <div className="space-y-2.5">
                {categories.map((cat) => {
                  const prodCount = products.filter((p) => p.category === cat.id).length;
                  return (
                    <div
                      key={cat.id}
                      className="p-3.5 bg-[#FAF9F5] border border-stone-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <Tag className="w-3.5 h-3.5 text-[#155D27]" />
                          <strong className="font-serif text-sm text-stone-900">{cat.name}</strong>
                          <span className="text-[10px] font-mono bg-white border border-stone-200 text-stone-500 px-1.5 py-0.5 rounded">
                            {prodCount} item{prodCount !== 1 ? 's' : ''}
                          </span>
                        </div>
                        {cat.description && (
                          <p className="text-xs text-stone-500 pl-5">{cat.description}</p>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0 pl-5 sm:pl-0">
                        <button
                          onClick={() => {
                            setEditingCat(cat);
                            setCatName(cat.name);
                            setCatDesc(cat.description || '');
                          }}
                          className="px-2.5 py-1 bg-white hover:bg-stone-100 border border-stone-300 text-stone-700 text-[11px] font-semibold rounded-md cursor-pointer flex items-center gap-1 whitespace-nowrap"
                        >
                          <Edit2 className="w-3 h-3" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() =>
                            setConfirmDelete({
                              type: 'category',
                              id: cat.id,
                              title: `Delete category "${cat.name}"?`,
                              detail:
                                prodCount > 0
                                  ? `${prodCount} product(s) currently use this category. You can reassign them anytime.`
                                  : 'No products are currently assigned to this category.',
                            })
                          }
                          className="px-2.5 py-1 bg-white hover:bg-red-50 border border-stone-300 hover:border-red-300 text-red-600 text-[11px] font-semibold rounded-md cursor-pointer flex items-center gap-1 whitespace-nowrap"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ========================================= */}
        {/* TAB 4: CUSTOMER INQUIRIES & REVIEWS */}
        {/* ========================================= */}
        {activeAdminTab === 'reviews' && (
          <div className="bg-white rounded-2xl border border-stone-200 shadow-2xs p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-4">
              <div>
                <h3 className="font-serif text-lg font-bold text-stone-900">
                  Customer Inquiries &amp; Feedback ({filteredReviews.length})
                </h3>
                <p className="text-xs text-stone-500">
                  Approve, hide, or delete customer reviews synced with Firebase.
                </p>
              </div>
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search reviews..."
                  value={reviewSearch}
                  onChange={(e) => setReviewSearch(e.target.value)}
                  className="pl-8 pr-3 py-1.5 bg-stone-50 border border-stone-300 rounded-lg text-xs focus:outline-none focus:border-[#155D27] w-56"
                />
              </div>
            </div>

            <div className="space-y-3">
              {filteredReviews.map((rev) => {
                const isApproved = rev.isApproved !== false;
                return (
                  <div
                    key={rev.id}
                    className="p-4 bg-[#FAF9F5] border border-stone-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <strong className="text-stone-900 text-xs">{rev.name}</strong>
                        <span className="text-[10px] text-stone-400">({rev.city})</span>
                        <span className="text-[10px] bg-emerald-50 text-emerald-800 font-semibold px-2 py-0.5 rounded-full border border-emerald-200">
                          {rev.product}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            isApproved
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-stone-200 text-stone-600'
                          }`}
                        >
                          {isApproved ? 'Visible on Store' : 'Hidden'}
                        </span>
                      </div>
                      <p className="text-xs text-stone-600 leading-relaxed max-w-2xl">
                        "{rev.comment}"
                      </p>
                      <div className="flex items-center gap-1 text-[#C28E3A] text-xs pt-0.5">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-current" />
                        ))}
                        <span className="text-[10px] text-stone-400 pl-2">{rev.date}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => handleToggleReviewApproval(rev)}
                        className={`px-2.5 py-1.5 rounded-lg text-[11px] font-semibold flex items-center gap-1 cursor-pointer whitespace-nowrap border ${
                          isApproved
                            ? 'bg-white border-stone-300 text-stone-700 hover:bg-stone-100'
                            : 'bg-[#155D27] border-[#155D27] text-white hover:bg-[#1C7A38]'
                        }`}
                      >
                        {isApproved ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                        <span>{isApproved ? 'Hide' : 'Approve'}</span>
                      </button>

                      <button
                        onClick={() =>
                          setConfirmDelete({
                            type: 'review',
                            id: rev.id,
                            title: `Delete review by ${rev.name}?`,
                            detail: 'This feedback will be permanently deleted.',
                          })
                        }
                        className="px-2.5 py-1.5 bg-white hover:bg-red-50 border border-stone-300 hover:border-red-300 text-red-600 rounded-lg text-[11px] font-semibold flex items-center gap-1 cursor-pointer whitespace-nowrap"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* ========================================= */}
      {/* MODAL: FULL PRODUCT UPLOADER & EDITOR (UP TO 15 IMAGES) */}
      {/* ========================================= */}
      {productModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-stone-900/65 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col border border-stone-200 shadow-2xl overflow-hidden my-auto">
            {/* Modal Header */}
            <div className="px-5 py-4 border-b border-stone-200 flex items-center justify-between bg-[#FAF9F5]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#155D27]">
                  {productModal.isNew ? 'Create Store Product' : 'Edit Store Product'}
                </span>
                <h3 className="font-serif font-bold text-lg text-stone-900">
                  {productModal.isNew ? 'Add New Product & Gallery' : productModal.name}
                </h3>
              </div>
              <button
                onClick={() => setProductModal(null)}
                className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSaveProductModal} className="flex-1 overflow-y-auto p-5 space-y-6 text-xs">
              {/* SECTION 1: PRODUCT IMAGES (UP TO 15 IMAGES) */}
              <div className="bg-[#FAF9F5] p-4 rounded-xl border border-stone-200 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="font-serif font-bold text-sm text-stone-900 flex items-center gap-1.5">
                      <ImageIcon className="w-4 h-4 text-[#155D27]" />
                      <span>Product Images ({productModal.images.length} / 15)</span>
                    </h4>
                    <p className="text-[11px] text-stone-500">
                      Upload multiple photos from your device or add links. Click <strong>Set Top</strong> on any photo to make it the main cover image.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      ref={productImageInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleProductFilesUpload}
                      className="hidden"
                    />
                    <button
                      type="button"
                      disabled={uploadingImages || productModal.images.length >= 15}
                      onClick={() => productImageInputRef.current?.click()}
                      className="px-3 py-1.5 bg-[#155D27] hover:bg-[#1C7A38] disabled:opacity-50 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                    >
                      {uploadingImages ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Uploading...</span>
                        </>
                      ) : (
                        <>
                          <UploadCloud className="w-3.5 h-3.5" />
                          <span>Upload Photos</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Add via Image URL */}
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    placeholder="Or paste direct image URL (https://...)"
                    className="flex-1 px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-xs focus:outline-none focus:border-[#155D27]"
                  />
                  <button
                    type="button"
                    onClick={handleAddImageUrl}
                    className="px-3 py-1.5 bg-stone-800 hover:bg-stone-900 text-white text-xs font-semibold rounded-lg cursor-pointer whitespace-nowrap"
                  >
                    Add URL
                  </button>
                </div>

                {/* Image Previews Grid */}
                {productModal.images.length === 0 ? (
                  <div
                    onClick={() => productImageInputRef.current?.click()}
                    className="border-2 border-dashed border-stone-300 hover:border-[#155D27] rounded-xl p-6 text-center cursor-pointer bg-white transition-colors"
                  >
                    <UploadCloud className="w-7 h-7 text-stone-400 mx-auto mb-1.5" />
                    <p className="font-semibold text-stone-700">Click to select up to 15 product photos</p>
                    <p className="text-[11px] text-stone-400">JPG, PNG, WEBP supported</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
                    {productModal.images.map((imgUrl, idx) => (
                      <div
                        key={`${imgUrl}-${idx}`}
                        className={`relative bg-white rounded-xl p-1.5 border flex flex-col justify-between gap-1.5 ${
                          idx === 0 ? 'border-[#155D27] ring-2 ring-[#155D27]/20' : 'border-stone-200'
                        }`}
                      >
                        <div className="relative aspect-[3/4] bg-stone-50 rounded-lg overflow-hidden flex items-center justify-center p-1">
                          <img src={imgUrl} alt={`Gallery ${idx + 1}`} className="w-full h-full object-contain" />
                          {idx === 0 && (
                            <span className="absolute top-1 left-1 bg-[#155D27] text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">
                              Top Cover
                            </span>
                          )}
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(idx)}
                            className="absolute top-1 right-1 w-5 h-5 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center cursor-pointer"
                            title="Remove Image"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between gap-1">
                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={() => handleMoveImage(idx, -1)}
                            className="p-1 bg-stone-100 hover:bg-stone-200 disabled:opacity-30 rounded cursor-pointer"
                            title="Move Left"
                          >
                            <ArrowLeft className="w-3 h-3" />
                          </button>

                          {idx !== 0 ? (
                            <button
                              type="button"
                              onClick={() => handleSetTopImage(idx)}
                              className="flex-1 py-0.5 px-1 bg-emerald-50 hover:bg-[#155D27] text-[#155D27] hover:text-white border border-emerald-200 rounded text-[10px] font-bold flex items-center justify-center gap-0.5 cursor-pointer whitespace-nowrap transition-colors"
                            >
                              <ArrowUp className="w-2.5 h-2.5" />
                              <span>Set Top</span>
                            </button>
                          ) : (
                            <span className="flex-1 text-center text-[10px] font-bold text-[#155D27]">
                              Primary
                            </span>
                          )}

                          <button
                            type="button"
                            disabled={idx === productModal.images.length - 1}
                            onClick={() => handleMoveImage(idx, 1)}
                            className="p-1 bg-stone-100 hover:bg-stone-200 disabled:opacity-30 rounded cursor-pointer"
                            title="Move Right"
                          >
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* SECTION 2: CORE PRODUCT DETAILS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-stone-700 mb-1">Product Title *</label>
                  <input
                    type="text"
                    required
                    value={productModal.name}
                    onChange={(e) => setProductModal({ ...productModal, name: e.target.value })}
                    placeholder="e.g. Terra Herbs-8 Organic Blend"
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-[#155D27]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Category *</label>
                  <select
                    value={productModal.category}
                    onChange={(e) => setProductModal({ ...productModal, category: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg bg-white focus:outline-none focus:border-[#155D27]"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-stone-700 mb-1">Subtitle / Tagline</label>
                  <input
                    type="text"
                    value={productModal.subtitle}
                    onChange={(e) => setProductModal({ ...productModal, subtitle: e.target.value })}
                    placeholder="e.g. Pure Unheated Mountain Nectar"
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-[#155D27]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">SKU Code</label>
                  <input
                    type="text"
                    value={productModal.sku}
                    onChange={(e) => setProductModal({ ...productModal, sku: e.target.value })}
                    placeholder="e.g. AMM-TH8-200"
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg font-mono focus:outline-none focus:border-[#155D27]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Price (PKR) *</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={productModal.price}
                    onChange={(e) => setProductModal({ ...productModal, price: e.target.value })}
                    placeholder="1450"
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg font-mono focus:outline-none focus:border-[#155D27]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Compare-at Price (Optional)</label>
                  <input
                    type="number"
                    min={0}
                    value={productModal.compareAtPrice}
                    onChange={(e) => setProductModal({ ...productModal, compareAtPrice: e.target.value })}
                    placeholder="Original MRP e.g. 1800"
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg font-mono focus:outline-none focus:border-[#155D27]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Net Weight / Volume *</label>
                  <input
                    type="text"
                    required
                    value={productModal.weight}
                    onChange={(e) => setProductModal({ ...productModal, weight: e.target.value })}
                    placeholder="e.g. 200 grams or 5 Liter"
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-[#155D27]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Packaging Type</label>
                  <select
                    value={productModal.packagingType}
                    onChange={(e) => setProductModal({ ...productModal, packagingType: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg bg-white focus:outline-none focus:border-[#155D27]"
                  >
                    <option value="Stand up Pouch">Stand up Pouch</option>
                    <option value="Bottle">Bottle</option>
                    <option value="Jar">Jar</option>
                    <option value="Tin">Tin</option>
                    <option value="Sache">Sache</option>
                    <option value="Box">Box</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Delivery Option</label>
                  <select
                    value={productModal.delivery}
                    onChange={(e) =>
                      setProductModal({
                        ...productModal,
                        delivery: e.target.value as 'Free' | 'Charges applied',
                      })
                    }
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg bg-white focus:outline-none focus:border-[#155D27]"
                  >
                    <option value="Free">Free Delivery</option>
                    <option value="Charges applied">Charges applied</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Promo Badge (Optional)</label>
                  <input
                    type="text"
                    value={productModal.badge}
                    onChange={(e) => setProductModal({ ...productModal, badge: e.target.value })}
                    placeholder="e.g. Free Delivery or Best Seller"
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-[#155D27]"
                  />
                </div>
              </div>

              {/* Toggles */}
              <div className="flex flex-wrap items-center gap-6 bg-stone-50 px-4 py-2.5 rounded-xl border border-stone-200">
                <label className="flex items-center gap-2 cursor-pointer font-semibold text-stone-800">
                  <input
                    type="checkbox"
                    checked={productModal.inStock}
                    onChange={(e) => setProductModal({ ...productModal, inStock: e.target.checked })}
                    className="w-4 h-4 accent-[#155D27]"
                  />
                  <span>In Stock (Available for Purchase)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer font-semibold text-stone-800">
                  <input
                    type="checkbox"
                    checked={productModal.isFlagship}
                    onChange={(e) => setProductModal({ ...productModal, isFlagship: e.target.checked })}
                    className="w-4 h-4 accent-[#155D27]"
                  />
                  <span>Mark as Flagship Highlight</span>
                </label>
              </div>

              {/* SECTION 3: PACKAGING VARIANTS */}
              <div className="bg-[#FAF9F5] p-4 rounded-xl border border-stone-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-serif font-bold text-sm text-stone-900">
                      Pack Sizes &amp; Variants (Optional)
                    </h4>
                    <p className="text-[11px] text-stone-500">
                      Add multiple weights/bottles (e.g. 500g Jar, 1000g Jar) with separate prices.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddVariantRow}
                    className="px-3 py-1 bg-white hover:bg-stone-100 border border-stone-300 text-stone-800 text-[11px] font-semibold rounded-lg flex items-center gap-1 cursor-pointer whitespace-nowrap"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add Variant</span>
                  </button>
                </div>

                {productModal.variants.length > 0 && (
                  <div className="space-y-2">
                    {productModal.variants.map((v, idx) => (
                      <div
                        key={v.id}
                        className="grid grid-cols-12 gap-2 items-center bg-white p-2 rounded-lg border border-stone-200"
                      >
                        <input
                          type="text"
                          value={v.weight}
                          onChange={(e) => handleUpdateVariantRow(idx, 'weight', e.target.value)}
                          placeholder="Weight e.g. 500g"
                          className="col-span-4 px-2 py-1 border border-stone-300 rounded text-xs"
                        />
                        <input
                          type="text"
                          value={v.packagingType}
                          onChange={(e) => handleUpdateVariantRow(idx, 'packagingType', e.target.value)}
                          placeholder="Jar / Tin"
                          className="col-span-3 px-2 py-1 border border-stone-300 rounded text-xs"
                        />
                        <input
                          type="number"
                          value={v.price}
                          onChange={(e) => handleUpdateVariantRow(idx, 'price', Number(e.target.value))}
                          placeholder="PKR"
                          className="col-span-2 px-2 py-1 border border-stone-300 rounded text-xs font-mono"
                        />
                        <select
                          value={v.delivery}
                          onChange={(e) => handleUpdateVariantRow(idx, 'delivery', e.target.value)}
                          className="col-span-2 px-1.5 py-1 border border-stone-300 rounded text-[11px] bg-white"
                        >
                          <option value="Free">Free Del.</option>
                          <option value="Charges applied">Std Del.</option>
                        </select>
                        <button
                          type="button"
                          onClick={() => handleRemoveVariantRow(idx)}
                          className="col-span-1 p-1 text-red-500 hover:bg-red-50 rounded flex items-center justify-center cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* SECTION 4: DESCRIPTIONS & BENEFITS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-stone-700 mb-1">Short Description</label>
                  <textarea
                    rows={2}
                    value={productModal.shortDescription}
                    onChange={(e) => setProductModal({ ...productModal, shortDescription: e.target.value })}
                    placeholder="Concise overview shown on cards and top of product page..."
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-[#155D27]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-stone-700 mb-1">Full Detailed Description</label>
                  <textarea
                    rows={3}
                    value={productModal.fullDescription}
                    onChange={(e) => setProductModal({ ...productModal, fullDescription: e.target.value })}
                    placeholder="Complete product story, sourcing origin, and lab testing details..."
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-[#155D27]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Key Benefits (One per line)
                  </label>
                  <textarea
                    rows={4}
                    value={productModal.benefitsText}
                    onChange={(e) => setProductModal({ ...productModal, benefitsText: e.target.value })}
                    placeholder={"100% Pure & Natural\nZero Artificial Additives\nSupports Immunity"}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-[#155D27]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Directions &amp; Storage</label>
                  <textarea
                    rows={4}
                    value={productModal.directions}
                    onChange={(e) => setProductModal({ ...productModal, directions: e.target.value })}
                    placeholder="How to use daily and storage instructions..."
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-[#155D27]"
                  />
                </div>
              </div>

              {/* Sticky Footer Action */}
              <div className="pt-3 border-t border-stone-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setProductModal(null)}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-xl cursor-pointer whitespace-nowrap"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingProduct || uploadingImages}
                  className="px-5 py-2 bg-[#155D27] hover:bg-[#1C7A38] disabled:opacity-50 text-white text-xs font-bold rounded-xl cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{savingProduct ? 'Saving...' : productModal.isNew ? 'Publish Product' : 'Save Changes'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================= */}
      {/* MODAL: IN-UI DELETE CONFIRMATION */}
      {/* ========================================= */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full border border-stone-200 shadow-2xl space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-serif font-bold text-base text-stone-900">{confirmDelete.title}</h4>
                {confirmDelete.detail && <p className="text-xs text-stone-500">{confirmDelete.detail}</p>}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setConfirmDelete(null)}
                className="px-3.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-lg cursor-pointer whitespace-nowrap"
              >
                Cancel
              </button>
              <button
                onClick={executeConfirmDelete}
                className="px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg cursor-pointer whitespace-nowrap"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================= */}
      {/* MODAL: ORDER INVOICE / RECEIPT */}
      {/* ========================================= */}
      {receiptOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 sm:p-7 max-w-lg w-full border border-stone-200 shadow-2xl space-y-4">
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
                className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-xl flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <Printer className="w-4 h-4" />
                <span>Print Invoice</span>
              </button>
              <button
                onClick={() => setReceiptOrder(null)}
                className="px-4 py-2 bg-[#155D27] hover:bg-[#1C7A38] text-white text-xs font-bold rounded-xl cursor-pointer whitespace-nowrap"
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
