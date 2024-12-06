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

// Lấy giá trị thời gian cố định từ localStorage (hoặc tạo mới nếu chưa có)
let sessionKey = localStorage.getItem("sessionKey");

if (!sessionKey) {
    // Nếu chưa có sessionKey (lần đầu vào website), tạo giá trị thời gian cố định
    const now = new Date();
    sessionKey = now.getFullYear().toString() +
        (now.getMonth() + 1).toString().padStart(2, '0') +
        now.getDate().toString().padStart(2, '0') +
        now.getHours().toString().padStart(2, '0') +
        now.getMinutes().toString().padStart(2, '0') +
        now.getSeconds().toString().padStart(2, '0') +
        now.getMilliseconds().toString().padStart(3, '0');
    // Lưu vào localStorage để sử dụng lại trong các lần truy cập sau
    localStorage.setItem("sessionKey", sessionKey);
}

// Hàm lưu dữ liệu vào Firebase
function submitData(page, data) {
    const sessionRef = firebase.database().ref("sessions/" + sessionKey + "/" + page);
    sessionRef.set(data)
        .then(() => {
            alert(page.charAt(0).toUpperCase() + page.slice(1) + " submitted with ID: " + sessionKey);
        })
        .catch((error) => {
            console.error("Error submitting " + page + ":", error);
        });
}

// Xử lý biểu mẫu gửi ngày
document.addEventListener("DOMContentLoaded", () => {

    // Xử lý biểu mẫu gửi ngày
    const dateForm = document.getElementById("dateForm");
    if (dateForm) {
        dateForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const date = document.getElementById("dateInput").value;
            submitData("date", { date });
        });
    }

    // Xử lý biểu mẫu gửi món ăn
    const foodForm = document.getElementById("foodForm");
    if (foodForm) {
        foodForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const selectedFoods = [];
            const foodSelections = document.querySelectorAll('input[name="food"]:checked');
            foodSelections.forEach(input => {
                selectedFoods.push(input.value);
            });

            const newFoodName = document.getElementById("newFoodName").value;
            const foodData = { selectedFoods, newFoodName };
            submitData("food", foodData);
        });
    }

    // Xử lý biểu mẫu gửi món tráng miệng
    const dessertForm = document.getElementById("dessertForm");
    if (dessertForm) {
        dessertForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const selectedDesserts = [];
            const dessertSelections = document.querySelectorAll('input[name="dessert"]:checked');
            dessertSelections.forEach(input => {
                selectedDesserts.push(input.value);
            });

            const newDessertName = document.getElementById("newDessertName").value;
            const dessertData = { selectedDesserts, newDessertName };
            submitData("dessert", dessertData);
        });
    }

    // Xử lý biểu mẫu gửi hoạt động
    const activitiesForm = document.getElementById("activitiesForm");
    if (activitiesForm) {
        activitiesForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const selectedActivities = [];
            const activitySelections = document.querySelectorAll('input[name="activities"]:checked');
            activitySelections.forEach(input => {
                selectedActivities.push(input.value);
            });

            const newActivitiesName = document.getElementById("newActivitiesName").value;
            const activitiesData = { selectedActivities, newActivitiesName };
            submitData("activities", activitiesData);
        });
    }

});
