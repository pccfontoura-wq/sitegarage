/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * GARAGE CAR WASH — Estética Automotiva Premium no Rio de Janeiro (Desde 2006)
 * NOTA PARA PERSONALIZAÇÃO:
 * Procure pelos comentários [PERSONALIZAR] ao longo do código para substituir:
 * 1. Fotos reais do estúdio e veículos atendidos (variável STUDIO_IMAGES e GALLERY_ITEMS)
 * 2. Textos, descrições de pacotes e tempos de serviço (SERVICES_LIST)
 * 3. Depoimentos adicionais de clientes (TESTIMONIALS_LIST)
 * 4. Horários de atendimento e contatos das unidades (UNITS_DATA)
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  ShieldCheck,
  Sparkles,
  Droplets,
  Car,
  Award,
  MapPin,
  Phone,
  Mail,
  Clock,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  ArrowUp,
  Menu,
  X,
  CheckCircle2,
  Instagram,
  ExternalLink,
  MessageCircle,
  SlidersHorizontal,
  ZoomIn,
  Download,
  Copy,
  Check,
  Star,
} from 'lucide-react';

// [PERSONALIZAR FOTOS]: Substitua os imports abaixo pelas fotos reais do estúdio Garage Car Wash
import heroPorscheImg from './assets/images/hero_porsche_detailing_1790563563308.jpg';
import gtechniqCoatingImg from './assets/images/gtechniq_ceramic_coating_1790563574067.jpg';
import paintBeforeImg from './assets/images/paint_before_polishing_1790563585176.jpg';
import paintAfterImg from './assets/images/paint_after_polishing_1790563594638.jpg';
import ultrabikeImg from './assets/images/ultrabike_motorcycle_detail_1790563604763.jpg';
import { generateStandaloneSingleFileHtml } from './standaloneHtmlExport';

// ============================================================================
// DADOS EDITÁVEIS DO SITE (SERVIÇOS, UNIDADES, GALERIA, DEPOIMENTOS, FAQ)
// ============================================================================

interface ServiceItem {
  id: string;
  index: string;
  title: string;
  category: string;
  duration: string;
  description: string;
  highlights: string[];
  featured?: boolean;
}

// [PERSONALIZAR SERVIÇOS E TEMPOS MÉDIOS]: Edite textos, prazos ou adicione faixas de preço se desejar
const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'vitrificacao',
    index: '01',
    title: 'Vitrificação Cerâmica Gtechniq',
    category: 'Proteção Molecular CSU & CSL',
    duration: '1 a 3 dias de cura controlada',
    description:
      'Aplicação certificada dos revestimentos cerâmicos Gtechniq Crystal Serum Ultra (10h) e Crystal Serum Light. Forma uma camada vítrea de altíssima dureza contra raios UV, seiva de árvores, maresia do Rio de Janeiro e micro-riscos de lavagem.',
    highlights: ['Garantia Gtechniq até 9 anos (CSU)', 'Brilho líquido profundo', 'Alta resistência química (pH 2 a pH 13)'],
    featured: true,
  },
  {
    id: 'polimento',
    index: '02',
    title: 'Polimento Técnico Corretivo',
    category: 'Correção de Verniz Multi-Estágio',
    duration: '8h a 16h de execução',
    description:
      'Mapeamento de espessura do verniz por ultrassom e correção sob iluminação de inspeção dedicada. Eliminamos hologramas, marcas de boina, swirls e oxidação preservando a camada original de fábrica.',
    highlights: ['Medição micrométrica de pintura', 'Remoção de até 95% dos defeitos', 'Acabamento espelhado sem hologramas'],
  },
  {
    id: 'ppf',
    index: '03',
    title: 'PPF — Película de Proteção de Pintura',
    category: 'Blindagem Física Regenerativa',
    duration: '2 a 4 dias úteis',
    description:
      'Película de poliuretano termoplástico (TPU) opticamente transparente com tecnologia self-healing (auto-regenerativa ao calor). Protege contra pedras de estrada, esbarrões de estacionamento e abrasão severa.',
    highlights: ['Auto-regeneração de micro-riscos', 'Acabamento invisível (Gloss ou Matte)', 'Pacotes Full Front ou Carro Completo'],
    featured: true,
  },
  {
    id: 'higienizacao',
    index: '04',
    title: 'Higienização Interna & Couro',
    category: 'Descontaminação de Cabine',
    duration: '6h a 8h de execução',
    description:
      'Limpeza bactericida profunda de bancos em couro, Alcântara, carpetes, teto e dutos de ar-condicionado. Inclui hidratação fosca original de fábrica e vitrificação de couro Gtechniq L1 Smart Fabric / Leather Guard.',
    highlights: ['Acabamento acetinado original (sem brilho gorduroso)', 'Proteção UV e anti-transferência de cor', 'Oxi-sanitização de cabine'],
  },
  {
    id: 'repelencia',
    index: '05',
    title: 'Repelência de Vidros',
    category: 'Visibilidade & Segurança Gtechniq G1',
    duration: '2h a 3h de execução',
    description:
      'Descontaminação de chuva ácida seguida de revestimento hidrofóbico Gtechniq G1 ClearVision Smart Glass. Em velocidades acima de 60 km/h, a água escoa instantaneamente sem necessidade do limpador.',
    highlights: ['Durabilidade até 30.000 km', 'Redução drástica de ofuscamento noturno', 'Remoção técnica de marcas d’água'],
  },
  {
    id: 'lavagem-cristalizacao',
    index: '06',
    title: 'Lavagem Detalhada & Cristalização',
    category: 'Manutenção de Alto Padrão',
    duration: '2h a 4h de execução',
    description:
      'Lavagem técnica pelo método de dois baldes com separadores de partículas, pincéis de cerdas naturais para emblemas e grades, descontaminação ferrosa das rodas, secagem por ar aquecido e selante sintético de cristalização.',
    highlights: ['Zero contato agressivo na pintura', 'Detalhamento de caixas de roda e pinças', 'Proteção hidrofóbica imediata'],
  },
  {
    id: 'ultrabike',
    index: '07',
    title: 'Programa UltraBike (Motos)',
    category: 'Detailing Especializado 2 Rodas',
    duration: '1 a 2 dias úteis',
    description:
      'Protocolo exclusivo para motocicletas esportivas, custom e big trails. Desmontagem técnica de carenagens selecionadas, polimento de tanque, vitrificação de motor/escapamento para alta temperatura e proteção de viseira.',
    highlights: ['Revestimento cerâmico resistente ao calor', 'Proteção de fibra de carbono e metais nobres', 'Lavagem técnica sem jato de alta pressão em rolamentos'],
  },
];

interface GalleryItem {
  id: string;
  title: string;
  vehicle: string;
  highlightTag: 'Gtechniq Ultra' | 'Vitrificadores' | 'UltraBike' | 'Higienização' | 'Repelência';
  unit: string;
  image: string;
  description: string;
  spanClass: string;
}

// [PERSONALIZAR GALERIA]: Substitua as fotos e descrições pelos trabalhos reais publicados no @garagecarwash_br
const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Certificação Crystal Serum Ultra 10h',
    vehicle: 'Porsche 911 GT3 · Preto Jet Metálico',
    highlightTag: 'Gtechniq Ultra',
    unit: 'Unidade Fashion Mall',
    image: heroPorscheImg,
    description: 'Correção de verniz em dois estágios seguida de aplicação dupla Gtechniq Crystal Serum Ultra + EXO v5 para hidrofobia extrema.',
    spanClass: 'md:col-span-2 md:row-span-2',
  },
  {
    id: 'gal-2',
    title: 'Aplicação Molecular em Estúdio Controlado',
    vehicle: 'Mercedes-AMG GT · Cinza Selenita',
    highlightTag: 'Vitrificadores',
    unit: 'Unidade Shopping Metropolitano',
    image: gtechniqCoatingImg,
    description: 'Nivelamento micrométrico do revestimento cerâmico sob iluminação linear de inspeção em ambiente climatizado.',
    spanClass: 'md:col-span-1 md:row-span-1',
  },
  {
    id: 'gal-3',
    title: 'Proteção Completa UltraBike & Carbono',
    vehicle: 'Ducati Panigale V4 S · Carbon Edition',
    highlightTag: 'UltraBike',
    unit: 'Unidade Fashion Mall',
    image: ultrabikeImg,
    description: 'Detalhamento minucioso de chassi, vitrificação de carenagens em fibra de carbono, rodas forjadas e peças anodizadas.',
    spanClass: 'md:col-span-1 md:row-span-2',
  },
  {
    id: 'gal-4',
    title: 'Espelhamento Óptico & Hidrofobia G1',
    vehicle: 'BMW M3 Competition · Safira Preta',
    highlightTag: 'Repelência',
    unit: 'Unidade Shopping Metropolitano',
    image: paintAfterImg,
    description: 'Resultado pós-correção de verniz e selagem de todos os vidros com Gtechniq G1 ClearVision para máxima segurança em dias de chuva.',
    spanClass: 'md:col-span-1 md:row-span-1',
  },
  {
    id: 'gal-5',
    title: 'Inspeção de Verniz & Descontaminação',
    vehicle: 'Audi RS6 Avant · Higienização & Pintura',
    highlightTag: 'Higienização',
    unit: 'Unidade Fashion Mall',
    image: paintBeforeImg,
    description: 'Diagnóstico técnico de superfície e tratamento completo de interior em couro Valcona e Alcântara com proteção Gtechniq L1.',
    spanClass: 'md:col-span-2 md:row-span-1',
  },
];

interface TestimonialItem {
  id: string;
  author: string;
  badge: string;
  unit: string;
  vehicle: string;
  rating: number;
  text: string;
  isRealGoogleReview?: boolean;
}

// [PERSONALIZAR DEPOIMENTOS]: O primeiro depoimento é real do Google (Alejandro Perrone). Os demais são modelos editáveis.
const TESTIMONIALS_LIST: TestimonialItem[] = [
  {
    id: 'dep-1',
    author: 'Alejandro Perrone',
    badge: 'Local Guide · Avaliação Real no Google',
    unit: 'Unidade Shopping Metropolitano (Barra Olímpica)',
    vehicle: 'Atendimento Certificado 5,0 ★',
    rating: 5,
    text: 'Excelente! Ótimo atendimento, profissionais qualificados e alto padrão.',
    isRealGoogleReview: true,
  },
  {
    id: 'dep-2',
    author: 'Rodrigo Vasconcellos',
    badge: 'Cliente desde 2018 · [Depoimento Editável]',
    unit: 'Unidade Fashion Mall (São Conrado)',
    vehicle: 'Porsche 911 Carrera S — Vitrificação Gtechniq CSU',
    rating: 5,
    text: 'Deixo meus carros aos cuidados da Garage Car Wash no Fashion Mall há anos. A aplicação do Crystal Serum Ultra deixou a pintura com uma profundidade impressionante e a conveniência de estar dentro do shopping faz toda a diferença.',
  },
  {
    id: 'dep-3',
    author: 'Marcelo Albuquerque',
    badge: 'Cliente UltraBike · [Depoimento Editável]',
    unit: 'Unidade Shopping Metropolitano (Barra Olímpica)',
    vehicle: 'BMW S1000RR & Defender 110 — PPF + UltraBike',
    rating: 5,
    text: 'Fiz o pacote UltraBike na minha moto e a higienização interna com vitrificação de couro no SUV da família. Equipe extremamente técnica, pontual na entrega e cuidado cirúrgico em cada detalhe.',
  },
  {
    id: 'dep-4',
    author: 'Fernanda Siqueira',
    badge: 'Cliente Vitrificação · [Depoimento Editável]',
    unit: 'Unidade Fashion Mall (São Conrado)',
    vehicle: 'Volvo XC60 Recharge — Polimento Técnico & Repelência',
    rating: 5,
    text: 'Meu carro tinha diversas marcas de lavagens antigas. O polimento técnico devolveu o aspecto de zero quilômetro e a repelência nos vidros mudou completamente a dirigibilidade em dias de chuva na Niemeyer.',
  },
];

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_LIST: FaqItem[] = [
  {
    question: 'Quanto tempo dura uma vitrificação Gtechniq?',
    answer:
      'A durabilidade varia conforme o revestimento escolhido. Como estúdio Gtechniq Accredited oficial no Rio de Janeiro, aplicamos o Crystal Serum Light (até 5 anos de proteção) e o exclusivo Crystal Serum Ultra — CSU 10h (até 9 anos de proteção com garantia internacional Gtechniq), desde que mantidas as lavagens corretas com pH neutro.',
  },
  {
    question: 'Qual a diferença entre polimento técnico, cristalização e vitrificação?',
    answer:
      'O polimento técnico é o processo mecânico de correção que nivela o verniz para remover riscos, swirls e oxidação, devolvendo o brilho verdadeiro da pintura. A cristalização aplica um selante polimérico de proteção temporária (3 a 6 meses). Já a vitrificação aplica uma camada cerâmica líquida (SiO2) que reage quimicamente com o verniz, criando uma barreira física dura, hidrofóbica e duradoura por anos.',
  },
  {
    question: 'O que é PPF (Paint Protection Film) e quando é indicado?',
    answer:
      'O PPF é uma película transparente de poliuretano termoplástico (TPU) de alta espessura (190 a 210 mícrons) aplicada sobre a pintura. Enquanto a vitrificação protege contra agentes químicos, raios UV e micro-riscos leves, o PPF absorve impactos físicos reais como pedras de rodovia, raspados de estacionamento e vandalismo leve, além de possuir regeneração térmica (self-healing) contra riscos superficiais.',
  },
  {
    question: 'Qual o tempo médio de execução de cada serviço?',
    answer:
      'Lavagens detalhadas e repelência de vidros levam entre 2h e 4h — ideal para aguardar com todo conforto no Shopping Fashion Mall ou Shopping Metropolitano. Higienização interna completa leva de 6h a 8h (entrega no mesmo dia). Serviços de Polimento Técnico, Vitrificação Gtechniq CSU e aplicação de PPF requerem de 1 a 4 dias úteis para preparação cirúrgica e cura controlada.',
  },
  {
    question: 'Como funciona o agendamento nas unidades Fashion Mall e Shopping Metropolitano?',
    answer:
      'O agendamento pode ser feito diretamente pelo nosso formulário inteligente nesta página ou clicando no botão de WhatsApp da unidade de sua preferência. Na chegada ao shopping, nossa equipe realiza uma inspeção técnica gratuita da pintura e interior sob luz de detalhamento para recomendar o protocolo exato para o seu veículo.',
  },
];

// Dados oficiais das 2 Unidades no Rio de Janeiro
const UNITS_DATA = [
  {
    id: 'fashion-mall',
    name: 'Unidade Fashion Mall',
    neighborhood: 'São Conrado · Zona Sul',
    address: 'Estrada da Gávea, 899 – Shopping Fashion Mall, Rio de Janeiro – RJ, 22610-001',
    phoneDisplay: '(21) 3591-0954',
    phoneHref: 'tel:+552135910954',
    whatsappDisplay: '+55 21 97515-8016',
    whatsappNumber: '5521975158016',
    email: 'lojafashionmall@garagecarwash.com.br',
    hours: 'Segunda a Sábado das 09:00 às 21:00 · Domingos consultar',
    highlightBadge: 'Tradição e Conveniência em São Conrado',
    mapsLink:
      'https://www.google.com/maps/search/?api=1&query=Shopping+Fashion+Mall+Estrada+da+Gavea+899+Sao+Conrado+Rio+de+Janeiro',
    mapsEmbedUrl:
      'https://maps.google.com/maps?q=Shopping%20Fashion%20Mall%20Estrada%20da%20Gavea%20899%20Rio%20de%20Janeiro&t=&z=15&ie=UTF8&iwloc=&output=embed',
  },
  {
    id: 'metropolitano',
    name: 'Unidade Shopping Metropolitano',
    neighborhood: 'Barra Olímpica · Barra da Tijuca',
    address: 'Subsolo, Av. Embaixador Abelardo Bueno, 1300 – Barra Olímpica, Rio de Janeiro – RJ, 22775-040',
    phoneDisplay: '(21) 97301-6773',
    phoneHref: 'tel:+5521973016773',
    whatsappDisplay: '(21) 97301-6773',
    whatsappNumber: '5521973016773',
    email: null,
    hours: 'Abre segunda-feira às 10:00 · Segunda a Sábado até 21:00',
    highlightBadge: 'Avaliação 5,0 ★ no Google',
    googleQuote:
      '"Excelente! Ótimo atendimento, profissionais qualificados e alto padrão." — Alejandro Perrone (Local Guide)',
    mapsLink:
      'https://www.google.com/maps/search/?api=1&query=Shopping+Metropolitano+Barra+Av+Embaixador+Abelardo+Bueno+1300+Rio+de+Janeiro',
    mapsEmbedUrl:
      'https://maps.google.com/maps?q=Shopping%20Metropolitano%20Barra%20Av%20Embaixador%20Abelardo%20Bueno%201300%20Rio%20de%20Janeiro&t=&z=15&ie=UTF8&iwloc=&output=embed',
  },
];

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

export default function App() {
  // Estado do Header fixo e seção ativa
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [heroScrollY, setHeroScrollY] = useState(0);

  // Estado dos contadores animados
  const statsRef = useRef<HTMLDivElement | null>(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const [counts, setCounts] = useState({
    years: 19,
    units: 2,
    rating: 5.0,
    followers: 6877,
  });

  // Estado do comparador Antes e Depois
  const [sliderPos, setSliderPos] = useState(50);
  const comparatorRef = useRef<HTMLDivElement | null>(null);
  const [isDraggingSlider, setIsDraggingSlider] = useState(false);

  // Estado da Galeria e Lightbox
  const [galleryFilter, setGalleryFilter] = useState<string>('Todos');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  // Estado do Carrossel de Depoimentos
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  // Estado do Acordeão de FAQ
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Estado do Formulário de Orçamento via WhatsApp
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    carModel: '',
    service: 'Vitrificação Cerâmica Gtechniq',
    unit: 'fashion-mall',
    message: '',
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [generatedWhatsappLink, setGeneratedWhatsappLink] = useState<{
    url: string;
    unitName: string;
    textPreview: string;
  } | null>(null);
  const [copiedMsg, setCopiedMsg] = useState(false);

  // Estado do Modal de Entrega / Guia de Personalização e HTML Único
  const [showDeliverableModal, setShowDeliverableModal] = useState(false);
  const [copiedHtml, setCopiedHtml] = useState(false);

  // Monitoramento de Scroll (Header Blur, Parallax leve e Menu Ativo)
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 32);
      setShowBackToTop(y > 600);
      if (y < 900) {
        setHeroScrollY(y * 0.18);
      }

      const sectionIds = ['inicio', 'servicos', 'gtechniq', 'diferenciais', 'galeria', 'unidades', 'contato'];
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160) {
            setActiveSection(sectionIds[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Contadores animados via IntersectionObserver
  useEffect(() => {
    const node = statsRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !statsVisible) {
          setStatsVisible(true);
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [statsVisible]);

  useEffect(() => {
    if (!statsVisible) return;
    const duration = 1200;
    const startTime = performance.now();

    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCounts({
        years: Math.max(1, Math.round(eased * 19)),
        units: Math.max(1, Math.round(eased * 2)),
        rating: Number((eased * 5.0).toFixed(1)),
        followers: Math.round(eased * 6877),
      });
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [statsVisible]);

  // Manipulação de arrastar no Slider Antes e Depois
  const updateSliderFromClientX = (clientX: number) => {
    if (!comparatorRef.current) return;
    const rect = comparatorRef.current.getBoundingClientRect();
    const rawPercent = ((clientX - rect.left) / rect.width) * 100;
    setSliderPos(Math.min(96, Math.max(4, rawPercent)));
  };

  useEffect(() => {
    if (!isDraggingSlider) return;
    const handleMove = (e: MouseEvent) => updateSliderFromClientX(e.clientX);
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) updateSliderFromClientX(e.touches[0].clientX);
    };
    const handleUp = () => setIsDraggingSlider(false);

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('mouseup', handleUp);
    window.addEventListener('touchend', handleUp);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('touchend', handleUp);
    };
  }, [isDraggingSlider]);

  // Pré-selecionar serviço no formulário e rolar até Contato
  const handleSelectServiceForQuote = (serviceTitle: string) => {
    setFormData((prev) => ({ ...prev, service: serviceTitle }));
    const contactEl = document.getElementById('contato');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Submissão do formulário de orçamento para o WhatsApp da unidade escolhida
  const handleWhatsappSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setFormError('Por favor, informe seu nome para atendimento personalizado.');
      return;
    }
    if (!formData.phone.trim() || formData.phone.trim().length < 8) {
      setFormError('Por favor, informe um telefone ou WhatsApp válido para retorno.');
      return;
    }
    if (!formData.carModel.trim()) {
      setFormError('Por favor, informe o modelo do seu veículo ou motocicleta.');
      return;
    }

    const isFashionMall = formData.unit === 'fashion-mall';
    const targetPhone = isFashionMall ? '5521975158016' : '5521973016773';
    const unitLabel = isFashionMall
      ? 'Unidade Fashion Mall (São Conrado)'
      : 'Unidade Shopping Metropolitano (Barra Olímpica)';

    const lines = [
      `Olá, equipe *Garage Car Wash*! Gostaria de solicitar um orçamento:`,
      ``,
      `• *Nome:* ${formData.name.trim()}`,
      `• *Telefone:* ${formData.phone.trim()}`,
      `• *Veículo:* ${formData.carModel.trim()}`,
      `• *Serviço de interesse:* ${formData.service}`,
      `• *Unidade escolhida:* ${unitLabel}`,
    ];
    if (formData.message.trim()) {
      lines.push(`• *Observações:* ${formData.message.trim()}`);
    }

    const fullText = lines.join('\n');
    const whatsappUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(fullText)}`;

    setGeneratedWhatsappLink({
      url: whatsappUrl,
      unitName: unitLabel,
      textPreview: fullText,
    });
  };

  // Download ou cópia do código HTML único completo
  const handleDownloadSingleFileHtml = () => {
    const htmlContent = generateStandaloneSingleFileHtml({
      hero: heroPorscheImg,
      gtechniq: gtechniqCoatingImg,
      before: paintBeforeImg,
      after: paintAfterImg,
      ultrabike: ultrabikeImg,
    });
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'garage-car-wash-landing-page.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopySingleFileHtml = async () => {
    const htmlContent = generateStandaloneSingleFileHtml({
      hero: heroPorscheImg,
      gtechniq: gtechniqCoatingImg,
      before: paintBeforeImg,
      after: paintAfterImg,
      ultrabike: ultrabikeImg,
    });
    try {
      await navigator.clipboard.writeText(htmlContent);
      setCopiedHtml(true);
      setTimeout(() => setCopiedHtml(false), 2500);
    } catch {
      // Fallback silencioso
    }
  };

  const filteredGallery =
    galleryFilter === 'Todos'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.highlightTag === galleryFilter);

  const currentTestimonial = TESTIMONIALS_LIST[testimonialIndex];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-[#F26A21] selection:text-white overflow-x-hidden">
      {/* =====================================================================
          1. HEADER FIXO (3-Zone Top Bar Contract: Brand | Nav Links | Primary Action)
      ===================================================================== */}
      <header
        className={`fixed top-0 inset-x-0 z-50 h-16 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0A0A0A]/88 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.65)]'
            : 'bg-gradient-to-b from-black/80 to-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          {/* Zona 1: Logotipo tipográfico limpo em elemento único */}
          <a
            href="#inicio"
            className="font-display font-extrabold text-lg sm:text-xl tracking-[0.18em] uppercase text-white whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F26A21]"
          >
            GARAGE<span className="text-[#F26A21] ml-1.5">CARWASH</span>
          </a>

          {/* Zona 2: Links de navegação com sublinhado sutil e destaque ativo */}
          <nav aria-label="Navegação Principal" className="hidden md:flex items-center gap-7 text-sm font-medium">
            {[
              { id: 'inicio', label: 'Início' },
              { id: 'servicos', label: 'Serviços' },
              { id: 'diferenciais', label: 'Diferenciais' },
              { id: 'galeria', label: 'Galeria' },
              { id: 'unidades', label: 'Unidades' },
              { id: 'contato', label: 'Contato' },
            ].map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`relative py-1 whitespace-nowrap transition-colors duration-200 ${
                    isActive ? 'text-white' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] bg-[#F26A21] transition-all duration-200 ${
                      isActive ? 'w-full opacity-100' : 'w-0 opacity-0'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Zona 3: Ação primária e menu mobile */}
          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/5521975158016?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20um%20atendimento%20na%20Garage%20Car%20Wash."
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#F26A21] hover:bg-[#df5b14] text-white text-xs font-semibold tracking-wider uppercase transition-all duration-200 whitespace-nowrap shadow-[0_0_20px_rgba(242,106,33,0.28)] hover:shadow-[0_0_28px_rgba(242,106,33,0.5)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F26A21]"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Agendar pelo WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
              aria-expanded={mobileMenuOpen}
              className="md:hidden p-2.5 rounded-lg text-neutral-300 hover:text-white hover:bg-white/5 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Gaveta de navegação Mobile */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0A0A0A]/98 backdrop-blur-2xl border-b border-white/10 px-4 pt-3 pb-6 space-y-2">
            {[
              { id: 'inicio', label: 'Início' },
              { id: 'servicos', label: 'Serviços' },
              { id: 'gtechniq', label: 'Certificação Gtechniq' },
              { id: 'diferenciais', label: 'Diferenciais' },
              { id: 'galeria', label: 'Galeria' },
              { id: 'unidades', label: 'Nossas Unidades' },
              { id: 'contato', label: 'Solicitar Orçamento' },
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2.5 px-3 rounded-lg text-sm font-medium text-neutral-200 hover:text-white hover:bg-white/5 transition-colors"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5">
              <a
                href="https://wa.me/5521975158016?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20na%20Unidade%20Fashion%20Mall."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-lg bg-[#F26A21] text-white text-xs font-semibold uppercase tracking-wider text-center"
              >
                WhatsApp Fashion Mall · (21) 97515-8016
              </a>
              <a
                href="https://wa.me/5521973016773?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20na%20Unidade%20Shopping%20Metropolitano."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-lg border border-white/20 text-white text-xs font-semibold uppercase tracking-wider text-center"
              >
                WhatsApp Metropolitano · (21) 97301-6773
              </a>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* =====================================================================
            2. HERO EM TELA CHEIA (Cinematográfico, Parallax leve, Scrim calibrado)
        ===================================================================== */}
        <section
          id="inicio"
          className="relative min-h-[92vh] lg:min-h-screen flex items-center pt-24 pb-20 overflow-hidden"
        >
          {/* Imagem de fundo com Parallax suave e fallback */}
          <div
            className="absolute inset-0 z-0 bg-[#0E0E0E]"
            style={{
              transform: `translate3d(0, ${heroScrollY}px, 0)`,
              willChange: 'transform',
            }}
          >
            {/* [PERSONALIZAR FOTO HERO]: Substitua heroPorscheImg pela foto principal do estúdio Garage Car Wash */}
            <img
              src={heroPorscheImg}
              alt="Esportivo de luxo com pintura espelhada e gotas hidrofóbicas no estúdio Garage Car Wash no Rio de Janeiro"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center opacity-55 scale-105"
            />
            {/* Scrim de contraste medido para legibilidade WCAG AA */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/80 to-[#0A0A0A]/35" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-[#0A0A0A]/70" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-3xl">
              {/* Metadados estáticos desencaixotados (Zero-Pill Discipline) */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm font-medium tracking-[0.16em] uppercase text-neutral-300 mb-6">
                <span>Desde 2006</span>
                <span aria-hidden="true" className="text-[#F26A21]">
                  ·
                </span>
                <span className="text-white">Gtechniq Accredited | CSU</span>
                <span aria-hidden="true" className="text-[#F26A21]">
                  ·
                </span>
                <span>2 unidades no RJ</span>
              </div>

              {/* Headline principal */}
              <h1
                className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl uppercase tracking-[0.04em] leading-[1.06] text-white mb-6"
                style={{ textWrap: 'balance' }}
              >
                O cuidado que seu carro merece.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F26A21] to-[#ff9254]">
                  Desde 2006.
                </span>
              </h1>

              {/* Subtítulo */}
              <p className="text-base sm:text-lg lg:text-xl text-neutral-300 leading-relaxed max-w-2xl mb-10 font-normal">
                Estética automotiva premium: vitrificação, polimento e PPF com tecnologia{' '}
                <strong className="text-white font-semibold">Gtechniq</strong>. Quase duas décadas de precisão
                técnica no Shopping Fashion Mall e no Shopping Metropolitano Barra.
              </p>

              {/* Dupla de botões de ação */}
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#contato"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-lg bg-[#F26A21] hover:bg-[#df5b14] text-white font-semibold text-sm tracking-wider uppercase transition-all duration-200 whitespace-nowrap shadow-[0_8px_30px_rgba(242,106,33,0.35)] hover:shadow-[0_12px_36px_rgba(242,106,33,0.55)]"
                >
                  <span>Solicitar orçamento</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
                <a
                  href="#servicos"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-lg border border-white/25 hover:border-[#F26A21] bg-white/[0.03] hover:bg-white/[0.07] text-white font-semibold text-sm tracking-wider uppercase transition-all duration-200 whitespace-nowrap"
                >
                  <span>Conhecer serviços</span>
                </a>
              </div>

              {/* Assinatura de localização rápida */}
              <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-neutral-400">
                <div>
                  <span className="text-white font-semibold uppercase tracking-wider block mb-0.5">
                    São Conrado · Fashion Mall
                  </span>
                  <span>Estrada da Gávea, 899 · WhatsApp (21) 97515-8016</span>
                </div>
                <div>
                  <span className="text-white font-semibold uppercase tracking-wider block mb-0.5">
                    Barra Olímpica · Shopping Metropolitano
                  </span>
                  <span>Av. Emb. Abelardo Bueno, 1300 · WhatsApp (21) 97301-6773</span>
                </div>
              </div>
            </div>
          </div>

          {/* Indicador de Scroll Animado */}
          <a
            href="#numeros"
            aria-label="Rolar para os indicadores da Garage Car Wash"
            className="hidden sm:flex flex-col items-center gap-2 absolute bottom-7 left-1/2 -translate-x-1/2 z-10 text-neutral-400 hover:text-[#F26A21] transition-colors"
          >
            <span className="text-[11px] uppercase tracking-[0.22em]">Explorar</span>
            <ChevronDown className="w-4 h-4 animate-bounce text-[#F26A21]" />
          </a>
        </section>

        {/* =====================================================================
            3. NÚMEROS / CONFIANÇA (Contadores Animados Tabulares)
        ===================================================================== */}
        <section
          id="numeros"
          ref={statsRef}
          aria-label="Indicadores de credibilidade e trajetória"
          className="py-14 sm:py-16 bg-[#151515] border-y border-white/10 relative"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              <div className="border-l-2 border-[#F26A21] pl-5">
                <p className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white font-mono-tabular">
                  +{counts.years} anos
                </p>
                <p className="text-sm font-semibold text-neutral-200 mt-2">De história no Rio de Janeiro</p>
                <p className="text-xs text-neutral-400 mt-0.5">Tradição contínua desde 2006</p>
              </div>

              <div className="border-l-2 border-white/20 pl-5">
                <p className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white font-mono-tabular">
                  {counts.units} unidades
                </p>
                <p className="text-sm font-semibold text-neutral-200 mt-2">Em shoppings de referência</p>
                <p className="text-xs text-neutral-400 mt-0.5">Fashion Mall &amp; Metropolitano Barra</p>
              </div>

              <div className="border-l-2 border-[#F26A21] pl-5">
                <p className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#F26A21] font-mono-tabular">
                  {counts.rating.toFixed(1).replace('.', ',')} ★
                </p>
                <p className="text-sm font-semibold text-neutral-200 mt-2">Avaliação no Google</p>
                <p className="text-xs text-neutral-400 mt-0.5">Excelência reconhecida por clientes</p>
              </div>

              <div className="border-l-2 border-white/20 pl-5">
                <p className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white font-mono-tabular">
                  +{counts.followers.toLocaleString('pt-BR')}
                </p>
                <p className="text-sm font-semibold text-neutral-200 mt-2">Seguidores no Instagram</p>
                <p className="text-xs text-neutral-400 mt-0.5">@garagecarwash_br oficial</p>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            4. SERVIÇOS (Bento Grid Assimétrico com Numeração Editorial e Glow Laranja)
        ===================================================================== */}
        <section id="servicos" className="py-24 sm:py-28 bg-[#0A0A0A]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F26A21] mb-3">
                  Portfólio Técnico de Detalhamento
                </p>
                <h2
                  className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl uppercase tracking-[0.04em] text-white"
                  style={{ textWrap: 'balance' }}
                >
                  Soluções de Estética &amp; Proteção Automotiva
                </h2>
              </div>
              <p className="text-neutral-400 text-sm sm:text-base max-w-md leading-relaxed">
                Protocolos desenvolvidos para preservar o valor, a originalidade do verniz e o acabamento de
                veículos de passeio, superesportivos, blindados e motocicletas de alta cilindrada.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SERVICES_LIST.map((service) => (
                <article
                  key={service.id}
                  className={`metallic-surface rounded-2xl border border-white/10 hover:border-[#F26A21]/70 p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(242,106,33,0.14)] ${
                    service.featured ? 'lg:col-span-2' : 'lg:col-span-1'
                  }`}
                >
                  <div>
                    {/* Metadados limpos sem pílulas */}
                    <div className="flex items-center justify-between gap-4 text-xs text-neutral-400 mb-5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono-tabular font-semibold text-[#F26A21]">{service.index}.</span>
                        <span>{service.category}</span>
                      </div>
                      <span className="font-mono-tabular text-neutral-400">{service.duration}</span>
                    </div>

                    <h3 className="font-display font-bold text-xl sm:text-2xl uppercase tracking-[0.03em] text-white mb-3">
                      {service.title}
                    </h3>

                    <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-6">
                      {service.description}
                    </p>
                  </div>

                  <div className="pt-5 border-t border-white/10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <ul className="space-y-1.5 text-xs text-neutral-300">
                      {service.highlights.map((hl, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#F26A21] shrink-0" />
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      type="button"
                      onClick={() => handleSelectServiceForQuote(service.title)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#F26A21] hover:text-white transition-colors whitespace-nowrap shrink-0 self-start sm:self-end cursor-pointer"
                    >
                      <span>Orçar serviço</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================================
            5. DESTAQUE GTECHNIQ ACCREDITED | CSU (Duas Colunas)
        ===================================================================== */}
        <section id="gtechniq" className="py-24 sm:py-28 bg-[#151515] border-y border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Coluna Esquerda: Narrativa técnica e credencial */}
              <div className="lg:col-span-7">
                <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#F26A21] mb-4">
                  <span>Credenciamento Internacional</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-white">Reino Unido</span>
                </div>

                <h2
                  className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl uppercase tracking-[0.04em] text-white mb-6"
                  style={{ textWrap: 'balance' }}
                >
                  Selo Oficial <span className="text-[#F26A21]">Gtechniq Accredited</span> | Crystal Serum Ultra
                </h2>

                <p className="text-neutral-300 text-base sm:text-lg leading-relaxed mb-8">
                  A <strong className="text-white">Garage Car Wash</strong> integra o seleto grupo mundial de
                  estúdios certificados pela britânica <strong className="text-white">Gtechniq</strong> — líder
                  global em nanotecnologia de proteção de superfícies. O revestimento{' '}
                  <strong className="text-white">Crystal Serum Ultra (CSU)</strong> é de uso restrito a aplicadores
                  credenciados devido à sua fórmula de dupla camada molecular 7h + 10h.
                </p>

                {/* Especificações comparativas das linhas Gtechniq */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-9">
                  <div className="p-5 rounded-xl bg-[#0A0A0A] border border-white/10">
                    <p className="font-mono-tabular text-xs text-[#F26A21] uppercase tracking-wider mb-1">
                      Crystal Serum Ultra
                    </p>
                    <p className="font-display font-bold text-lg text-white mb-1.5">Dureza 10h · CSU</p>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      Exclusivo para estúdios Accredited. Resistência extrema a químicos ácidos/alcalinos e até 9 anos
                      de proteção.
                    </p>
                  </div>

                  <div className="p-5 rounded-xl bg-[#0A0A0A] border border-white/10">
                    <p className="font-mono-tabular text-xs text-[#F26A21] uppercase tracking-wider mb-1">
                      Gtechniq Ultra &amp; EXO
                    </p>
                    <p className="font-display font-bold text-lg text-white mb-1.5">Hidrofobia Extrema</p>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      Ângulo de contato superior a 110°, efeito autolimpante e brilho vítreo intenso para carros de
                      uso diário ou coleção.
                    </p>
                  </div>

                  <div className="p-5 rounded-xl bg-[#0A0A0A] border border-white/10">
                    <p className="font-mono-tabular text-xs text-[#F26A21] uppercase tracking-wider mb-1">
                      Linha UltraBike
                    </p>
                    <p className="font-display font-bold text-lg text-white mb-1.5">Proteção 2 Rodas</p>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      Engenharia química dedicada a carenagens, motores em alta temperatura, quadros e metais de
                      motocicletas premium.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-6">
                  <button
                    type="button"
                    onClick={() => handleSelectServiceForQuote('Vitrificação Cerâmica Gtechniq')}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#F26A21] hover:bg-[#df5b14] text-white font-semibold text-xs sm:text-sm tracking-wider uppercase transition-colors cursor-pointer"
                  >
                    <span>Consultar pacote Gtechniq para meu carro</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                  <span className="text-xs text-neutral-400">
                    Certificado de garantia registrado diretamente na Gtechniq
                  </span>
                </div>
              </div>

              {/* Coluna Direita: Imagem Macro + Selo de Credibilidade */}
              <div className="lg:col-span-5">
                <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-[#0A0A0A]">
                  {/* [PERSONALIZAR FOTO GTECHNIQ]: Substituir pela foto real de aplicação Gtechniq na Garage Car Wash */}
                  <img
                    src={gtechniqCoatingImg}
                    alt="Aplicação técnica de vitrificador Gtechniq Crystal Serum Ultra na Garage Car Wash"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full aspect-[4/3] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />

                  {/* Selo Gtechniq Accredited Integrado */}
                  <div className="p-6 bg-[#0A0A0A]/95 border-t border-white/10 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-xl bg-[#F26A21]/15 border border-[#F26A21]/40 flex items-center justify-center shrink-0">
                        <Award className="w-6 h-6 text-[#F26A21]" />
                      </div>
                      <div>
                        <p className="font-display font-bold text-sm uppercase tracking-wider text-white">
                          Gtechniq Accredited · CSU
                        </p>
                        <p className="text-xs text-neutral-400">
                          Aplicador Oficial Certificado no Rio de Janeiro
                        </p>
                      </div>
                    </div>
                    <span className="font-mono-tabular text-xs font-semibold text-[#F26A21] whitespace-nowrap">
                      10H CERAMIC
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            6. DIFERENCIAIS & ANTES E DEPOIS INTERATIVO
        ===================================================================== */}
        <section id="diferenciais" className="py-24 sm:py-28 bg-[#0A0A0A]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Por que escolher a Garage Car Wash */}
            <div className="mb-24">
              <div className="max-w-3xl mb-14">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F26A21] mb-3">
                  Por que escolher a Garage Car Wash
                </p>
                <h2
                  className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl uppercase tracking-[0.04em] text-white mb-4"
                  style={{ textWrap: 'balance' }}
                >
                  Rigor Técnico em Ambiente de Absoluta Conveniência
                </h2>
                <p className="text-neutral-400 text-base leading-relaxed">
                  Unimos a precisão de um estúdio de detailing internacional à segurança e praticidade dos melhores
                  shoppings da Zona Sul e da Barra da Tijuca.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    num: '01',
                    title: 'Profissionais Certificados',
                    desc: 'Equipe treinada em protocolos internacionais de correção de verniz, aplicação cerâmica e manuseio seguro de veículos superesportivos, elétricos e blindados.',
                  },
                  {
                    num: '02',
                    title: 'Conforto & Segurança em Shoppings',
                    desc: 'Unidades instaladas dentro do Shopping Fashion Mall (São Conrado) e Shopping Metropolitano (Barra Olímpica), garantindo segurança 24h e total comodidade enquanto você aguarda.',
                  },
                  {
                    num: '03',
                    title: 'Insumos de Padrão Mundial',
                    desc: 'Utilizamos exclusivamente compostos, shampoos neutros e revestimentos de elite como Gtechniq (UK), preservando plásticos, borrachas, Alcântara e metais.',
                  },
                  {
                    num: '04',
                    title: 'Diagnóstico Luminoso Personalizado',
                    desc: 'Cada veículo passa por avaliação técnica da espessura e estado do verniz antes de qualquer intervenção, assegurando exatamente o tratamento necessário.',
                  },
                  {
                    num: '05',
                    title: 'Quase 20 Anos de Reputação',
                    desc: 'Desde 2006 construindo relações de confiança com colecionadores, entusiastas e clientes exigentes do Rio de Janeiro, com nota 5,0 no Google.',
                  },
                  {
                    num: '06',
                    title: 'Garantia de Qualidade e Rastreabilidade',
                    desc: 'Acompanhamento pós-serviço e orientação completa de manutenção para que o brilho e a proteção hidrofóbica permaneçam intactos por anos.',
                  },
                ].map((dif) => (
                  <div
                    key={dif.num}
                    className="p-7 rounded-2xl bg-[#151515] border border-white/10 hover:border-[#F26A21]/50 transition-colors"
                  >
                    <span className="font-mono-tabular text-xs font-semibold text-[#F26A21] block mb-3">
                      {dif.num} · DIFERENCIAL GARAGE
                    </span>
                    <h3 className="font-display font-bold text-lg uppercase tracking-wider text-white mb-2.5">
                      {dif.title}
                    </h3>
                    <p className="text-sm text-neutral-400 leading-relaxed">{dif.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 7. ANTES E DEPOIS (SLIDER INTERATIVO) */}
            <div className="pt-16 border-t border-white/10">
              <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F26A21] mb-2">
                    Transformação Real Sob Luz de Inspeção
                  </p>
                  <h3 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl uppercase tracking-[0.04em] text-white">
                    Comparador Interativo: Antes &amp; Depois
                  </h3>
                </div>

                {/* Controles rápidos de posição para acessibilidade além do arrastar */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-neutral-400 mr-2">Arraste o divisor ou compare:</span>
                  {[
                    { label: 'Ver Antes', val: 85 },
                    { label: '50 / 50', val: 50 },
                    { label: 'Ver Depois', val: 15 },
                  ].map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => setSliderPos(preset.val)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                        Math.abs(sliderPos - preset.val) < 10
                          ? 'bg-[#F26A21] text-white'
                          : 'bg-[#151515] text-neutral-300 hover:text-white border border-white/10'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Container do Slider Antes/Depois */}
              <div
                ref={comparatorRef}
                onMouseDown={(e) => {
                  setIsDraggingSlider(true);
                  updateSliderFromClientX(e.clientX);
                }}
                onTouchStart={(e) => {
                  setIsDraggingSlider(true);
                  if (e.touches[0]) updateSliderFromClientX(e.touches[0].clientX);
                }}
                className="relative w-full aspect-[16/10] sm:aspect-[16/8] rounded-2xl overflow-hidden border border-white/15 select-none cursor-ew-resize bg-[#151515]"
              >
                {/* Imagem DEPOIS (Fundo completo) */}
                {/* [PERSONALIZAR FOTO DEPOIS]: Substituir paintAfterImg pela foto real pós-polimento/vitrificação */}
                <img
                  src={paintAfterImg}
                  alt="Depois: Pintura preta 100% corrigida e vitrificada com reflexo espelhado na Garage Car Wash"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                />

                {/* Imagem ANTES (Recortada por clipPath conforme sliderPos) */}
                {/* [PERSONALIZAR FOTO ANTES]: Substituir paintBeforeImg pela foto real antes do polimento */}
                <div
                  className="absolute inset-0 overflow-hidden pointer-events-none"
                  style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
                >
                  <img
                    src={paintBeforeImg}
                    alt="Antes: Pintura com marcas de lavagem (swirls), micro-riscos e oxidação sob luz de inspeção"
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>

                {/* Rótulos Antes / Depois */}
                <div className="absolute top-4 left-4 z-10 px-3.5 py-1.5 rounded-md bg-black/80 backdrop-blur-md border border-white/15 text-xs font-semibold uppercase tracking-wider text-neutral-200 pointer-events-none">
                  Antes · Verniz com Swirls e Micro-riscos
                </div>
                <div className="absolute top-4 right-4 z-10 px-3.5 py-1.5 rounded-md bg-[#F26A21]/95 backdrop-blur-md text-xs font-semibold uppercase tracking-wider text-white pointer-events-none">
                  Depois · Polimento Técnico + Gtechniq CSU
                </div>

                {/* Linha divisória e botão de arraste */}
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-[#F26A21] shadow-[0_0_15px_rgba(242,106,33,0.9)] pointer-events-none"
                  style={{ left: `${sliderPos}%` }}
                >
                  <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#F26A21] border-2 border-white text-white flex items-center justify-center shadow-xl">
                    <SlidersHorizontal className="w-5 h-5" />
                  </div>
                </div>

                {/* Input range invisível para acessibilidade via teclado */}
                <input
                  type="range"
                  min={4}
                  max={96}
                  value={Math.round(sliderPos)}
                  onChange={(e) => setSliderPos(Number(e.target.value))}
                  aria-label="Comparador percentual entre antes e depois do polimento e vitrificação"
                  className="sr-only"
                />
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            8. GALERIA COM LIGHTBOX (Inspirada nos Destaques do Instagram)
        ===================================================================== */}
        <section id="galeria" className="py-24 sm:py-28 bg-[#151515] border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#F26A21] mb-3">
                  <span>Portfólio Visual</span>
                  <span aria-hidden="true">·</span>
                  <span>@garagecarwash_br</span>
                </div>
                <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl uppercase tracking-[0.04em] text-white">
                  Destaques do Nosso Estúdio
                </h2>
              </div>

              {/* Filtros Interativos inspirados nos Destaques do Instagram */}
              <div
                role="tablist"
                aria-label="Filtrar galeria por destaque"
                className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#0A0A0A] rounded-xl border border-white/10"
              >
                {['Todos', 'Gtechniq Ultra', 'Vitrificadores', 'UltraBike', 'Higienização', 'Repelência'].map(
                  (tab) => (
                    <button
                      key={tab}
                      type="button"
                      role="tab"
                      aria-selected={galleryFilter === tab}
                      onClick={() => setGalleryFilter(tab)}
                      className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                        galleryFilter === tab
                          ? 'bg-[#F26A21] text-white shadow-sm'
                          : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      {tab}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Grid Moderno */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredGallery.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setLightboxItem(item)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setLightboxItem(item);
                    }
                  }}
                  aria-label={`Ampliar detalhes de ${item.title} - ${item.vehicle}`}
                  className={`group relative rounded-2xl overflow-hidden border border-white/10 hover:border-[#F26A21]/70 bg-[#0A0A0A] cursor-pointer min-h-[280px] flex flex-col justify-end ${
                    galleryFilter === 'Todos' ? item.spanClass : 'md:col-span-1'
                  }`}
                >
                  <img
                    src={item.image}
                    alt={`${item.title} — ${item.vehicle} na ${item.unit}`}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/45 to-transparent" />

                  <div className="relative z-10 p-6">
                    <div className="flex items-center justify-between gap-2 text-xs text-neutral-300 mb-2">
                      <span>
                        <strong className="text-[#F26A21] font-semibold">{item.highlightTag}</strong>
                        <span className="mx-1.5">·</span>
                        <span>{item.unit}</span>
                      </span>
                      <ZoomIn className="w-4 h-4 text-white/75 group-hover:text-[#F26A21] transition-colors" />
                    </div>
                    <h3 className="font-display font-bold text-lg uppercase tracking-wide text-white mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-neutral-300">{item.vehicle}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Chamada para o Instagram Oficial */}
            <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="text-sm text-neutral-300">
                Acompanhe a rotina diária dos nossos estúdios no Instagram oficial{' '}
                <strong className="text-white">@garagecarwash_br</strong> (+6.877 seguidores).
              </div>
              <a
                href="https://www.instagram.com/garagecarwash_br"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/20 hover:border-[#F26A21] text-xs font-semibold uppercase tracking-wider text-white transition-colors whitespace-nowrap"
              >
                <Instagram className="w-4 h-4 text-[#F26A21]" />
                <span>Seguir @garagecarwash_br</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </section>

        {/* =====================================================================
            9. DEPOIMENTOS (Carrossel 5 Estrelas + Selo Avaliado no Google)
        ===================================================================== */}
        <section className="py-24 sm:py-28 bg-[#0A0A0A] border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Coluna Esquerda: Selo Google 5.0 */}
              <div className="lg:col-span-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F26A21] mb-3">
                  Reputação Comprovada
                </p>
                <h2 className="font-display font-extrabold text-3xl sm:text-4xl uppercase tracking-[0.04em] text-white mb-5">
                  Reconhecimento Máximo dos Nossos Clientes
                </h2>
                <p className="text-neutral-400 text-sm sm:text-base leading-relaxed mb-8">
                  Nossa prioridade é entregar um acabamento impecável e um atendimento transparente do momento em
                  que você entrega a chave até a inspeção final de entrega.
                </p>

                <div className="p-6 rounded-2xl bg-[#151515] border border-white/10 flex items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-1 text-[#F26A21] mb-1.5">
                      {[...Array(5)].map((_, idx) => (
                        <Star key={idx} className="w-4 h-4 fill-[#F26A21] text-[#F26A21]" />
                      ))}
                    </div>
                    <p className="font-display font-bold text-base text-white uppercase tracking-wider">
                      Avaliado com 5,0 no Google
                    </p>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      Unidade Shopping Metropolitano &amp; Fashion Mall
                    </p>
                  </div>
                  <span className="font-mono-tabular font-extrabold text-3xl text-white">5,0</span>
                </div>
              </div>

              {/* Coluna Direita: Carrossel Interativo */}
              <div className="lg:col-span-7">
                <div className="metallic-surface rounded-2xl border border-white/15 p-8 sm:p-10">
                  <div className="flex items-center justify-between gap-4 text-xs text-neutral-400 mb-6">
                    <span>
                      <strong className="text-[#F26A21]">{currentTestimonial.badge}</strong>
                      <span className="mx-2">·</span>
                      <span>{currentTestimonial.unit}</span>
                    </span>
                    <span className="font-mono-tabular text-neutral-400">
                      0{testimonialIndex + 1} / 0{TESTIMONIALS_LIST.length}
                    </span>
                  </div>

                  <blockquote className="text-xl sm:text-2xl font-medium text-white leading-relaxed mb-8">
                    “{currentTestimonial.text}”
                  </blockquote>

                  <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <p className="font-display font-bold text-base uppercase tracking-wider text-white">
                        {currentTestimonial.author}
                      </p>
                      <p className="text-xs text-neutral-400 mt-0.5">{currentTestimonial.vehicle}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          setTestimonialIndex((prev) => (prev === 0 ? TESTIMONIALS_LIST.length - 1 : prev - 1))
                        }
                        aria-label="Depoimento anterior"
                        className="p-2.5 rounded-lg border border-white/15 hover:border-[#F26A21] text-white transition-colors cursor-pointer"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setTestimonialIndex((prev) => (prev === TESTIMONIALS_LIST.length - 1 ? 0 : prev + 1))
                        }
                        aria-label="Próximo depoimento"
                        className="p-2.5 rounded-lg border border-white/15 hover:border-[#F26A21] text-white transition-colors cursor-pointer"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            10. PERGUNTAS FREQUENTES (FAQ em Acordeão)
        ===================================================================== */}
        <section id="faq" className="py-24 sm:py-28 bg-[#151515] border-t border-white/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F26A21] mb-3">
                Dúvidas Técnicas
              </p>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl uppercase tracking-[0.04em] text-white">
                Perguntas Frequentes
              </h2>
            </div>

            <div className="space-y-4">
              {FAQ_LIST.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={faq.question}
                    className="rounded-xl bg-[#0A0A0A] border border-white/10 overflow-hidden transition-colors hover:border-white/25"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left cursor-pointer"
                    >
                      <span className="font-display font-bold text-sm sm:text-base uppercase tracking-wide text-white">
                        <span className="font-mono-tabular text-[#F26A21] mr-2.5">0{index + 1}.</span>
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-[#F26A21] shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-neutral-300 leading-relaxed border-t border-white/5">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =====================================================================
            11. NOSSAS UNIDADES (2 Cards Completos + Mapas Embutidos + Como Chegar)
        ===================================================================== */}
        <section id="unidades" className="py-24 sm:py-28 bg-[#0A0A0A] border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F26A21] mb-3">
                  Localização &amp; Estrutura Premium
                </p>
                <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl uppercase tracking-[0.04em] text-white">
                  Nossas Unidades no Rio de Janeiro
                </h2>
              </div>
              <p className="text-neutral-400 text-sm sm:text-base max-w-md">
                Estúdios localizados dentro de dois dos shoppings mais sofisticados do Rio, oferecendo segurança e
                comodidade total.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {UNITS_DATA.map((unit) => (
                <div
                  key={unit.id}
                  className="metallic-surface rounded-2xl border border-white/15 flex flex-col justify-between overflow-hidden"
                >
                  <div className="p-7 sm:p-9">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-neutral-400 mb-3">
                      <span className="uppercase tracking-wider text-[#F26A21] font-semibold">
                        {unit.neighborhood}
                      </span>
                      <span>{unit.highlightBadge}</span>
                    </div>

                    <h3 className="font-display font-extrabold text-2xl sm:text-3xl uppercase tracking-wide text-white mb-6">
                      {unit.name}
                    </h3>

                    <div className="space-y-3.5 text-sm text-neutral-300 mb-7">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-4 h-4 text-[#F26A21] shrink-0 mt-1" />
                        <span>{unit.address}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <Phone className="w-4 h-4 text-[#F26A21] shrink-0" />
                        <span>
                          Telefone:{' '}
                          <a href={unit.phoneHref} className="text-white hover:text-[#F26A21] transition-colors">
                            {unit.phoneDisplay}
                          </a>
                          {' · '}WhatsApp:{' '}
                          <a
                            href={`https://wa.me/${unit.whatsappNumber}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:text-[#F26A21] transition-colors font-mono-tabular"
                          >
                            {unit.whatsappDisplay}
                          </a>
                        </span>
                      </div>

                      {unit.email && (
                        <div className="flex items-center gap-3">
                          <Mail className="w-4 h-4 text-[#F26A21] shrink-0" />
                          <a
                            href={`mailto:${unit.email}`}
                            className="text-white hover:text-[#F26A21] transition-colors"
                          >
                            {unit.email}
                          </a>
                        </div>
                      )}

                      <div className="flex items-center gap-3">
                        <Clock className="w-4 h-4 text-[#F26A21] shrink-0" />
                        <span>{unit.hours}</span>
                      </div>
                    </div>

                    {unit.googleQuote && (
                      <div className="p-4 rounded-xl bg-[#0A0A0A]/80 border border-white/10 text-xs text-neutral-300 italic mb-7">
                        {unit.googleQuote}
                      </div>
                    )}

                    {/* Botões de ação da unidade */}
                    <div className="flex flex-wrap items-center gap-3">
                      <a
                        href={`https://wa.me/${unit.whatsappNumber}?text=${encodeURIComponent(
                          `Olá! Gostaria de agendar um serviço na ${unit.name} da Garage Car Wash.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#F26A21] hover:bg-[#df5b14] text-white text-xs font-semibold uppercase tracking-wider transition-colors whitespace-nowrap"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Agendar nesta unidade</span>
                      </a>

                      <a
                        href={unit.mapsLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-white/20 hover:border-[#F26A21] text-white text-xs font-semibold uppercase tracking-wider transition-colors whitespace-nowrap"
                      >
                        <MapPin className="w-4 h-4 text-[#F26A21]" />
                        <span>Como chegar</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>

                  {/* Mapa embutido do Google Maps */}
                  <div className="w-full h-56 border-t border-white/10 bg-[#151515]">
                    <iframe
                      title={`Mapa de localização - ${unit.name}`}
                      src={unit.mapsEmbedUrl}
                      width="100%"
                      height="100%"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="w-full h-full grayscale contrast-125 opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================================
            12. CTA FINAL (Faixa em Gradiente Laranja / Preto)
        ===================================================================== */}
        <section className="py-16 sm:py-20 bg-gradient-to-r from-[#F26A21] via-[#c84d0e] to-[#151515] border-y border-white/15">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/90 mb-2">
                Estética Automotiva de Elite no Rio de Janeiro
              </p>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl uppercase tracking-[0.04em] text-white">
                Agende agora e sinta a diferença
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="https://wa.me/5521975158016?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20um%20hor%C3%A1rio%20na%20Garage%20Car%20Wash%20(Fashion%20Mall)."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-4 rounded-lg bg-[#0A0A0A] hover:bg-neutral-900 text-white font-semibold text-xs sm:text-sm uppercase tracking-wider transition-colors whitespace-nowrap shadow-xl"
              >
                <MessageCircle className="w-4 h-4 text-[#F26A21]" />
                <span>WhatsApp Fashion Mall</span>
              </a>

              <a
                href="https://wa.me/5521973016773?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20um%20hor%C3%A1rio%20na%20Garage%20Car%20Wash%20(Shopping%20Metropolitano)."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-4 rounded-lg bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold text-xs sm:text-sm uppercase tracking-wider transition-colors whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Metropolitano</span>
              </a>
            </div>
          </div>
        </section>

        {/* =====================================================================
            13. FORMULÁRIO DE CONTATO INTELIGENTE (Direciona para o WhatsApp da Unidade)
        ===================================================================== */}
        <section id="contato" className="py-24 sm:py-28 bg-[#0A0A0A]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              {/* Informações laterais */}
              <div className="lg:col-span-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F26A21] mb-3">
                  Orçamento Rápido via WhatsApp
                </p>
                <h2
                  className="font-display font-extrabold text-3xl sm:text-4xl uppercase tracking-[0.04em] text-white mb-5"
                  style={{ textWrap: 'balance' }}
                >
                  Solicite uma Avaliação para o Seu Veículo
                </h2>
                <p className="text-neutral-400 text-sm sm:text-base leading-relaxed mb-8">
                  Preencha os dados ao lado. O sistema prepara automaticamente sua mensagem técnica e direciona
                  direto para o WhatsApp oficial da unidade escolhida (<strong className="text-white">Fashion Mall</strong> ou{' '}
                  <strong className="text-white">Shopping Metropolitano</strong>).
                </p>

                <div className="space-y-4 p-6 rounded-2xl bg-[#151515] border border-white/10">
                  <div className="border-b border-white/10 pb-4">
                    <p className="font-display font-bold text-sm uppercase tracking-wider text-white">
                      Unidade Fashion Mall · São Conrado
                    </p>
                    <p className="text-xs text-neutral-400 mt-1">
                      Tel: (21) 3591-0954 · WhatsApp: +55 21 97515-8016
                    </p>
                    <p className="text-xs text-neutral-400">lojafashionmall@garagecarwash.com.br</p>
                  </div>
                  <div>
                    <p className="font-display font-bold text-sm uppercase tracking-wider text-white">
                      Unidade Shopping Metropolitano · Barra Olímpica
                    </p>
                    <p className="text-xs text-neutral-400 mt-1">
                      Tel / WhatsApp: (21) 97301-6773 · Subsolo
                    </p>
                  </div>
                </div>
              </div>

              {/* Formulário */}
              <div className="lg:col-span-7">
                <form
                  onSubmit={handleWhatsappSubmit}
                  noValidate
                  className="p-7 sm:p-10 rounded-2xl bg-[#151515] border border-white/15 space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="client-name" className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2">
                        Seu Nome *
                      </label>
                      <input
                        id="client-name"
                        type="text"
                        required
                        placeholder="Ex.: Carlos Eduardo"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-[#0A0A0A] border border-white/15 focus:border-[#F26A21] focus:outline-none text-sm text-white placeholder:text-neutral-600 transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="client-phone" className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2">
                        Telefone / WhatsApp *
                      </label>
                      <input
                        id="client-phone"
                        type="tel"
                        required
                        placeholder="Ex.: (21) 99999-9999"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-[#0A0A0A] border border-white/15 focus:border-[#F26A21] focus:outline-none text-sm text-white placeholder:text-neutral-600 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="car-model" className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2">
                        Modelo do Carro ou Moto *
                      </label>
                      <input
                        id="car-model"
                        type="text"
                        required
                        placeholder="Ex.: Porsche Macan / BMW X5 / Ducati"
                        value={formData.carModel}
                        onChange={(e) => setFormData({ ...formData, carModel: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-[#0A0A0A] border border-white/15 focus:border-[#F26A21] focus:outline-none text-sm text-white placeholder:text-neutral-600 transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="desired-service" className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2">
                        Serviço Desejado *
                      </label>
                      <select
                        id="desired-service"
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-[#0A0A0A] border border-white/15 focus:border-[#F26A21] focus:outline-none text-sm text-white transition-colors"
                      >
                        {SERVICES_LIST.map((s) => (
                          <option key={s.id} value={s.title}>
                            {s.title}
                          </option>
                        ))}
                        <option value="Avaliação Geral / Múltiplos Serviços">
                          Avaliação Geral / Múltiplos Serviços
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* Escolha da Unidade */}
                  <div>
                    <span className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2">
                      Unidade de Preferência *
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, unit: 'fashion-mall' })}
                        className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                          formData.unit === 'fashion-mall'
                            ? 'bg-[#F26A21]/15 border-[#F26A21] text-white'
                            : 'bg-[#0A0A0A] border-white/15 text-neutral-400 hover:text-white'
                        }`}
                      >
                        <p className="font-display font-bold text-xs uppercase tracking-wider text-white">
                          Unidade Fashion Mall
                        </p>
                        <p className="text-xs text-neutral-400 mt-0.5">São Conrado · (21) 97515-8016</p>
                      </button>

                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, unit: 'metropolitano' })}
                        className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                          formData.unit === 'metropolitano'
                            ? 'bg-[#F26A21]/15 border-[#F26A21] text-white'
                            : 'bg-[#0A0A0A] border-white/15 text-neutral-400 hover:text-white'
                        }`}
                      >
                        <p className="font-display font-bold text-xs uppercase tracking-wider text-white">
                          Unidade Shopping Metropolitano
                        </p>
                        <p className="text-xs text-neutral-400 mt-0.5">Barra Olímpica · (21) 97301-6773</p>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="client-message" className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2">
                      Mensagem ou Observações (Opcional)
                    </label>
                    <textarea
                      id="client-message"
                      rows={3}
                      placeholder="Informe cor do veículo, melhor dia/horário ou detalhes específicos..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-[#0A0A0A] border border-white/15 focus:border-[#F26A21] focus:outline-none text-sm text-white placeholder:text-neutral-600 transition-colors"
                    />
                  </div>

                  {formError && (
                    <div role="alert" className="p-3.5 rounded-lg bg-red-500/10 border border-red-500/40 text-xs text-red-300">
                      {formError}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-4 px-6 rounded-lg bg-[#F26A21] hover:bg-[#df5b14] text-white font-semibold text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_8px_28px_rgba(242,106,33,0.3)]"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>
                      Gerar Atendimento para{' '}
                      {formData.unit === 'fashion-mall' ? 'Fashion Mall' : 'Shopping Metropolitano'}
                    </span>
                  </button>

                  {/* Card de confirmação com link direto para o WhatsApp (compatível com iFrame e Mobile) */}
                  {generatedWhatsappLink && (
                    <div className="p-5 rounded-xl bg-[#0A0A0A] border border-[#F26A21] space-y-4">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 text-xs font-semibold text-[#F26A21] uppercase tracking-wider">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Mensagem pronta · {generatedWhatsappLink.unitName}</span>
                        </div>
                        <button
                          type="button"
                          onClick={async () => {
                            try {
                              await navigator.clipboard.writeText(generatedWhatsappLink.textPreview);
                              setCopiedMsg(true);
                              setTimeout(() => setCopiedMsg(false), 2000);
                            } catch {
                              // ignore
                            }
                          }}
                          className="inline-flex items-center gap-1 text-xs text-neutral-300 hover:text-white cursor-pointer"
                        >
                          {copiedMsg ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedMsg ? 'Copiado!' : 'Copiar texto'}</span>
                        </button>
                      </div>

                      <pre className="text-xs text-neutral-300 whitespace-pre-wrap font-sans bg-[#151515] p-3.5 rounded-lg border border-white/10">
                        {generatedWhatsappLink.textPreview}
                      </pre>

                      <a
                        href={generatedWhatsappLink.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3.5 px-5 rounded-lg bg-[#25D366] hover:bg-[#1ebe5a] text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Abrir conversa no WhatsApp Agora</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* =====================================================================
          14. RODAPÉ COMPLETO
      ===================================================================== */}
      <footer className="bg-[#080808] border-t border-white/10 pt-16 pb-12 text-sm text-neutral-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
            {/* Marca e posicionamento */}
            <div className="lg:col-span-4 space-y-4">
              <a
                href="#inicio"
                className="font-display font-extrabold text-xl tracking-[0.18em] uppercase text-white inline-block"
              >
                GARAGE<span className="text-[#F26A21] ml-1.5">CARWASH</span>
              </a>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-sm">
                Referência em estética automotiva premium no Rio de Janeiro desde 2006. Estúdio oficial{' '}
                <strong className="text-neutral-200">Gtechniq Accredited | CSU</strong> para vitrificação, polimento
                técnico, PPF, higienização e UltraBike.
              </p>
              <div className="flex items-center gap-4 pt-1">
                <a
                  href="https://www.instagram.com/garagecarwash_br"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram Garage Car Wash"
                  className="text-neutral-400 hover:text-[#F26A21] transition-colors text-xs font-medium flex items-center gap-1.5"
                >
                  <Instagram className="w-4 h-4" />
                  <span>@garagecarwash_br</span>
                </a>
                <span aria-hidden="true">·</span>
                <a
                  href="https://garagecarwash.com.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-white transition-colors text-xs"
                >
                  garagecarwash.com.br
                </a>
              </div>
            </div>

            {/* Links Rápidos */}
            <div className="lg:col-span-2 space-y-2.5">
              <p className="font-display font-bold text-xs uppercase tracking-wider text-white mb-3">
                Navegação
              </p>
              <ul className="space-y-2 text-xs">
                <li><a href="#inicio" className="hover:text-white transition-colors">Início</a></li>
                <li><a href="#servicos" className="hover:text-white transition-colors">Serviços</a></li>
                <li><a href="#gtechniq" className="hover:text-white transition-colors">Gtechniq Accredited</a></li>
                <li><a href="#diferenciais" className="hover:text-white transition-colors">Diferenciais</a></li>
                <li><a href="#galeria" className="hover:text-white transition-colors">Galeria</a></li>
                <li><a href="#unidades" className="hover:text-white transition-colors">Unidades</a></li>
                <li><a href="#contato" className="hover:text-white transition-colors">Contato</a></li>
              </ul>
            </div>

            {/* Unidade Fashion Mall */}
            <div className="lg:col-span-3 space-y-2 text-xs">
              <p className="font-display font-bold text-xs uppercase tracking-wider text-white mb-3">
                Unidade Fashion Mall
              </p>
              <p>Estrada da Gávea, 899 – Shopping Fashion Mall</p>
              <p>São Conrado, Rio de Janeiro – RJ, 22610-001</p>
              <p className="text-neutral-300 pt-1">Tel: (21) 3591-0954</p>
              <p className="text-neutral-300">WhatsApp: +55 21 97515-8016</p>
              <p className="text-neutral-300">lojafashionmall@garagecarwash.com.br</p>
            </div>

            {/* Unidade Shopping Metropolitano */}
            <div className="lg:col-span-3 space-y-2 text-xs">
              <p className="font-display font-bold text-xs uppercase tracking-wider text-white mb-3">
                Unidade Shopping Metropolitano
              </p>
              <p>Subsolo, Av. Embaixador Abelardo Bueno, 1300</p>
              <p>Barra Olímpica, Rio de Janeiro – RJ, 22775-040</p>
              <p className="text-neutral-300 pt-1">Tel / WhatsApp: (21) 97301-6773</p>
              <p className="text-neutral-300">Abre segunda-feira às 10:00</p>
              <p className="text-[#F26A21] font-semibold">Avaliação 5,0 ★ no Google</p>
            </div>
          </div>

          {/* Barra inferior de Copyright e exportação de código HTML único */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
            <p>© 2025 Garage Car Wash. Todos os direitos reservados. Estética Automotiva Premium desde 2006.</p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setShowDeliverableModal(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#151515] hover:bg-[#1F1F1F] border border-white/10 text-neutral-300 hover:text-white transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-[#F26A21]" />
                <span>HTML Único &amp; Guia de Personalização</span>
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* =====================================================================
          FUNCIONALIDADES FLUTUANTES (WhatsApp com Pulso + Voltar ao Topo)
      ===================================================================== */}
      <a
        href="https://wa.me/5521975158016?text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20Garage%20Car%20Wash%20e%20gostaria%20de%20um%20or%C3%A7amento."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar com a Garage Car Wash pelo WhatsApp"
        className="whatsapp-pulse fixed bottom-5 right-5 z-40 w-12 h-12 rounded-full bg-[#F26A21] hover:bg-[#df5b14] text-white flex items-center justify-center shadow-[0_8px_25px_rgba(242,106,33,0.5)] transition-transform duration-200 hover:scale-105"
      >
        <MessageCircle className="w-6 h-6" />
      </a>

      {showBackToTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Voltar ao topo da página"
          className="fixed bottom-5 left-5 z-40 w-11 h-11 rounded-full bg-[#151515]/90 hover:bg-[#F26A21] border border-white/15 text-white flex items-center justify-center shadow-lg transition-colors cursor-pointer"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* =====================================================================
          MODAL LIGHTBOX DA GALERIA
      ===================================================================== */}
      {lightboxItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lightboxItem.title}
          onClick={() => setLightboxItem(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-3xl w-full rounded-2xl overflow-hidden bg-[#151515] border border-white/15 shadow-2xl"
          >
            <div className="relative aspect-[16/10] bg-black">
              <img
                src={lightboxItem.image}
                alt={lightboxItem.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setLightboxItem(null)}
                aria-label="Fechar visualização ampliada"
                className="absolute top-4 right-4 p-2 rounded-full bg-black/70 text-white hover:bg-[#F26A21] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <p className="text-xs text-[#F26A21] font-semibold uppercase tracking-wider mb-1">
                  {lightboxItem.highlightTag} · {lightboxItem.unit}
                </p>
                <h3 className="font-display font-bold text-xl uppercase text-white mb-1">
                  {lightboxItem.title}
                </h3>
                <p className="text-xs text-neutral-400 mb-3">{lightboxItem.vehicle}</p>
                <p className="text-sm text-neutral-300 leading-relaxed max-w-xl">
                  {lightboxItem.description}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  const title = lightboxItem.title;
                  setLightboxItem(null);
                  handleSelectServiceForQuote(title);
                }}
                className="px-5 py-3 rounded-lg bg-[#F26A21] hover:bg-[#df5b14] text-white text-xs font-semibold uppercase tracking-wider whitespace-nowrap shrink-0 cursor-pointer"
              >
                Solicitar este serviço
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL DE ENTREGA: EXPORTAR ARQUIVO HTML ÚNICO + CHECKLIST DE PERSONALIZAÇÃO
      ===================================================================== */}
      {showDeliverableModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Exportar HTML Único e Guia de Personalização"
          onClick={() => setShowDeliverableModal(false)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-2xl w-full rounded-2xl bg-[#151515] border border-white/15 p-6 sm:p-8 max-h-[88vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between gap-4 pb-4 border-b border-white/10 mb-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#F26A21]">
                  Entrega Pronta para Publicação
                </p>
                <h3 className="font-display font-bold text-xl uppercase text-white">
                  Arquivo HTML Único &amp; Checklist de Personalização
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowDeliverableModal(false)}
                aria-label="Fechar janela"
                className="p-2 rounded-lg text-neutral-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-sm text-neutral-300 mb-6">
              <p className="font-semibold text-white">
                O que o cliente deve personalizar antes de publicar em produção:
              </p>
              <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-300 list-disc pl-5">
                <li>
                  <strong className="text-white">Fotos Reais do Estúdio:</strong> Substituir as 5 imagens de
                  demonstração pelas fotos autorais da Garage Car Wash (fachada/box no Fashion Mall e Shopping
                  Metropolitano, aplicação Gtechniq CSU, fotos reais de Antes/Depois e motos atendidas no programa
                  UltraBike).
                </li>
                <li>
                  <strong className="text-white">Depoimentos Adicionais:</strong> O depoimento de{' '}
                  <em>Alejandro Perrone (Local Guide)</em> já é real do Google. Substituir os 3 depoimentos
                  complementares marcados como <code>[Depoimento Editável]</code> por outras avaliações reais do
                  Google Meu Negócio.
                </li>
                <li>
                  <strong className="text-white">Horários Completos e Preços:</strong> Confirmar os horários de
                  fechamento e domingos de cada shopping, e opcionalmente incluir valores "a partir de R$ ..." nos
                  cards de serviços.
                </li>
                <li>
                  <strong className="text-white">E-mail da Unidade Metropolitano e Links Sociais:</strong> Adicionar
                  o e-mail específico da unidade Barra Olímpica (caso deseje divulgar) e a URL oficial do Facebook no
                  rodapé.
                </li>
              </ul>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={handleDownloadSingleFileHtml}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#F26A21] hover:bg-[#df5b14] text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Baixar index.html Único</span>
              </button>

              <button
                type="button"
                onClick={handleCopySingleFileHtml}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-white/20 hover:border-[#F26A21] text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
              >
                {copiedHtml ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedHtml ? 'Código HTML Copiado!' : 'Copiar Código HTML Único'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
