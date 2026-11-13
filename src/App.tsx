import React, { useState, useEffect, useRef } from 'react';
import { PageTab, Product, CartItem, CategoryItem, ReviewItem } from './types';
import { PRODUCTS, DEFAULT_CATEGORIES, REVIEWS, BRAND_ASSETS } from './data/companyData';
import {
  fetchProductsFromFirestore,
  fetchCategoriesFromFirestore,
  fetchFeedbackFromFirestore,
} from './lib/firebase';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { CartDrawer } from './components/CartDrawer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { Toast } from './components/Toast';
import { QuickWhatsAppButton } from './components/QuickWhatsAppButton';

import { HomePage } from './pages/HomePage';
import { ContactPage } from './pages/ContactPage';
import { ProductsPage } from './pages/ProductsPage';
import { SingleProductPage } from './pages/SingleProductPage';
import { EventsPage } from './pages/EventsPage';
import { CareersPage } from './pages/CareersPage';
import { CustomerHubPage } from './pages/CustomerHubPage';
import { GovernancePage } from './pages/GovernancePage';
import { AdminPage } from './pages/AdminPage';
import { MousePointer2 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<PageTab>('home');

  const sanitizeProducts = (list: Product[]): Product[] =>
    list.map((p) => {
      let next = { ...p };
      if (next.id === 'cholestan-pure-desi-ghee') {
        const oldUrl = 'Change-name-for-Desi-Ghee';
        const unbundledPath = '/src/assets/images/cholestan_desi_ghee_';
        const cleanImg = BRAND_ASSETS.cholistanGhee;
        if (!next.image || next.image.includes(oldUrl) || next.image.includes(unbundledPath)) {
          next.image = cleanImg;
        }
        if (next.images) {
          next.images = next.images.map((img) =>
            img.includes(oldUrl) || img.includes(unbundledPath) ? cleanImg : img
          );
        }
      }
      if (next.id === 'pure-beiry-nectar-honey' && next.name === 'Pure Beiry Nectar Honey of Karak') {
        next.name = 'Pure Berry Honey - Karak';
      }
      if (next.id === 'terra-herbs-8' && next.composition) {
        next.composition = next.composition.map(({ amount: _removed, ...rest }) => rest);
      }
      return next;
    });

  const sanitizeCategories = (list: CategoryItem[]): CategoryItem[] =>
    list.map((c) =>
      c.id === 'honey' && c.name === 'Raw Karak Honey'
        ? { ...c, name: 'Pure Berry Honey - Karak' }
        : c
    );

  // Dynamic Catalog State (backed by localStorage + Firebase Firestore)
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('ammama_catalog_products_v3');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return sanitizeProducts(parsed);
      }
    } catch (e) {
      console.error(e);
    }
    return PRODUCTS;
  });

  const [categories, setCategories] = useState<CategoryItem[]>(() => {
    try {
      const saved = localStorage.getItem('ammama_catalog_categories_v3');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return sanitizeCategories(parsed);
      }
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_CATEGORIES;
  });

  const [reviews, setReviews] = useState<ReviewItem[]>(() => {
    try {
      const saved = localStorage.getItem('ammama_reviews_v3');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return REVIEWS;
  });

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('ammama_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedProductForPage, setSelectedProductForPage] = useState<Product>(() => products[0] || PRODUCTS[0]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [cursorActive, setCursorActive] = useState<boolean>(true);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');

  const productsRef = useRef(products);
  productsRef.current = products;

  // Fetch live catalog, categories & reviews from Firebase Firestore on mount
  useEffect(() => {
    fetchProductsFromFirestore().then((remoteProducts) => {
      if (remoteProducts && remoteProducts.length > 0) {
        setProducts(sanitizeProducts(remoteProducts));
      }
    });

    fetchCategoriesFromFirestore().then((remoteCategories) => {
      if (remoteCategories && remoteCategories.length > 0) {
        setCategories(sanitizeCategories(remoteCategories));
      }
    });

    fetchFeedbackFromFirestore().then((remoteReviews) => {
      if (remoteReviews && remoteReviews.length > 0) {
        setReviews(remoteReviews);
      }
    });
  }, []);

  // Persist catalog, categories & reviews locally for instant reloads
  useEffect(() => {
    try {
      localStorage.setItem('ammama_catalog_products_v3', JSON.stringify(products));
    } catch (e) {
      console.error('Failed to persist products:', e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('ammama_catalog_categories_v3', JSON.stringify(categories));
    } catch (e) {
      console.error('Failed to persist categories:', e);
    }
  }, [categories]);

  useEffect(() => {
    try {
      localStorage.setItem('ammama_reviews_v3', JSON.stringify(reviews));
    } catch (e) {
      console.error('Failed to persist reviews:', e);
    }
  }, [reviews]);

  // Keep selectedProductForPage synced if edited in Admin
  useEffect(() => {
    const updated = products.find((p) => p.id === selectedProductForPage?.id);
    if (updated) {
      setSelectedProductForPage(updated);
    } else if (products.length > 0) {
      setSelectedProductForPage(products[0]);
    }
  }, [products, selectedProductForPage?.id]);

  // Listen to hash changes for direct URLs
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#product/')) {
        const prodId = hash.replace('#product/', '');
        const found = productsRef.current.find((p) => p.id === prodId);
        if (found) {
          setSelectedProductForPage(found);
          setActiveTab('single-product');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else if (hash === '#admin') {
        setActiveTab('admin');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#store' || hash === '#products') {
        setActiveTab('products');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleOpenSingleProduct = (product: Product) => {
    setSelectedProductForPage(product);
    setActiveTab('single-product');
    window.location.hash = `#product/${product.id}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Sync cart to local storage
  useEffect(() => {
    try {
      localStorage.setItem('ammama_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to sync cart:', e);
    }
  }, [cartItems]);

  const handleAddToCart = (product: Product, quantity: number = 1, variant?: any) => {
    setCartItems((prev) => {
      const existing = prev.find((item) =>
        variant
          ? item.product.id === product.id && item.selectedVariant?.id === variant.id
          : item.product.id === product.id
      );
      if (existing) {
        return prev.map((item) =>
          (variant
            ? item.product.id === product.id && item.selectedVariant?.id === variant.id
            : item.product.id === product.id)
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, selectedVariant: variant }];
    });
    const spec = variant ? ` (${variant.weight})` : '';
    setToastMessage(`Added ${quantity} × ${product.name}${spec} to cart.`);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
    setToastMessage('Item removed from cart.');
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleAddReview = (newRev: ReviewItem) => {
    setReviews((prev) => [newRev, ...prev]);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-900 selection:bg-[#1C432E] selection:text-white">
      {/* Custom organic trailing cursor */}
      <CustomCursor enabled={cursorActive} />

      {/* Main Navigation Top Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={totalCartCount}
        openCart={() => setIsCartOpen(true)}
        categories={categories}
        onSelectProductCategory={(cat) => setSelectedCategoryFilter(cat)}
      />

      {/* Dynamic Page Routing View */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomePage
            products={products}
            reviews={reviews.filter((r) => r.isApproved !== false)}
            setActiveTab={setActiveTab}
            onOpenSingleProduct={handleOpenSingleProduct}
            onAddToCart={handleAddToCart}
            onShowToast={setToastMessage}
          />
        )}

        {activeTab === 'products' && (
          <ProductsPage
            products={products}
            categories={categories}
            onOpenProductModal={(product) => setSelectedProduct(product)}
            onOpenSingleProduct={handleOpenSingleProduct}
            onAddToCart={handleAddToCart}
            onShowToast={setToastMessage}
            initialCategory={selectedCategoryFilter}
          />
        )}

        {activeTab === 'single-product' && (
          <SingleProductPage
            product={selectedProductForPage}
            products={products}
            reviews={reviews.filter((r) => r.isApproved !== false)}
            setActiveTab={setActiveTab}
            onSelectProduct={handleOpenSingleProduct}
            onAddToCart={handleAddToCart}
            onShowToast={setToastMessage}
          />
        )}

        {activeTab === 'contact' && (
          <ContactPage onShowToast={setToastMessage} />
        )}

        {activeTab === 'events' && (
          <EventsPage onShowToast={setToastMessage} />
        )}

        {activeTab === 'careers' && (
          <CareersPage onShowToast={setToastMessage} />
        )}

        {activeTab === 'customer-hub' && (
          <CustomerHubPage
            products={products}
            reviews={reviews}
            onAddReview={handleAddReview}
            onShowToast={setToastMessage}
          />
        )}

        {activeTab === 'governance' && <GovernancePage />}

        {activeTab === 'admin' && (
          <AdminPage
            products={products}
            setProducts={setProducts}
            categories={categories}
            setCategories={setCategories}
            reviews={reviews}
            setReviews={setReviews}
            onShowToast={setToastMessage}
          />
        )}
      </main>

      {/* Corporate Minimalist Footer */}
      <Footer
        products={products}
        setActiveTab={setActiveTab}
        onOpenSingleProduct={handleOpenSingleProduct}
      />

      {/* Floating Bottom Accessibility / Cursor Switcher (Desktop) */}
      <div className="fixed bottom-6 left-6 z-30 hidden sm:flex items-center gap-1.5 bg-white/90 backdrop-blur-xs px-2.5 py-1.5 rounded-full border border-stone-200 shadow-sm text-[11px] text-stone-600">
        <button
          onClick={() => setCursorActive(!cursorActive)}
          className="flex items-center gap-1 hover:text-[#1C432E] transition-colors cursor-pointer"
          title="Toggle custom botanical trailing cursor"
        >
          <MousePointer2 className="w-3.5 h-3.5 text-[#1C432E]" />
          <span>Cursor: {cursorActive ? 'Botanical' : 'Native'}</span>
        </button>
      </div>

      {/* Slide-over Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onShowToast={setToastMessage}
      />

      {/* Product Deep-Dive & Nutritional Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onShowToast={setToastMessage}
      />

      {/* Small Fixed Floating WhatsApp Contact Button */}
      <QuickWhatsAppButton />

      {/* Feedback Toast Notification */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}
