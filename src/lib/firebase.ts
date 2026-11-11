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
  getDocs,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { AdminOrder, ReviewItem } from '../types';

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

// Authentication helper
export const loginAdmin = async (email: string, pass: string) => {
  return await signInWithEmailAndPassword(auth, email, pass);
};

export const logoutAdmin = async () => {
  return await signOut(auth);
};

export const onAdminAuthChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

// Firestore Order Sync Helpers
export const syncOrderToFirestore = async (order: AdminOrder): Promise<boolean> => {
  try {
    const orderRef = doc(db, 'orders', order.id);
    await setDoc(
      orderRef,
      {
        ...order,
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
    const q = query(ordersCol, orderBy('date', 'desc'));
    const snapshot = await getDocs(q);
    if (snapshot.empty) return null;
    return snapshot.docs.map((docSnap) => docSnap.data() as AdminOrder);
  } catch (error) {
    console.warn('Could not fetch orders from Firestore:', error);
    return null;
  }
};

// Firestore Customer Feedback Sync Helpers
export const syncFeedbackToFirestore = async (feedback: ReviewItem): Promise<boolean> => {
  try {
    const feedbackRef = doc(db, 'feedback', feedback.id);
    await setDoc(
      feedbackRef,
      {
        ...feedback,
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

export default app;
