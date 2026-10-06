import React, { useEffect, useRef, useState } from "react";
import { Mail, Github, Linkedin, BarChart3, Brain, Database, Menu, X, ArrowRight, Sparkles, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import profilePhoto from "./assets/profile.png";

const navLinks = [
  { id: "services", label: "Services" },
  { id: "portfolio", label: "Portfolio" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

const socials = [
  { label: "GitHub", href: "https://github.com/iqbalfirdaus648-debug", icon: Github, color: "#181717" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/mohamad-iqbal", icon: Linkedin, color: "#0A66C2" },
  { label: "Email", href: "mailto:iqbalfirdaus648@gmail.com", icon: Mail, color: "#EA4335" },
];

const services = [
  { icon: Database, title: "Data Engineering", desc: "Membersihkan dan menyusun data mentah jadi struktur database yang siap dianalisis." },
  { icon: Brain, title: "Machine Learning", desc: "Membangun model forecasting dan klasifikasi untuk kebutuhan prediksi bisnis." },
  { icon: BarChart3, title: "BI & Visualisasi", desc: "Merancang dashboard yang menerjemahkan data jadi keputusan yang jelas." },
];

const projects = [
  {
    title: "Dashboard Monitoring Piutang & Tracker Penagihan",
    org: "Proyek Portofolio — Excel (Data Sintetis)",
    featured: true,
    isPiutang: true,
    link: "/portofolio_piutang.xlsx",
    desc: "Mengolah 5.997 baris data penjualan sintetis (1.750 faktur, 125 customer) menjadi aging report dengan SUMIFS, INDEX/MATCH, dan Conditional Formatting. Total penjualan ±Rp18,55 miliar dengan piutang outstanding Rp1,21 miliar (38,9% overdue). Dilengkapi tracker penagihan harian, log janji bayar, dan KPI dashboard.",
    tags: ["Excel", "SUMIFS", "INDEX/MATCH", "Aging Report", "Dashboard KPI"],
    kpis: [
      { label: "Baris Data Diolah", value: "5.997", sub: "data penjualan" },
      { label: "Total Faktur", value: "1.750", sub: "invoice" },
      { label: "Customer Aktif", value: "125", sub: "outlet" },
      { label: "Piutang Outstanding", value: "Rp1,21 M", sub: "38,9% overdue" },
    ],
    highlights: [
      "Aging Report 5 bucket: Belum JT, 1-30, 31-60, 61-90, 90+ hari",
      "KPI Dashboard: Total Piutang, % Overdue, DSO, Top 10 Customer",
      "Tracker Penagihan: daftar kunjungan, tukar faktur, log janji bayar",
      "Piutang per Salesman untuk monitoring performa tim",
      "Data sintetis (fiktif) — dibuat khusus untuk keperluan portofolio",
    ],
  },
  {
    title: "Sistem Monitoring & Forecasting Distributor Pertamina",
    org: "PT Duta Buana Perkasa",
    featured: false,
    desc: "Sistem end-to-end: data warehouse PostgreSQL, model forecasting LSTM & SARIMAX untuk prediksi penjualan harian, backend FastAPI, dan dashboard React real-time.",
    tags: ["PostgreSQL", "TensorFlow", "FastAPI", "React"],
  },
  {
    title: "Prediksi Produk Pelumas Terlaris",
    org: "Algoritma C4.5",
    featured: false,
    desc: "Model klasifikasi decision tree (C4.5) untuk memprediksi produk pelumas dengan potensi penjualan tertinggi berdasarkan pola historis transaksi.",
    tags: ["Python", "scikit-learn", "Decision Tree"],
  },
  {
    title: "Dashboard Business Intelligence Transaksi",
    org: "PT Duta Buana Perkasa, 2024",
    featured: false,
    desc: "Analisis data transaksi penjualan & perancangan dashboard Business Intelligence dengan Google Looker Studio untuk mendukung keputusan manajemen.",
    tags: ["Looker Studio", "SQL", "Data Visualization"],
  },
  {
    title: "Website Kasir Warung Sembako Ibu Novi",
    org: "Full-stack Web App",
    featured: false,
    desc: "Membangun website kasir untuk warung sembako dengan fitur sistem hutang untuk mencatat piutang pelanggan secara digital.",
    tags: ["Web App", "POS", "Piutang System"],
  },
  {
    title: "Dashboard Segmentasi Produk & Customer",
    org: "RFM, K-Means, Apriori",
    featured: false,
    desc: "Dashboard interaktif segmentasi produk dan customer menggunakan RFM Analysis, K-Means clustering, dan analisis pola pembelian dengan Apriori.",
    tags: ["Python", "K-Means", "RFM", "Apriori"],
  },
];

const skillGroups = [
  { label: "Data & Engineering", items: ["SQL", "PostgreSQL", "Python", "Pandas", "ETL"] },
  { label: "Machine Learning & AI", items: ["scikit-learn", "TensorFlow/Keras", "LSTM", "SARIMAX", "C4.5"] },
  { label: "BI, Visualisasi & Excel", items: ["Excel (SUMIFS, INDEX/MATCH)", "Pivot Table", "Looker Studio", "Recharts", "Dashboard KPI"] },
  { label: "Accounting & Administrasi", items: ["Analisis Piutang", "Aging Report", "Rekonsiliasi Data", "Pelaporan Keuangan", "Administrasi Dokumen"] },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

/* =========================================================
   LOADING SCREEN
   ========================================================= */
function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 400);
          return 100;
        }
        const increment = prev < 60 ? 8 : prev < 85 ? 5 : 3;
        return Math.min(prev + increment, 100);
      });
    }, 120);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{ background: "linear-gradient(160deg, #BFDBFE 0%, #DBEAFE 40%, #EFF6FF 100%)" }}
    >
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-white/40 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-300/30 rounded-full blur-3xl" />

      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative mb-10"
        >
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center shadow-2xl shadow-blue-500/30">
            <span className="text-white font-extrabold text-3xl tracking-tight">MI</span>
          </div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-3 rounded-full border-2 border-transparent border-t-blue-500 border-r-cyan-400"
          />
        </motion.div>

        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-sm font-semibold text-blue-700 tracking-widest uppercase mb-2">
          Memuat Portofolio
        </motion.p>
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-xs text-slate-600 mb-8">
          Mohammad Iqbal Firdaus
        </motion.p>

        <div className="w-64 h-1 bg-white/60 rounded-full overflow-hidden mb-3">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </div>
        <p className="text-xs font-mono text-slate-700 tabular-nums">{String(progress).padStart(3, "0")}%</p>
      </div>
    </motion.div>
  );
}

/* =========================================================
   WELCOME TRANSITION
   ========================================================= */
function WelcomeTransition({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6 } }}
      className="fixed inset-0 z-[90] flex items-center justify-center overflow-hidden"
    >
      <motion.div
        initial={{ x: 0 }}
        exit={{ x: "-100%", transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}
        className="absolute top-0 left-0 w-1/2 h-full"
        style={{ background: "linear-gradient(135deg, #1E40AF 0%, #2563EB 100%)" }}
      />
      <motion.div
        initial={{ x: 0 }}
        exit={{ x: "100%", transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}
        className="absolute top-0 right-0 w-1/2 h-full"
        style={{ background: "linear-gradient(225deg, #06B6D4 0%, #0EA5E9 100%)" }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.3 } }}
        className="relative z-10 text-center px-6"
      >
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }} className="text-sm font-semibold text-white/80 tracking-widest uppercase mb-4">
          Selamat Datang di
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.7, ease: "easeOut" }} className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white leading-tight tracking-tight">
          Portofolio
          <br />
          <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent">Data & AI</span>
        </motion.h1>
        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.9, duration: 0.6, ease: "easeOut" }} className="w-32 h-[2px] bg-white/60 rounded-full mx-auto mt-6 origin-center" />
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.5 }} className="text-white/90 text-sm mt-4 font-medium">
          Mohammad Iqbal Firdaus
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

/* =========================================================
   MAIN APP
   ========================================================= */
export default function App() {
  const [activeId, setActiveId] = useState("services");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);
  const sectionRefs = useRef({});

  const handleLoadingComplete = () => {
    setIsLoading(false);
    setShowWelcome(true);
  };

  const handleWelcomeComplete = () => {
    setShowWelcome(false);
  };

  useEffect(() => {
    if (isLoading || showWelcome) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isLoading, showWelcome]);

  useEffect(() => {
    if (isLoading || showWelcome) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    navLinks.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) {
        sectionRefs.current[id] = el;
        observer.observe(el);
      }
    });
    return () => observer.disconnect();
  }, [isLoading, showWelcome]);

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loading" onComplete={handleLoadingComplete} />}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {showWelcome && <WelcomeTransition key="welcome" onComplete={handleWelcomeComplete} />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading || showWelcome ? 0 : 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="min-h-screen font-sans text-slate-800 selection:bg-blue-200 overflow-x-hidden"
        style={{ background: "linear-gradient(160deg, #BFDBFE 0%, #DBEAFE 20%, #EFF6FF 50%, #FFFFFF 100%)" }}
      >
        {/* NAVBAR */}
        <header className="sticky top-0 z-50 backdrop-blur-md bg-white/60 border-b border-blue-100/60">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 py-5 flex items-center justify-between">
            <button onClick={() => scrollTo("hero")} className="flex items-center gap-2 group">
              <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-blue-600 to-cyan-400 group-hover:scale-125 transition-transform" />
              <span className="font-extrabold tracking-tight text-base text-slate-900">M. Iqbal</span>
            </button>

            <nav className="hidden md:flex items-center gap-10 text-sm font-medium text-slate-700">
              {navLinks.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className={`transition-colors relative py-1 ${activeId === id ? "text-blue-600" : "hover:text-blue-600"}`}
                >
                  {label}
                  {activeId === id && (
                    <motion.span
                      layoutId="navUnderline"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full"
                    />
                  )}
                </button>
              ))}
            </nav>

            <button className="md:hidden text-slate-700" onClick={() => setMenuOpen((v) => !v)} aria-label="Menu">
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {menuOpen && (
            <motion.nav initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="md:hidden border-t border-blue-100 px-6 py-4 flex flex-col gap-4 text-sm font-medium text-slate-700 bg-white/95 backdrop-blur">
              {navLinks.map(({ id, label }) => (
                <button key={id} onClick={() => scrollTo(id)} className="text-left hover:text-blue-600">{label}</button>
              ))}
            </motion.nav>
          )}
        </header>

        {/* HERO */}
        <section id="hero" className="relative max-w-7xl mx-auto px-6 sm:px-10 pt-16 pb-24 md:pt-20 md:pb-32 scroll-mt-20">
          <svg className="hidden md:block absolute -bottom-6 left-0 w-64 h-64 text-blue-400/40 -z-0" viewBox="0 0 200 200" fill="none">
            <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, ease: "easeInOut" }} d="M 20 180 C 20 100, 80 60, 140 100 C 180 130, 160 180, 120 180" stroke="currentColor" strokeWidth="1.5" />
            <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }} d="M 180 20 L 120 180 M 110 165 L 120 180 L 135 175" stroke="currentColor" strokeWidth="1.5" />
          </svg>

          <svg className="hidden md:block absolute top-24 right-0 w-56 h-56 text-blue-400/40 -z-0" viewBox="0 0 200 200" fill="none">
            <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 0.3, ease: "easeInOut" }} d="M 180 20 C 100 20, 60 80, 100 120 C 140 160, 180 120, 160 80" stroke="currentColor" strokeWidth="1.5" />
            <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 0.8, ease: "easeInOut" }} d="M 160 80 L 180 20 M 165 25 L 180 20 L 175 35" stroke="currentColor" strokeWidth="1.5" />
          </svg>

          <motion.div initial="hidden" animate="visible" variants={stagger} className="relative">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="relative z-10">
                <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-blue-100/70 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider rounded-full px-4 py-1.5 mb-6">
                  <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                  Fresh Graduate — S1 Sistem Informasi
                </motion.div>

                <motion.h1 variants={fadeInUp} className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight text-slate-900">
                  Mohammad
                  <br />
                  Iqbal Firdaus
                </motion.h1>

                <motion.div variants={fadeInUp} className="w-32 h-[3px] bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full my-8" />

                <motion.p variants={fadeInUp} className="text-slate-700 max-w-md leading-relaxed text-base">
                  Lulusan <span className="font-semibold text-blue-700">S1 Sistem Informasi Universitas Gunadarma (IPK 3.72/4.00)</span> yang berfokus pada analisis data, pembangunan model prediksi, dan perancangan dashboard untuk mendukung keputusan bisnis.
                </motion.p>

                <motion.div variants={fadeInUp} className="flex flex-wrap gap-3 mt-10">
                  {socials.map(({ label, href, icon: Icon, color }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center gap-2.5 bg-white border border-blue-200 rounded-full px-4 py-2.5 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300"
                    >
                      <span className="w-7 h-7 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: color }}>
                        <Icon size={14} />
                      </span>
                      <span className="text-sm font-medium text-slate-700 group-hover:text-blue-600 transition-colors">{label}</span>
                    </a>
                  ))}
                </motion.div>
              </div>

              <div className="relative flex justify-center items-center min-h-[420px] md:min-h-[520px]">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-300/40 via-cyan-200/30 to-transparent rounded-full blur-3xl" />

                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="absolute left-0 top-1/3 z-20 text-left"
                >
                  <p className="text-xs sm:text-sm font-medium text-slate-600 mb-1">Proyek Selesai</p>
                  <p className="text-5xl sm:text-6xl font-extrabold text-slate-900 leading-none">
                    6<span className="text-blue-600">+</span>
                  </p>
                </motion.div>

                <motion.img
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                  src={profilePhoto}
                  alt="Mohammad Iqbal Firdaus"
                  className="relative z-10 w-full max-w-sm object-contain drop-shadow-2xl"
                />

                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="absolute right-0 top-8 text-right z-20"
                >
                  <p className="text-xs sm:text-sm font-medium text-slate-600 mb-1">IPK / 4.00</p>
                  <p className="text-5xl sm:text-6xl font-extrabold text-slate-900 leading-none">3.72</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* SERVICES */}
        <section id="services" className="relative max-w-7xl mx-auto px-6 sm:px-10 py-24 scroll-mt-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={fadeInUp} className="mb-14">
            <p className="text-sm font-semibold text-blue-600 mb-3 uppercase tracking-widest">Services</p>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 max-w-2xl leading-tight">
              Layanan yang saya{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent">kerjakan</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {services.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="group bg-white/80 backdrop-blur border border-blue-100 rounded-2xl p-8 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center mb-6 text-white shadow-lg shadow-blue-500/20">
                  <Icon size={22} />
                </div>
                <h3 className="font-bold text-lg text-slate-900 mb-3">{title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="portfolio" className="relative max-w-7xl mx-auto px-6 sm:px-10 py-24 scroll-mt-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={fadeInUp} className="mb-14">
            <p className="text-sm font-semibold text-blue-600 mb-3 uppercase tracking-widest">Portfolio</p>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 max-w-2xl leading-tight">
              Proyek{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent">pilihan</span>{" "}
              saya
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((p, index) => (
              <motion.article
                key={p.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className={`group relative border rounded-3xl p-8 transition-all duration-500 flex flex-col justify-between ${
                  p.featured
                    ? "md:col-span-2 bg-gradient-to-br from-blue-50 via-white to-cyan-50 border-blue-200 hover:shadow-2xl hover:shadow-blue-900/10"
                    : "bg-white border-slate-200 hover:shadow-2xl hover:shadow-blue-900/5"
                }`}
              >
                <div className="absolute top-0 left-0 w-full h-1.5 rounded-t-3xl bg-gradient-to-r from-blue-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="text-xs font-semibold px-3 py-1 bg-white/80 border border-slate-200 text-slate-600 rounded-full">{p.org}</span>
                    {p.featured && (
                      <span className="text-xs font-semibold px-3 py-1 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-full flex items-center gap-1 shadow-sm">
                        <Sparkles size={12} /> Proyek Utama
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">{p.title}</h3>
                  <p className="text-slate-600 leading-relaxed mb-6">{p.desc}</p>

                  {p.isPiutang && p.kpis && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                      {p.kpis.map((kpi, i) => (
                        <div key={i} className="bg-white border border-blue-100 rounded-2xl p-4 text-center hover:border-blue-300 transition-colors">
                          <p className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent leading-none mb-1">{kpi.value}</p>
                          <p className="text-xs font-bold text-slate-900">{kpi.label}</p>
                          <p className="text-[10px] text-slate-500 mt-0.5">{kpi.sub}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {p.isPiutang && p.highlights && (
                    <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-5 mb-6">
                      <p className="text-xs font-bold text-blue-700 uppercase tracking-wider mb-3">🔍 Hasil & Fitur Dashboard</p>
                      <ul className="space-y-2">
                        {p.highlights.map((h, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {p.tags.map((tag) => (
                      <span key={tag} className="text-xs font-medium px-3 py-1.5 bg-white border border-slate-200 text-slate-600 rounded-lg group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:border-blue-200 transition-colors">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {p.link ? (
                    <div className="flex flex-wrap items-center gap-3">
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-sm rounded-xl px-5 py-2.5 hover:shadow-lg hover:shadow-blue-600/30 hover:scale-[1.02] transition-all duration-300"
                      >
                        <Download size={16} />
                        Buka File Excel
                      </a>
                      <span className="inline-flex items-center text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors cursor-pointer w-fit">
                        Lihat Detail
                        <ArrowRight size={16} className="ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors cursor-pointer w-fit">
                      Lihat Detail Proyek
                      <ArrowRight size={16} className="ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* ABOUT / SKILLS */}
        <section id="about" className="relative max-w-7xl mx-auto px-6 sm:px-10 py-24 scroll-mt-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={fadeInUp} className="mb-14">
            <p className="text-sm font-semibold text-blue-600 mb-3 uppercase tracking-widest">About</p>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 max-w-2xl leading-tight">
              Tools yang saya{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent">kuasai</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {skillGroups.map((group, idx) => (
              <motion.div
                key={group.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <p className="font-bold text-slate-900 mb-4">{group.label}</p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className="text-sm font-medium text-slate-700 bg-white border border-blue-200 rounded-full px-4 py-1.5 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all cursor-default">
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <footer id="contact" className="relative max-w-7xl mx-auto px-6 sm:px-10 py-24 scroll-mt-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="relative rounded-3xl bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400 p-10 sm:p-16 text-center overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-cyan-200/20 rounded-full blur-3xl" />

            <div className="relative z-10">
              <p className="text-sm font-semibold text-white/80 mb-3 uppercase tracking-widest">Contact</p>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight mb-4 max-w-2xl mx-auto">Mari bekerja sama</h2>
              <p className="text-white/90 max-w-md mx-auto mb-10 text-base">
                Terbuka untuk peluang sebagai Data Analyst, Data Scientist, atau AI Engineer.
              </p>

              <div className="flex flex-wrap gap-3 justify-center">
                <a href="mailto:iqbalfirdaus648@gmail.com" className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold rounded-full px-6 py-3 hover:scale-105 hover:shadow-xl transition-all duration-300">
                  <Mail size={18} />
                  Email Saya
                </a>
                <a href="https://www.linkedin.com/in/mohamad-iqbal" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border border-white/60 text-white font-semibold rounded-full px-6 py-3 hover:bg-white/10 transition-all duration-300">
                  <Linkedin size={18} />
                  LinkedIn
                </a>
              </div>
            </div>
          </motion.div>

          <div className="mt-12 pt-8 border-t border-blue-200/60 flex flex-col sm:flex-row justify-between gap-3 text-sm text-slate-600">
            <p>© {new Date().getFullYear()} Mohammad Iqbal Firdaus. All rights reserved.</p>
          </div>
        </footer>
      </motion.div>
    </>
  );
}