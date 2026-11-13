import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  deleteDoc,
  serverTimestamp,
  writeBatch,
} from 'firebase/firestore';
import { AdminOrder, CategoryItem, Product, ReviewItem } from '../types';

export const firebaseConfig = {
  apiKey: "AIzaSyBymapKputgoiPSoj6bQT8VlHCuI3KpyV0",
  authDomain: "ammama-bfdde.firebaseapp.com",
  projectId: "ammama-bfdde",
  storageBucket: "ammama-bfdde.firebasestorage.app",
  messagingSenderId: "543243685153",
  appId: "1:543243685153:web:48e5cc435f6b79f9ad8260",
  measurementId: "G-3LMWKQ21NP",
};

// Verified Admin UID provided by owner
export const SUPER_ADMIN_UID = "OOTzkvnl9uMtd6yDY6D4fojphwv2";

// Initialize Firebase safely
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Authentication helpers
export const loginAdmin = async (email: string, pass: string) => {
  return await signInWithEmailAndPassword(auth, email, pass);
};

export const logoutAdmin = async () => {
  return await signOut(auth);
};

export const onAdminAuthChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

// Remove undefined values recursively before writing to Firestore
function cleanForFirestore<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

// =======================
// ORDERS FIRESTORE CRUD
// =======================
export const syncOrderToFirestore = async (order: AdminOrder): Promise<boolean> => {
  try {
    const orderRef = doc(db, 'orders', order.id);
    await setDoc(
      orderRef,
      {
        ...cleanForFirestore(order),
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
    return true;
  } catch (error) {
    console.warn('Firebase order sync fallback to local storage:', error);
    return false;
  }
};

export const fetchOrdersFromFirestore = async (): Promise<AdminOrder[] | null> => {
  try {
    const ordersCol = collection(db, 'orders');
    const snapshot = await getDocs(ordersCol);
    if (snapshot.empty) return [];
    const list = snapshot.docs.map((docSnap) => docSnap.data() as AdminOrder);
    return list.reverse();
  } catch (error) {
    console.warn('Could not fetch orders from Firestore:', error);
    return null;
  }
};

export const fetchOrderByIdFromFirestore = async (orderId: string): Promise<AdminOrder | null> => {
  try {
    const orderRef = doc(db, 'orders', orderId.trim().toUpperCase());
    const snap = await getDoc(orderRef);
    if (!snap.exists()) return null;
    return snap.data() as AdminOrder;
  } catch (error) {
    console.warn('Could not fetch order by ID:', error);
    return null;
  }
};

export const deleteOrderFromFirestore = async (orderId: string): Promise<boolean> => {
  try {
    await deleteDoc(doc(db, 'orders', orderId));
    return true;
  } catch (error) {
    console.warn('Could not delete order from Firestore:', error);
    return false;
  }
};

// =======================
// PRODUCTS FIRESTORE CRUD
// =======================
export const fetchProductsFromFirestore = async (): Promise<Product[] | null> => {
  try {
    const colRef = collection(db, 'products');
    const snapshot = await getDocs(colRef);
    if (snapshot.empty) return null;
    const list = snapshot.docs.map((d) => d.data() as Product);
    return list.sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));
  } catch (error) {
    console.warn('Could not fetch products from Firestore:', error);
    return null;
  }
};

export const saveProductToFirestore = async (product: Product): Promise<boolean> => {
  try {
    const prodRef = doc(db, 'products', product.id);
    await setDoc(
      prodRef,
      {
        ...cleanForFirestore(product),
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
    return true;
  } catch (error) {
    console.warn('Could not save product to Firestore:', error);
    return false;
  }
};

export const deleteProductFromFirestore = async (productId: string): Promise<boolean> => {
  try {
    await deleteDoc(doc(db, 'products', productId));
    return true;
  } catch (error) {
    console.warn('Could not delete product from Firestore:', error);
    return false;
  }
};

export const syncAllProductsToFirestore = async (products: Product[]): Promise<boolean> => {
  try {
    const batch = writeBatch(db);
    products.forEach((p, idx) => {
      const ref = doc(db, 'products', p.id);
      batch.set(ref, { ...cleanForFirestore(p), createdAt: p.createdAt || idx + 1, updatedAt: serverTimestamp() }, { merge: true });
    });
    await batch.commit();
    return true;
  } catch (error) {
    console.warn('Could not batch sync products:', error);
    return false;
  }
};

// =======================
// CATEGORIES FIRESTORE CRUD
// =======================
export const fetchCategoriesFromFirestore = async (): Promise<CategoryItem[] | null> => {
  try {
    const colRef = collection(db, 'categories');
    const snapshot = await getDocs(colRef);
    if (snapshot.empty) return null;
    const list = snapshot.docs.map((d) => d.data() as CategoryItem);
    return list.sort((a, b) => (a.order || 0) - (b.order || 0));
  } catch (error) {
    console.warn('Could not fetch categories from Firestore:', error);
    return null;
  }
};

export const saveCategoryToFirestore = async (category: CategoryItem): Promise<boolean> => {
  try {
    const catRef = doc(db, 'categories', category.id);
    await setDoc(
      catRef,
      {
        ...cleanForFirestore(category),
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
    return true;
  } catch (error) {
    console.warn('Could not save category to Firestore:', error);
    return false;
  }
};

export const deleteCategoryFromFirestore = async (categoryId: string): Promise<boolean> => {
  try {
    await deleteDoc(doc(db, 'categories', categoryId));
    return true;
  } catch (error) {
    console.warn('Could not delete category from Firestore:', error);
    return false;
  }
};

export const syncAllCategoriesToFirestore = async (categories: CategoryItem[]): Promise<boolean> => {
  try {
    const batch = writeBatch(db);
    categories.forEach((c, idx) => {
      const ref = doc(db, 'categories', c.id);
      batch.set(ref, { ...cleanForFirestore(c), order: c.order || idx + 1 }, { merge: true });
    });
    await batch.commit();
    return true;
  } catch (error) {
    console.warn('Could not batch sync categories:', error);
    return false;
  }
};

// =======================
// FEEDBACK / REVIEWS CRUD
// =======================
export const syncFeedbackToFirestore = async (feedback: ReviewItem): Promise<boolean> => {
  try {
    const feedbackRef = doc(db, 'feedback', feedback.id);
    await setDoc(
      feedbackRef,
      {
        ...cleanForFirestore(feedback),
        submittedAt: serverTimestamp(),
      },
      { merge: true }
    );
    return true;
  } catch (error) {
    console.warn('Firebase feedback sync fallback:', error);
    return false;
  }
};

export const fetchFeedbackFromFirestore = async (): Promise<ReviewItem[] | null> => {
  try {
    const feedbackCol = collection(db, 'feedback');
    const snapshot = await getDocs(feedbackCol);
    if (snapshot.empty) return null;
    return snapshot.docs.map((docSnap) => docSnap.data() as ReviewItem);
  } catch (error) {
    console.warn('Could not fetch feedback from Firestore:', error);
    return null;
  }
};

export const deleteFeedbackFromFirestore = async (feedbackId: string): Promise<boolean> => {
  try {
    await deleteDoc(doc(db, 'feedback', feedbackId));
    return true;
  } catch (error) {
    console.warn('Could not delete feedback from Firestore:', error);
    return false;
  }
};

export default app;
