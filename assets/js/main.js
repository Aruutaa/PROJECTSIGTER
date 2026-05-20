(function () {
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

  function setYear() {
    $$("[data-year]").forEach(el => { el.textContent = new Date().getFullYear(); });
  }

  function setActiveNav() {
    const path = location.pathname.split("/").pop() || "index.html";
    $$(".nav-links a").forEach(link => {
      const href = link.getAttribute("href");
      link.classList.toggle("active", href === path || (path === "" && href === "index.html"));
    });
  }

  function mobileNav() {
    const toggle = $("[data-menu-toggle]");
    const links = $("[data-nav-links]");
    if (!toggle || !links) return;
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    links.addEventListener("click", event => {
      if (event.target.closest("a")) {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  function customCursor() {
    const dot = $(".cursor-dot");
    const ring = $(".cursor-ring");
    if (!dot || !ring || !matchMedia("(pointer: fine)").matches) return;
    let x = innerWidth / 2, y = innerHeight / 2;
    let rx = x, ry = y;
    window.addEventListener("mousemove", e => {
      x = e.clientX; y = e.clientY;
      dot.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
    });
    const tick = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      requestAnimationFrame(tick);
    };
    tick();
    $$("a, button, input, select, textarea, .location-item, .filter-chip").forEach(el => {
      el.addEventListener("mouseenter", () => ring.classList.add("is-hovering"));
      el.addEventListener("mouseleave", () => ring.classList.remove("is-hovering"));
    });
  }

  function revealOnScroll() {
    const items = $$(".reveal");
    if (!items.length) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    items.forEach(item => observer.observe(item));
  }

  function countUp() {
    const items = $$("[data-count]");
    if (!items.length) return;
    const format = (value, suffix) => {
      if (suffix === "%") return `${value.toFixed(1)}%`;
      if (suffix === "+") return `${Math.round(value)}+`;
      return Math.round(value).toLocaleString("id-ID") + (suffix || "");
    };
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const end = Number(el.dataset.count || 0);
        const suffix = el.dataset.suffix || "";
        const duration = 1100;
        const startTime = performance.now();
        const animate = now => {
          const p = Math.min(1, (now - startTime) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = format(end * eased, suffix);
          if (p < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
        observer.unobserve(el);
      });
    }, { threshold: 0.55 });
    items.forEach(item => observer.observe(item));
  }

  function ambientCanvas() {
    const canvas = document.getElementById("ambientCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0, height = 0, particles = [];
    const colors = ["94,234,212", "139,124,255", "255,140,198", "255,209,102", "110,203,255"];
    function resize() {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(95, Math.max(44, Math.floor(width * height / 15000)));
      particles = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - .5) * .28,
        vy: (Math.random() - .5) * .28,
        r: Math.random() * 2.2 + .7,
        c: colors[i % colors.length]
      }));
    }
    function draw() {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (!reduce) {
          p.x += p.vx; p.y += p.vy;
          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;
        }
        ctx.beginPath();
        ctx.fillStyle = `rgba(${p.c}, .62)`;
        ctx.shadowColor = `rgba(${p.c}, .7)`;
        ctx.shadowBlur = 16;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x, dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 128) {
            ctx.strokeStyle = `rgba(255,255,255,${(1 - dist / 128) * .12})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }
      if (!reduce) requestAnimationFrame(draw);
    }
    resize();
    draw();
    addEventListener("resize", resize);
  }

  function cardTilt() {
    const cards = $$(".tilt");
    if (!cards.length || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    cards.forEach(card => {
      card.addEventListener("mousemove", e => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - .5;
        const y = (e.clientY - rect.top) / rect.height - .5;
        card.style.transform = `perspective(900px) rotateX(${(-y * 4).toFixed(2)}deg) rotateY(${(x * 4).toFixed(2)}deg) translateY(-2px)`;
      });
      card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(900px) rotateX(0) rotateY(0) translateY(0)";
      });
    });
  }

  function copyButtons() {
    $$('[data-copy]').forEach(button => {
      button.addEventListener('click', async () => {
        const target = document.querySelector(button.dataset.copy);
        if (!target) return;
        const text = target.textContent.trim();
        try {
          await navigator.clipboard.writeText(text);
          const old = button.textContent;
          button.textContent = 'Tersalin';
          setTimeout(() => { button.textContent = old; }, 1200);
        } catch (error) {
          console.warn('Copy failed', error);
        }
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    setYear();
    setActiveNav();
    mobileNav();
    customCursor();
    revealOnScroll();
    countUp();
    ambientCanvas();
    cardTilt();
    copyButtons();
  });
})();
