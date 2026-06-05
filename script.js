/* =========================================================
   CBL:LOL Npay Summer Cup — 이벤트 페이지 인터랙션
   ----------------------------------------------------------
   기능:
   1. Hero 카운트다운 + 진행률 + LIVE 상태
   2. Tab 전환 (PC방/개인PC, 네이버/피카플레이)
   3. Right Rail — Hero 지난 후 페이드인, 스크롤 위치 활성화
   ========================================================= */

(function () {
  'use strict';

  /* ---------- 1. Hero 카운트다운 ---------- */
  const start = new Date('2026-06-02T00:00:00+09:00');
  const end   = new Date('2026-08-31T23:59:59+09:00');

  const pad = (n) => String(n).padStart(2, '0');
  const $ = (id) => document.getElementById(id);

  function updateCountdown() {
    const now = new Date();
    const total = end - start;
    const elapsed = Math.max(0, Math.min(total, now - start));
    const progress = (elapsed / total) * 100;

    const msLeft = Math.max(0, end - now);
    const days = Math.floor(msLeft / (1000 * 60 * 60 * 24));
    const hrs  = Math.floor((msLeft / (1000 * 60 * 60)) % 24);
    const min  = Math.floor((msLeft / (1000 * 60)) % 60);
    const sec  = Math.floor((msLeft / 1000) % 60);

    if ($('countdown-days')) $('countdown-days').textContent = pad(days);
    if ($('countdown-hms'))  $('countdown-hms').textContent  = `${pad(hrs)}:${pad(min)}:${pad(sec)}`;
    if ($('progress-bar'))   $('progress-bar').style.width   = progress + '%';
    if ($('progress-pct'))   $('progress-pct').textContent   = progress.toFixed(1);

    // LIVE 라벨
    const isLive  = now >= start && now <= end;
    const isAfter = now > end;
    const label = $('hero-live-label');
    const text  = $('hero-live-text');
    const dot   = $('hero-live-dot');
    if (label && text && dot) {
      if (isLive) {
        text.textContent = 'LIVE';
        label.classList.remove('pill-line');
        label.classList.add('pill-green');
        dot.style.background = 'var(--green)';
        dot.classList.add('pulse');
      } else if (isAfter) {
        text.textContent = 'CLOSED';
        label.classList.add('pill-line');
        label.classList.remove('pill-green');
        dot.style.background = 'var(--muted)';
        dot.classList.remove('pulse');
      } else {
        text.textContent = 'COMING SOON';
        label.classList.add('pill-line');
        label.classList.remove('pill-green');
        dot.style.background = 'var(--muted)';
        dot.classList.remove('pulse');
      }
    }
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);


  /* ---------- 2. Tab 전환 ---------- */
  // 랭킹전: PC방 / 개인PC
  // 참여방법: 네이버 / 피카플레이
  document.querySelectorAll('[data-tabs]').forEach((group) => {
    const groupKey = group.getAttribute('data-tabs');
    group.querySelectorAll('button[data-tab]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-tab');

        // 버튼 활성 상태 토글
        group.querySelectorAll('button[data-tab]').forEach((b) => {
          b.classList.remove('active');
          // 참여방법 탭은 색깔이 다름
          b.classList.remove('active-naver', 'active-pica');
        });
        btn.classList.add('active');
        if (groupKey === 'join-tabs') {
          btn.classList.add(target === 'naver' ? 'active-naver' : 'active-pica');
        }

        // 컨텐츠 영역 토글
        // 같은 섹션 안의 data-tab-content 만 대상
        const section = group.closest('section') || document;
        section.querySelectorAll('[data-tab-content]').forEach((el) => {
          if (el.getAttribute('data-tab-content') === target) {
            el.classList.add('active');
            // inline-display 요소도 처리 (ranking 우측 미리보기 텍스트)
            if (el.tagName === 'SPAN') el.style.display = 'block';
          } else {
            el.classList.remove('active');
            if (el.tagName === 'SPAN') el.style.display = 'none';
          }
        });
      });
    });
  });


  /* ---------- 3. Right Rail — visibility & active state ---------- */
  const rail = $('rail');
  const heroSection = document.querySelector('.hero-section');
  const sections = ['section-ranking', 'section-mission', 'section-payment']
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  function updateRail() {
    if (!rail || !heroSection) return;

    // Hero 영역 지나면 표시
    const heroRect = heroSection.getBoundingClientRect();
    if (heroRect.bottom < 80) {
      rail.classList.add('visible');
    } else {
      rail.classList.remove('visible');
    }

    // 현재 화면 중앙에 위치한 섹션 활성화
    let active = null;
    sections.forEach((sec) => {
      const r = sec.getBoundingClientRect();
      const viewportH = window.innerHeight;
      // 섹션이 화면 위쪽 30~ 아래쪽 50% 영역에 들어오면 active
      if (r.top < viewportH * 0.5 && r.bottom > viewportH * 0.3) {
        active = sec.id;
      }
    });
    rail.querySelectorAll('a[data-section]').forEach((a) => {
      a.classList.toggle('active', a.getAttribute('data-section') === active);
    });
  }
  updateRail();
  window.addEventListener('scroll', updateRail, { passive: true });
  window.addEventListener('resize', updateRail);

  // Rail TOP 버튼
  const railTop = $('rail-top');
  if (railTop) {
    railTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Final CTA — 맨 위로
  const ctaTop = $('cta-top');
  if (ctaTop) {
    ctaTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
})();
