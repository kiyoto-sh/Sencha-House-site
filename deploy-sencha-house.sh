#!/bin/bash
set -e
cd "$(git rev-parse --show-toplevel)" || { echo "Not in a git repo"; exit 1; }
git checkout main
git pull origin main

mkdir -p sencha-house

cat > sencha-house/index.html << 'HTML_EOF'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sencha House | The Story</title>
  <meta name="description" content="Sencha House selects, designs, and delivers Japanese green tea experiences built on a standard that does not move.">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Lato:wght@300;400&family=Plus+Jakarta+Sans:wght@400;700;800&display=swap" rel="stylesheet">

  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
  <script src="https://unpkg.com/lenis@1.1.18/dist/lenis.min.js"></script>

  <style>
    :root {
      --ivory: #E6DAB8;
      --kabuse: #08190E;
      --red: #FF0033;
      --hairline: rgba(8, 25, 14, 0.14);
      --hairline-soft: rgba(8, 25, 14, 0.08);
      --ease: cubic-bezier(0.16, 1, 0.3, 1);
    }

    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

    html { scroll-behavior: smooth; }

    body {
      background: var(--ivory);
      color: var(--kabuse);
      font-family: 'Lato', sans-serif;
      -webkit-font-smoothing: antialiased;
      overflow-x: hidden;
    }

    a { color: inherit; text-decoration: none; }

    .wrap {
      max-width: 1360px;
      margin: 0 auto;
      padding-left: clamp(1.5rem, 5vw, 4rem);
      padding-right: clamp(1.5rem, 5vw, 4rem);
    }

    /* ============================
       NAV
       ============================ */
    .nav {
      position: fixed;
      top: 0; left: 0; right: 0;
      z-index: 50;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1.4rem clamp(1.5rem, 5vw, 4rem);
      background: rgba(230, 218, 184, 0);
      border-bottom: 1px solid transparent;
      transition: background 0.4s var(--ease), border-color 0.4s var(--ease);
    }

    .nav.is-scrolled {
      background: rgba(230, 218, 184, 0.92);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid var(--hairline);
    }

    .nav-mark {
      font-family: 'Cormorant Garamond', serif;
      font-weight: 300;
      font-style: italic;
      font-size: 1.3rem;
    }

    .nav-links {
      display: flex;
      gap: clamp(1.2rem, 2.5vw, 2.2rem);
      list-style: none;
    }

    .nav-links a {
      font-family: 'Lato', sans-serif;
      font-weight: 400;
      font-size: 0.68rem;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      opacity: 0.7;
      transition: opacity 0.3s;
      position: relative;
      padding-bottom: 4px;
    }

    .nav-links a:hover { opacity: 1; }

    .nav-links a::after {
      content: '';
      position: absolute;
      left: 0; bottom: 0;
      width: 0; height: 1px;
      background: var(--kabuse);
      transition: width 0.3s var(--ease);
    }

    .nav-links a:hover::after { width: 100%; }

    .nav-burger {
      display: none;
      flex-direction: column;
      gap: 5px;
      cursor: pointer;
    }

    .nav-burger span {
      width: 22px; height: 1px;
      background: var(--kabuse);
    }

    /* ============================
       MANIFESTO SECTION (shared)
       ============================ */
    .manifesto {
      position: sticky;
      top: 0;
      height: 100vh;
      height: 100dvh;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      overflow: hidden;
      will-change: transform;
    }

    main > section:nth-of-type(1) { z-index: 1; }
    main > section:nth-of-type(2) { z-index: 2; }
    main > section:nth-of-type(3) { z-index: 3; }
    main > section:nth-of-type(4) { z-index: 4; }

    .manifesto-bg {
      position: absolute;
      inset: 0;
      z-index: 0;
      background: linear-gradient(180deg, #d8cda8 0%, #cabb8e 50%, #b8a572 100%);
    }

    .manifesto-bg video,
    .manifesto-bg img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0.9;
    }

    .manifesto-overlay {
      position: absolute;
      inset: 0;
      z-index: 1;
      background: linear-gradient(
        180deg,
        rgba(230,218,184,0.15) 0%,
        rgba(230,218,184,0.1) 35%,
        rgba(8,25,14,0.78) 100%
      );
    }

    .manifesto-content {
      position: relative;
      z-index: 2;
      padding-bottom: clamp(3rem, 7vw, 5.5rem);
      color: var(--ivory);
    }

    .manifesto-index {
      font-family: 'Lato', sans-serif;
      font-weight: 300;
      font-size: 0.7rem;
      letter-spacing: 0.3em;
      text-transform: uppercase;
      color: rgba(230,218,184,0.65);
      margin-bottom: 1.4rem;
    }

    .manifesto-headline {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-weight: 800;
      font-size: clamp(2.2rem, 5.5vw, 4.8rem);
      letter-spacing: 0.01em;
      line-height: 1.02;
      text-transform: uppercase;
      max-width: 18ch;
      margin-bottom: 1.8rem;
    }

    .manifesto-sub {
      font-family: 'Cormorant Garamond', serif;
      font-weight: 300;
      font-style: italic;
      font-size: clamp(1rem, 1.6vw, 1.3rem);
      color: rgba(230,218,184,0.85);
      margin-bottom: 0;
    }

    .manifesto-copy {
      font-weight: 300;
      font-size: clamp(0.92rem, 1.05vw, 1rem);
      line-height: 1.8;
      color: rgba(230,218,184,0.82);
      max-width: 36rem;
      margin-top: 1.6rem;
    }

    .manifesto-scrollcue {
      position: absolute;
      bottom: 2.2rem;
      right: clamp(1.5rem, 5vw, 4rem);
      z-index: 2;
      font-family: 'Lato', sans-serif;
      font-size: 0.62rem;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: rgba(230,218,184,0.55);
      display: flex;
      align-items: center;
      gap: 0.8rem;
    }

    .manifesto-scrollcue-line {
      width: 1px;
      height: 2.5rem;
      background: rgba(230,218,184,0.3);
      position: relative;
      overflow: hidden;
    }

    .manifesto-scrollcue-line::after {
      content: '';
      position: absolute;
      top: 0; left: 0;
      width: 100%; height: 30%;
      background: var(--ivory);
      animation: scrollDrip 2.4s ease-in-out infinite;
    }

    @keyframes scrollDrip {
      0%   { transform: translateY(-100%); }
      100% { transform: translateY(330%); }
    }

    /* ============================
       IN YOUR HANDS (closing line)
       ============================ */
    .closing-line {
      position: relative;
      z-index: 5;
      background: var(--ivory);
      padding: clamp(6rem, 14vw, 11rem) 0;
      text-align: center;
      border-top: 1px solid var(--hairline-soft);
    }

    .closing-eyebrow {
      font-family: 'Lato', sans-serif;
      font-weight: 300;
      font-size: 0.7rem;
      letter-spacing: 0.3em;
      text-transform: uppercase;
      color: rgba(8,25,14,0.5);
      margin-bottom: 2rem;
    }

    .closing-headline {
      font-family: 'Cormorant Garamond', serif;
      font-weight: 300;
      font-style: italic;
      font-size: clamp(1.6rem, 4vw, 3.2rem);
      line-height: 1.3;
      max-width: 26ch;
      margin: 0 auto;
    }

    .closing-headline em {
      font-style: normal;
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-weight: 800;
      text-transform: uppercase;
      font-size: 0.7em;
      letter-spacing: 0.02em;
    }

    /* ============================
       3-WAY BRANCH
       ============================ */
    .branch {
      position: relative;
      z-index: 5;
      display: flex;
      width: 100%;
      height: 100vh;
      height: 100dvh;
      overflow: hidden;
    }

    .branch-panel {
      position: relative;
      flex: 1 1 33.333%;
      height: 100%;
      overflow: hidden;
      cursor: pointer;
      border-right: 1px solid rgba(230,218,184,0.12);
    }

    .branch-panel:last-child { border-right: none; }

    .branch-bg {
      position: absolute;
      inset: 0;
      z-index: 0;
    }

    .branch-panel--experiences .branch-bg { background: linear-gradient(165deg, #1a3015 0%, #0d1f0a 100%); }
    .branch-panel--reserve .branch-bg { background: linear-gradient(165deg, #2d4a22 0%, #16280f 100%); }
    .branch-panel--design .branch-bg { background: linear-gradient(165deg, #08190E 0%, #050d07 100%); }

    .branch-overlay {
      position: absolute;
      inset: 0;
      z-index: 1;
      background: rgba(8,25,14,0.35);
      transition: background 0.6s var(--ease);
    }

    .branch-panel:hover .branch-overlay {
      background: rgba(8,25,14,0.15);
    }

    .branch-content {
      position: relative;
      z-index: 2;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      padding: clamp(2rem, 4vw, 3rem);
      color: var(--ivory);
    }

    .branch-index {
      font-family: 'Lato', sans-serif;
      font-weight: 300;
      font-size: 0.66rem;
      letter-spacing: 0.25em;
      text-transform: uppercase;
      color: rgba(230,218,184,0.6);
      margin-bottom: 1.2rem;
    }

    .branch-title {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-weight: 800;
      font-size: clamp(1.5rem, 2.8vw, 2.4rem);
      text-transform: uppercase;
      letter-spacing: 0.01em;
      line-height: 1.05;
      margin-bottom: 1rem;
    }

    .branch-desc {
      font-weight: 300;
      font-size: 0.85rem;
      line-height: 1.6;
      color: rgba(230,218,184,0.75);
      max-width: 22rem;
      opacity: 0;
      max-height: 0;
      transition: opacity 0.5s var(--ease), max-height 0.5s var(--ease);
    }

    .branch-panel:hover .branch-desc {
      opacity: 1;
      max-height: 8rem;
      margin-bottom: 1.4rem;
    }

    .branch-link {
      font-family: 'Cormorant Garamond', serif;
      font-weight: 300;
      font-style: italic;
      font-size: 1rem;
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .branch-link-arrow {
      width: 1.8rem; height: 1px;
      background: var(--ivory);
      position: relative;
      transition: width 0.4s var(--ease);
    }

    .branch-panel:hover .branch-link-arrow { width: 2.6rem; }

    .branch-link-arrow::after {
      content: '';
      position: absolute;
      right: 0; top: -3px;
      width: 7px; height: 7px;
      border-right: 1px solid var(--ivory);
      border-top: 1px solid var(--ivory);
      transform: rotate(45deg);
    }

    /* ============================
       SVG FILTERS
       ============================ */
    .svg-filters { position: absolute; width: 0; height: 0; overflow: hidden; }

    /* ============================
       SCROLL REVEAL
       ============================ */
    [data-reveal] { opacity: 0; transform: translateY(28px); }

    /* ============================
       MOBILE
       ============================ */
    @media (max-width: 860px) {
      .nav-links { display: none; }
      .nav-burger { display: flex; }

      .manifesto {
        position: relative;
        height: auto;
        min-height: 100dvh;
      }

      main > section:nth-of-type(1),
      main > section:nth-of-type(2),
      main > section:nth-of-type(3),
      main > section:nth-of-type(4) {
        z-index: auto;
      }

      .manifesto-headline { max-width: 100%; }

      .branch {
        flex-direction: column;
        height: auto;
      }

      .branch-panel {
        flex: none;
        height: 70vh;
        border-right: none;
        border-bottom: 1px solid rgba(230,218,184,0.12);
      }

      .branch-panel:last-child { border-bottom: none; }

      .branch-desc {
        opacity: 1;
        max-height: 8rem;
        margin-bottom: 1.4rem;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        transition-duration: 0.01ms !important;
      }
      [data-reveal] { opacity: 1; transform: none; }
    }
  </style>
</head>
<body>

  <svg class="svg-filters">
    <defs>
      <filter id="gentle-ripple-sh">
        <feTurbulence type="fractalNoise" baseFrequency="0.012 0.008" numOctaves="3" seed="7" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </defs>
  </svg>

  <!-- ============ NAV ============ -->
  <nav class="nav" id="nav">
    <a href="/" class="nav-mark">Sh</a>
    <ul class="nav-links">
      <li><a href="/sencha-house/experiences/">Experiences</a></li>
      <li><a href="/sencha-house/tea-reserve/">teaReserve</a></li>
      <li><a href="/sencha-house/design/">SH Design</a></li>
      <li><a href="/sencha-house/contact/">Contact</a></li>
    </ul>
    <div class="nav-burger" aria-label="Menu"><span></span><span></span><span></span></div>
  </nav>

  <main>

    <!-- ============ I — THE STANDARD ============ -->
    <section class="manifesto">
      <div class="manifesto-bg">
        <video autoplay muted loop playsinline>
          <source src="https://videos.pexels.com/video-files/4926072/4926072-uhd_2732_1440_30fps.mp4" type="video/mp4">
        </video>
      </div>
      <div class="manifesto-overlay"></div>
      <div class="manifesto-content wrap" data-reveal>
        <div class="manifesto-index">I &middot; The Standard</div>
        <h1 class="manifesto-headline">Before Anything<br>Is Designed</h1>
        <p class="manifesto-sub">the tea has already been decided.</p>
        <p class="manifesto-copy">Selection, blending, roasting: in Japanese tea these are not marketing language, they are a discipline refined over decades by people who answer to a standard most producers will never reach. This is the floor everything else is built on. The leaf is the one part of this we never have to argue for.</p>
      </div>
      <div class="manifesto-scrollcue">
        <span>Scroll</span>
        <span class="manifesto-scrollcue-line"></span>
      </div>
    </section>

    <!-- ============ II — DESIGN AS CULTURAL TRANSLATION ============ -->
    <section class="manifesto">
      <div class="manifesto-bg">
        <img src="https://images.pexels.com/photos/7233931/pexels-photo-7233931.jpeg?auto=compress&cs=tinysrgb&h=1200&w=1920&fit=crop" alt="" style="filter: url(#gentle-ripple-sh);">
      </div>
      <div class="manifesto-overlay"></div>
      <div class="manifesto-content wrap" data-reveal>
        <div class="manifesto-index">II &middot; Design as Cultural Translation</div>
        <h1 class="manifesto-headline">Listening Comes<br>First</h1>
        <p class="manifesto-sub">expression comes only after.</p>
        <p class="manifesto-copy">Everything past that floor is design, and design, here, is not decoration. It is how we think, speak, and shape: how a tea is packaged, how a space is arranged, how a word is chosen. We do not import Japan and set it down somewhere else. We take what is essential in its values and find the form that lets it resonate here, now, for the people actually in front of us.</p>
      </div>
      <div class="manifesto-scrollcue">
        <span>Scroll</span>
        <span class="manifesto-scrollcue-line"></span>
      </div>
    </section>

    <!-- ============ III — TEA DESIGN ============ -->
    <section class="manifesto">
      <div class="manifesto-bg">
        <video autoplay muted loop playsinline>
          <source src="https://videos.pexels.com/video-files/13722700/13722700-hd_1080_1920_25fps.mp4" type="video/mp4">
        </video>
      </div>
      <div class="manifesto-overlay"></div>
      <div class="manifesto-content wrap" data-reveal>
        <div class="manifesto-index">III &middot; Tea Design</div>
        <h1 class="manifesto-headline">Rituals Without<br>A Name Yet</h1>
        <p class="manifesto-sub">structured for clarity, not stillness.</p>
        <p class="manifesto-copy">We do not recreate tea ceremonies. A tradition already exists to do that properly. What we build instead are formats that don't have a name yet: discovery for the curious, wellness for the body, connection for the table, vitality for the hours that ask for clarity. Whatever the format, the standard underneath doesn't move. Only the shape does.</p>
      </div>
      <div class="manifesto-scrollcue">
        <span>Scroll</span>
        <span class="manifesto-scrollcue-line"></span>
      </div>
    </section>

    <!-- ============ IV — OTHER HANDS ============ -->
    <section class="manifesto">
      <div class="manifesto-bg">
        <video autoplay muted loop playsinline>
          <source src="https://videos.pexels.com/video-files/6694787/6694787-uhd_2732_1440_25fps.mp4" type="video/mp4">
        </video>
      </div>
      <div class="manifesto-overlay"></div>
      <div class="manifesto-content wrap" data-reveal>
        <div class="manifesto-index">IV &middot; Other Hands</div>
        <h1 class="manifesto-headline">Never A<br>Solitary Act</h1>
        <p class="manifesto-sub">we're continuing what was already there.</p>
        <p class="manifesto-copy">The bowl a tea is served in isn't something we make. It comes from a ceramicist who has spent years learning what clay can hold, held to the same standard we hold the leaf to. Within a generation of Sen no Rikyu, the relationships he built with individual craftsmen were formalized into ten hereditary artisan families. We're not introducing collaboration into this tradition. We're continuing what was already there.</p>
      </div>
      <div class="manifesto-scrollcue">
        <span>Scroll</span>
        <span class="manifesto-scrollcue-line"></span>
      </div>
    </section>

    <!-- ============ V — IN YOUR HANDS (closing line) ============ -->
    <section class="closing-line">
      <div class="wrap">
        <div class="closing-eyebrow" data-reveal>V &middot; In Your Hands</div>
        <p class="closing-headline" data-reveal>This is tea: made without compromise, shaped by hands beyond our own. <em>Now it's in yours.</em></p>
      </div>
    </section>

    <!-- ============ THREE-WAY BRANCH ============ -->
    <section class="branch" id="branch">
      <a href="/sencha-house/experiences/" class="branch-panel branch-panel--experiences" data-branch="experiences">
        <div class="branch-bg"></div>
        <div class="branch-overlay"></div>
        <div class="branch-content">
          <div class="branch-index">01</div>
          <h2 class="branch-title">Experiences</h2>
          <p class="branch-desc">Tastings, daily rituals, and releases built around discovery, wellness, connection, and vitality.</p>
          <div class="branch-link">
            <span>Explore</span>
            <span class="branch-link-arrow"></span>
          </div>
        </div>
      </a>
      <a href="/sencha-house/tea-reserve/" class="branch-panel branch-panel--reserve" data-branch="reserve">
        <div class="branch-bg"></div>
        <div class="branch-overlay"></div>
        <div class="branch-content">
          <div class="branch-index">02</div>
          <h2 class="branch-title">teaReserve</h2>
          <p class="branch-desc">A curated, gallery-style catalogue of single-origin Japanese green tea, sourced and verified lot by lot.</p>
          <div class="branch-link">
            <span>Browse</span>
            <span class="branch-link-arrow"></span>
          </div>
        </div>
      </a>
      <a href="/sencha-house/design/" class="branch-panel branch-panel--design" data-branch="design">
        <div class="branch-bg"></div>
        <div class="branch-overlay"></div>
        <div class="branch-content">
          <div class="branch-index">03</div>
          <h2 class="branch-title">SH Design</h2>
          <p class="branch-desc">Design consultancy for spaces, brands, and rituals built around Japanese tea, led by Kiyoto.</p>
          <div class="branch-link">
            <span>Inquire</span>
            <span class="branch-link-arrow"></span>
          </div>
        </div>
      </a>
    </section>

  </main>

  <script>
    (function () {
      'use strict';

      gsap.registerPlugin(ScrollTrigger);

      const nav = document.getElementById('nav');

      /* ---- Nav background on scroll ---- */
      ScrollTrigger.create({
        start: 'top -80',
        onUpdate: (self) => {
          nav.classList.toggle('is-scrolled', self.scroll() > 80);
        }
      });

      /* ---- First section entrance ---- */
      gsap.timeline({ defaults: { ease: 'expo.out' } })
        .to('.manifesto:first-of-type [data-reveal]', {
          opacity: 1, y: 0, duration: 1.2, delay: 0.3
        });

      /* ---- Scroll reveals for everything else ---- */
      gsap.utils.toArray('[data-reveal]').forEach((el, i) => {
        if (i === 0) return; // first section handled above
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            once: true
          }
        });
      });

      /* ---- 3-way branch hover expand (desktop only) ---- */
      const isMobile = window.matchMedia('(max-width: 860px)').matches;

      if (!isMobile) {
        const branch = document.getElementById('branch');
        const panels = gsap.utils.toArray('.branch-panel');

        panels.forEach((panel) => {
          panel.addEventListener('mouseenter', () => {
            panels.forEach((p) => {
              gsap.to(p, {
                flex: p === panel ? '1 1 50%' : '1 1 25%',
                duration: 0.7,
                ease: 'power3.inOut'
              });
            });
          });
        });

        branch.addEventListener('mouseleave', () => {
          gsap.to(panels, {
            flex: '1 1 33.333%',
            duration: 0.7,
            ease: 'power3.inOut'
          });
        });
      }

      /* ---- Fluid scroll motion on the manifesto stack ---- */
      if (!isMobile) {
        gsap.utils.toArray('.manifesto').forEach((section) => {
          const bg = section.querySelector('.manifesto-bg video, .manifesto-bg img');
          const content = section.querySelector('.manifesto-content');

          // Background zooms in slowly the entire time this section is pinned
          if (bg) {
            gsap.fromTo(bg,
              { scale: 1.18 },
              {
                scale: 1.0,
                ease: 'none',
                scrollTrigger: {
                  trigger: section,
                  start: 'top top',
                  end: 'bottom top',
                  scrub: true
                }
              }
            );
          }

          // Content fades and lifts away as the next section slides over it
          if (content) {
            gsap.to(content, {
              opacity: 0.25,
              y: -50,
              ease: 'none',
              scrollTrigger: {
                trigger: section,
                start: 'top top',
                end: 'bottom top',
                scrub: true
              }
            });
          }
        });
      }

      /* ---- Safety timeout ---- */
      setTimeout(() => {
        document.querySelectorAll('[data-reveal]').forEach(el => {
          el.style.opacity = '1';
          el.style.transform = 'none';
        });
      }, 3500);

    })();
  </script>

</body>
</html>
HTML_EOF

git add -A
git commit -m "feat: Sencha House story landing (5-section sticky-stack manifesto, 3-way branch)"
git push origin main
echo "Pushed to main. Netlify will auto-deploy."
echo "Live at: https://gregarious-babka-467492.netlify.app/sencha-house/"
