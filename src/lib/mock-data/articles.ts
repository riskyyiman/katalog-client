export interface Article {
  slug: string;
  title: string;
  category: string;
  date: string;
  image: string;
  content: string;
  tags?: string[];
  readingTime?: string;
}

const dropCapClass = 'float-left text-6xl md:text-7xl font-serif text-zinc-950 mr-4 mt-1 md:mt-2 leading-[0.8]';

const pClass = 'text-justify hyphens-auto';

export const articles: Article[] = [
  {
    slug: 'simfoni-siluet-keanggunan-minimalis',
    title: 'Simfoni Siluet: Mendefinisikan Ulang Keanggunan Minimalis',
    category: 'Editorial',
    date: '16 April 2026',
    readingTime: '6 Menit',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80',
    tags: ['Gaya Hidup', 'Minimalis', 'Editorial'],
    content: `
      <p class="lead ${pClass}"><span class="${dropCapClass}">D</span>alam dunia yang kian bising oleh tren yang silih berganti, kesederhanaan justru bersuara paling lantang. Memilih pakaian dengan potongan minimalis bukan berarti mengorbankan karakter; sebaliknya, ia adalah wujud tertinggi dari kecanggihan dan <strong>penguasaan gaya personal</strong>.</p>
      
      <h2>Filosofi "Less is More"</h2>
      <p class="${pClass}">Kami di Kirana percaya bahwa setiap jahitan harus memiliki tujuan. Siluet yang bersih memberikan ruang bagi material berkualitas untuk bersinar. Ketika tidak ada ornamen berlebihan yang mengalihkan perhatian, mata akan langsung tertuju pada jatuhnya kain <em>(drape)</em> dan <strong>presisi potongan</strong> yang membalut tubuh.</p>
      
      <blockquote>"Keanggunan sejati tidak menuntut perhatian. Ia hadir dengan tenang, namun meninggalkan kesan yang tak terlupakan."</blockquote>
      
      <p class="${pClass}">Investasikan isi lemari Anda pada palet monokromatik dan struktur arsitektural. Sebuah kemeja berpotongan longgar namun berstruktur, dipadukan dengan celana palazzo bergaris tegas, dapat membawa Anda dari pertemuan bisnis hingga jamuan makan malam dengan transisi yang <strong>tanpa cela</strong>.</p>
      
      <h3>Pilihan Material</h3>
      <p class="${pClass}"><strong>Katun Supima, linen Belgia, dan sutra organik</strong> menjadi pilihan utama dalam koleksi minimalis kami. Setiap material dipilih berdasarkan kemampuannya untuk mempertahankan bentuk dan memberikan kenyamanan sepanjang hari.</p>
    `,
  },
  {
    slug: 'panduan-merawat-serat-alami',
    title: 'Panduan Esensial: Merawat Serat Alami Katun dan Linen',
    category: 'Tips & Trick',
    date: '12 April 2026',
    readingTime: '5 Menit',
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80',
    tags: ['Perawatan', 'Berkelanjutan', 'Tips'],
    content: `
      <p class="lead ${pClass}"><span class="${dropCapClass}">S</span>erat alami seperti katun premium dan linen memiliki karakter yang hidup. Mereka bernapas, menyesuaikan diri dengan suhu tubuh, dan <strong>semakin melembut seiring waktu</strong>. Namun, untuk menjaga keindahannya, diperlukan ritual perawatan yang penuh kelembutan.</p>
      
      <h2>Ritual Pencucian yang Tepat</h2>
      <p class="${pClass}">Hindari penggunaan deterjen dengan bahan kimia keras. Pilihlah deterjen cair berbahan dasar tumbuhan <em>(plant-based)</em>. Untuk linen, pencucian dengan tangan atau siklus lembut pada mesin cuci menggunakan air dingin adalah sebuah keharusan demi <strong>menjaga integritas serat</strong>.</p>
      
      <p class="${pClass}">Satu rahasia yang jarang diketahui: <strong>jangan pernah mengeringkan pakaian berbahan serat alami Anda di bawah sinar matahari langsung</strong> jika Anda ingin warnanya tetap pekat. Jemurlah di tempat yang teduh dengan sirkulasi udara yang baik.</p>
      
      <h3>Menyimpan dengan Benar</h3>
      <p class="${pClass}">Lipat pakaian linen dan simpan di tempat yang sejuk dan kering. Hindari menggantung linen dalam waktu lama karena dapat menyebabkan serat meregang dan kehilangan bentuk aslinya.</p>
    `,
  },
  {
    slug: 'koleksi-warna-bumi',
    title: 'Warna Bumi: Membawa Kehangatan Alam ke Dalam Lemari Anda',
    category: 'Koleksi',
    date: '08 April 2026',
    readingTime: '4 Menit',
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80',
    tags: ['Koleksi', 'Inspirasi', 'Warna'],
    content: `
      <p class="lead ${pClass}"><span class="${dropCapClass}">A</span>lam selalu menjadi kanvas inspirasi yang tak pernah kering. Musim ini, Kirana merayakan kekayaan lanskap Nusantara melalui <strong>palet warna bumi</strong> yang mengakar dan menenangkan jiwa.</p>
      
      <h2>Harmoni Warna Alam</h2>
      <p class="${pClass}">Dari warna <em>terakota</em> yang mengingatkan pada tanah vulkanis yang subur, <em>hijau zaitun</em> dari rimbunnya dedaunan tropis, hingga <em>krem hangat</em> dari pasir pesisir pantai. Warna-warna ini didesain secara khusus agar saling melengkapi dan <strong>menyatu sempurna dengan rona kulit masyarakat Asia</strong>.</p>
      
      <p class="${pClass}">Koleksi terbaru ini tidak sekadar pakaian, ia adalah undangan untuk memperlambat ritme kehidupan, mengenakan sesuatu yang terasa seolah Anda sedang memeluk alam itu sendiri.</p>
    `,
  },
  {
    slug: 'komitmen-mode-berkelanjutan',
    title: 'Jejak Berkelanjutan: Komitmen Kirana pada Mode Ramah Lingkungan',
    category: 'Editorial',
    date: '05 April 2026',
    readingTime: '7 Menit',
    image: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&q=80',
    tags: ['Berkelanjutan', 'Etika', 'Editorial'],
    content: `
      <p class="lead ${pClass}"><span class="${dropCapClass}">M</span>enjadi jenama mode di era modern membawa tanggung jawab moral yang besar terhadap kelestarian bumi. Di Kirana, keberlanjutan <em>(sustainability)</em> bukanlah sebuah tren pemasaran, melainkan <strong>poros utama</strong> dari seluruh proses operasional kami.</p>
      
      <h2>Etika dalam Setiap Benang</h2>
      <p class="${pClass}">Kami bermitra secara langsung dengan pengrajin lokal dan memastikan rantai pasok yang transparan. Menggunakan pewarna nabati dan <strong>mendaur ulang sisa kain menjadi aksesori</strong> adalah langkah kecil kami untuk meminimalkan limbah.</p>
      
      <blockquote>"Pakaian terbaik adalah pakaian yang tidak hanya terlihat indah saat dikenakan, namun juga tidak melukai bumi saat diciptakan."</blockquote>
      
      <h3>Program Daur Ulang</h3>
      <p class="${pClass}">Kirana meluncurkan program <strong>"Second Life"</strong> di mana pelanggan dapat mengembalikan pakaian Kirana lama mereka untuk didaur ulang menjadi produk baru atau disumbangkan ke komunitas yang membutuhkan.</p>
    `,
  },
  {
    slug: 'seni-berlapis-cuaca-tropis',
    title: 'Seni Berlapis: Memadukan Pakaian Luar untuk Cuaca Tropis',
    category: 'Tips & Trick',
    date: '02 April 2026',
    readingTime: '5 Menit',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80',
    tags: ['Styling', 'Tropis', 'Tips'],
    content: `
      <p class="lead ${pClass}"><span class="${dropCapClass}">T</span>eknik layering seringkali dihindari di negara beriklim tropis karena kekhawatiran akan suhu yang panas. Namun, dengan pemilihan material dan proporsi yang akurat, <strong>gaya berlapis justru akan mengelevasi penampilan Anda</strong> tanpa mengorbankan kenyamanan.</p>
      
      <h2>Memilih Outerwear Ringan</h2>
      <p class="${pClass}">Kuncinya terletak pada bobot kain. Sebuah kardigan berbahan rajut katun halus atau blazer linen tanpa furing <em>(unlined)</em> adalah senjata rahasia Anda. Padukan dengan kaus dasar tanpa lengan dan celana berpotongan longgar.</p>
      
      <p class="${pClass}">Biarkan kancing pakaian luar Anda terbuka untuk memberikan <strong>garis vertikal</strong> yang membuat siluet tubuh terlihat lebih jenjang, sekaligus membiarkan angin berhembus menembus lapisan pakaian Anda.</p>
    `,
  },
  {
    slug: 'proses-kreatif-kapsul-monokrom',
    title: 'Di Balik Layar: Proses Kreatif Seri Kapsul Monokrom',
    category: 'Koleksi',
    date: '28 Maret 2026',
    readingTime: '6 Menit',
    image: 'https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?auto=format&fit=crop&q=80',
    tags: ['Koleksi', 'Desain', 'Monokrom'],
    content: `
      <p class="lead ${pClass}"><span class="${dropCapClass}">M</span>erancang koleksi yang sepenuhnya bergantung pada spektrum hitam dan putih adalah sebuah tantangan desain yang menguji pemahaman akan tekstur dan struktur. Tanpa distraksi warna, <strong>kekurangan sekecil apa pun pada potongan akan segera terlihat</strong>.</p>
      
      <h2>Menghidupkan Bayangan</h2>
      <p class="${pClass}">Bagi tim desainer Kirana, proses ini dimulai dengan studi tekstur kain. Kami menggabungkan <strong>katun poplin yang kaku dengan sutra campuran yang jatuh mengalir</strong>. Kontras material inilah yang memberikan dimensi pada pakaian monokromatik, sehingga ia tidak terlihat datar melainkan penuh dengan kedalaman emosional.</p>
      
      <blockquote>"Hitam dan putih bukanlah ketiadaan warna, melainkan spektrum penuh dari semua kemungkinan."</blockquote>
    `,
  },
  {
    slug: 'aksesori-esensial-penampilan',
    title: 'Aksesori Esensial: Sentuhan Akhir yang Menyempurnakan Penampilan',
    category: 'Tips & Trick',
    date: '24 Maret 2026',
    readingTime: '4 Menit',
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80',
    tags: ['Aksesori', 'Styling', 'Tips'],
    content: `
      <p class="lead ${pClass}"><span class="${dropCapClass}">P</span>akaian adalah kanvas, dan aksesori adalah goresan kuas terakhir yang menentukan arah dari mahakarya Anda. Terlalu banyak akan menenggelamkan karakter, <strong>terlalu sedikit akan terasa belum rampung</strong>.</p>
      
      <h2>Prinsip Keseimbangan</h2>
      <p class="${pClass}">Pilihlah aksesori yang memiliki geometri yang bersih. Sebuah jam tangan dengan tali kulit ramping, cincin perak berdesain arsitektural, atau syal sutra kecil yang diikatkan di leher sudah cukup untuk memberikan <em>statement</em>.</p>
      
      <p class="${pClass}">Untuk tampilan yang lebih berani, pilih satu aksesori utama dan biarkan sisanya minimal. Ini menciptakan <strong>focal point</strong> yang menarik tanpa terlihat berlebihan.</p>
    `,
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}

export function getRelatedArticles(slug: string, limit: number = 2): Article[] {
  return articles.filter((article) => article.slug !== slug).slice(0, limit);
}

export function getAllSlugs(): string[] {
  return articles.map((article) => article.slug);
}
