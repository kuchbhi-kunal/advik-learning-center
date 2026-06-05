/* ============================================================
   Firebase configuration for the Advik parent portal.

   👉 REPLACE the values below with YOUR project's web config:
      Firebase Console → Project settings (gear icon) → "Your apps"
      → Web app → "SDK setup and configuration" → Config.

   These keys are SAFE to keep in frontend code — security is
   enforced by the Firestore rules (firestore.rules), not by
   hiding these values.
   ============================================================ */
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDnjMIqBSj4mmIfx2pvXltn1NJzynH4QuI",
  authDomain: "advik-ea1fd.firebaseapp.com",
  projectId: "advik-ea1fd",
  storageBucket: "advik-ea1fd.firebasestorage.app",
  messagingSenderId: "1028909665030",
  appId: "1:1028909665030:web:810018854105f6be73ec87",
  measurementId: "G-2ZGNJGWZ0H"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
