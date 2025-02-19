import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging } from "firebase/messaging";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQ6FVR2ClayEpDjoPR7IbwRI0v-yL32uo",
  authDomain: "soomin-dea03.firebaseapp.com",
  projectId: "soomin-dea03",
  storageBucket: "soomin-dea03.firebasestorage.app",
  messagingSenderId: "734841305174",
  appId: "1:734841305174:web:46a9328b9bbae6265423f7",
  measurementId: "G-B0493L6PWE",
};

/* FIreBase 초기화화 */
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const messaging = getMessaging(app);

export { app, analytics, messaging };
