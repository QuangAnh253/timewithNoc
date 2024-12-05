// Import các hàm cần thiết từ Firebase SDK
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set, push } from "firebase/database"; // Thêm các hàm từ Firebase Database

// Cấu hình Firebase của bạn
const firebaseConfig = {
  apiKey: "AIzaSyA7RLRXJie8CuieGbCw55OHUZuCkjfcbgY",
  authDomain: "datewithnoc.firebaseapp.com",
  databaseURL: "https://datewithnoc-default-rtdb.asia-southeast1.firebasedatabase.app", 
  projectId: "datewithnoc",
  storageBucket: "datewithnoc.appspot.com",
  messagingSenderId: "524265966270",
  appId: "1:524265966270:web:45b0a5e5853ec47437acef",
  measurementId: "G-6FP4EJR4XL"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);    

// Khởi tạo cơ sở dữ liệu Firebase
const database = getDatabase(app);

// Export các hàm cần thiết để sử dụng trong các trang khác
export { database, ref, set, push };
