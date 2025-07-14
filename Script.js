const articlesData = [
      {
        id: 5,
        title: "GTA 6 Bakal Gede Banget? Siap-siap Kosongkan Hard Drive?",
        category: "game",
        image: "https://i.postimg.cc/Zq71XVGR/images.jpg",
        description: "Ukuran instalasi GTA 6 yang diprediksi sangat besar membuat para gamer mulai bersiap-siap mengosongkan hard drive mereka.",
        date: "14 Juli 2025",
        views: "9.2K",
        link: "gta6-ukuran-game.html"
      },
      {
        id: 4,
        title: "Situs Download Game Nintendo Switch Bajakan Telah Disita oleh FBI?",
        category: "game",
        image: "https://i.postimg.cc/TPPc25ky/Situs-Download-Game-Nintendo-Switch-Bajakan-Telah-Disita-oleh-FBI-2-768x432.webp",
        description: "FBI menyita situs download game Nintendo Switch bajakan NSW2U. Baca berita lengkap tentang operasi anti-pembajakan terbaru dari Nintendo.",
        date: "12 Juli 2025",
        views: "1.2K",
        link: "situs-download-nintendo-switch-bajakan-disita-fbi.html"
      },
      {
        id: 3,
        title: "Kenapa Game Android Vertikal Sudah Ditinggalkan?",
        category: "game",
        image: "https://i.postimg.cc/PJXyZw3n/images-3.jpg",
        description: "Analisis pergeseran tren game mobile dari orientasi vertikal ke horizontal dan dampaknya.",
        date: "11 Juli 2025",
        views: "4K",
        link: "game-android-vertikal.html"
      },
      {
        id: 2,
        title: "Kontroversi Upin & Ipin Universe",
        category: "game",
        image: "https://i.ibb.co/hFP0cRKf/maxresdefault.jpg",
        description: "Gaji karyawan tak dibayar & harga game yang mengundang protes.",
        date: "11 Juli 2025",
        views: "8.2K",
        link: "Kontroversi-Upin-&-Ipin-Universe.html"
      },
      {
        id: 1,
        title: "Ketika YouTube & TikTok Menjadi Sumber Berita Utama",
        category: "unique",
        image: "https://images.unsplash.com/photo-1590379492966-e076d8f84c2d?q=80&w=2070",
        description: "Analisis dampak platform video sebagai sumber berita utama dan tantangan jurnalisme modern menurut Reuters Institute.",
        date: "10 Juli 2025",
        views: "1.2K",
        link: "ketika-youtube-tiktok-menjadi-sumber-berita-utama.html"
      },

    ];

    const highlightsData = [
        {
        id: 2,
        title: "Situs Download Game Nintendo Switch Bajakan Telah Disita oleh FBI?",
        category: "game",
        image: "https://i.postimg.cc/TPPc25ky/Situs-Download-Game-Nintendo-Switch-Bajakan-Telah-Disita-oleh-FBI-2-768x432.webp",
        date: "12 Juli 2025",
        link: "situs-download-nintendo-switch-bajakan-disita-fbi.html"
      },
      {
        id: 1,
        title: "Ketika YouTube & TikTok Menjadi Sumber Berita Utama",
        category: "unique",
        image: "https://images.unsplash.com/photo-1590379492966-e076d8f84c2d?q=80&w=2070",
        date: "10 Juli 2025",
        link: "artikel-simulasi-game.html"
      },

    ];

    const articlesGrid = document.getElementById('articlesGrid');
    const highlightContainer = document.getElementById('highlightContainer');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    const addArticleBtn = document.getElementById('addArticleBtn');
    const articleModal = document.getElementById('articleModal');
    const articleForm = document.getElementById('articleForm');

    let currentCategory = 'all';
    let visibleArticles = 4;

    function initPage() {
      renderHighlights();
      renderArticles();
      setupEventListeners();
    }

    function renderHighlights() {
      highlightContainer.innerHTML = '';
      
      highlightsData.forEach(highlight => {
        const highlightCard = document.createElement('a');
        highlightCard.className = 'highlight-card';
        highlightCard.href = highlight.link;
        
        highlightCard.innerHTML = `
          <img src="${highlight.image}" alt="${highlight.title}">
          <span class="category-tag">${getCategoryName(highlight.category)}</span>
          <div class="content">
            <h3>${highlight.title}</h3>
            <div class="date">
              <i class="far fa-calendar"></i> ${highlight.date}
            </div>
          </div>
        `;
        
        highlightContainer.appendChild(highlightCard);
      });
    }

    function renderArticles() {
      articlesGrid.innerHTML = '';
      
      const filteredArticles = currentCategory === 'all' 
        ? articlesData 
        : articlesData.filter(article => article.category === currentCategory);
      
      const articlesToShow = filteredArticles.slice(0, visibleArticles);
      
      if (articlesToShow.length === 0) {
        articlesGrid.innerHTML = '<p class="no-articles">Tidak ada artikel ditemukan</p>';
        return;
      }
      
      articlesToShow.forEach(article => {
        const articleCard = document.createElement('a');
        articleCard.className = 'article-card';
        articleCard.href = article.link;
        
        articleCard.innerHTML = `
          <img src="${article.image}" alt="${article.title}">
          <div class="content">
            <div class="category">${getCategoryName(article.category)}</div>
            <h4>${article.title}</h4>
            <p>${article.description}</p>
            <div class="meta">
              <span>${article.date}</span>
              <span class="read-more">Baca selengkapnya <i class="fas fa-arrow-right"></i></span>
            </div>
          </div>
        `;
        
        articlesGrid.appendChild(articleCard);
      });
      
      loadMoreBtn.style.display = visibleArticles < filteredArticles.length ? 'block' : 'none';
    }

    function getCategoryName(category) {
      switch(category) {
        case 'game': return 'Game';
        case 'tech': return 'Teknologi';
        case 'unique': return 'Unik';
        default: return 'Umum';
      }
    }

    function setupEventListeners() {
      filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          filterBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          currentCategory = btn.dataset.category;
          visibleArticles = 4;
          renderArticles();
        });
      });
      
      loadMoreBtn.addEventListener('click', () => {
        visibleArticles += 2;
        renderArticles();
      });
      
      mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
      });
      
      articleForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const newArticle = {
          id: articlesData.length + 1,
          title: document.getElementById('articleTitle').value,
          category: document.getElementById('articleCategory').value,
          image: document.getElementById('articleImage').value,
          description: document.getElementById('articleDescription').value,
          date: new Date().toLocaleDateString('id-ID', { 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric' 
          }),
          views: "0",
          link: `artikel-${document.getElementById('articleTitle').value.toLowerCase().replace(/\s+/g, '-')}.html`
        };
        
        articlesData.unshift(newArticle);
        
        articleForm.reset();
        articleModal.style.display = 'none';
        
        renderArticles();
        
        alert('Artikel baru berhasil ditambahkan!');
      });
      
      articleModal.addEventListener('click', (e) => {
        if (e.target === articleModal) {
          articleModal.style.display = 'none';
        }
      });
    }

    document.addEventListener('DOMContentLoaded', initPage);
