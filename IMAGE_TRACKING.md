# 📋 Image Tracking - Quản lý ảnh đề thi

File này dùng để theo dõi ảnh nào đã được xử lý (trích xuất câu hỏi vào website).
Khi bạn push thêm ảnh mới, hãy cập nhật phần "Chưa xử lý" bên dưới.

## Quy tắc đặt tên ảnh
- Đánh số thứ tự liên tục: `01.png`, `02.png`, ..., `31.png`, `32.png`, ...
- Mỗi ảnh chứa **1 câu hỏi trắc nghiệm** (4 đáp án A-D)
- Đặt trong folder: `Anh_De_Thi/`

## ✅ Đã xử lý (Processed)

| Từ ảnh | Đến ảnh | Số câu | Ghi chú |
|--------|---------|--------|---------|
| 01.png | 30.png  | 30     | Batch 1 - FUOverflow. Q16 là Python (không phải PRM), Q17 trùng Q1 |
| 31.png | 60.png  | 30     | Batch 2 - Topics: Broadcast, RecyclerView, Permissions, Google Maps, SQLite, MVC/MVP/MVVM, Retrofit, Notification, SharedPreferences. Q50 có 5 đáp án (A-E) |
| 61.png | 120.png | 60     | Batch 3 - Topics: Activity Lifecycle, Intents, BroadcastReceiver, Service, Content Provider, Sockets, Notifications, Layout, Fragment, RecyclerView, SQLite, Room, MVVM, Retrofit, Permissions, Architecture, Debugging, XML. Q88 có 5 đáp án (A-E). Q108/Q120 chọn 3 đáp án. |
| 121.png | 150.png | 30     | Batch 4 - Topics: Content Providers, Sockets, Android Studio, Simple Widgets, Intents, Fragment, Permissions, Threading, Service, Activity Lifecycle, Notifications. |
| 151.png | 200.png | 50     | Batch 5 - Topics: Fragments, Activities, Services, Intents, Android Components, ANR, AndroidManifest, Activity Lifecycle, UI Layout, setContentView, R.java, RecyclerView, Google Maps, Permissions, SharedPreferences, Environment, SQLite, MVC/MVP, BroadcastReceiver, Themes/Styles, Event Handling, Spinner. |
| 201.png | 240.png | 40     | Batch 6 - Topics: Fragments, Retrofit @Query, Socket, BroadcastReceiver, Intent Broadcast, MVVM, MVP, SharedPreferences, Services, IntentService, Location Permissions, Android Components, UI Thread, Google Maps, Room DAO, System.Net, Activity Template, SQLite Cursor, Intent Data, Activity Lifecycle, ViewHolder, Configuration Changes. |
| 241.png | 290.png | 50     | Batch 7 - Topics: Activity Lifecycle, Resources, Google API, View/Widget, Logcat, Services, ANR, Permissions, Themes, PendingIntent, onClick handler, finish(), Drawable, Notifications, RecyclerView, Content Provider CRUD, Room, Visibility, Camera Intent, Implicit/Explicit Intents, Spinner, NDK, Layout XML, Broadcasts, Sockets, LocalBroadcastManager, Java Threads, SQLite Concurrency, Fragments, Bundle Args, Virtual Keyboard, AVD Manager, app_name, Location Permissions, BroadcastReceiver, onReceive(), MVP/MVVM, AlertDialog Builder. |

## 🆕 Chưa xử lý (Pending)

Không có ảnh nào đang chờ xử lý.

## Cách sử dụng

1. **Push ảnh mới** vào folder `Anh_De_Thi/` (đánh số tiếp theo, ví dụ `121.png` → `150.png`)
2. **Cập nhật file này** — thêm 1 dòng mới vào bảng "Chưa xử lý":
   ```
   | 121.png | 150.png | Đề thi kỳ Summer 2025 |
   ```
3. **Nhắn Antigravity**: "Xử lý ảnh đề thi mới" — tôi sẽ đọc file này, biết cần bắt đầu từ đâu, và trích xuất tiếp.

## Thống kê
- **Tổng ảnh**: 290
- **Đã xử lý**: 290
- **Chưa xử lý**: 0
