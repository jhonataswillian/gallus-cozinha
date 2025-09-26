/**
 * ========================================
 * GALLUS COZINHA - LANDING PAGE JAVASCRIPT
 * ========================================
 *
 * @description: Funcionalidades interativas da landing page
 * @author: Gallus Cozinha
 * @version: 1.0.0
 * @updated: 2024
 *
 * Funcionalidades:
 * 1. Navegação Mobile & Desktop
 * 2. Header Sticky com Efeitos
 * 3. Smooth Scroll
 * 4. Animações AOS (Animate On Scroll)
 * 5. Formulário de Contato com WhatsApp
 * 6. Efeitos Visuais & Performance
 */

/* ========================================
   1. ELEMENTOS DOM & INICIALIZAÇÃO
   ======================================== */

// Elementos principais do DOM
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const header = document.querySelector('.header');
const contactForm = document.getElementById('contactForm');

/* ========================================
   2. NAVEGAÇÃO MOBILE
   ======================================== */

/**
 * Toggle do menu mobile hamburger
 * Controla abertura/fechamento e animações
 */
navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  navToggle.classList.toggle('active');

  // Animação do ícone hamburger para X
  const spans = navToggle.querySelectorAll('span');
  spans.forEach((span, index) => {
    if (navToggle.classList.contains('active')) {
      // Transformar em X
      if (index === 0)
        span.style.transform = 'rotate(45deg) translate(5px, 5px)';
      if (index === 1) span.style.opacity = '0';
      if (index === 2)
        span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
      // Voltar ao hamburger
      span.style.transform = 'none';
      span.style.opacity = '1';
    }
  });
});

/**
 * Fechar menu mobile ao clicar em link
 * Melhora UX em dispositivos móveis
 */
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');

    // Reset da animação hamburger
    const spans = navToggle.querySelectorAll('span');
    spans.forEach(span => {
      span.style.transform = 'none';
      span.style.opacity = '1';
    });
  });
});

/* ========================================
   3. HEADER STICKY - SEMPRE VISÍVEL
   ======================================== */

/**
 * Header fixo com efeitos visuais melhorados
 * Mantém navegação sempre acessível
 */
window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  // Header sempre fixo e visível
  header.classList.remove('scroll-down');
  header.classList.add('scroll-up');

  // Efeitos visuais baseados na posição do scroll
  if (currentScroll > 50) {
    // Scroll ativo - background mais sólido
    header.style.background = 'rgba(255, 255, 255, 0.98)';
    header.style.backdropFilter = 'blur(15px)';
    header.style.boxShadow = 'var(--shadow-md)';
  } else {
    // Topo da página - background suave
    header.style.background = 'rgba(255, 255, 255, 0.95)';
    header.style.backdropFilter = 'blur(10px)';
    header.style.boxShadow = 'none';
  }
});

/* ========================================
   4. SMOOTH SCROLL NAVIGATION
   ======================================== */

/**
 * Navegação suave entre seções
 * Considera altura do header fixo
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');

    // Ignorar elementos com href="#" ou que possuem data-whatsapp
    if (href === '#' || this.hasAttribute('data-whatsapp')) {
      return; // Deixa o comportamento padrão ou outros handlers cuidarem
    }

    e.preventDefault();
    const target = document.querySelector(href);

    if (target) {
      const headerHeight = header.offsetHeight;
      const targetPosition = target.offsetTop - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    }
  });
});

/* ========================================
   5. ANIMAÇÕES AOS (ANIMATE ON SCROLL)
   ======================================== */

/**
 * Intersection Observer para animações de entrada
 * Performance otimizada para grandes listas
 */
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px',
};

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('aos-animate');
      // Remover observação após animação para performance
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observar todos os elementos com data-aos
document.querySelectorAll('[data-aos]').forEach(el => {
  observer.observe(el);
});

/* ========================================
   6. FORMULÁRIO DE CONTATO & WHATSAPP
   ======================================== */

/**
 * Processamento do formulário de contato
 * Redireciona para WhatsApp com dados formatados
 */

// Verificar se o formulário existe
if (!contactForm) {
  console.error('Formulário não encontrado! ID: contactForm');
  // Mostrar debug na tela
  const debugDiv = document.createElement('div');
  debugDiv.style.cssText = `
    position: fixed; top: 10px; left: 10px; right: 10px;
    background: #f00; color: #fff; padding: 10px;
    border-radius: 5px; z-index: 9999; font-size: 12px;
  `;
  debugDiv.textContent = 'ERRO: Formulário não encontrado!';
  document.body.appendChild(debugDiv);
} else {
  console.log('Formulário encontrado!');
}

// Abordagem alternativa - aguardar DOM carregar completamente
document.addEventListener('DOMContentLoaded', function () {
  const form =
    document.getElementById('contactForm') ||
    document.querySelector('.contact-form');

  if (!form) {
    const debugDiv = document.createElement('div');
    debugDiv.style.cssText = `
      position: fixed; top: 10px; left: 10px; right: 10px;
      background: #f00; color: #fff; padding: 10px;
      border-radius: 5px; z-index: 9999; font-size: 12px;
    `;
    debugDiv.textContent =
      'ERRO: Formulário não encontrado no DOMContentLoaded!';
    document.body.appendChild(debugDiv);
    return;
  }

  form.addEventListener('submit', handleFormSubmit);
});

contactForm?.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(e) {
  e.preventDefault();

  // Mostrar debug na tela para mobile
  function showDebug(message) {
    const debugDiv = document.createElement('div');
    debugDiv.style.cssText = `
      position: fixed; top: 10px; left: 10px; right: 10px;
      background: #000; color: #fff; padding: 10px;
      border-radius: 5px; z-index: 9999; font-size: 12px;
    `;
    debugDiv.textContent = message;
    document.body.appendChild(debugDiv);
    setTimeout(() => debugDiv.remove(), 3000);
  }

  showDebug('Formulário enviado!');

  // Capturar dados do formulário
  const formData = new FormData(this);
  const name = formData.get('name');
  const phone = formData.get('phone');
  const email = formData.get('email');
  const eventType = formData.get('event-type');
  const date = formData.get('date');
  const guests = formData.get('guests');
  const message = formData.get('message');

  // Construir mensagem WhatsApp estruturada
  let whatsappMessage = `*Nova solicitação - Gallus Cozinha*\n\n`;
  whatsappMessage += `👤 *Nome:* ${name}\n`;
  whatsappMessage += `📞 *Telefone:* ${phone}\n`;

  if (email) {
    whatsappMessage += `📧 *Email:* ${email}\n`;
  }

  whatsappMessage += `🎉 *Tipo de Evento:* ${eventType}\n`;

  if (date) {
    const formattedDate = new Date(date).toLocaleDateString('pt-BR');
    whatsappMessage += `📅 *Data:* ${formattedDate}\n`;
  }

  if (guests) {
    whatsappMessage += `👥 *Convidados:* ${guests}\n`;
  }

  whatsappMessage += `\n💬 *Mensagem:*\n${message}`;

  // Gerar URL WhatsApp usando detecção inteligente de dispositivo
  const whatsappURL = generateWhatsAppURL('5519971174929', whatsappMessage);

  showDebug(`É mobile: ${isMobileDevice()}`);

  // Animação de feedback no botão
  const submitBtn = this.querySelector('.btn-form');
  const originalText = submitBtn.innerHTML;

  submitBtn.innerHTML = '<i class="fas fa-check"></i> Redirecionando...';
  submitBtn.style.background = 'linear-gradient(135deg, #25D366, #128C7E)';

  // Redirecionar para WhatsApp - abordagem universal
  setTimeout(() => {
    showDebug('Tentando abrir WhatsApp...');
    // Usar window.open sempre, mas com target específico para mobile
    window.open(whatsappURL, '_blank', 'noopener,noreferrer');

    // Reset do botão e limpeza do formulário
    setTimeout(() => {
      submitBtn.innerHTML = originalText;
      submitBtn.style.background = '';
      this.reset();
    }, 2000);
  }, 1000);
}

/* ========================================
   7. FORMATAÇÃO DE TELEFONE BRASILEIRO
   ======================================== */

/**
 * Máscara automática para número de telefone
 * Formato obrigatório: (XX) XXXXX-XXXX (exatamente 11 dígitos)
 */
const phoneInput = document.getElementById('phone');
if (phoneInput) {
  phoneInput.addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, '');

    // Limitar a exatamente 11 dígitos
    if (value.length > 11) {
      value = value.slice(0, 11);
    }

    // Aplicar máscara progressiva
    if (value.length === 0) {
      value = '';
    } else if (value.length <= 2) {
      value = value.replace(/(\d{1,2})/, '($1');
    } else if (value.length <= 7) {
      value = value.replace(/(\d{2})(\d{1,5})/, '($1) $2');
    } else if (value.length <= 11) {
      value = value.replace(/(\d{2})(\d{5})(\d{1,4})/, '($1) $2-$3');
    }

    e.target.value = value;
  });

  // Validação no blur para garantir formato completo se preenchido
  phoneInput.addEventListener('blur', function (e) {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length > 0 && value.length !== 11) {
      e.target.setCustomValidity(
        'Telefone deve ter exatamente 11 dígitos: (11) 11111-1111'
      );
    } else {
      e.target.setCustomValidity('');
    }
  });
}

/* ========================================
   8. VALIDAÇÃO DE DATA
   ======================================== */

/**
 * Definir data mínima como hoje
 * Previne agendamentos no passado
 */
const dateInput = document.getElementById('date');
if (dateInput) {
  const today = new Date().toISOString().split('T')[0];
  dateInput.min = today;
}

/* ========================================
   10. EFEITO PARALLAX HERO
   ======================================== */

/**
 * Parallax sutil na imagem hero
 * Adiciona profundidade visual
 */
const hero = document.querySelector('.hero');
const heroImage = document.querySelector('.hero-image');

if (hero && heroImage) {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;

    // Aplicar apenas na seção hero
    if (scrolled <= hero.offsetHeight) {
      heroImage.style.transform = `translateY(${rate}px)`;
    }
  });
}

/* ========================================
   11. ANIMAÇÕES DE CARREGAMENTO
   ======================================== */

/**
 * Controle de loading da página
 * Animações escalonadas para elementos hero
 */
window.addEventListener('load', () => {
  document.body.classList.add('loaded');

  // Animar elementos hero sequencialmente
  const heroTitle = document.querySelector('.hero-title');
  const heroSubtitle = document.querySelector('.hero-subtitle');
  const heroCta = document.querySelector('.hero-cta');

  if (heroTitle) {
    heroTitle.style.animation = 'fadeInUp 1s ease 0.2s both';
  }
  if (heroSubtitle) {
    heroSubtitle.style.animation = 'fadeInUp 1s ease 0.4s both';
  }
  if (heroCta) {
    heroCta.style.animation = 'fadeInUp 1s ease 0.6s both';
  }
});

/* ========================================
   12. RIPPLE EFFECT EM BOTÕES
   ======================================== */

/**
 * Efeito ripple (ondulação) nos botões
 * Feedback visual moderno ao clicar
 */
document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', function (e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');

    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

/* ========================================
   13. ESTILOS DINÂMICOS & OTIMIZAÇÕES
   ======================================== */

/**
 * Adicionar estilos CSS dinamicamente
 * Evita necessidade de CSS adicional
 */
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    .scroll-down {
        transform: translateY(-100%);
    }

    .scroll-up {
        transform: translateY(0);
    }

    .loaded {
        opacity: 1;
    }

    body {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
`;
document.head.appendChild(style);

/* ========================================
   15. TRATAMENTO DE ERROS
   ======================================== */

/**
 * Handler global de erros JavaScript
 * Log de erros para debugging
 */
window.addEventListener('error', function (e) {
  console.error('JavaScript error:', e.error);
  // Em produção, aqui seria enviado para serviço de logging
});

/**
 * Handler para erros de promises rejeitadas
 */
window.addEventListener('unhandledrejection', function (e) {
  console.error('Unhandled promise rejection:', e.reason);
});

/* ========================================
   16. SERVICE WORKER (PREPARAÇÃO PWA)
   ======================================== */

/**
 * Registro de Service Worker
 * Base para futuras funcionalidades PWA
 */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Service Worker será implementado futuramente
    // navigator.serviceWorker.register('/sw.js')
    //     .then(registration => {
    //         console.log('SW registered: ', registration);
    //     })
    //     .catch(registrationError => {
    //         console.log('SW registration failed: ', registrationError);
    //     });
  });
}

/* ========================================
   17. FUNCIONALIDADES FUTURAS
   ======================================== */

/**
 * Placeholder para funcionalidades futuras:
 * - Analytics tracking
 * - A/B testing
 * - Chat bot integration
 * - Geolocalização
 * - Notificações push
 * - Cache offline
 */

/* ========================================
   18. SISTEMA WHATSAPP INTELIGENTE
   ======================================== */

/**
 * Detecta o tipo de dispositivo e gera link WhatsApp apropriado
 * Mobile: wa.me (melhor compatibilidade com apps nativos)
 * Desktop: api.whatsapp.com (melhor para WhatsApp Web)
 */
function isMobileDevice() {
  // Detecção mais robusta de dispositivos móveis
  const userAgent = navigator.userAgent.toLowerCase();
  const mobileKeywords = [
    'android',
    'webos',
    'iphone',
    'ipad',
    'ipod',
    'blackberry',
    'iemobile',
    'opera mini',
    'mobile',
    'phone',
  ];

  return (
    mobileKeywords.some(keyword => userAgent.includes(keyword)) ||
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    window.innerWidth <= 768
  );
}

/**
 * Gera URL WhatsApp inteligente baseada no dispositivo
 * @param {string} phone - Número de telefone
 * @param {string} message - Mensagem pré-programada
 * @returns {string} URL otimizada para o dispositivo
 */
function generateWhatsAppURL(phone, message) {
  const encodedMessage = encodeURIComponent(message);
  // Usar sempre wa.me para máxima compatibilidade
  return `https://wa.me/${phone}?text=${encodedMessage}`;
}

/**
 * Inicializa todos os links WhatsApp com detecção inteligente
 * Exclui botões de formulário para evitar conflitos
 */
function initWhatsAppLinks() {
  const whatsappLinks = document.querySelectorAll(
    '[data-whatsapp]:not(.btn-form):not(form button)'
  );

  whatsappLinks.forEach(link => {
    const phone = link.dataset.whatsappPhone || '5519971174929';
    const message =
      link.dataset.whatsappMessage ||
      'Olá! Gostaria de conhecer mais sobre os serviços do Gallus Cozinha';

    link.href = generateWhatsAppURL(phone, message);

    // Adicionar event listener para garantir URL atualizada
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const updatedURL = generateWhatsAppURL(phone, message);
      window.open(updatedURL, '_blank', 'noopener,noreferrer');
    });
  });
}

// Inicializar links WhatsApp quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', initWhatsAppLinks);

// Objeto global para funcionalidades da Gallus Cozinha
window.GallusCozinha = {
  version: '1.0.0',
  initialized: true,
  features: {
    stickyHeader: true,
    smoothScroll: true,
    whatsappIntegration: true,
    mobileMenu: true,
    formValidation: true,
    animations: true,
  },
};
