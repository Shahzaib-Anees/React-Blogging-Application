import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyB0saTNdnyRCyy5l9Z3rhe0HwsxTBZyRio",
  authDomain: "react-blogging-app-f1364.firebaseapp.com",
  projectId: "react-blogging-app-f1364",
  storageBucket: "react-blogging-app-f1364.appspot.com",
  messagingSenderId: "207929886597",
  appId: "1:207929886597:web:d1096474199b245670a6ec",
  measurementId: "G-2R0V1R2NS4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { analytics, db, auth, storage };
