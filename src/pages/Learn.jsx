import { useState } from 'react';
import './Learn.css';

const chapters = [
  {
    id: 1,
    title: "Introduction to Android",
    title_vi: "Giới thiệu về Android",
    icon: "📱",
    clo: "CLO1",
    keywords: [
      { en: "Android SDK", vi: "Bộ công cụ phát triển Android" },
      { en: "Activity", vi: "Màn hình/giao diện người dùng" },
      { en: "AndroidManifest.xml", vi: "File khai báo cấu hình ứng dụng" },
      { en: "APK", vi: "Android Package - file cài đặt ứng dụng" },
    ],
    summary_vi: "Android là hệ điều hành di động phổ biến nhất do Google phát triển. Ứng dụng Android được viết bằng Java/Kotlin, build bằng Android SDK, và chạy trên máy ảo ART. Mỗi app có AndroidManifest.xml khai báo các Activity, Permission, và cấu hình.",
    examples: [
      {
        title: "Cấu trúc project Android cơ bản",
        code: `MyApp/
├── app/
│   ├── src/main/
│   │   ├── java/         ← Code Java/Kotlin
│   │   ├── res/          ← Resources (layout, images)
│   │   └── AndroidManifest.xml
│   └── build.gradle
└── build.gradle`
      }
    ]
  },
  {
    id: 2,
    title: "Simple Widgets & Controls",
    title_vi: "Widgets và Controls cơ bản",
    icon: "🎨",
    clo: "CLO2",
    keywords: [
      { en: "TextView", vi: "Hiển thị text" },
      { en: "EditText", vi: "Ô nhập liệu" },
      { en: "Button", vi: "Nút bấm" },
      { en: "ImageView", vi: "Hiển thị hình ảnh" },
      { en: "Toast", vi: "Thông báo ngắn" },
      { en: "CheckBox / RadioButton", vi: "Ô tích / Nút chọn" },
    ],
    summary_vi: "Android có nhiều widget (control) để xây dựng UI. TextView hiển thị text, EditText nhập liệu, Button xử lý sự kiện click, Toast hiển thị thông báo ngắn. Mỗi widget có thuộc tính (attributes) như id, width, height, text, padding.",
    examples: [
      {
        title: "Tạo Button và xử lý click",
        code: `// XML Layout
<Button
    android:id="@+id/btnClick"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="Click Me" />

// Java Code
Button btn = findViewById(R.id.btnClick);
btn.setOnClickListener(v -> {
    Toast.makeText(this, "Đã click!",
        Toast.LENGTH_SHORT).show();
});`
      }
    ]
  },
  {
    id: 3,
    title: "Layout Manager",
    title_vi: "Quản lý Layout",
    icon: "📐",
    clo: "CLO2",
    keywords: [
      { en: "LinearLayout", vi: "Sắp xếp theo hàng/cột" },
      { en: "RelativeLayout", vi: "Sắp xếp tương đối" },
      { en: "ConstraintLayout", vi: "Sắp xếp ràng buộc" },
      { en: "FrameLayout", vi: "Sắp xếp chồng lên nhau" },
      { en: "orientation", vi: "Hướng (ngang/dọc)" },
    ],
    summary_vi: "Layout Manager xác định cách sắp xếp các view con. LinearLayout xếp theo hàng (horizontal) hoặc cột (vertical). ConstraintLayout linh hoạt nhất, dùng ràng buộc. RelativeLayout xếp tương đối với view khác. FrameLayout chồng các view lên nhau.",
    examples: [
      {
        title: "LinearLayout - 2 button cạnh nhau",
        code: `<LinearLayout
    android:orientation="horizontal"
    android:layout_width="match_parent"
    android:layout_height="wrap_content">
    
    <Button android:text="Button 1"
        android:layout_weight="1"
        android:layout_width="0dp"
        android:layout_height="wrap_content"/>
    
    <Button android:text="Button 2"
        android:layout_weight="1"
        android:layout_width="0dp"
        android:layout_height="wrap_content"/>
</LinearLayout>`
      }
    ]
  },
  {
    id: 4,
    title: "Activity Lifecycle",
    title_vi: "Vòng đời Activity",
    icon: "🔄",
    clo: "CLO3",
    keywords: [
      { en: "onCreate()", vi: "Được gọi khi Activity tạo lần đầu" },
      { en: "onStart()", vi: "Activity bắt đầu hiển thị" },
      { en: "onResume()", vi: "Activity sẵn sàng tương tác" },
      { en: "onPause()", vi: "Activity bị che một phần" },
      { en: "onStop()", vi: "Activity không còn hiển thị" },
      { en: "onDestroy()", vi: "Activity bị hủy" },
    ],
    summary_vi: "Activity có vòng đời gồm 6 callback chính: onCreate() → onStart() → onResume() → [RUNNING] → onPause() → onStop() → onDestroy(). Hiểu lifecycle giúp quản lý tài nguyên, lưu/khôi phục state, và tránh memory leak. onCreate() là nơi khởi tạo UI (setContentView).",
    examples: [
      {
        title: "Override các lifecycle callbacks",
        code: `public class MainActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle saved) {
        super.onCreate(saved);
        setContentView(R.layout.activity_main);
        // Khởi tạo UI ở đây
    }

    @Override
    protected void onResume() {
        super.onResume();
        // Khôi phục dữ liệu, kết nối sensor
    }

    @Override
    protected void onPause() {
        super.onPause();
        // Lưu dữ liệu, ngắt sensor
    }
}`
      }
    ]
  },
  {
    id: 5,
    title: "Intents & Navigation",
    title_vi: "Intent và Điều hướng",
    icon: "🔗",
    clo: "CLO3",
    keywords: [
      { en: "Explicit Intent", vi: "Intent tường minh - chỉ rõ Activity đích" },
      { en: "Implicit Intent", vi: "Intent ngầm định - khai báo action chung" },
      { en: "putExtra()", vi: "Gửi dữ liệu kèm theo Intent" },
      { en: "getIntent()", vi: "Nhận Intent trong Activity đích" },
      { en: "startActivity()", vi: "Mở Activity mới" },
    ],
    summary_vi: "Intent là đối tượng 'tin nhắn' để giao tiếp giữa các component Android. Explicit Intent chỉ rõ Activity đích (dùng trong app). Implicit Intent khai báo action và để hệ thống tìm app phù hợp (mở web, gọi điện). Dùng putExtra/getExtra để truyền dữ liệu.",
    examples: [
      {
        title: "Explicit vs Implicit Intent",
        code: `// Explicit Intent - mở Activity cụ thể
Intent explicit = new Intent(this, DetailActivity.class);
explicit.putExtra("name", "PRM392");
startActivity(explicit);

// Implicit Intent - mở trình duyệt web
Intent implicit = new Intent(Intent.ACTION_VIEW);
implicit.setData(Uri.parse("https://google.com"));
startActivity(implicit);`
      }
    ]
  },
  {
    id: 6,
    title: "Fragment",
    title_vi: "Fragment",
    icon: "🧩",
    clo: "CLO3",
    keywords: [
      { en: "Fragment", vi: "Phần UI có thể tái sử dụng" },
      { en: "FragmentTransaction", vi: "Giao dịch thêm/xóa/thay fragment" },
      { en: "setArguments()", vi: "Gửi dữ liệu từ Activity → Fragment" },
      { en: "getArguments()", vi: "Nhận dữ liệu trong Fragment" },
      { en: "onCreateView()", vi: "Tạo giao diện cho Fragment" },
    ],
    summary_vi: "Fragment là phần giao diện có thể tái sử dụng, PHẢI tồn tại trong Activity. Fragment có lifecycle riêng nhưng phụ thuộc Activity host. Thêm fragment động qua FragmentTransaction: beginTransaction().add().commit(). Gửi dữ liệu bằng Bundle + setArguments().",
    examples: [
      {
        title: "Thêm Fragment động vào Activity",
        code: `// Tạo Fragment và truyền dữ liệu
MyFragment fragment = new MyFragment();
Bundle args = new Bundle();
args.putString("key", "value");
fragment.setArguments(args);

// Thêm vào Activity
getSupportFragmentManager()
    .beginTransaction()
    .add(R.id.container, fragment)
    .addToBackStack(null)
    .commit();`
      }
    ]
  },
  {
    id: 7,
    title: "RecyclerView",
    title_vi: "RecyclerView",
    icon: "📋",
    clo: "CLO2",
    keywords: [
      { en: "RecyclerView", vi: "Danh sách hiệu suất cao" },
      { en: "Adapter", vi: "Kết nối dữ liệu với giao diện" },
      { en: "ViewHolder", vi: "Cache các view để tái sử dụng" },
      { en: "LayoutManager", vi: "Quản lý cách hiển thị danh sách" },
    ],
    summary_vi: "RecyclerView hiển thị danh sách dữ liệu lớn hiệu quả bằng cách tái sử dụng (recycle) view. Gồm 3 thành phần: Adapter (nối dữ liệu), ViewHolder (cache view), LayoutManager (Linear/Grid/Staggered). Adapter override: onCreateViewHolder, onBindViewHolder, getItemCount.",
    examples: [
      {
        title: "Cấu trúc Adapter",
        code: `public class MyAdapter extends RecyclerView.Adapter<MyAdapter.ViewHolder> {
    private List<String> data;

    class ViewHolder extends RecyclerView.ViewHolder {
        TextView textView;
        ViewHolder(View v) {
            super(v);
            textView = v.findViewById(R.id.text);
        }
    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int type) {
        View v = LayoutInflater.from(parent.getContext())
            .inflate(R.layout.item, parent, false);
        return new ViewHolder(v);
    }

    @Override
    public void onBindViewHolder(ViewHolder holder, int pos) {
        holder.textView.setText(data.get(pos));
    }

    @Override
    public int getItemCount() { return data.size(); }
}`
      }
    ]
  },
  {
    id: 8,
    title: "Service & IntentService",
    title_vi: "Service và IntentService",
    icon: "⚙️",
    clo: "CLO3",
    keywords: [
      { en: "Service", vi: "Component chạy nền không có UI" },
      { en: "startService()", vi: "Khởi chạy Service" },
      { en: "bindService()", vi: "Kết nối đến Service" },
      { en: "IntentService", vi: "Service xử lý Intent trên worker thread" },
      { en: "onHandleIntent()", vi: "Xử lý Intent trong IntentService" },
    ],
    summary_vi: "Service chạy tác vụ nền (phát nhạc, download) mà không có UI. 2 loại: Started Service (startService) và Bound Service (bindService). IntentService tự động chạy trên worker thread và tự stop khi xong. Lifecycle: onCreate() → onStartCommand() → onDestroy().",
    examples: [
      {
        title: "IntentService cơ bản",
        code: `public class MyService extends IntentService {
    public MyService() {
        super("MyService");
    }
    
    @Override
    protected void onHandleIntent(Intent intent) {
        // Chạy trên worker thread - không block UI
        String data = intent.getStringExtra("data");
        // Xử lý tác vụ nền ở đây
        // Service tự đóng khi xong
    }
}

// Khởi chạy từ Activity
Intent i = new Intent(this, MyService.class);
i.putExtra("data", "hello");
startService(i);`
      }
    ]
  },
  {
    id: 9,
    title: "BroadcastReceiver",
    title_vi: "BroadcastReceiver",
    icon: "📡",
    clo: "CLO3",
    keywords: [
      { en: "BroadcastReceiver", vi: "Nhận và xử lý broadcast" },
      { en: "sendBroadcast()", vi: "Gửi broadcast thường" },
      { en: "sendOrderedBroadcast()", vi: "Gửi broadcast có thứ tự" },
      { en: "registerReceiver()", vi: "Đăng ký receiver động" },
      { en: "onReceive()", vi: "Callback khi nhận broadcast" },
    ],
    summary_vi: "BroadcastReceiver nhận sự kiện hệ thống (pin yếu, Wi-Fi, SMS) hoặc sự kiện tự tạo. Đăng ký trong Manifest (tĩnh) hoặc registerReceiver() (động). sendBroadcast() gửi cho tất cả, sendOrderedBroadcast() gửi theo priority. Override onReceive() để xử lý.",
    examples: [
      {
        title: "Đăng ký và gửi Broadcast",
        code: `// Tạo BroadcastReceiver
public class MyReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context ctx, Intent intent) {
        String msg = intent.getStringExtra("message");
        Toast.makeText(ctx, msg, Toast.LENGTH_SHORT).show();
    }
}

// Đăng ký động
registerReceiver(new MyReceiver(),
    new IntentFilter("MY_ACTION"));

// Gửi broadcast
Intent i = new Intent("MY_ACTION");
i.putExtra("message", "Hello!");
sendBroadcast(i);`
      }
    ]
  },
  {
    id: 10,
    title: "Notification",
    title_vi: "Thông báo (Notification)",
    icon: "🔔",
    clo: "CLO3",
    keywords: [
      { en: "NotificationChannel", vi: "Kênh thông báo (bắt buộc từ Android 8.0)" },
      { en: "NotificationCompat.Builder", vi: "Xây dựng notification" },
      { en: "NotificationManager", vi: "Quản lý và gửi notification" },
      { en: "PendingIntent", vi: "Intent thực thi khi user tap notification" },
    ],
    summary_vi: "Từ Android 8.0 (API 26), phải tạo NotificationChannel trước khi gửi notification. Channel cho phép user quản lý từng loại notification. Dùng NotificationCompat.Builder để tạo notification với title, text, icon. PendingIntent cho phép mở Activity khi tap.",
    examples: [
      {
        title: "Tạo Notification Channel và gửi notification",
        code: `// Tạo Channel (bắt buộc Android 8.0+)
if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
    NotificationChannel channel = new NotificationChannel(
        "my_channel", "My Channel",
        NotificationManager.IMPORTANCE_DEFAULT);
    NotificationManager nm = getSystemService(
        NotificationManager.class);
    nm.createNotificationChannel(channel);
}

// Tạo và gửi Notification
Notification notif = new NotificationCompat.Builder(
        this, "my_channel")
    .setSmallIcon(R.drawable.ic_notif)
    .setContentTitle("PRM392")
    .setContentText("Nhớ ôn bài nhé!")
    .build();
nm.notify(1, notif);`
      }
    ]
  },
  {
    id: 11,
    title: "Content Provider & SQLite",
    title_vi: "Content Provider và SQLite",
    icon: "📦",
    clo: "CLO4",
    keywords: [
      { en: "ContentProvider", vi: "Chia sẻ dữ liệu giữa các app" },
      { en: "Content URI", vi: "content://authority/path/id" },
      { en: "SQLiteOpenHelper", vi: "Quản lý database SQLite" },
      { en: "ContentResolver", vi: "Truy vấn Content Provider" },
      { en: "CRUD", vi: "Create, Read, Update, Delete" },
    ],
    summary_vi: "SQLite là database cục bộ lưu trữ dữ liệu cho app. Content Provider là lớp trừu tượng cho phép CHIA SẺ dữ liệu giữa các app khác nhau qua Content URI (content://authority/path). ContentResolver dùng để query/insert/update/delete dữ liệu từ Provider.",
    examples: [
      {
        title: "SQLiteOpenHelper cơ bản",
        code: `public class DBHelper extends SQLiteOpenHelper {
    public DBHelper(Context ctx) {
        super(ctx, "mydb", null, 1);
    }

    @Override
    public void onCreate(SQLiteDatabase db) {
        db.execSQL("CREATE TABLE students (" +
            "id INTEGER PRIMARY KEY," +
            "name TEXT," +
            "score REAL)");
    }

    @Override
    public void onUpgrade(SQLiteDatabase db,
            int oldV, int newV) {
        db.execSQL("DROP TABLE IF EXISTS students");
        onCreate(db);
    }
}

// Query từ Content Provider
Cursor cursor = getContentResolver().query(
    ContactsContract.Contacts.CONTENT_URI,
    null, null, null, null);`
      }
    ]
  },
  {
    id: 12,
    title: "Socket Programming",
    title_vi: "Lập trình Socket",
    icon: "🌐",
    clo: "CLO4",
    keywords: [
      { en: "ServerSocket", vi: "Socket phía server" },
      { en: "Socket", vi: "Socket phía client" },
      { en: "accept()", vi: "Chờ kết nối từ client" },
      { en: "InputStream/OutputStream", vi: "Đọc/ghi dữ liệu qua socket" },
    ],
    summary_vi: "Socket cho phép ứng dụng giao tiếp qua mạng. Server dùng ServerSocket để lắng nghe kết nối (accept()). Client dùng Socket để kết nối đến server. Truyền dữ liệu qua InputStream/OutputStream. Lưu ý: phải chạy trên thread riêng (không trên UI thread).",
    examples: [
      {
        title: "Server và Client Socket",
        code: `// SERVER
ServerSocket server = new ServerSocket(8080);
Socket client = server.accept(); // Chờ client
BufferedReader in = new BufferedReader(
    new InputStreamReader(client.getInputStream()));
String msg = in.readLine();

// CLIENT  
Socket socket = new Socket("192.168.1.1", 8080);
PrintWriter out = new PrintWriter(
    socket.getOutputStream(), true);
out.println("Hello Server!");`
      }
    ]
  },
];

function Learn() {
  const [expandedId, setExpandedId] = useState(null);

  const toggle = (id) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  return (
    <div className="learn-page page-container">
      <div className="learn-header animate-fadeInUp">
        <h1>📚 Nội Dung Học Tập</h1>
        <p>Tóm tắt kiến thức PRM392 theo từng chương, kèm từ khóa song ngữ và ví dụ code</p>
      </div>

      <div className="chapters-list">
        {chapters.map((ch, i) => (
          <div 
            key={ch.id} 
            className={`chapter-card ${expandedId === ch.id ? 'expanded' : ''}`}
            style={{ animationDelay: `${i * 0.06}s` }}
          >
            <button className="chapter-header" onClick={() => toggle(ch.id)}>
              <div className="chapter-left">
                <span className="chapter-icon">{ch.icon}</span>
                <div className="chapter-info">
                  <h3>{ch.title_vi}</h3>
                  <span className="chapter-subtitle">{ch.title}</span>
                </div>
              </div>
              <div className="chapter-right">
                <span className="chapter-clo">{ch.clo}</span>
                <span className={`chapter-arrow ${expandedId === ch.id ? 'open' : ''}`}>▾</span>
              </div>
            </button>

            {expandedId === ch.id && (
              <div className="chapter-content animate-fadeIn">
                {/* Summary */}
                <div className="content-section">
                  <h4>📝 Tóm tắt</h4>
                  <p className="chapter-summary">{ch.summary_vi}</p>
                </div>

                {/* Keywords */}
                <div className="content-section">
                  <h4>🔑 Từ khóa quan trọng</h4>
                  <div className="keywords-table">
                    <div className="kw-header">
                      <span>English</span>
                      <span>Tiếng Việt</span>
                    </div>
                    {ch.keywords.map((kw, ki) => (
                      <div key={ki} className="kw-row">
                        <span className="kw-en">{kw.en}</span>
                        <span className="kw-vi">{kw.vi}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Code Examples */}
                {ch.examples && ch.examples.length > 0 && (
                  <div className="content-section">
                    <h4>💻 Ví dụ Code</h4>
                    {ch.examples.map((ex, ei) => (
                      <div key={ei} className="code-example">
                        <span className="code-example-title">{ex.title}</span>
                        <pre className="code-block"><code>{ex.code}</code></pre>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Learn;
