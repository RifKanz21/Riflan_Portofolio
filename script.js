const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];

const progress = $('#scrollProgress');
const header = $('.topbar');
function onScroll(){
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.width = `${max > 0 ? scrollY / max * 100 : 0}%`;
  header.classList.toggle('scrolled', scrollY > 24);
}
addEventListener('scroll', onScroll, {passive:true}); onScroll();

const menuToggle = $('#menuToggle'), mobileNav = $('#mobileNav');
menuToggle.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  mobileNav.hidden = !open;
});
$$('.mobile-nav a').forEach(a => a.addEventListener('click', () => {
  mobileNav.hidden = true; menuToggle.setAttribute('aria-expanded','false'); menuToggle.setAttribute('aria-label','Open navigation');
}));

const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
if ('IntersectionObserver' in window && !reducedMotion) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if(entry.isIntersecting){ entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  }), {threshold:0.12});
  $$('.reveal').forEach(el => observer.observe(el));
} else $$('.reveal').forEach(el => el.classList.add('visible'));

const focusLabel = $('#focusLabel');
const focusMessages = {
  'Visual design':'Visual ideas, taking shape.',
  'Programming':'Logic, one concept at a time.',
  'AI exploration':'Exploring tools with intention.'
};
$$('.orbit-node').forEach(btn => btn.addEventListener('click', e => {
  e.stopPropagation();
  focusLabel.textContent = focusMessages[btn.dataset.focus] || 'Curiosity, in motion.';
  $$('.orbit-node').forEach(n => n.style.background = n === btn ? 'rgba(114,243,210,.16)' : '#111a2b');
}));

const threadCopy = {
  visual:'Visual thinking is where I’ve already made posters, banners, logos, and pamphlets — small ways to turn an idea into something tangible.',
  logic:'Logical thinking is the foundation I’m developing through Informatics Engineering and beginner programming practice in C++ and Python.',
  explore:'Open exploration means learning to use tools such as Gemini and ChatGPT thoughtfully, while keeping the idea, the process, and my own judgement at the centre.'
};
$$('.thread-card').forEach(btn => btn.addEventListener('click', () => {
  $$('.thread-card').forEach(b => b.classList.toggle('active', b === btn));
  $('#threadDetail').textContent = threadCopy[btn.dataset.thread];
}));

const skills = {
  design:{title:'Visual design',label:'CURRENT PRACTICE / 01',icon:'✳',className:'design-orb',text:'Design is the area where I can point to work I’ve already made: posters, banners, logos, and pamphlets. I use Canva as one of my tools and continue learning how layout, typography, and visual choices shape a message.',facts:[['TOOL','Canva'],['EXPERIENCE','Selected design works'],['APPROACH','Practice & refinement']]},
  code:{title:'Programming',label:'CURRENT PRACTICE / 02',icon:'⌘',className:'code-orb',text:'I’m learning the fundamentals of programming with C++ and Python. Right now, the priority is understanding syntax, problem-solving, and how to turn a small problem into a clear sequence of instructions.',facts:[['LANGUAGES','C++ · Python'],['STAGE','Foundational learning'],['APPROACH','Small steps & practice']]},
  ai:{title:'AI exploration',label:'CURRENT PRACTICE / 03',icon:'✦',className:'ai-orb',text:'I explore tools such as Gemini and ChatGPT as part of my digital workflow. My focus is on learning how to ask better questions, evaluate outputs, and use AI as support rather than a substitute for my own judgement.',facts:[['TOOLS','Gemini · ChatGPT'],['FOCUS','Practical exploration'],['APPROACH','Question · evaluate · refine']]},
  video:{title:'Video editing',label:'CURRENT PRACTICE / 04',icon:'▶',className:'video-orb',text:'Video editing is another creative area I’m developing. I’m interested in how timing, sequence, and visual choices can make information easier to follow and a story more engaging.',facts:[['AREA','Video editing'],['STAGE','Skill development'],['APPROACH','Experiment & refine']]}
};
$$('.practice-tab').forEach(btn => btn.addEventListener('click', () => {
  $$('.practice-tab').forEach(b => { const active=b===btn; b.classList.toggle('selected',active); b.setAttribute('aria-selected',String(active)); });
  const s=skills[btn.dataset.skill], panel=$('#practicePanel');
  panel.innerHTML=`<div class="panel-orb ${s.className}"><span>${s.icon}</span><i></i><i></i><i></i></div><div class="panel-content"><span class="panel-label">${s.label}</span><h3>${s.title}</h3><p>${s.text}</p><div class="panel-facts">${s.facts.map(f=>`<div><small>${f[0]}</small><strong>${f[1]}</strong></div>`).join('')}</div></div>`;
  $('#consoleCounter').textContent=`AREA ${String([...$$('.practice-tab')].indexOf(btn)+1).padStart(2,'0')} / 04`;
}));
$('#year').textContent = new Date().getFullYear();

// GPU Accelerated Hover Glow for Glass Panels (Bento, Timeline, Contact, Threads)
if(matchMedia('(pointer:fine)').matches && !reducedMotion){
  $$('.glass-panel, .thread-card').forEach(card => card.addEventListener('pointermove', e => {
    const r=card.getBoundingClientRect();
    card.style.setProperty('--x', `${e.clientX - r.left}px`);
    card.style.setProperty('--y', `${e.clientY - r.top}px`);
  }));
}