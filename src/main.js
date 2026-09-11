// ============================================================
// Render src/data.js into the page. No framework, no build-time templating.
// ============================================================
import { profile, facts, pipeline, projects, experience, skillGroups, certs, education, languages } from './data.js';

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

$('hero-title').textContent = profile.name;
if (profile.resumeUrl) for (const id of ['resume-link', 'facts-resume']) { const r = $(id); r.href = profile.resumeUrl; r.hidden = false; }

// ---------- at a glance ----------
html($('facts'), facts.map((f) => `<div><dt>${esc(f.label)}</dt><dd>${esc(f.value)}</dd></div>`).join(''));

// ---------- method ----------
html($('stages'), pipeline.map((st, i) => `
  <li class="stage">
    <span class="stage-num">${String(i + 1).padStart(2, '0')}</span>
    <h3>${esc(st.name)}</h3>
    <p class="stage-tools">${esc(st.tools)}</p>
    <p>${esc(st.desc)}</p>
  </li>`).join(''));

// ---------- work ----------
html($('work-grid'), projects.filter((p) => !p.draft).map((p) => `
  <article class="card">
    <h3>${esc(p.title)}</h3>
    <p class="card-meta">${esc(p.org)} · ${esc(p.dates)}</p>
    ${p.stat ? `<p class="stat"><b>${esc(p.stat.value)}</b>${esc(p.stat.label)}</p>` : ''}
    <p class="card-desc">${esc(p.desc)}</p>
    <p class="chips">${(p.tools || []).map((t) => `<span>${esc(t)}</span>`).join('')}</p>
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
