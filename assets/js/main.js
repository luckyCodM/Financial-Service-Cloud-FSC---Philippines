

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();


/**
   * Story Section Toggle
   */
  const buttons = document.querySelectorAll(".story .btn-pill");
  const panes = document.querySelectorAll(".story-pane");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      // Remove active from all buttons
      buttons.forEach(b => b.classList.remove("active"));

      // Hide all content
      panes.forEach(p => p.classList.remove("active"));

      // Activate clicked button
      btn.classList.add("active");

      // Show related content
      document.getElementById(btn.dataset.target).classList.add("active");
    });
  });



  /**
   * Timeline Section Toggle
   */
  const timelineData = {
  2021: {
    title: "The Beginning",
    text: "CodM Software was founded by Anjali Kumari and began operations in 2021 with a vision to drive innovation and deliver tailored solutions that make an impact in the Salesforce ecosystem.",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
  },
  2022: {
    title: "Becoming a Salesforce Consultant",
    text: "With continuous dedication to our work and a commitment to learning, growth and expertise, CodM Software evolved into a Salesforce Consulting Partner within a year of starting its operations.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"
  },
  // 2023: {
  //   title: "Expanding the Team",
  //   text: "By 2024, our team had grown to 20+ skilled and certified professionals, strengthening our capabilities to deliver high-quality Salesforce solutions to our global clients.",
  //   image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c"
  // },
  2024: {
    title: "Expanding the Team",
    text: "By 2024, our team had grown to 20+ skilled and certified professionals, strengthening our capabilities to deliver high-quality Salesforce solutions to our global clients.",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998"
  },
  2025: {
    title: "Recognized Growth and Global Presence",
    text: "In 2025, CodM Software achieved another milestone of becoming a Salesforce Ridge Partner and expanded its presence on the Salesforce AppExchange, marking a new chapter of innovation and credibility.",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
  },
  2026: {
    title: "Looking Ahead",
    text: "As we look to the future, CodM Software remains committed to excellence, innovation, and delivering exceptional value to our clients worldwide, continuing our journey of growth and success in the Salesforce ecosystem.",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
  }
};

// SELECT ELEMENTS
const button = document.querySelectorAll(".timeline-btn");
const yearEl = document.getElementById("timelineYear");
const titleEl = document.getElementById("timelineTitle");
const textEl = document.getElementById("timelineText");
const imageEl = document.getElementById("timelineImage");

// CLICK EVENT
button.forEach(btn => {
  btn.addEventListener("click", () => {
    const year = btn.dataset.year;
    const data = timelineData[year];

    // REMOVE ACTIVE CLASS
    button.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    // FADE EFFECT
    imageEl.style.opacity = 0;
    setTimeout(() => {
      yearEl.textContent = year;
      titleEl.textContent = data.title;
      textEl.textContent = data.text;
      imageEl.src = data.image;
      imageEl.style.opacity = 1;
    }, 200);
  });
});
