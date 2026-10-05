import { motion } from 'framer-motion';

const projectsData = [
  {
    title: "Sistem Monitoring & Forecasting Distributor Pertamina",
    company: "PT Duta Buana Perkasa",
    isMain: true, // Proyek utama akan tampil lebih besar
    desc: "Sistem end-to-end: data warehouse PostgreSQL, model forecasting LSTM & SARIMAX untuk prediksi penjualan harian, model content-based filtering untuk rekomendasi produk, backend FastAPI, dan dashboard React real-time.",
    tags: ["PostgreSQL", "Python", "TensorFlow/Keras", "SARIMAX", "FastAPI", "React"],
    gradient: "from-blue-500 to-cyan-400"
  },
  {
    title: "Prediksi Produk Pelumas Tertaris",
    company: "Algoritma C4.5",
    isMain: false,
    desc: "Model klasifikasi decision tree (C4.5) untuk memprediksi produk pelumas dengan potensi penjualan tertinggi berdasarkan pola historis transaksi.",
    tags: ["Python", "scikit-learn", "Decision Tree"],
    gradient: "from-indigo-500 to-blue-400"
  },
  {
    title: "Analisis Data Transaksi & Dashboard Business Intelligence",
    company: "PT Duta Buana Perkasa, 2024",
    isMain: false,
    desc: "Analisis data transaksi penjualan dan perancangan dashboard business intelligence untuk mendukung pengambilan keputusan manajemen, dibangun dengan Google Looker Studio.",
    tags: ["Google Looker Studio", "SQL", "Data Visualization"],
    gradient: "from-sky-500 to-blue-500"
  }
];

export default function Projects() {
  return (
    <section id="projects" className="bg-slate-50 py-24 relative overflow-hidden">
      {/* Ornamen Background Halus */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50 -z-10"></div>

      <div className="max-w-6xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="text-blue-600 font-semibold tracking-wider text-sm mb-2 uppercase">Portofolio</p>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900">Proyek Pilihan</h2>
        </motion.div>

        {/* Grid Layout: Proyek Utama mengambil 2 kolom, sisanya 1 kolom */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projectsData.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
              whileHover={{ y: -10 }} // Efek naik saat di-hover
              className={`group relative bg-white p-8 rounded-3xl border border-slate-200 hover:border-blue-300 hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-500 flex flex-col justify-between ${
                project.isMain ? "md:col-span-2" : ""
              }`}
            >
              {/* Garis Aksen Gradasi di Atas Kartu */}
              <div className={`absolute top-0 left-0 w-full h-1.5 rounded-t-3xl bg-gradient-to-r ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

              <div>
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="text-xs font-bold px-3 py-1 bg-blue-50 text-blue-600 rounded-full border border-blue-100">
                    {project.company}
                  </span>
                  {project.isMain && (
                    <span className="text-xs font-bold px-3 py-1 bg-amber-50 text-amber-600 rounded-full border border-amber-100 flex items-center gap-1">
                      ⭐ Proyek Utama
                    </span>
                  )}
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                  {project.title}
                </h3>
                
                <p className="text-slate-600 leading-relaxed mb-8">
                  {project.desc}
                </p>
              </div>

              <div>
                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="text-xs font-medium px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors duration-300">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Link Action */}
                <div className="flex items-center text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors cursor-pointer w-fit">
                  Lihat Detail Proyek 
                  <span className="ml-2 transform group-hover:translate-x-2 transition-transform duration-300">→</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}