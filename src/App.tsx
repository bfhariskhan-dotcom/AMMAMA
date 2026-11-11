import React, { useState, useEffect } from 'react';
import { PageTab, Product, CartItem } from './types';
import { PRODUCTS } from './data/companyData';
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
import { MousePointer2, Sparkles } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<PageTab>('home');
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
  const [selectedProductForPage, setSelectedProductForPage] = useState<Product>(() => PRODUCTS[0]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [cursorActive, setCursorActive] = useState<boolean>(true);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');

  // Listen to hash changes for direct product URLs e.g. #product/canola-cooking-oil
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#product/')) {
        const prodId = hash.replace('#product/', '');
        const found = PRODUCTS.find((p) => p.id === prodId);
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

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-900 selection:bg-[#1C432E] selection:text-white">
      {/* Custom organic trailing cursor */}
      <CustomCursor enabled={cursorActive} />

      {/* Main Navigation Top Bar with Dropdowns and AmmamaLogo */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={totalCartCount}
        openCart={() => setIsCartOpen(true)}
        onSelectProductCategory={(cat) => setSelectedCategoryFilter(cat)}
      />

      {/* Dynamic Page Routing View */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomePage
            setActiveTab={setActiveTab}
            onOpenSingleProduct={handleOpenSingleProduct}
            onAddToCart={handleAddToCart}
            onShowToast={setToastMessage}
          />
        )}

        {activeTab === 'products' && (
          <ProductsPage
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
          <CustomerHubPage onShowToast={setToastMessage} />
        )}

        {activeTab === 'governance' && (
          <GovernancePage />
        )}

        {activeTab === 'admin' && (
          <AdminPage onShowToast={setToastMessage} />
        )}
      </main>

      {/* Corporate Minimalist Footer */}
      <Footer setActiveTab={setActiveTab} />

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
