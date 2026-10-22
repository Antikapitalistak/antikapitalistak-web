function toggleMenu(){document.querySelector('.nav')?.classList.toggle('open');}

function addSocialLinks(){
  document.querySelectorAll('.footer-in').forEach((footer)=>{
    if(footer.querySelector('.social-links')) return;
    footer.insertAdjacentHTML('beforeend', `
      <nav class="social-links" aria-label="Redes sociales">
        <a class="social-link" href="https://t.me/antikapitalistak" target="_blank" rel="noopener noreferrer" aria-label="Telegram" title="Telegram">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M21.6 3.2 2.9 10.4c-1.3.5-1.3 1.2-.2 1.6l4.8 1.5 1.8 5.7c.2.7.1 1 .8 1 .5 0 .8-.2 1.1-.5l2.7-2.6 5 3.7c.9.5 1.6.2 1.8-.9l3.2-15c.3-1.4-.5-2-1.4-1.7ZM9.1 13.2l10.7-6.8c.5-.3 1-.1.6.3l-8.8 8-.3 3.2-2.2-4.7Z"/></svg>
        </a>
        <a class="social-link" href="https://www.instagram.com/antikapitalistak/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" title="Instagram">
          <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" ry="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.3" cy="6.7" r="1.2" fill="currentColor"/></svg>
        </a>
        <a class="social-link" href="https://x.com/antikapitalista" target="_blank" rel="noopener noreferrer" aria-label="X" title="X">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231L18.244 2.25Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z"/></svg>
        </a>
        <a class="social-link" href="https://www.facebook.com/antikapitalistak.euskalherria" target="_blank" rel="noopener noreferrer" aria-label="Facebook" title="Facebook">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M13.7 22v-9h3l.5-3.5h-3.5V7.3c0-1 .3-1.7 1.8-1.7h1.9V2.5c-.3 0-1.5-.1-2.8-.1-2.8 0-4.7 1.7-4.7 4.8v2.3H6.8V13h3.1v9h3.8Z"/></svg>
        </a>
      </nav>`);
  });
}
addSocialLinks();


function addParticipationNav(){
  const nav=document.querySelector('.nav');
  if(!nav) return;
  const lang=document.documentElement.lang==='eu'?'eu':'es';
  const href=lang==='eu'?'/eu/parte-hartu/':'/es/participa/';
  const label=lang==='eu'?'Parte hartu':'Participa';
  if(!Array.from(nav.querySelectorAll('a')).some((a)=>a.getAttribute('href')===href||a.href.endsWith(href))) {
    const a=document.createElement('a');
    a.href=href;
    a.textContent=label;
    nav.appendChild(a);
  }
}

function addPrivacyLink(){
  document.querySelectorAll('.footer-in').forEach((footer)=>{
    if(footer.querySelector('.footer-legal')) return;
    const lang=document.documentElement.lang==='eu'?'eu':'es';
    const a=document.createElement('a');
    a.className='footer-legal';
    a.href=lang==='eu'?'/eu/pribatutasuna/':'/es/privacidad/';
    a.textContent=lang==='eu'?'Pribatutasuna':'Privacidad';
    const social=footer.querySelector('.social-links');
    if(social) footer.insertBefore(a,social);
    else footer.appendChild(a);
  });
}

addParticipationNav();
addPrivacyLink();

function addAgendaNav(){
  const nav=document.querySelector('.nav');
  if(!nav) return;
  const lang=document.documentElement.lang==='eu'?'eu':'es';
  const href=lang==='eu'?'/eu/agenda/':'/es/agenda/';
  if(!Array.from(nav.querySelectorAll('a')).some((a)=>a.href.endsWith(href))){
    const a=document.createElement('a');
    a.href=href;
    a.textContent='Agenda';
    const participa=Array.from(nav.querySelectorAll('a')).find((a)=>a.textContent==='Participa'||a.textContent==='Parte hartu');
    if(participa) nav.insertBefore(a,participa);
    else nav.appendChild(a);
  }
}
addAgendaNav();
