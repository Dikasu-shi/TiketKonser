export const CONCERTS = [
  {
    id: 'coldplay-jakarta-2026',
    title: 'Coldplay: Music of the Spheres World Tour',
    artist: 'Coldplay',
    genre: 'Rock',
    categoryId: 'rock',
    featured: true,
    trending: true,
    badge: 'Worldwide Stadium Tour',
    date: '2026-11-15',
    time: '20:00 WIB',
    doorsOpen: '17:00 WIB',
    venueId: 'gbk',
    venueName: 'Gelora Bung Karno Stadium (GBK)',
    city: 'Jakarta',
    requiresIdentity: true,
    bannerImage: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?q=80&w=1600',
    posterImage: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=800',
    startingPrice: 1200000,
    description: `Kembalinya band legendaris asal Inggris, Coldplay, dalam tur dunia spektakuler mereka "Music of the Spheres". Saksikan gemerlap panggung kinetik ramah lingkungan, pertunjukan kembang api megah, serta ribuan gelang LED Xyloband yang menyala serentak dalam harmoni lagu-lagu hits seperti Fix You, Yellow, Viva La Vida, hingga My Universe.`,
    lineup: ['Coldplay (Chris Martin, Jonny Buckland, Guy Berryman, Will Champion)', 'Special Opening Guest: Rahmania Astrini'],
    terms: [
      'Tiket yang sudah dibeli tidak dapat ditukar atau dikembalikan.',
      'Anak di bawah usia 12 tahun wajib didampingi oleh orang dewasa.',
      'Dilarang membawa kamera profesional, senjata, dan makanan/minuman dari luar.',
      'E-ticket resmi dengan QR Code akan aktif pada H-3 sebelum konser.'
    ],
    ticketTiers: [
      {
        id: 'cat-1-vip',
        name: 'CAT 1 — Ultimate VIP Package',
        type: 'vip',
        price: 5500000,
        quota: 15,
        available: 8,
        color: '#a855f7',
        seatType: 'Numbered Seating',
        perks: [
          'Akses barisan depan paling dekat ke panggung utama',
          'Merchandise eksklusif tur edisi terbatas',
          'Akses jalur khusus VIP Entry & Early Access Lounge',
          'Official Tour Lanyard & Commemorative Eco-Wristband'
        ]
      },
      {
        id: 'cat-2-festival',
        name: 'CAT 2 — Festival (Standing)',
        type: 'festival',
        price: 2800000,
        quota: 250,
        available: 45,
        color: '#0ea5e9',
        seatType: 'Free Standing Area',
        perks: [
          'Akses area lapangan tengah tepat di hadapan runway',
          'Sensasi energi konser paling imersif di tengah kerumunan',
          'Disediakan wristband Xyloband LED sinkronisasi musik'
        ]
      },
      {
        id: 'cat-3-tribune-lower',
        name: 'CAT 3 — Tribune Barat/Timur (Bawah)',
        type: 'tribune',
        price: 1850000,
        quota: 120,
        available: 22,
        color: '#f97316',
        seatType: 'Numbered Seating',
        perks: [
          'Pemandangan sudut pandang elevated yang sangat jelas',
          'Kursi bernomor (Numbered Seating) dengan sandaran nyaman',
          'Akses mudah ke area booth makanan dan toilet khusus'
        ]
      },
      {
        id: 'cat-4-tribune-upper',
        name: 'CAT 4 — Tribune Atas (Upper Tier)',
        type: 'tribune',
        price: 1200000,
        quota: 180,
        available: 12,
        color: '#10b981',
        seatType: 'Numbered Seating',
        perks: [
          'Panorama pemandangan visual seluruh stadion GBK',
          'Kursi bernomor terjamin (Numbered Seating)',
          'Audio delay tower sound system dengan akustik seimbang'
        ]
      }
    ]
  },
  {
    id: 'bruno-mars-live-2026',
    title: 'Bruno Mars: 24K Magic Live in Jakarta',
    artist: 'Bruno Mars',
    genre: 'Pop',
    categoryId: 'pop',
    featured: true,
    trending: true,
    badge: 'Exclusive 2-Day Show',
    date: '2026-09-20',
    time: '19:30 WIB',
    doorsOpen: '16:30 WIB',
    venueId: 'jis',
    venueName: 'Jakarta International Stadium (JIS)',
    city: 'Jakarta',
    requiresIdentity: true,
    bannerImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1600',
    posterImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800',
    startingPrice: 1500000,
    description: `Ikon musik global dan pemenang 15 penghargaan Grammy Awards, Bruno Mars, siap memukau Jakarta dengan energi panggung berkelas dunia, koreografi memukau, serta barisan lagu hits abadi seperti Uptown Funk, 24K Magic, That's What I Like, Leave The Door Open, dan Just The Way You Are.`,
    lineup: ['Bruno Mars & The Hooligans'],
    terms: [
      'Maksimal pembelian 4 tiket per akun terverifikasi.',
      'Identitas KTP/Paspor asli wajib dibawa saat penukaran tiket.',
      'Dilarang melakukan rekam video live-stream komersial selama acara berlangsung.'
    ],
    ticketTiers: [
      {
        id: 'bm-vip-gold',
        name: 'VIP Gold Lounge Package',
        type: 'vip',
        price: 6200000,
        quota: 30,
        available: 4,
        color: '#a855f7',
        seatType: 'Numbered Reserved Seating',
        perks: [
          'Akses area duduk terbaik tepat di tengah panggung',
          'Free Flow Cocktail & Exclusive Catering Lounge',
          'Exclusive VIP Gift Bag & Tour Poster',
          'Dedicated Fast-track Entry'
        ]
      },
      {
        id: 'bm-cat-1-festival',
        name: 'Festival A (Center Stage)',
        type: 'festival',
        price: 3100000,
        quota: 100,
        available: 38,
        color: '#0ea5e9',
        seatType: 'Free Standing',
        perks: [
          'Area berdiri paling depan di sekeliling panggung utama',
          'Jalur masuk prioritas antrean festival'
        ]
      },
      {
        id: 'bm-cat-2-tribune',
        name: 'CAT 2 — Tier 1 Seating',
        type: 'tribune',
        price: 2200000,
        quota: 80,
        available: 19,
        color: '#f97316',
        seatType: 'Numbered Seating',
        perks: [
          'Kursi tribun tingkat satu dengan jarak pandang sangat dekat',
          'Pemandangan visual panggung tanpa halangan'
        ]
      },
      {
        id: 'bm-cat-3-tribune-upper',
        name: 'CAT 3 — Tier 2 Seating',
        type: 'tribune',
        price: 1500000,
        quota: 150,
        available: 56,
        color: '#10b981',
        seatType: 'Numbered Seating',
        perks: [
          'Kursi tribun bertingkat dengan kenyamanan optimal',
          'Akses jalur masuk tribun sisi barat/timur'
        ]
      }
    ]
  },
  {
    id: 'taylor-swift-eras-tour',
    title: 'Taylor Swift: The Eras Tour (Special Encore)',
    artist: 'Taylor Swift',
    genre: 'Pop',
    categoryId: 'pop',
    featured: true,
    trending: true,
    badge: 'Historic 3.5h Spectacle',
    date: '2026-12-05',
    time: '18:30 WIB',
    doorsOpen: '15:30 WIB',
    venueId: 'gbk',
    venueName: 'Gelora Bung Karno Stadium (GBK)',
    city: 'Jakarta',
    requiresIdentity: true,
    bannerImage: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?q=80&w=1600',
    posterImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800',
    startingPrice: 1750000,
    description: `Sensasi konser terlaris sepanjang sejarah! Taylor Swift membawa perjalanan musikal 44 lagu dari 10 era album legendarisnya ke hadapan para Swifties Indonesia dalam durasi 3.5 jam penuh dengan panggung raksasa, visual LED sinematik, dan ratusan kostum haute couture.`,
    lineup: ['Taylor Swift', 'Special Guest: Sabrina Carpenter'],
    terms: [
      'Setiap akun hanya diperbolehkan membeli maksimal 4 tiket.',
      'Gelang Light-up LED interaktif akan dibagikan di pintu gerbang masuk.',
      'Kostum dan friendship bracelets dipersilakan untuk dibawa dan ditukar.'
    ],
    ticketTiers: [
      {
        id: 'ts-karma-vip',
        name: "It's Been A Long Time Coming (VIP 1)",
        type: 'vip',
        price: 8500000,
        quota: 20,
        available: 2,
        color: '#a855f7',
        seatType: 'Numbered Floor Seating',
        perks: [
          'Kursi barisan terdepan Diamond Seating Area',
          'Exclusive Taylor Swift VIP Merchandise Box',
          'Special Commemorative VIP Laminate & Matching Lanyard',
          'Jalur khusus check-in dan gate masuk stadion'
        ]
      },
      {
        id: 'ts-cat-1-front-standing',
        name: 'CAT 1 — Front Standing Area (A & B)',
        type: 'festival',
        price: 3800000,
        quota: 120,
        available: 18,
        color: '#0ea5e9',
        seatType: 'Free Standing Area',
        perks: [
          'Akses berdiri tepat di samping panggung catwalk utama',
          'Pemandangan sudut 360 derajat aksi panggung Taylor'
        ]
      },
      {
        id: 'ts-cat-2-lower-bowl',
        name: 'CAT 2 — Lower Bowl Seating',
        type: 'tribune',
        price: 2750000,
        quota: 90,
        available: 31,
        color: '#f97316',
        seatType: 'Numbered Seating',
        perks: [
          'Posisi tengah stadion dengan visual efek panggung maksimal',
          'Kursi bernomor (Numbered Seating)'
        ]
      },
      {
        id: 'ts-cat-3-upper-bowl',
        name: 'CAT 3 — Upper Bowl Seating',
        type: 'tribune',
        price: 1750000,
        quota: 140,
        available: 64,
        color: '#10b981',
        seatType: 'Numbered Seating',
        perks: [
          'Pemandangan megah formasi koreografi dan visual stadion',
          'Kursi bernomor terjamin'
        ]
      }
    ]
  },
  {
    id: 'blackpink-born-pink-finale',
    title: 'BLACKPINK: World Tour [BORN PINK] Finale',
    artist: 'BLACKPINK',
    genre: 'K-Pop',
    categoryId: 'kpop',
    featured: true,
    trending: true,
    badge: 'K-Pop Royalty Live',
    date: '2026-10-18',
    time: '19:00 WIB',
    doorsOpen: '16:00 WIB',
    venueId: 'jis',
    venueName: 'Jakarta International Stadium (JIS)',
    city: 'Jakarta',
    requiresIdentity: true,
    bannerImage: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1600',
    posterImage: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=800',
    startingPrice: 1350000,
    description: `Grup wanita terbesar di dunia, JISOO, JENNIE, ROSÉ, dan LISA, kembali mengguncang panggung dengan tur puncak BORN PINK. Siapkan Hammer Bong dan bernyanyi bersama hits legendaris seperti Pink Venom, How You Like That, Shut Down, hingga penampilan solo spektakuler tiap member.`,
    lineup: ['BLACKPINK (Jisoo, Jennie, Rosé, Lisa)', 'Live Band: The Band Six'],
    terms: [
      'Pemeriksaan tas ketat di setiap gerbang pintu masuk.',
      'Hanya lightstick resmi dan baterai standar yang diizinkan masuk arena.'
    ],
    ticketTiers: [
      {
        id: 'bp-blink-vip',
        name: 'BLINK VIP Soundcheck Package',
        type: 'vip',
        price: 4800000,
        quota: 25,
        available: 5,
        color: '#a855f7',
        seatType: 'Numbered Seating VIP',
        perks: [
          'Akses eksklusif Soundcheck Party sebelum konser dibuka',
          'Early entry pass ke venue',
          'Exclusive Blackpink commemorative laminate & lanyard',
          'Antrean khusus pada official merchandise store'
        ]
      },
      {
        id: 'bp-cat-1-platinum',
        name: 'CAT 1 — Platinum Seating',
        type: 'festival',
        price: 3400000,
        quota: 80,
        available: 15,
        color: '#0ea5e9',
        seatType: 'Numbered Seating',
        perks: [
          'Duduk paling dekat dengan extended stage catwalk',
          'Kenyamanan kursi bernomor'
        ]
      },
      {
        id: 'bp-cat-2-standing',
        name: 'CAT 2 — Standing Festival',
        type: 'tribune',
        price: 2400000,
        quota: 100,
        available: 42,
        color: '#f97316',
        seatType: 'Free Standing',
        perks: [
          'Area berdiri tengah dengan energi fanchant maksimal',
          'Nomor antrean masuk festival'
        ]
      },
      {
        id: 'bp-cat-3-tribune',
        name: 'CAT 3 — Tribune Upper Level',
        type: 'tribune',
        price: 1350000,
        quota: 120,
        available: 58,
        color: '#10b981',
        seatType: 'Numbered Seating',
        perks: [
          'Visual ocean lightstick pink dari ketinggian tribun',
          'Kursi bernomor terjamin'
        ]
      }
    ]
  },
  {
    id: 'avicii-tribute-symphony',
    title: 'The Avicii Symphony & Tim Bergling Tribute',
    artist: 'Stockholm Concert Orchestra & Global DJs',
    genre: 'EDM & Electronic',
    categoryId: 'edm',
    featured: false,
    trending: true,
    badge: 'Orchestral EDM Live',
    date: '2026-10-30',
    time: '20:30 WIB',
    doorsOpen: '18:00 WIB',
    venueId: 'bcis',
    venueName: 'Beach City International Stadium (BCIS)',
    city: 'Jakarta',
    requiresIdentity: false,
    bannerImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1600',
    posterImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800',
    startingPrice: 950000,
    description: `Malam perayaan mahakarya musik EDM mendiang Tim Bergling (Avicii). Menggabungkan 60 musisi orkestra simfoni kelas dunia, penyanyi live original, serta pertunjukan laser & visual hologram untuk membawakan Wake Me Up, Levels, Without You, Hey Brother, dan The Nights.`,
    lineup: ['Stockholm Symphony Orchestra', 'Guest Vocalists: Aloe Blacc, Sandro Cavazza', 'Guest DJ Sets'],
    terms: ['Seluruh hasil sebagian tiket didonasikan ke Tim Bergling Foundation.'],
    ticketTiers: [
      {
        id: 'av-vip-lounge',
        name: 'VIP Golden Circle (Seated)',
        type: 'vip',
        price: 2800000,
        quota: 40,
        available: 12,
        color: '#a855f7',
        seatType: 'Numbered Seating',
        perks: ['Akses baris depan orkestra', 'Exclusive Tribute Booklet & Vinyl Replica', 'Welcome Drink & VIP Bar Access']
      },
      {
        id: 'av-cat-1-dance',
        name: 'Dance Floor (Standing)',
        type: 'festival',
        price: 1650000,
        quota: 120,
        available: 48,
        color: '#0ea5e9',
        seatType: 'Free Standing Area',
        perks: ['Area lantai dansa tengah di hadapan sound system utama', 'Suasana festival rave penuh energi']
      },
      {
        id: 'av-cat-2-tribune',
        name: 'Tribune Balcony',
        type: 'tribune',
        price: 950000,
        quota: 100,
        available: 37,
        color: '#10b981',
        seatType: 'Numbered Seating',
        perks: ['Kursi balkon dengan akustik suara orkestra jernih']
      }
    ]
  },
  {
    id: 'ed-sheeran-mathematics-tour',
    title: 'Ed Sheeran: + - = ÷ x (Mathematics) Tour',
    artist: 'Ed Sheeran',
    genre: 'Pop',
    categoryId: 'pop',
    featured: false,
    trending: false,
    badge: '360° Rotating Stage',
    date: '2026-11-28',
    time: '19:30 WIB',
    doorsOpen: '16:30 WIB',
    venueId: 'gbk',
    venueName: 'Gelora Bung Karno Stadium (GBK)',
    city: 'Jakarta',
    requiresIdentity: true,
    bannerImage: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=1600',
    posterImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800',
    startingPrice: 1100000,
    description: `Penyanyi dan penulis lagu asal Inggris, Ed Sheeran, kembali dengan panggung revolusioner 360 derajat di tengah stadion GBK. Bermodalkan gitar akustik dan custom loop pedal andalannya, rasakan keintiman Shape of You, Perfect, Photograph, Thinking Out Loud, dan Bad Habits.`,
    lineup: ['Ed Sheeran', 'Opening Act: Calum Scott'],
    terms: ['Panggung berbentuk lingkaran 360 derajat berputar sehingga seluruh sudut penonton mendapatkan jarak pandang yang setara.'],
    ticketTiers: [
      {
        id: 'es-cat-1-standing',
        name: 'CAT 1 — 360° Ring Floor (Standing)',
        type: 'festival',
        price: 2900000,
        quota: 80,
        available: 16,
        color: '#0ea5e9',
        seatType: 'Free Standing 360°',
        perks: ['Berdiri mengelilingi panggung berputar Ed Sheeran', 'Jarak super dekat ke aksi akustik']
      },
      {
        id: 'es-cat-2-tribune',
        name: 'CAT 2 — Lower Tribune West/East',
        type: 'tribune',
        price: 1950000,
        quota: 100,
        available: 28,
        color: '#f97316',
        seatType: 'Numbered Seating',
        perks: ['Sudut pandang diagonal sempurna menghadap tata lampu panggung halo']
      },
      {
        id: 'es-cat-3-tribune',
        name: 'CAT 3 — Upper Tribune',
        type: 'tribune',
        price: 1100000,
        quota: 120,
        available: 50,
        color: '#10b981',
        seatType: 'Numbered Seating',
        perks: ['Pemandangan luas seluruh stadion bergemuruh']
      }
    ]
  },
  {
    id: 'the-weeknd-after-hours-til-dawn',
    title: 'The Weeknd: After Hours Til Dawn Stadium Tour',
    artist: 'The Weeknd',
    genre: 'Hip Hop & R&B',
    categoryId: 'hiphop',
    featured: false,
    trending: true,
    badge: 'Cinematic Dystopian Rave',
    date: '2026-12-12',
    time: '20:00 WIB',
    doorsOpen: '17:00 WIB',
    venueId: 'jis',
    venueName: 'Jakarta International Stadium (JIS)',
    city: 'Jakarta',
    requiresIdentity: true,
    bannerImage: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1600',
    posterImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800',
    startingPrice: 1400000,
    description: `Abel Tesfaye menghadirkan visi dunia distopia berlatar instalasi kota futuristik dan patung krom raksasa. Menghadirkan lagu-lagu legendaris Blinding Lights, Starboy, The Hills, Die For You, hingga Save Your Tears dengan tata suara surround dan efek pyro laser memukau.`,
    lineup: ['The Weeknd', 'Special Guests: Kaytranada, Mike Dean'],
    terms: ['Wajib menaati arahan petugas keamanan di area lapangan.'],
    ticketTiers: [
      {
        id: 'tw-vip-lounge',
        name: 'VIP Dawn Lounge Experience',
        type: 'vip',
        price: 5800000,
        quota: 25,
        available: 6,
        color: '#a855f7',
        seatType: 'Numbered VIP Seating',
        perks: ['Akses lounge eksklusif ber-AC', 'Exclusive The Weeknd Merch Pack', 'Dedicated Entry Gate']
      },
      {
        id: 'tw-cat-1-floor',
        name: 'CAT 1 — City Floor Standing',
        type: 'festival',
        price: 3200000,
        quota: 90,
        available: 22,
        color: '#0ea5e9',
        seatType: 'Free Standing',
        perks: ['Area lapangan berdiri tepat di sepanjang panggung runway 100 meter']
      },
      {
        id: 'tw-cat-2-tribune',
        name: 'CAT 2 — Lower Bowl Seating',
        type: 'tribune',
        price: 2100000,
        quota: 80,
        available: 34,
        color: '#f97316',
        seatType: 'Numbered Seating',
        perks: ['Pemandangan simetris ke arah instalasi visual bulan raksasa']
      },
      {
        id: 'tw-cat-3-tribune',
        name: 'CAT 3 — Upper Bowl Seating',
        type: 'tribune',
        price: 1400000,
        quota: 110,
        available: 49,
        color: '#10b981',
        seatType: 'Numbered Seating',
        perks: ['Kursi tribun bernomor terjamin']
      }
    ]
  },
  {
    id: 'olivia-rodrigo-guts-tour',
    title: 'Olivia Rodrigo: GUTS World Tour Live',
    artist: 'Olivia Rodrigo',
    genre: 'Pop',
    categoryId: 'pop',
    featured: false,
    trending: true,
    badge: 'Pop-Punk Sensation',
    date: '2026-10-10',
    time: '19:30 WIB',
    doorsOpen: '16:30 WIB',
    venueId: 'ice-bsd',
    venueName: 'Indonesia Convention Exhibition (ICE BSD)',
    city: 'Tangerang',
    requiresIdentity: false,
    bannerImage: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?q=80&w=1600',
    posterImage: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800',
    startingPrice: 1250000,
    description: `Bintang pop-punk generasi baru, Olivia Rodrigo, siap mengajak ribuan penggemar bernyanyi lepas dalam tur album GUTS dan SOUR. Dengarkan langsung hits vampir, get him back!, drivers license, good 4 u, dan deja vu.`,
    lineup: ['Olivia Rodrigo', 'Opening Act: The Breeders'],
    terms: ['Dilarang membawa banner berukuran lebih besar dari ukuran A3.'],
    ticketTiers: [
      {
        id: 'or-vip-guts',
        name: 'GUTS VIP Pit Experience',
        type: 'vip',
        price: 4200000,
        quota: 30,
        available: 7,
        color: '#a855f7',
        seatType: 'Standing Pit VIP',
        perks: ['Akses paling depan di dalam barrier pit', 'Exclusive Olivia Rodrigo GUTS Merch Pack', 'Early Entry Pass']
      },
      {
        id: 'or-cat-1-festival',
        name: 'CAT 1 — Festival Standing',
        type: 'festival',
        price: 2500000,
        quota: 100,
        available: 29,
        color: '#0ea5e9',
        seatType: 'Free Standing',
        perks: ['Area berdiri utama aula ICE BSD Hall 1-3']
      },
      {
        id: 'or-cat-2-seated',
        name: 'CAT 2 — Numbered Seating',
        type: 'tribune',
        price: 1750000,
        quota: 80,
        available: 33,
        color: '#f97316',
        seatType: 'Numbered Seating',
        perks: ['Tribun duduk bertingkat dengan kenyamanan kursi berbusa']
      },
      {
        id: 'or-cat-3-seated',
        name: 'CAT 3 — Back Seating',
        type: 'tribune',
        price: 1250000,
        quota: 90,
        available: 41,
        color: '#10b981',
        seatType: 'Numbered Seating',
        perks: ['Kursi bernomor terjangkau dengan audio jernih']
      }
    ]
  },
  {
    id: 'arctic-monkeys-live-jakarta',
    title: 'Arctic Monkeys: Live in Jakarta',
    artist: 'Arctic Monkeys',
    genre: 'Rock',
    categoryId: 'rock',
    featured: false,
    trending: false,
    badge: 'Indie Rock Legends',
    date: '2026-11-08',
    time: '20:00 WIB',
    doorsOpen: '17:00 WIB',
    venueId: 'bcis',
    venueName: 'Beach City International Stadium (BCIS)',
    city: 'Jakarta',
    requiresIdentity: false,
    bannerImage: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=1600',
    posterImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800',
    startingPrice: 1300000,
    description: `Alex Turner dan Arctic Monkeys siap menggetarkan panggung BCIS Ancol dengan pesona rock klasik khas Sheffield. Tampilkan hits legendaris seperti Do I Wanna Know?, R U Mine?, 505, I Wanna Be Yours, hingga materi bernuansa sinematik dari The Car.`,
    lineup: ['Arctic Monkeys (Alex Turner, Jamie Cook, Nick O’Malley, Matt Helders)'],
    terms: ['Penggunaan kamera handphone dianjurkan tanpa menyalakan lampu kilat (flash).'],
    ticketTiers: [
      {
        id: 'am-cat-1-festival-a',
        name: 'CAT 1 — Festival A (Front Pit)',
        type: 'festival',
        price: 2800000,
        quota: 70,
        available: 14,
        color: '#0ea5e9',
        seatType: 'Free Standing',
        perks: ['Akses tepat di depan panggung utama', 'Jalur masuk awal area festival']
      },
      {
        id: 'am-cat-2-festival-b',
        name: 'CAT 2 — Festival B',
        type: 'festival',
        price: 2000000,
        quota: 100,
        available: 39,
        color: '#f97316',
        seatType: 'Free Standing',
        perks: ['Area berdiri tengah arena']
      },
      {
        id: 'am-cat-3-tribune',
        name: 'CAT 3 — Tribune Seating',
        type: 'tribune',
        price: 1300000,
        quota: 80,
        available: 30,
        color: '#10b981',
        seatType: 'Numbered Seating',
        perks: ['Kursi tribun bernomor terjamin']
      }
    ]
  },
  {
    id: 'dua-lipa-radical-optimism',
    title: 'Dua Lipa: Radical Optimism World Tour',
    artist: 'Dua Lipa',
    genre: 'Pop',
    categoryId: 'pop',
    featured: false,
    trending: false,
    badge: 'Disco-Pop Extravaganza',
    date: '2026-11-21',
    time: '20:00 WIB',
    doorsOpen: '17:00 WIB',
    venueId: 'ice-bsd',
    venueName: 'Indonesia Convention Exhibition (ICE BSD)',
    city: 'Tangerang',
    requiresIdentity: false,
    bannerImage: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=1600',
    posterImage: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=800',
    startingPrice: 1150000,
    description: `Ratu disko pop modern, Dua Lipa, kembali dengan produksi panggung penuh koreografi futuristik dan warna euforia. Menampilkan hits Houdini, Training Season, Levitating, Don't Start Now, dan Dance The Night.`,
    lineup: ['Dua Lipa & World Tour Dancers'],
    terms: ['Pintu arena dibuka 3 jam sebelum pertunjukan dimulai.'],
    ticketTiers: [
      {
        id: 'dl-vip-club',
        name: 'VIP Club Optimism Lounge',
        type: 'vip',
        price: 4500000,
        quota: 25,
        available: 6,
        color: '#a855f7',
        seatType: 'VIP Seated Lounge',
        perks: ['Akses lounge pesta pre-show khusus', 'Merchandise eksklusif tur', 'VIP priority lane']
      },
      {
        id: 'dl-cat-1-festival',
        name: 'CAT 1 — Dance Floor Festival',
        type: 'festival',
        price: 2600000,
        quota: 90,
        available: 24,
        color: '#0ea5e9',
        seatType: 'Free Standing Area',
        perks: ['Lantai dansa tengah panggung catwalk']
      },
      {
        id: 'dl-cat-2-tribune',
        name: 'CAT 2 — Numbered Seating',
        type: 'tribune',
        price: 1750000,
        quota: 80,
        available: 35,
        color: '#f97316',
        seatType: 'Numbered Seating',
        perks: ['Kursi tribun bernomor']
      },
      {
        id: 'dl-cat-3-tribune',
        name: 'CAT 3 — Standard Seating',
        type: 'tribune',
        price: 1150000,
        quota: 100,
        available: 52,
        color: '#10b981',
        seatType: 'Numbered Seating',
        perks: ['Kursi bernomor terjangkau']
      }
    ]
  },
  {
    id: 'billie-eilish-hit-me-hard',
    title: 'Billie Eilish: HIT ME HARD AND SOFT The Tour',
    artist: 'Billie Eilish',
    genre: 'Pop',
    categoryId: 'pop',
    featured: false,
    trending: true,
    badge: '360° Soundstage Tour',
    date: '2026-12-19',
    time: '20:00 WIB',
    doorsOpen: '17:00 WIB',
    venueId: 'jis',
    venueName: 'Jakarta International Stadium (JIS)',
    city: 'Jakarta',
    requiresIdentity: true,
    bannerImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1600',
    posterImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800',
    startingPrice: 1200000,
    description: `Pemenang 9 Grammy dan 2 Oscar, Billie Eilish bersama Finneas menghadirkan aransemen emosional dan dentuman bass intim album terbarunya. Saksikan langsung LUNCH, BIRDS OF A FEATHER, CHIHIRO, bad guy, dan happier than ever.`,
    lineup: ['Billie Eilish', 'Finneas O’Connell'],
    terms: ['Inisiatif ramah lingkungan: penonton disarankan membawa botol tumbler kosong yang dapat diisi di water station gratis.'],
    ticketTiers: [
      {
        id: 'be-cat-1-floor',
        name: 'CAT 1 — Floor Standing Area',
        type: 'festival',
        price: 2950000,
        quota: 80,
        available: 18,
        color: '#0ea5e9',
        seatType: 'Free Standing 360°',
        perks: ['Akses paling dekat dengan panggung tengah 360 derajat', 'Eco-friendly commemorative wristband']
      },
      {
        id: 'be-cat-2-tribune-lower',
        name: 'CAT 2 — Lower Bowl Seating',
        type: 'tribune',
        price: 1950000,
        quota: 90,
        available: 36,
        color: '#f97316',
        seatType: 'Numbered Seating',
        perks: ['Visual panggung tengah yang optimal dari tribun bawah']
      },
      {
        id: 'be-cat-3-tribune-upper',
        name: 'CAT 3 — Upper Bowl Seating',
        type: 'tribune',
        price: 1200000,
        quota: 110,
        available: 45,
        color: '#10b981',
        seatType: 'Numbered Seating',
        perks: ['Kursi bernomor terjamin']
      }
    ]
  },
  {
    id: 'rex-orange-county-live',
    title: 'Rex Orange County: The Pony & Who Cares Tour',
    artist: 'Rex Orange County',
    genre: 'Jazz & Acoustic',
    categoryId: 'jazz',
    featured: false,
    trending: false,
    badge: 'Intimate Indoor Live',
    date: '2026-10-24',
    time: '19:30 WIB',
    doorsOpen: '17:00 WIB',
    venueId: 'tennis-indoor',
    venueName: 'Tennis Indoor Senayan',
    city: 'Jakarta',
    requiresIdentity: false,
    bannerImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1600',
    posterImage: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?q=80&w=800',
    startingPrice: 850000,
    description: `Alexander O'Connor (Rex Orange County) membawakan nuansa hangat balada indie pop jazzy di venue Tennis Indoor Senayan yang intim. Nyanyikan bersama Sunflower, Best Friend, Amazing, THE SHADE, dan Loving Is Easy.`,
    lineup: ['Rex Orange County & Full Live Brass Band'],
    terms: ['Kapasitas sangat terbatas untuk menjaga keintiman konser.'],
    ticketTiers: [
      {
        id: 'roc-cat-1-festival',
        name: 'CAT 1 — Festival Standing',
        type: 'festival',
        price: 1600000,
        quota: 60,
        available: 12,
        color: '#0ea5e9',
        seatType: 'Free Standing',
        perks: ['Berdiri paling dekat dengan instrumen piano Rex', 'Jalur masuk prioritas']
      },
      {
        id: 'roc-cat-2-tribune',
        name: 'CAT 2 — Tribune Seating',
        type: 'tribune',
        price: 1150000,
        quota: 70,
        available: 26,
        color: '#f97316',
        seatType: 'Numbered Seating',
        perks: ['Kursi bernomor dengan kenyamanan optimal']
      },
      {
        id: 'roc-cat-3-tribune',
        name: 'CAT 3 — Upper Tribune',
        type: 'tribune',
        price: 850000,
        quota: 80,
        available: 38,
        color: '#10b981',
        seatType: 'Numbered Seating',
        perks: ['Akses tribun atas dengan harga bersahabat']
      }
    ]
  }
];
