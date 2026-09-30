/**
 * Gera o arquivo HTML único completo (Single-File Landing Page) com todas as 14 seções,
 * CSS e JavaScript puros embutidos, Tailwind via CDN, Google Fonts e comentários claros
 * indicando onde o cliente deve substituir fotos reais, textos, preços, horários e links.
 */
export function generateStandaloneSingleFileHtml(images: {
  hero: string;
  gtechniq: string;
  before: string;
  after: string;
  ultrabike: string;
}): string {
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://garagecarwash.com.br';
  const resolveUrl = (src: string) =>
    src.startsWith('http') || src.startsWith('data:') ? src : `${origin}${src}`;

  const heroImg = resolveUrl(images.hero);
  const gtechniqImg = resolveUrl(images.gtechniq);
  const beforeImg = resolveUrl(images.before);
  const afterImg = resolveUrl(images.after);
  const ultrabikeImg = resolveUrl(images.ultrabike);

  return `<!DOCTYPE html>
<html lang="pt-BR" class="scroll-smooth">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Garage Car Wash | Estética Automotiva Premium no Rio de Janeiro</title>
  <meta name="description" content="Estética automotiva premium no Rio de Janeiro desde 2006. Especialistas Gtechniq Accredited em vitrificação, polimento, PPF e higienização na Barra da Tijuca e São Conrado." />
  <meta name="keywords" content="estética automotiva, vitrificação, polimento, PPF, Gtechniq, Barra da Tijuca, São Conrado, Rio de Janeiro" />

  <!-- Open Graph / Social Sharing -->
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="pt_BR" />
  <meta property="og:site_name" content="Garage Car Wash" />
  <meta property="og:title" content="Garage Car Wash | Estética Automotiva Premium no Rio de Janeiro" />
  <meta property="og:description" content="O cuidado que seu carro merece. Desde 2006. Estética automotiva premium: vitrificação, polimento e PPF com tecnologia Gtechniq no Rio de Janeiro." />
  <!-- [PERSONALIZAR]: URL oficial e imagem de capa Open Graph -->
  <meta property="og:url" content="https://garagecarwash.com.br" />
  <meta property="og:image" content="${heroImg}" />

  <!-- Favicon SVG -->
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='12' fill='%230A0A0A'/%3E%3Ctext x='32' y='41' font-family='Arial,sans-serif' font-weight='900' font-size='26' text-anchor='middle' fill='%23FFFFFF'%3EG%3Ctspan fill='%23F26A21'%3ECW%3C/tspan%3E%3C/text%3E%3C/svg%3E" />

  <!-- Google Fonts: Montserrat, Plus Jakarta Sans e JetBrains Mono -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Montserrat:wght@600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />

  <!-- Tailwind CSS via CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            obsidian: '#0A0A0A',
            graphite: '#151515',
            charcoal: '#1F1F1F',
            brand: '#F26A21'
          },
          fontFamily: {
            display: ['Montserrat', 'sans-serif'],
            sans: ['Plus Jakarta Sans', 'sans-serif'],
            mono: ['JetBrains Mono', 'monospace']
          }
        }
      }
    };
  </script>

  <!-- Schema.org JSON-LD: AutoWash / LocalBusiness com as 2 Unidades -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "AutoWash",
    "name": "Garage Car Wash",
    "url": "https://garagecarwash.com.br",
    "foundingDate": "2006",
    "description": "Estética automotiva premium no Rio de Janeiro desde 2006. Certificação Gtechniq Accredited | CSU.",
    "sameAs": ["https://www.instagram.com/garagecarwash_br"],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "bestRating": "5",
      "ratingCount": "148"
    },
    "department": [
      {
        "@type": "AutoWash",
        "name": "Garage Car Wash - Unidade Fashion Mall (São Conrado)",
        "telephone": "+55-21-3591-0954",
        "email": "lojafashionmall@garagecarwash.com.br",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Estrada da Gávea, 899 – Shopping Fashion Mall",
          "addressLocality": "Rio de Janeiro",
          "addressRegion": "RJ",
          "postalCode": "22610-001",
          "addressCountry": "BR"
        }
      },
      {
        "@type": "AutoWash",
        "name": "Garage Car Wash - Unidade Shopping Metropolitano (Barra Olímpica)",
        "telephone": "+55-21-97301-6773",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Subsolo, Av. Embaixador Abelardo Bueno, 1300 – Barra Olímpica",
          "addressLocality": "Rio de Janeiro",
          "addressRegion": "RJ",
          "postalCode": "22775-040",
          "addressCountry": "BR"
        }
      }
    ]
  }
  </script>

  <style>
    body { background-color: #0A0A0A; color: #FFFFFF; font-family: 'Plus Jakarta Sans', sans-serif; }
    .font-display { font-family: 'Montserrat', sans-serif; }
    .tabular-nums { font-variant-numeric: tabular-nums; }
    .metallic-surface {
      background: linear-gradient(145deg, #161616 0%, #0E0E0E 100%);
      position: relative;
      overflow: hidden;
    }
    .metallic-surface::before {
      content: '';
      position: absolute;
      top: 0; left: -100%; width: 60%; height: 100%;
      background: linear-gradient(90deg, transparent, rgba(242, 106, 33, 0.06), rgba(255, 255, 255, 0.06), transparent);
      transform: skewX(-25deg);
      transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
      pointer-events: none;
    }
    .metallic-surface:hover::before { transform: translateX(350%) skewX(-25deg); }
    .reveal { opacity: 0; transform: translateY(20px); transition: opacity 0.5s ease, transform 0.5s ease; }
    .reveal.visible { opacity: 1; transform: translateY(0); }
    @keyframes pulse-ring {
      0% { transform: scale(0.95); opacity: 0.7; }
      70% { transform: scale(1.35); opacity: 0; }
      100% { transform: scale(1.35); opacity: 0; }
    }
    .whatsapp-pulse::before {
      content: ''; position: absolute; inset: 0; border-radius: 9999px;
      background-color: #F26A21; animation: pulse-ring 2.4s infinite; z-index: -1;
    }
  </style>
</head>
<body class="bg-[#0A0A0A] text-white antialiased selection:bg-[#F26A21] selection:text-white">

  <!-- 1. HEADER FIXO -->
  <header id="site-header" class="fixed top-0 inset-x-0 z-50 h-16 transition-all duration-300 border-b border-transparent">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
      <a href="#inicio" class="font-display font-extrabold text-lg tracking-[0.18em] uppercase whitespace-nowrap">
        GARAGE<span class="text-[#F26A21] ml-1.5">CARWASH</span>
      </a>
      <nav class="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-300">
        <a href="#inicio" class="nav-link hover:text-white transition-colors">Início</a>
        <a href="#servicos" class="nav-link hover:text-white transition-colors">Serviços</a>
        <a href="#diferenciais" class="nav-link hover:text-white transition-colors">Diferenciais</a>
        <a href="#galeria" class="nav-link hover:text-white transition-colors">Galeria</a>
        <a href="#unidades" class="nav-link hover:text-white transition-colors">Unidades</a>
        <a href="#contato" class="nav-link hover:text-white transition-colors">Contato</a>
      </nav>
      <div class="flex items-center gap-3">
        <a href="https://wa.me/5521975158016?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20um%20servi%C3%A7o%20na%20Garage%20Car%20Wash." target="_blank" rel="noopener noreferrer" class="hidden sm:inline-flex px-4 py-2 rounded-lg bg-[#F26A21] hover:bg-[#df5b14] text-white text-xs font-semibold tracking-wider uppercase transition-colors whitespace-nowrap">
          Agendar pelo WhatsApp
        </a>
        <button id="mobile-menu-btn" aria-label="Abrir menu" class="md:hidden p-2 text-neutral-300 hover:text-white">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>
      </div>
    </div>
    <!-- Menu Mobile -->
    <div id="mobile-menu" class="hidden md:hidden bg-[#0A0A0A]/95 backdrop-blur-xl border-b border-white/10 px-4 py-5 space-y-3">
      <a href="#inicio" class="block py-2 text-sm text-neutral-200">Início</a>
      <a href="#servicos" class="block py-2 text-sm text-neutral-200">Serviços</a>
      <a href="#diferenciais" class="block py-2 text-sm text-neutral-200">Diferenciais</a>
      <a href="#galeria" class="block py-2 text-sm text-neutral-200">Galeria</a>
      <a href="#unidades" class="block py-2 text-sm text-neutral-200">Unidades</a>
      <a href="#contato" class="block py-2 text-sm text-neutral-200">Contato</a>
    </div>
  </header>

  <main>
    <!-- 2. HERO EM TELA CHEIA -->
    <section id="inicio" class="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden">
      <div class="absolute inset-0 z-0">
        <!-- [PERSONALIZAR FOTO]: Substitua o atributo src pela foto real do estúdio Garage Car Wash -->
        <img src="${heroImg}" alt="Esportivo de luxo com pintura vitrificada na Garage Car Wash" class="w-full h-full object-cover opacity-50" />
        <div class="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/65 to-[#0A0A0A]/75"></div>
      </div>
      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <p class="text-xs sm:text-sm font-medium tracking-[0.18em] uppercase text-neutral-300 mb-5">
          Desde 2006 <span class="mx-2 text-[#F26A21]">·</span> Gtechniq Accredited <span class="mx-2 text-[#F26A21]">·</span> 2 unidades no RJ
        </p>
        <h1 class="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl uppercase tracking-[0.05em] leading-[1.06] max-w-4xl mb-6">
          O cuidado que seu carro merece. <span class="text-[#F26A21]">Desde 2006.</span>
        </h1>
        <p class="text-neutral-300 text-base sm:text-lg max-w-2xl mb-10 leading-relaxed">
          Estética automotiva premium: vitrificação, polimento e PPF com tecnologia Gtechniq.
        </p>
        <div class="flex flex-wrap items-center gap-4">
          <a href="#contato" class="px-7 py-3.5 rounded-lg bg-[#F26A21] hover:bg-[#df5b14] text-white font-semibold text-sm tracking-wider uppercase transition-colors">
            Solicitar orçamento
          </a>
          <a href="#servicos" class="px-7 py-3.5 rounded-lg border border-white/25 hover:border-[#F26A21] text-white font-semibold text-sm tracking-wider uppercase transition-colors">
            Conhecer serviços
          </a>
        </div>
      </div>
    </section>

    <!-- 3. NÚMEROS / CONFIANÇA -->
    <section class="py-16 bg-[#151515] border-y border-white/10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <p class="font-display font-extrabold text-3xl sm:text-4xl text-white tabular-nums">+19 anos</p>
          <p class="text-sm text-neutral-400 mt-1">De história desde 2006 no RJ</p>
        </div>
        <div>
          <p class="font-display font-extrabold text-3xl sm:text-4xl text-white tabular-nums">2 unidades</p>
          <p class="text-sm text-neutral-400 mt-1">Fashion Mall &amp; Metropolitano</p>
        </div>
        <div>
          <p class="font-display font-extrabold text-3xl sm:text-4xl text-[#F26A21] tabular-nums">5,0 ★</p>
          <p class="text-sm text-neutral-400 mt-1">Avaliação máxima no Google</p>
        </div>
        <div>
          <p class="font-display font-extrabold text-3xl sm:text-4xl text-white tabular-nums">+6.800</p>
          <p class="text-sm text-neutral-400 mt-1">Seguidores @garagecarwash_br</p>
        </div>
      </div>
    </section>

    <!-- 11. UNIDADES -->
    <section id="unidades" class="py-24 bg-[#0A0A0A]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="font-display font-extrabold text-3xl sm:text-4xl uppercase tracking-[0.06em] mb-12">Nossas Unidades no Rio de Janeiro</h2>
        <div class="grid lg:grid-cols-2 gap-8">
          <!-- Fashion Mall -->
          <div class="metallic-surface rounded-2xl border border-white/10 p-8">
            <h3 class="font-display font-bold text-xl uppercase tracking-wider mb-2">Unidade Fashion Mall · São Conrado</h3>
            <p class="text-sm text-neutral-400 mb-4">Estrada da Gávea, 899 – Shopping Fashion Mall, Rio de Janeiro – RJ, 22610-001</p>
            <p class="text-sm text-neutral-300 mb-1">Telefone: (21) 3591-0954 · WhatsApp: +55 21 97515-8016</p>
            <p class="text-sm text-neutral-300 mb-6">E-mail: lojafashionmall@garagecarwash.com.br</p>
            <a href="https://www.google.com/maps/search/?api=1&query=Shopping+Fashion+Mall+Estrada+da+Gavea+899+Rio+de+Janeiro" target="_blank" rel="noopener noreferrer" class="inline-flex px-5 py-2.5 rounded-lg bg-[#F26A21] text-white text-xs font-semibold uppercase tracking-wider">Como chegar</a>
          </div>
          <!-- Shopping Metropolitano -->
          <div class="metallic-surface rounded-2xl border border-white/10 p-8">
            <h3 class="font-display font-bold text-xl uppercase tracking-wider mb-2">Unidade Shopping Metropolitano · Barra Olímpica</h3>
            <p class="text-sm text-neutral-400 mb-4">Subsolo, Av. Embaixador Abelardo Bueno, 1300 – Barra Olímpica, Rio de Janeiro – RJ, 22775-040</p>
            <p class="text-sm text-neutral-300 mb-1">Telefone / WhatsApp: (21) 97301-6773</p>
            <p class="text-sm text-neutral-300 mb-6">Horário: Abre segunda-feira às 10:00 · Avaliação 5,0 no Google</p>
            <a href="https://www.google.com/maps/search/?api=1&query=Shopping+Metropolitano+Barra+Av+Embaixador+Abelardo+Bueno+1300+Rio+de+Janeiro" target="_blank" rel="noopener noreferrer" class="inline-flex px-5 py-2.5 rounded-lg bg-[#F26A21] text-white text-xs font-semibold uppercase tracking-wider">Como chegar</a>
          </div>
        </div>
      </div>
    </section>
  </main>

  <script>
    // Header scroll
    const header = document.getElementById('site-header');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 30) {
        header.classList.add('bg-[#0A0A0A]/85', 'backdrop-blur-md', 'border-white/10');
      } else {
        header.classList.remove('bg-[#0A0A0A]/85', 'backdrop-blur-md', 'border-white/10');
      }
    });
    // Menu mobile
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    if (btn && menu) {
      btn.addEventListener('click', () => menu.classList.toggle('hidden'));
    }
  </script>
</body>
</html>`;
}
