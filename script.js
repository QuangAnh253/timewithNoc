// Cấu hình Firebase (thay YOUR_API_KEY và thông tin cấu hình của bạn)
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
  const app = firebase.initializeApp(firebaseConfig);
  const database = firebase.database(app);
  
  // Hàm tạo ID dựa trên thời gian với định dạng YYYYMMDDHHMMSS + số ngẫu nhiên
  function generateTimeBasedID() {
    const now = new Date();
    const datePart =
      now.getFullYear().toString() +
      (now.getMonth() + 1).toString().padStart(2, '0') +
      now.getDate().toString().padStart(2, '0') +
      now.getHours().toString().padStart(2, '0') +
      now.getMinutes().toString().padStart(2, '0') +
      now.getSeconds().toString().padStart(2, '0');
  
    const randomPart = Math.floor(Math.random() * 900 + 100); // Tạo số ngẫu nhiên để tránh trùng lặp
  
    return datePart + randomPart.toString();
  }
  
  // Xử lý biểu mẫu gửi ngày
  document.addEventListener("DOMContentLoaded", () => {
    const dateForm = document.getElementById("dateForm");
    if (dateForm) {
      dateForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const id = generateTimeBasedID();
        const date = document.getElementById("dateInput").value;
  
        firebase.database().ref("date/" + id).set({ id, date })
          .then(() => {
            alert("Date submitted with ID: " + id);
          })
          .catch((error) => {
            console.error("Error submitting date:", error);
          });
      });
    }
  
    // Xử lý biểu mẫu gửi món ăn
    const foodForm = document.getElementById("foodForm");
    if (foodForm) {
      foodForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const id = generateTimeBasedID();
        const foodName = document.getElementById("foodName").value;
        const isVegan = document.getElementById("isVegan").checked;
  
        firebase.database().ref("food/" + id).set({ id, foodName, isVegan })
          .then(() => {
            alert("Food submitted with ID: " + id);
          })
          .catch((error) => {
            console.error("Error submitting food:", error);
          });
      });
    }
  
    // Xử lý biểu mẫu gửi món tráng miệng
    const dessertForm = document.getElementById("dessertForm");
    if (dessertForm) {
      dessertForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const id = generateTimeBasedID();
        const dessertName = document.getElementById("dessertName").value;
        const isSweet = document.getElementById("isSweet").checked;
  
        firebase.database().ref("dessert/" + id).set({ id, dessertName, isSweet })
          .then(() => {
            alert("Dessert submitted with ID: " + id);
          })
          .catch((error) => {
            console.error("Error submitting dessert:", error);
          });
      });
    }
  
    // Xử lý biểu mẫu gửi hoạt động
    const activitiesForm = document.getElementById("activitiesForm");
    if (activitiesForm) {
      activitiesForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const id = generateTimeBasedID();
        const activityName1 = document.getElementById("activityName1").value;
        const activityName2 = document.getElementById("activityName2").value;
        const isOutdoor = document.getElementById("isOutdoor").checked;
  
        firebase.database().ref("activities/" + id).set({
          id,
          activityName1,
          activityName2,
          isOutdoor
        })
          .then(() => {
            alert("Activities submitted with ID: " + id);
          })
          .catch((error) => {
            console.error("Error submitting activities:", error);
          });
      });
    }
  });
  