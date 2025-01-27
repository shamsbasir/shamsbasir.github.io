// Portfolio Main JavaScript
(() => {
    'use strict';
  
    // Utility Functions
    const utils = {
      select: (el, all = false) => {
        el = el.trim();
        return all ? [...document.querySelectorAll(el)] : document.querySelector(el);
      },
      
      on: (type, el, listener, all = false) => {
        const selectEl = utils.select(el, all);
        if (selectEl) {
          all ? selectEl.forEach(e => e.addEventListener(type, listener)) 
               : selectEl.addEventListener(type, listener);
        }
      },
      
      onscroll: (el, listener) => el.addEventListener('scroll', listener),
      
      scrollTo: (el) => {
        const elementPos = utils.select(el).offsetTop;
        window.scrollTo({
          top: elementPos,
          behavior: 'smooth'
        });
      }
    };
  
    // Navigation Functions
    const navigation = {
      initNavbarLinks: () => {
        const navbarlinks = utils.select('#navbar .scrollto', true);
        
        const navbarlinksActive = () => {
          const position = window.scrollY + 200;
          navbarlinks.forEach(navbarlink => {
            if (!navbarlink.hash) return;
            const section = utils.select(navbarlink.hash);
            if (!section) return;
            
            if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
              navbarlink.classList.add('active');
            } else {
              navbarlink.classList.remove('active');
            }
          });
        };
  
        window.addEventListener('load', navbarlinksActive);
        utils.onscroll(document, navbarlinksActive);
      },
  
      initMobileNav: () => {
        utils.on('click', '.mobile-nav-toggle', function() {
          utils.select('body').classList.toggle('mobile-nav-active');
          this.classList.toggle('bi-list');
          this.classList.toggle('bi-x');
        });
      },
  
      initScrollTo: () => {
        utils.on('click', '.scrollto', function(e) {
          if (utils.select(this.hash)) {
            e.preventDefault();
            const body = utils.select('body');
            
            if (body.classList.contains('mobile-nav-active')) {
              body.classList.remove('mobile-nav-active');
              const navbarToggle = utils.select('.mobile-nav-toggle');
              navbarToggle.classList.toggle('bi-list');
              navbarToggle.classList.toggle('bi-x');
            }
            
            utils.scrollTo(this.hash);
          }
        }, true);
      }
    };
  
    // Hero Section Functions
    const hero = {
      initTypeEffect: () => {
        const typed = utils.select('.typed');
        if (typed) {
          const typed_strings = typed.getAttribute('data-typed-items').split(',');
          new Typed('.typed', {
            strings: typed_strings,
            loop: true,
            typeSpeed: 30,
            backSpeed: 10,
            backDelay: 2000,
            startDelay: 500,
            smartBackspace: true
          });
        }
      }
    };
  
    // Portfolio Functions
    const portfolio = {
      initIsotope: () => {
        const portfolioContainer = utils.select('.portfolio-container');
        if (!portfolioContainer) return;
  
        const portfolioIsotope = new Isotope(portfolioContainer, {
          itemSelector: '.portfolio-item',
          layoutMode: 'fitRows'
        });
  
        const portfolioFilters = utils.select('#portfolio-flters li', true);
        utils.on('click', '#portfolio-flters li', function(e) {
          e.preventDefault();
          portfolioFilters.forEach(el => el.classList.remove('filter-active'));
          this.classList.add('filter-active');
  
          portfolioIsotope.arrange({
            filter: this.getAttribute('data-filter')
          });
          AOS.refresh();
        }, true);
      },
  
      initLightbox: () => {
        GLightbox({
          selector: '.portfolio-lightbox',
          touchNavigation: true,
          loop: true,
          autoplayVideos: true
        });
      }
    };
  
    // Skills Animation
    const skills = {
      initAnimation: () => {
        const skillsContent = utils.select('.skills-content');
        if (skillsContent) {
          new Waypoint({
            element: skillsContent,
            offset: '80%',
            handler: function() {
              utils.select('.progress .progress-bar', true).forEach((el) => {
                el.style.transition = 'width 1s ease-in-out';
                setTimeout(() => {
                  el.style.width = el.getAttribute('aria-valuenow') + '%';
                }, 100);
              });
            }
          });
        }
      }
    };
  
    // Back to Top Button
    const backToTop = {
      init: () => {
        const backtotop = utils.select('.back-to-top');
        if (!backtotop) return;
  
        const toggleBacktotop = () => {
          backtotop.classList[window.scrollY > 100 ? 'add' : 'remove']('active');
        };
  
        window.addEventListener('load', toggleBacktotop);
        utils.onscroll(document, toggleBacktotop);
      }
    };
  
    // Initialize Everything
    const initializePortfolio = () => {
      // Navigation
      navigation.initNavbarLinks();
      navigation.initMobileNav();
      navigation.initScrollTo();
  
      // Sections
      hero.initTypeEffect();
      portfolio.initIsotope();
      portfolio.initLightbox();
      skills.initAnimation();
      backToTop.init();
  
      // Animation on scroll
      AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      });
  
      // Handle hash links on page load
      if (window.location.hash && utils.select(window.location.hash)) {
        utils.scrollTo(window.location.hash);
      }
    };
  
    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', initializePortfolio);
  })();