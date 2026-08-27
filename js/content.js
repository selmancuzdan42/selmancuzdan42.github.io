/* ============================================================
   content.js — sitenin TEK içerik kaynağı.
   Metin, derece, proje, araç… hepsi burada. HTML'e dokunma.

   Yeni derece, proje ya da araç eklerken ilgili listeye bir kayıt
   ekle, kaydet, sayfayı yenile. Hepsi bu.
   ============================================================ */

/* ── Terminal prompt'u ─────────────────────────────────────
   Hero terminali ve pencere başlığı bunu kullanır.
   Değiştirirsen js/404.js ve index.html'deki açılış satırını
   da aynı yap.
------------------------------------------------------------ */
const PROMPT = "root@s3lm4n";

/* ── Yarışma dereceleri ─────────────────────────────────────
   rank   : ekranda görünen derece (sayı ya da "#95" gibi)
   scope  : sağdaki rozet — "national" | "global" | "university"
   year   : yarışmanın yılı
------------------------------------------------------------ */
const RESULTS = [
  {
    rank: "2",
    year: "2025",
    scope: "national",
    tr: { name: "BeingWise CTF", org: "BeingWise", note: "Türkiye geneli" },
    en: { name: "BeingWise CTF", org: "BeingWise", note: "Nationwide, Türkiye" }
  },
  {
    rank: "2",
    year: "2026",
    scope: "university",
    tr: { name: "ISUCTF", org: "Üniversite CTF yarışması", note: "Write-up'lar GitHub'da" },
    en: { name: "ISUCTF", org: "University CTF competition", note: "Write-ups on GitHub" }
  },
  {
    rank: "3",
    year: "2026",
    scope: "university",
    tr: { name: "Adli Bilişim Yarışması", org: "İstanbul Ticaret Üniversitesi", note: "Adli bilişim / forensics" },
    en: { name: "Digital Forensics Competition", org: "Istanbul Commerce University", note: "Digital forensics" }
  },
  {
    rank: "3",
    year: "2026",
    scope: "national",
    tr: { name: "SKYDAYS CTF", org: "SKYDAYS", note: "Capture the Flag" },
    en: { name: "SKYDAYS CTF", org: "SKYDAYS", note: "Capture the Flag" }
  },
  {
    rank: "4",
    year: "2025",
    scope: "national",
    tr: {
      name: "Liseler Arası Online Siber Güvenlik CTF",
      org: "Türkiye Siber Güvenlik Kümelenmesi & GençTek",
      note: "Türkiye 4.'lüğü"
    },
    en: {
      name: "Inter-High-School Online Cybersecurity CTF",
      org: "Turkish Cybersecurity Cluster & GençTek",
      note: "4th in Türkiye"
    }
  },
  {
    rank: "#95",
    year: "2026",
    scope: "global",
    tr: { name: "Hack The Box CTF", org: "Hack The Box", note: "Dünya geneli sıralama" },
    en: { name: "Hack The Box CTF", org: "Hack The Box", note: "Global leaderboard" }
  }
];

/* ── Saha / PİTO EduBounty yan bilgi kutusu ───────────────── */
const FACTS = [
  {
    tr: { k: "Program", v: "PİTO EduBounty" },
    en: { k: "Program", v: "PİTO EduBounty" }
  },
  {
    tr: { k: "Kurum", v: "Pendik İTO Ticaret MTAL" },
    en: { k: "Institution", v: "Pendik İTO Ticaret MTAL" }
  },
  {
    tr: { k: "Kapsam", v: "KOBİ web ve servis altyapıları" },
    en: { k: "Scope", v: "SME web and service infrastructure" }
  },
  {
    tr: { k: "Metodoloji", v: "CVSS v3.1 · manuel doğrulama" },
    en: { k: "Methodology", v: "CVSS v3.1 · manual verification" }
  },
  {
    tr: { k: "En yüksek bulgu", v: "Kritik (CVSS ≥ 7.5)" },
    en: { k: "Highest finding", v: "Critical (CVSS ≥ 7.5)" }
  }
];

/* ── Projeler ────────────────────────────────────────────────
   url: null bırakırsan kart bağlantısız, "özel" rozetiyle çıkar
------------------------------------------------------------ */
const PROJECTS = [
  {
    name: "roboTR",
    wide: true,
    stack: ["JavaScript", "Arduino C++"],
    url: "https://github.com/selmancuzdan42/roboTR",
    tr: "Türkçe robotik kodlama dili ve IDE'si. Yazdığın Türkçe kodu Arduino C++'a çevirir, derler ve karta yükler.",
    en: "A Turkish robotics coding language and IDE. Translates Turkish code to Arduino C++, compiles it and flashes the board."
  },
  {
    name: "KodTR",
    stack: ["Python", "PyQt6"],
    url: "https://github.com/selmancuzdan42/KodTR",
    tr: "Türkçe yazılan mini programlama dili. Python, C# ve JavaScript'e çevirir; PyQt6 arayüzü ve Pardus .deb paketiyle gelir.",
    en: "A mini programming language written in Turkish. Transpiles to Python, C# and JavaScript; ships with a PyQt6 IDE and a Pardus .deb package."
  },
  {
    name: "RollbackX",
    stack: ["Rust", "GTK4"],
    url: "https://github.com/selmancuzdan42/rollbacktx",
    tr: "Pardus Linux için sistem anlık görüntü yöneticisi. Btrfs, LVM Thin ve Rsync destekli; hem CLI hem GTK4 arayüzü var.",
    en: "A system snapshot manager for Pardus Linux. Supports Btrfs, LVM Thin and Rsync, with both a CLI and a GTK4 interface."
  },
  {
    name: "QuakeGuard",
    wide: true,
    stack: ["ESP32", "LoRa 868 MHz", "Android"],
    url: null,
    tr: "Deprem sonrası arama kurtarma için giyilebilir bileklik. GPS, nabız ve ivme verisini LoRa ile uzun menzilde yayınlar; ekipler konumu Android uygulamasından takip eder.",
    en: "A wearable band for post-earthquake search and rescue. Broadcasts GPS, pulse and accelerometer data over long-range LoRa; teams track locations from an Android app."
  },
  {
    name: "Akıllı Kalem",
    stack: ["C++17", "Qt6"],
    url: "https://github.com/selmancuzdan42/akillikalem",
    tr: "Linux için ekran üzerine çizim ve not aracı. Akıllı tahtalar ve sunumlar için tasarlandı, tek binary olarak çalışır.",
    en: "A screen annotation tool for Linux. Built for interactive whiteboards and presentations, and it runs as a single binary."
  },
  {
    name: "PardusLock",
    stack: ["JavaScript"],
    url: "https://github.com/selmancuzdan42/parduslock",
    tr: "Akıllı tahtalardaki Pardus kurulumları için kilit sistemi. Ders dışında cihaza erişimi sınırlar.",
    en: "A lock system for Pardus installations on classroom whiteboards. Restricts device access outside lesson hours."
  },
  {
    name: "CTF-Tools",
    stack: ["Python"],
    url: "https://github.com/selmancuzdan42/CTF-Tools",
    tr: "Yarışma sırasında tekrar tekrar ihtiyaç duyduğum script'lerin koleksiyonu: web, reverse ve forensics.",
    en: "A collection of the scripts I keep needing mid-competition: web, reverse engineering and forensics."
  },
  {
    name: "TuneDown",
    stack: ["Python"],
    url: "https://github.com/selmancuzdan42/TuneDown",
    tr: "YouTube'dan müzik indirme uygulaması. İlk masaüstü arayüz denemelerimden biri.",
    en: "A YouTube music downloader. One of my first attempts at a desktop interface."
  }
];

/* ── Cephanelik ─────────────────────────────────────────────── */
const RACKS = [
  {
    tr: { title: "Web güvenliği", tag: "Aktif alan" },
    en: { title: "Web security", tag: "Active" },
    items: ["Burp Suite", "Caido", "mitmproxy", "ffuf", "feroxbuster", "sqlmap", "nuclei", "katana", "Nmap", "Masscan"]
  },
  {
    tr: { title: "Mobil güvenlik", tag: "Hedef" },
    en: { title: "Mobile security", tag: "Goal" },
    items: ["Frida", "objection", "jadx", "apktool", "MobSF", "adb", "scrcpy", "Android Studio AVD"]
  },
  {
    tr: { title: "Tersine mühendislik", tag: "" },
    en: { title: "Reverse engineering", tag: "" },
    items: ["Ghidra", "IDA", "radare2", "rizin", "x64dbg", "binwalk", "GDB"]
  },
  {
    tr: { title: "Adli bilişim", tag: "" },
    en: { title: "Digital forensics", tag: "" },
    items: ["Volatility 3", "Autopsy", "Sleuthkit", "Wireshark", "tshark", "foremost", "python-evtx"]
  },
  {
    tr: { title: "Exploit ve kırma", tag: "" },
    en: { title: "Exploitation and cracking", tag: "" },
    items: ["pwntools", "ROPgadget", "GDB-pwndbg", "hashcat", "john"]
  },
  {
    tr: { title: "Gömülü ve IoT", tag: "" },
    en: { title: "Embedded and IoT", tag: "" },
    items: ["ESP32", "ESP8266", "LoRa 868 MHz", "NEO-6M GPS", "MPU6050", "MAX30102"]
  },
  {
    tr: { title: "Geliştirme", tag: "" },
    en: { title: "Development", tag: "" },
    items: ["Python", "C#", "ASP.NET", "Java", "C++/Qt", "Rust", "Bash", "Docker", "Git"]
  }
];

/* ── İletişim ikonları (24x24 viewBox, inline SVG) ─────────── */
const ICONS = {
  mail: "M1.5 4.5h21a1.5 1.5 0 0 1 1.5 1.5v12a1.5 1.5 0 0 1-1.5 1.5h-21A1.5 1.5 0 0 1 0 18V6a1.5 1.5 0 0 1 1.5-1.5zm.9 2.2v.9l9.6 6 9.6-6v-.9H2.4zm19.2 3.3-8.9 5.6a1.5 1.5 0 0 1-1.6 0L2.4 10v7.3h19.2V10z",
  github: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
  linkedin: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  x: "M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z",
  instagram: "M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077",
  discord: "M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"
};

/* ── İletişim ───────────────────────────────────────────────── */
const LINKS = [
  { icon: "mail", label: "E-posta", value: "selmanfarisicuzdan@gmail.com", url: "mailto:selmanfarisicuzdan@gmail.com" },
  { icon: "github", label: "GitHub", value: "selmancuzdan42", url: "https://github.com/selmancuzdan42" },
  { icon: "linkedin", label: "LinkedIn", value: "Selman Cüzdan", url: "https://www.linkedin.com/in/selman-c%C3%BCzdan" },
  { icon: "x", label: "X", value: "@Selmanc42", url: "https://x.com/Selmanc42" },
  { icon: "instagram", label: "Instagram", value: "@selman_cuzdan42", url: "https://instagram.com/selman_cuzdan42" },
  { icon: "discord", label: "Discord", value: "fellix__", url: null }
];

/* ── Hero terminal çıktısı ──────────────────────────────────── */
const CRT = {
  tr: [
    { p: true, cmd: "whoami" },
    { out: "Selman Farisi Cüzdan · 18 · İstanbul" },
    { out: "Ofansif güvenlik araştırmacısı" },
    { gap: true },
    { p: true, cmd: "cat odak.txt" },
    { out: "web güvenliği         [aktif]" },
    { out: "mobil güvenlik        [hedef]" },
    { out: "tersine mühendislik" },
    { out: "gömülü / IoT" },
    { gap: true },
    { p: true, cmd: "durum --kisa" },
    { out: "PİTO EduBounty · aktif katılımcı" },
    { out: "web güvenliği · aktif araştırma" },
    { out: "6 yarışma derecesi" },
    { gap: true },
    { p: true, cmd: "", cursor: true }
  ],
  en: [
    { p: true, cmd: "whoami" },
    { out: "Selman Farisi Cüzdan · 18 · Istanbul" },
    { out: "Offensive security researcher" },
    { gap: true },
    { p: true, cmd: "cat focus.txt" },
    { out: "web security          [active]" },
    { out: "mobile security       [goal]" },
    { out: "reverse engineering" },
    { out: "embedded / IoT" },
    { gap: true },
    { p: true, cmd: "status --short" },
    { out: "PİTO EduBounty · active participant" },
    { out: "web security · active research" },
    { out: "6 competition placements" },
    { gap: true },
    { p: true, cmd: "", cursor: true }
  ]
};

/* ── Arayüz metinleri ───────────────────────────────────────── */
const STRINGS = {
  tr: {
    "skip": "İçeriğe geç",
    "nav.results": "Başarılar",
    "nav.field": "Saha",
    "nav.work": "Projeler",
    "nav.arsenal": "Cephanelik",
    "nav.contact": "İletişim",

    "hero.eyebrow": "İstanbul, Türkiye",
    "hero.role": "Mobil ve web uygulamalarında zafiyet avlıyorum, bulduklarımı CVSS ile raporluyorum, aradaki boşluklara kendi aletlerimi yazıyorum.",
    "hero.cta1": "Dereceleri gör",
    "hero.cta2": "GitHub profili",

    "nav.about": "Hakkımda",
    "about.eyebrow": "Hakkımda",
    "about.title": "Kim olduğum, tek bakışta",
    "about.lede": "Uzun bir biyografi yerine okunabilir bir nesne.",
    "about.timeline": "Geçmiş",

    "results.eyebrow": "Başarılar",
    "results.title": "Yarışma dereceleri",
    "results.lede": "Ulusal ve uluslararası CTF ile adli bilişim yarışmalarında aldığım sonuçlar.",

    "field.eyebrow": "Saha",
    "field.title": "PİTO EduBounty",
    "field.roleLabel": "Rol",
    "field.role": "Aktif katılımcı",
    "field.p1": "Pendik İTO Ticaret MTAL bünyesinde yürüyen, KOBİ'lere yönelik eğitim odaklı bir bug bounty programı. Hedefler gerçek, sistemler üretimde, süreç protokole ve gizlilik taahhüdüne bağlı.",
    "field.p2": "Saha testlerine bizzat katılıyorum, bulduğum açıkları CVSS v3.1 metodolojisiyle puanlayıp koordinatör onayıyla raporluyorum.",
    "field.note": "Hedef bilgileri ve bulgu detayları gizlilik taahhüdü kapsamındadır.",

    "work.eyebrow": "Projeler",
    "work.title": "Yazdığım şeyler",
    "work.lede": "Çoğu Linux ve Pardus için, bir kısmı Türkçe kodlama öğrenenler için, biri enkaz altında kalan insanları bulmak için.",
    "work.private": "kaynak kapalı",
    "work.view": "Depoyu aç",

    "arsenal.eyebrow": "Cephanelik",
    "arsenal.title": "Çalıştığım alanlar ve araçlar",

    "contact.eyebrow": "İletişim",
    "contact.title": "Bir zafiyet, bir proje ya da bir soru",
    "contact.lede": "En hızlı yol e-posta. Yarışma, staj ve program iş birlikleri için de aynı adres.",
    "contact.copy": "Kopyala",
    "contact.copied": "Kopyalandı",

    "foot.built": "İstanbul",

    "scope.national": "Ulusal",
    "scope.global": "Global",
    "scope.university": "Üniversite",
    "rank.suffix": "."
  },

  en: {
    "skip": "Skip to content",
    "nav.results": "Results",
    "nav.field": "Field work",
    "nav.work": "Projects",
    "nav.arsenal": "Arsenal",
    "nav.contact": "Contact",

    "hero.eyebrow": "Istanbul, Türkiye",
    "hero.role": "I hunt vulnerabilities in mobile and web applications, score what I find with CVSS, and build my own tools for the gaps in between.",
    "hero.cta1": "See the results",
    "hero.cta2": "GitHub profile",

    "nav.about": "About",
    "about.eyebrow": "About",
    "about.title": "Who I am, at a glance",
    "about.lede": "A readable object instead of a long biography.",
    "about.timeline": "Timeline",

    "results.eyebrow": "Results",
    "results.title": "Competition placements",
    "results.lede": "Where I finished in national and international CTF and digital forensics competitions.",

    "field.eyebrow": "Field work",
    "field.title": "PİTO EduBounty",
    "field.roleLabel": "Role",
    "field.role": "Active participant",
    "field.p1": "An education-focused bug bounty program for small and medium businesses, run at Pendik İTO Ticaret MTAL. The targets are real, the systems are in production, and the process is bound by a written protocol and a confidentiality agreement.",
    "field.p2": "I take part in field tests myself, score the vulnerabilities I find with CVSS v3.1 and report them through the coordinator.",
    "field.note": "Target details and specific findings are covered by a confidentiality agreement.",

    "work.eyebrow": "Projects",
    "work.title": "Things I have built",
    "work.lede": "Most of them for Linux and Pardus, some for people learning to code in Turkish, one for finding people trapped under rubble.",
    "work.private": "source closed",
    "work.view": "Open repository",

    "arsenal.eyebrow": "Arsenal",
    "arsenal.title": "What I work on, and with what",

    "contact.eyebrow": "Contact",
    "contact.title": "A vulnerability, a project or a question",
    "contact.lede": "Email is the fastest route. Same address for competitions, internships and program partnerships.",
    "contact.copy": "Copy",
    "contact.copied": "Copied",

    "foot.built": "Istanbul",

    "scope.national": "National",
    "scope.global": "Global",
    "scope.university": "University",
    "rank.suffix": ""
  }
};

/* ── Hero altı sayaçları ────────────────────────────────────── */
const TALLY = [
  { n: "6", tr: "yarışma derecesi", en: "competition placements" },
  { n: "2", tr: "ikincilik derecesi", en: "runner-up finishes" },
  { n: "#95", tr: "HTB dünya sırası", en: "HTB global rank" },
  { n: "15", tr: "açık kaynak depo", en: "open source repos" }
];

/* ── Hero araç şeridi (kayan bant) ──────────────────────────── */
const TICKER = [
  "Frida", "Burp Suite", "Ghidra", "jadx", "objection", "apktool", "MobSF",
  "radare2", "Volatility 3", "ffuf", "nuclei", "sqlmap", "Wireshark",
  "mitmproxy", "hashcat", "Caido", "adb", "binwalk", "Docker", "ESP32"
];


/* ── Hakkımda — kod objesi olarak ───────────────────────────
   Anahtar sırası ekranda göründüğü sıradır. Değer dizi ise
   çok satırlı liste olarak yazdırılır.
------------------------------------------------------------ */
const ABOUT = {
  file: "selman.js",
  varName: "selman",
  tr: [
    ["kullanici", "s3lm4n"],
    ["rol", "Ofansif güvenlik araştırmacısı"],
    ["okul", "Pendik İTO Ticaret MTAL — Yazılım"],
    ["konum", "İstanbul, TR"],
    ["odak", ["Web güvenliği", "Mobil güvenlik", "Tersine mühendislik", "Adli bilişim"]],
    ["saha", "PİTO EduBounty · aktif katılımcı"],
    ["ilke", "Açığı bul, kök nedenini anla, doğru raporla."]
  ],
  en: [
    ["username", "s3lm4n"],
    ["role", "Offensive security researcher"],
    ["school", "Pendik İTO Ticaret MTAL — Software"],
    ["location", "Istanbul, TR"],
    ["focus", ["Web security", "Mobile security", "Reverse engineering", "Digital forensics"]],
    ["fieldWork", "PİTO EduBounty · active participant"],
    ["mindset", "Find the bug, understand it, report it right."]
  ]
};

/* ── Geçmiş ─────────────────────────────────────────────────── */
const TIMELINE = [
  {
    year: "2026",
    highlight: true,
    tr: {
      title: "İstanbul Ticaret Üniversitesi — Adli Bilişim Yarışması",
      note: "Türkiye 3.'lüğü. Şimdiye kadarki en büyük derecem.",
      tag: "En büyük derece"
    },
    en: {
      title: "Istanbul Commerce University — Digital Forensics Competition",
      note: "3rd in Türkiye. My strongest placement so far.",
      tag: "Best placement"
    }
  },
  {
    year: "2026",
    tr: { title: "PİTO EduBounty", note: "Aktif katılımcı — saha testleri, CVSS ile puanlama ve raporlama." },
    en: { title: "PİTO EduBounty", note: "Active participant — field tests, CVSS scoring and reporting." }
  },
  {
    year: "2025",
    tr: { title: "İlk ulusal dereceler", note: "BeingWise CTF 2.'lik, GençTek liseler arası CTF Türkiye 4.'lüğü." },
    en: { title: "First national placements", note: "BeingWise CTF runner-up, GençTek inter-high-school CTF 4th in Türkiye." }
  },
  {
    year: "2025",
    tr: { title: "PİTO EduBounty", note: "Üye olarak katıldım — CTF yarışmaları, workshop ve etkinlik organizasyonu." },
    en: { title: "PİTO EduBounty", note: "Joined as a member — CTF competitions, workshops and event organisation." }
  },
  {
    year: "2023",
    tr: { title: "Pendik İTO Ticaret MTAL", note: "Yazılım Geliştirme bölümü." },
    en: { title: "Pendik İTO Ticaret MTAL", note: "Software development programme." }
  }
];
