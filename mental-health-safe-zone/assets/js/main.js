(function(){
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

  const header = $('[data-header]');
  const nav = $('[data-nav]');
  const navToggle = $('[data-nav-toggle]');

  function onScroll(){
    if(!header) return;
    header.classList.toggle('scrolled', window.scrollY > 24);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  if(navToggle && nav){
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('open');
      nav.classList.toggle('open');
    });
  }

  const revealElements = $$('.reveal');
  if('IntersectionObserver' in window){
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if(entry.isIntersecting){
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });
    revealElements.forEach((el, i) => {
      el.style.transitionDelay = `${Math.min(i * 50, 350)}ms`;
      observer.observe(el);
    });
  }else{
    revealElements.forEach(el => el.classList.add('visible'));
  }

  const dot = $('.cursor-dot');
  const ring = $('.cursor-ring');
  let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
  if(dot && ring && window.matchMedia('(pointer:fine)').matches){
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX; mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    }, { passive: true });
    function animateCursor(){
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      requestAnimationFrame(animateCursor);
    }
    animateCursor();
    $$('.magnet,a,button,input').forEach(el => {
      el.addEventListener('mouseenter', () => ring.style.cssText += ';width:58px;height:58px;border-color:rgba(125,249,212,.8);background:rgba(125,249,212,.08)');
      el.addEventListener('mouseleave', () => ring.style.cssText += ';width:38px;height:38px;border-color:rgba(255,255,255,.4);background:transparent');
    });
  }

  const canvas = document.getElementById('ambient-canvas');
  if(canvas){
    const ctx = canvas.getContext('2d');
    const colors = ['rgba(125,249,212,.55)','rgba(255,142,199,.46)','rgba(198,164,255,.45)','rgba(143,199,255,.38)','rgba(255,176,134,.34)'];
    const particles = [];
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    function resize(){
      canvas.width = window.innerWidth * devicePixelRatio;
      canvas.height = window.innerHeight * devicePixelRatio;
      ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);
    }
    function init(){
      particles.length = 0;
      const count = Math.min(76, Math.floor(window.innerWidth / 18));
      for(let i=0;i<count;i++){
        particles.push({
          x: Math.random()*window.innerWidth,
          y: Math.random()*window.innerHeight,
          r: Math.random()*2.2 + .7,
          vx: (Math.random()-.5)*.22,
          vy: (Math.random()-.5)*.22,
          c: colors[Math.floor(Math.random()*colors.length)]
        });
      }
    }
    function draw(){
      ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
      particles.forEach((p, i) => {
        if(!reduceMotion){
          p.x += p.vx; p.y += p.vy;
          if(p.x < -20) p.x = window.innerWidth + 20;
          if(p.x > window.innerWidth + 20) p.x = -20;
          if(p.y < -20) p.y = window.innerHeight + 20;
          if(p.y > window.innerHeight + 20) p.y = -20;
        }
        ctx.beginPath();
        ctx.fillStyle = p.c;
        ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fill();
        for(let j=i+1;j<particles.length;j++){
          const q = particles[j];
          const dx = p.x-q.x, dy = p.y-q.y;
          const d = Math.hypot(dx,dy);
          if(d < 125){
            ctx.strokeStyle = `rgba(255,255,255,${(1 - d/125) * .08})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x,p.y); ctx.lineTo(q.x,q.y); ctx.stroke();
          }
        }
      });
      requestAnimationFrame(draw);
    }
    resize(); init(); draw();
    window.addEventListener('resize', () => { resize(); init(); }, { passive: true });
  }
})();
