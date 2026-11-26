// ----- Video card controls -----
    // SVG strings for toggling icons
    const SVG_PAUSE = `<svg class="ctrl-icon" viewBox="0 0 24 24" fill="white"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>`;
    const SVG_PLAY = `<svg class="ctrl-icon" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"/></svg>`;
    const SVG_MUTED = `<svg class="ctrl-icon" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="white" stroke="none"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>`;
    const SVG_UNMUTE = `<svg class="ctrl-icon" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="white" stroke="none"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>`;
    const SVG_HEART = `<svg class="action-icon" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`;
    const SVG_LIKED = `<svg class="action-icon" viewBox="0 0 24 24" fill="#ff8db3" stroke="#ff8db3" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`;

    function togglePlay(videoId, btn) {
      const video = document.getElementById(videoId);
      if (!video) return;
      if (video.paused) {
        video.play();
        btn.innerHTML = SVG_PAUSE;
      } else {
        video.pause();
        btn.innerHTML = SVG_PLAY;
      }
    }

    function toggleMute(videoId, btn) {
      const video = document.getElementById(videoId);
      if (!video) return;
      video.muted = !video.muted;
      btn.innerHTML = video.muted ? SVG_MUTED : SVG_UNMUTE;
    }

    function toggleLike(btn) {
      const icon = btn.querySelector('.icon-circle');
      const isLiked = btn.dataset.liked === 'true';
      btn.dataset.liked = String(!isLiked);
      icon.innerHTML = isLiked ? SVG_HEART : SVG_LIKED;
    }


    // ----- Custom Cursor -----
    // Moves the pink square to follow your mouse.
    const cursor = document.getElementById('customCursor');

    document.addEventListener('mousemove', function (event) {
      cursor.style.left = (event.clientX - 12) + 'px';
      cursor.style.top = (event.clientY - 12) + 'px';
    });

    // Make the cursor grow when hovering over clickable elements
    const clickableElements = document.querySelectorAll(
      'a, button, .merch-card, .video-card, .brand-badge, .service-card'
    );

    clickableElements.forEach(function (element) {
      element.addEventListener('mouseenter', function () {
        cursor.classList.add('is-hovering');
      });
      element.addEventListener('mouseleave', function () {
        cursor.classList.remove('is-hovering');
      });
    });


    // ----- Mobile Navigation Toggle -----
    const menuToggle = document.getElementById('menuToggle');
    const navbarLinks = document.getElementById('navbarLinks');

    if (menuToggle && navbarLinks) {
      const navItems = navbarLinks.querySelectorAll('a');

      menuToggle.addEventListener('click', function () {
        menuToggle.classList.toggle('is-active');
        navbarLinks.classList.toggle('is-active');
      });

      // Close menu when clicking a link
      navItems.forEach(function (item) {
        item.addEventListener('click', function () {
          menuToggle.classList.remove('is-active');
          navbarLinks.classList.remove('is-active');
        });
      });
    }


    // ----- Marquee blend mode & colour control -----
    // mix-blend-mode doesn't accept CSS custom properties (browser limitation),
    // so we read the data attributes and apply them as direct inline styles.
    const marqueeBanner = document.querySelector('.marquee-banner');
    if (marqueeBanner) {
      const blendMode = marqueeBanner.dataset.blendMode || 'color-dodge';
      const textColor = marqueeBanner.dataset.color || 'rgba(200, 200, 200, 0.8)';

      marqueeBanner.style.mixBlendMode = blendMode;

      document.querySelectorAll('.marquee-item').forEach(function (item) {
        item.style.color = textColor;
      });
    }

    // ----- Scroll Parallax for Team Cards -----
    const handleTeamScroll = () => {
      const teamSection = document.querySelector('.team-section');
      const cards = document.querySelectorAll('.team-profile');
      if (!teamSection || cards.length === 0) return;

      const rect = teamSection.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Check if team section is in or near the viewport
      if (rect.top < windowHeight && rect.bottom > 0) {
        // Amount of pixels the top of the section has scrolled up from the bottom of the window
        const scrolledIn = windowHeight - rect.top;

        cards.forEach((card, index) => {
          // Stagger effect: cards start lower and move up faster as user scrolls
          let yOffset = 200 - (scrolledIn * (0.5 + (index * 0.15)));
          yOffset = Math.max(0, yOffset); // Ensure it stops at 0 offset (normal position)
          card.style.setProperty('--scroll-y', `${yOffset}px`);
        });
      }
    };
    window.addEventListener('scroll', handleTeamScroll);
    handleTeamScroll(); // Trigger once on load in case already scrolled

    // ----- Cycle character heads in place of 'O' in BLOCKH3AD -----
    const oImage = document.getElementById('heroOImage');
    if (oImage) {
      const heads = [
        'images/head1.png',
        'images/head2.png',
        'images/head3.png',
        'images/head4.png',
        'images/head5.png',
        'images/head6.png',
        'images/head7.png'
      ];
      let currentHeadIndex = 0;

      setInterval(() => {
        oImage.style.opacity = '0';
        oImage.style.transform = 'scale(0.7) rotate(-15deg)';

        setTimeout(() => {
          currentHeadIndex = (currentHeadIndex + 1) % heads.length;
          oImage.src = heads[currentHeadIndex];
          oImage.style.opacity = '1';
          oImage.style.transform = 'scale(1) rotate(0deg)';
        }, 250);
      }, 1600);

      //<!--3D animation studio, 2D animation services, 
      // Motion graphics design, VFX and visual effects, 
      // Explainer video production, Whiteboard animation,
      // Corporate video animation, Medical animation studio,
      // Architectural 3D rendering, Character, animation studio, 
      // Animation agency-->
    }

    // Load background videos dynamically on first user interaction (scroll, touch, mouse move, key down)
    // to prevent search engine bots (like Googlebot) from detecting and indexing them.
    // This avoids generating "Video isn't on a watch page" warnings in Search Console.
    (function () {
      const interactionEvents = ['mousemove', 'touchstart', 'scroll', 'keydown'];

      function loadVideos() {
        const lazyVideos = document.querySelectorAll("video.local-video");
        lazyVideos.forEach(function (video) {
          if (video.dataset.src && !video.src) {
            video.src = video.dataset.src;
            video.load();
          }
        });

        // Clean up event listeners after loading once
        interactionEvents.forEach(function (event) {
          document.removeEventListener(event, loadVideos);
        });
      }

      interactionEvents.forEach(function (event) {
        document.addEventListener(event, loadVideos, { passive: true, once: true });
      });
    })();