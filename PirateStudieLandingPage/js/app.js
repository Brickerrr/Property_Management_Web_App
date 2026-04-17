// =============================================
// PIRATE STUDIE — APP JS
// =============================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- Navbar scroll effect ----
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---- Hamburger menu ----
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');
  const navActions = document.querySelector('.nav-actions');
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    if (navActions) navActions.classList.toggle('open');
    const bars = hamburger.querySelectorAll('span');
    bars[0].style.transform = navLinks.classList.contains('open') ? 'rotate(45deg) translate(5px,5px)' : '';
    bars[1].style.opacity = navLinks.classList.contains('open') ? '0' : '1';
    bars[2].style.transform = navLinks.classList.contains('open') ? 'rotate(-45deg) translate(5px,-5px)' : '';
  });

  // Close menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      if (navActions) navActions.classList.remove('open');
    });
  });

  // ---- Pricing modal ----
  const pricingOverlay = document.getElementById('pricing-overlay');
  const pricingClose = document.getElementById('pricing-close');

  document.querySelectorAll('a').forEach(link => {
    if (link.textContent.trim().toLowerCase().includes('start 3 month free trial') && !link.closest('.pricing-modal')) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        pricingOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    }
  });

  const closePricing = () => {
    pricingOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (pricingOverlay && pricingClose) {
    pricingClose.addEventListener('click', closePricing);
    pricingOverlay.addEventListener('click', (e) => {
      if (e.target === pricingOverlay) closePricing();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && pricingOverlay.classList.contains('active')) closePricing();
    });
  }

  // ---- Trial sign-up modal ----
  const trialOverlay = document.getElementById('trial-overlay');
  const trialClose = document.getElementById('trial-close');
  const trialForm = document.getElementById('trial-form');
  const trialSuccess = document.getElementById('trial-success');
  const trialPlanInput = document.getElementById('trial-plan');
  const trialPlanLabel = document.getElementById('trial-plan-label');

  document.querySelectorAll('.pricing-card-btn').forEach(btn => {
    if (btn.textContent.trim().toLowerCase().includes('start 3 month free trial')) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const card = btn.closest('.pricing-card');
        const planName = card.querySelector('.pricing-card-tag').textContent;
        trialPlanInput.value = planName;
        trialPlanLabel.textContent = planName + ' plan — fill in your details and we\u2019ll be in touch.';
        trialForm.style.display = '';
        trialSuccess.style.display = 'none';
        trialForm.reset();
        trialPlanInput.value = planName;
        trialOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    }
  });

  const closeTrialModal = () => {
    trialOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (trialOverlay && trialClose) {
    trialClose.addEventListener('click', closeTrialModal);
    trialOverlay.addEventListener('click', (e) => {
      if (e.target === trialOverlay) closeTrialModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && trialOverlay.classList.contains('active')) closeTrialModal();
    });
  }

  if (trialForm) {
    trialForm.addEventListener('submit', (e) => {
      e.preventDefault();
      trialForm.style.display = 'none';
      trialSuccess.style.display = '';
    });
  }

  // ---- Smooth scroll for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ---- Intersection Observer for fade-up animations ----
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll(
    '.feature-card, .step, .type-card, .pricing-card, .testimonial-card, .stat, .logo-item'
  ).forEach(el => {
    el.classList.add('fade-up');
    observer.observe(el);
  });

  // ---- Animated bar chart ----
  const bars = document.querySelectorAll('.bar');
  const chartObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        bars.forEach(bar => {
          const target = bar.style.height;
          bar.style.height = '0%';
          setTimeout(() => { bar.style.height = target; bar.style.transition = 'height 0.8s cubic-bezier(0.4,0,0.2,1)'; }, 100);
        });
        chartObserver.disconnect();
      }
    });
  }, { threshold: 0.5 });
  if (bars.length) chartObserver.observe(bars[0].parentElement);

});
