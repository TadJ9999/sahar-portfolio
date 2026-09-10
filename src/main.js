// ============================================================
// Render src/data.js into the page. No framework, no build-time templating.
// ============================================================
import { profile, pipeline, projects, experience, skillGroups, certs, education, languages } from './data.js';

const $ = (id) => document.getElementById(id);
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const html = (el, s) => { el.innerHTML = s; };
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---------- header, hero, footer ----------
$('brand').textContent = profile.name;
$('hero-eyebrow').textContent = `${profile.title} · ${profile.location}`;
$('hero-lead').textContent = profile.lead;
$('contact-lead').textContent = profile.contactLead;
$('foot-name').textContent = `© ${new Date().getFullYear()} ${profile.name}`;
$('foot-place').textContent = profile.location;

// headline: last word set in italic cobalt, the one typographic flourish on the page
{
  const words = profile.headline.trim().split(' ');
  const last = words.pop();
  html($('hero-title'), `${esc(words.join(' '))} <em>${esc(last)}</em>`);
}
if (profile.resumeUrl) { const r = $('resume-link'); r.href = profile.resumeUrl; r.hidden = false; }

// ---------- hero diagram: four nodes on one path, built from `pipeline` ----------
{
  const svg = $('pipe-svg');
  const NS = 'http://www.w3.org/2000/svg';
  const pos = [[60, 105], [175, 62], [290, 148], [400, 105]]; // gentle S so it reads as a flow, not a list
  const d = `M ${pos[0][0]} ${pos[0][1]} C 120 105, 120 62, ${pos[1][0]} ${pos[1][1]} S 235 148, ${pos[2][0]} ${pos[2][1]} S 345 105, ${pos[3][0]} ${pos[3][1]}`;
  const mk = (tag, attrs, text) => {
    const n = document.createElementNS(NS, tag);
    for (const k in attrs) n.setAttribute(k, attrs[k]);
    if (text != null) n.textContent = text;
    return n;
  };
  svg.append(mk('path', { d, class: 'pipe-track' }));
  const draw = mk('path', { d, class: 'pipe-draw' });
  svg.append(draw);
  pipeline.forEach((st, i) => {
    const [x, y] = pos[i];
    const g = mk('g', { class: 'pipe-node', 'data-stage': i, tabindex: '-1' });
    const w = 74;
    g.append(mk('rect', { x: x - w / 2, y: y - 19, width: w, height: 38, rx: 7 }));
    g.append(mk('text', { x, y: y - 4, class: 'pipe-num' }, String(i + 1).padStart(2, '0')));
    g.append(mk('text', { x, y: y + 11, class: 'pipe-name' }, st.name.toUpperCase()));
    g.append(mk('text', { x, y: i % 2 === 0 ? y + 36 : y - 28, class: 'pipe-tools' }, st.tools));
    g.addEventListener('mouseenter', () => setStage(i));
    g.addEventListener('mouseleave', () => setStage(-1));
    svg.append(g);
  });
  // draw the path once on load
  const len = draw.getTotalLength();
  draw.style.strokeDasharray = String(len);
  draw.style.strokeDashoffset = reduceMotion ? '0' : String(len);
  if (!reduceMotion) requestAnimationFrame(() => { draw.style.transition = 'stroke-dashoffset 1.6s ease-out .2s'; draw.style.strokeDashoffset = '0'; });
}

function setStage(i) {
  document.querySelectorAll('[data-stage]').forEach((n) => n.classList.toggle('is-on', Number(n.dataset.stage) === i));
}

// ---------- method ----------
html($('stages'), pipeline.map((st, i) => `
  <li class="stage" data-stage="${i}">
    <span class="stage-num">${String(i + 1).padStart(2, '0')}</span>
    <h3>${esc(st.name)}</h3>
    <p class="stage-tools">${esc(st.tools)}</p>
    <p>${esc(st.desc)}</p>
  </li>`).join(''));
document.querySelectorAll('.stage').forEach((el) => {
  el.addEventListener('mouseenter', () => setStage(Number(el.dataset.stage)));
  el.addEventListener('mouseleave', () => setStage(-1));
});

// ---------- work ----------
function metricChart(m) {
  const max = Math.max(m.before, m.after);
  const H = 64, W = 220, bw = 54;
  const hb = Math.round((m.before / max) * (H - 8)), ha = Math.round((m.after / max) * (H - 8));
  const up = m.after > m.before;
  return `
  <svg class="metric" viewBox="0 0 ${W} ${H + 18}" role="img" aria-label="${esc(m.label)}: ${esc(m.delta)}">
    <rect x="18" y="${H - hb}" width="${bw}" height="${hb}" fill="var(--rule)"></rect>
    <rect x="${18 + bw + 26}" y="${H - ha}" width="${bw}" height="${ha}" fill="var(--cobalt)"></rect>
    <text x="${18 + bw / 2}" y="${H + 13}" class="metric-axis">Before</text>
    <text x="${18 + bw + 26 + bw / 2}" y="${H + 13}" class="metric-axis">After</text>
    <text x="${18 + bw * 2 + 40}" y="${H - ha + (up ? 4 : 12)}" class="metric-delta">${esc(m.delta)}</text>
  </svg>`;
}
html($('work-grid'), projects.filter((p) => !p.draft).map((p) => `
  <article class="card">
    <h3>${esc(p.title)}</h3>
    <p class="card-meta">${esc(p.org)} · ${esc(p.dates)}</p>
    ${p.metric ? metricChart(p.metric) : ''}
    <p class="card-desc">${esc(p.desc)}</p>
    <p class="chips">${(p.tools || []).map((t) => `<span>${esc(t)}</span>`).join('')}</p>
    ${p.metric ? `<p class="card-src">${esc(p.metric.label)}, relative to the starting level</p>` : ''}
  </article>`).join(''));

// ---------- experience ----------
html($('xp-list'), experience.map((x) => `
  <li class="xp-item">
    <div class="xp-head">
      <div><h3>${esc(x.role)}</h3><p class="xp-org">${esc(x.org)}${x.place ? ` · ${esc(x.place)}` : ''}</p></div>
      <p class="xp-dates">${esc(x.dates)}</p>
    </div>
    ${x.bullets.length ? `<ul>${x.bullets.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>` : ''}
  </li>`).join(''));

// ---------- skills, certs, education, languages ----------
html($('skill-groups'), skillGroups.map((g) => `
  <div class="skill-group">
    <h3>${esc(g.name)}</h3>
    <ul class="chips">${g.items.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>
  </div>`).join(''));
html($('cert-list'), certs.map((c) => `<li><span>${esc(c.name)}</span>${c.issuer ? `<span class="muted">${esc(c.issuer)}</span>` : ''}</li>`).join(''));
html($('edu-list'), education.map((e) => `<li><span><b>${esc(e.school)}</b>, ${esc(e.detail)}${e.note ? `<br><span class="muted">${esc(e.note)}</span>` : ''}</span><span class="muted">${esc(e.dates)}</span></li>`).join(''));
$('languages').textContent = languages;

// ---------- contact ----------
{
  const links = [
    { name: 'Email', addr: profile.email, href: `mailto:${profile.email}` },
    { name: 'LinkedIn', addr: profile.linkedin.replace(/^https?:\/\/(www\.)?/, ''), href: profile.linkedin },
  ];
  if (profile.github) links.push({ name: 'GitHub', addr: profile.github.replace(/^https?:\/\/(www\.)?/, ''), href: profile.github });
  html($('contact-links'), links.map((l) => `
    <a class="uplink" href="${esc(l.href)}"${l.href.startsWith('http') ? ' target="_blank" rel="noopener noreferrer"' : ''}>
      <span class="uplink-name">${esc(l.name)}</span>
      <span class="uplink-addr">${esc(l.addr)}</span>
    </a>`).join(''));
}

// ---------- current section in the nav ----------
{
  const links = [...document.querySelectorAll('.site-nav a')];
  const obs = new IntersectionObserver((entries) => {
    for (const en of entries) {
      if (!en.isIntersecting) continue;
      links.forEach((a) => a.classList.toggle('is-current', a.getAttribute('href') === `#${en.target.id}`));
    }
  }, { rootMargin: '-40% 0px -55% 0px' });
  document.querySelectorAll('main section[id]').forEach((s) => obs.observe(s));
}
