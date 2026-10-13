(function(){
'use strict';
const c=window.portfolioContent,page=document.body.dataset.page;
const prefix=page==='home'?'':'../';
const asset=p=>p.startsWith('data:')?p:prefix+p;
const escape=s=>String(s).replace(/[&<>"']/g,x=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[x]));
const root=document.querySelector('#app');
// Feather brand icons and Lucide Mail; see THIRD-PARTY-NOTICES.txt.
const icons={
 instagram:'<rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>',
 linkedin:'<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4V8h4v2a6 6 0 0 1 2-2z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
 mail:'<path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/><rect x="2" y="4" width="20" height="16" rx="2"/>'
};
const icon=name=>`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${icons[name]}</svg>`;

const videoCard=v=>`<figure class="video-card ${v.width>v.height?'landscape':''}"><div class="video-stage"><video playsinline muted loop preload="none" disablepictureinpicture disableremoteplayback poster="${escape(asset(v.poster))}" aria-label="${escape(v.title)}"><source src="${escape(asset(v.src))}" type="video/mp4"></video><div class="video-controls"><button class="video-play" type="button" aria-label="Play ${escape(v.title)}">▷</button><input class="video-progress" type="range" min="0" max="100" value="0" step="0.1" aria-label="Seek ${escape(v.title)}"><button class="video-fullscreen" type="button" aria-label="Full screen ${escape(v.title)}">⛶</button></div></div><figcaption>${escape(v.title)}${v.instagram?`<a class="video-instagram" href="${escape(v.instagram)}" target="_blank" rel="noopener noreferrer">VIEW ON INSTAGRAM ↗</a>`:''}</figcaption></figure>`;
const social=()=>`<footer class="socials">${[['instagram','Instagram',c.instagram],['mail','E-Mail','mailto:'+c.email],['linkedin','LinkedIn',c.linkedin]].map(([key,label,url])=>`<a href="${escape(url)}" aria-label="${label}" ${key==='mail'?'':'target="_blank" rel="noopener noreferrer"'}>${icon(key)}<span class="social-tooltip" aria-hidden="true">${label}</span></a>`).join('')}</footer>`;
const brandPages=['home','work','people','street-style','events','videography','recent-work'];
const brands=[{"name": "Peek & Cloppenburg Düsseldorf", "src": "assets/logos/peek-cloppenburg.png", "key": "peek-cloppenburg"}, {"name": "Wempe", "src": "assets/logos/wempe.png", "key": "wempe"}, {"name": "Tommy Hilfiger", "src": "assets/logos/tommy.png", "key": "tommy"}, {"name": "ROJA London", "src": "assets/logos/roja.png", "key": "roja"}, {"name": "NARS", "src": "assets/logos/nars.png", "key": "nars"}, {"name": "CeraVe", "src": "assets/logos/cerave.png", "key": "cerave"}, {"name": "La Roche-Posay", "src": "assets/logos/laroche.png", "key": "laroche"}, {"name": "L'Oréal Paris", "src": "assets/logos/loreal.png", "key": "loreal"}, {"name": "Karl Lagerfeld", "src": "assets/logos/karl.png", "key": "karl"}, {"name": "Canon", "src": "assets/logos/canon.png", "key": "canon"}, {"name": "EX NIHILO Paris", "src": "assets/logos/exnihilo.png", "key": "exnihilo"}, {"name": "Amouage", "src": "assets/logos/amouage.png", "key": "amouage"}, {"name": "Marc Cain", "src": "assets/logos/marccain.png", "key": "marccain"}, {"name": "by Aylin Koenig", "src": "assets/logos/aylin.png", "key": "aylin"}, {"name": "Kapten & Son", "src": "assets/logos/kapten.png", "key": "kapten"}, {"name": "HEY MARLY", "src": "assets/logos/heymarly.png", "key": "heymarly"}, {"name": "Guerlain", "src": "assets/logos/guerlain.png", "key": "guerlain"}, {"name": "CAPOLAVORO", "src": "assets/logos/capolavoro.png", "key": "capolavoro"}, {"name": "GRAZIA", "src": "assets/logos/grazia.png", "key": "grazia"}, {"name": "Acqua di Parma", "src": "assets/logos/acqua.png", "key": "acqua"}, {"name": "Apple", "src": "assets/logos/apple.png", "key": "apple"}, {"name": "WEAT", "src": "assets/logos/weat.png", "key": "weat"}, {"name": "Giacomelli Trachten", "src": "assets/logos/giacomelli.png", "key": "giacomelli"}, {"name": "ariane ernst", "src": "assets/logos/ariane.png", "key": "ariane"}, {"name": "NEWSHA", "src": "assets/logos/newsha.png", "key": "newsha"}, {"name": "Outletcity Metzingen", "src": "assets/logos/outletcity.png", "key": "outletcity"}, {"name": "Fédération de la Haute Couture et de la Mode", "src": "assets/logos/fhcm.png", "key": "fhcm"}, {"name": "LES VISIONNAIRES", "src": "assets/logos/visionnaires.png", "key": "visionnaires"}, {"name": "INUIKII", "src": "assets/logos/inuikii.png", "key": "inuikii"}, {"name": "Calzedonia", "src": "assets/logos/calzedonia.png", "key": "calzedonia"}, {"name": "The Frankie Shop", "src": "assets/logos/frankie.png", "key": "frankie"}, {"name": "COMMA", "src": "assets/logos/comma.png", "key": "comma"}, {"name": "VOGUE", "src": "assets/logos/vogue.png", "key": "vogue"}, {"name": "DRYKORN", "src": "assets/logos/drykorn.png", "key": "drykorn"}, {"name": "SNOCKS", "src": "assets/logos/snocks.png", "key": "snocks"}, {"name": "PURELEI", "src": "assets/logos/purelei.png", "key": "purelei"}, {"name": "Dyson", "src": "assets/logos/dyson.png", "key": "dyson"}, {"name": "Breuninger", "src": "assets/logos/breuninger.png", "key": "breuninger"}];
const brandItems=duplicate=>brands.map(brand=>`<li data-logo="${brand.key}"><img src="${escape(asset(brand.src))}" alt="${duplicate?'':escape(brand.name)}" width="168" height="64" decoding="async"></li>`).join('');
const brandBand=()=>`<section class="brand-band" aria-label="Brands"><div class="brand-window"><div class="brand-track"><ul class="brand-list">${brandItems(false)}</ul><ul class="brand-list" aria-hidden="true">${brandItems(true)}</ul></div></div></section>`;
root.innerHTML=`<div class="portfolio">${page==='home'?'':`<header class="site-header"><a href="../">HOME</a><a href="../about/" ${page==='about'?'aria-current="page"':''}>ABOUT ME</a><a href="../contact/" ${page==='contact'?'aria-current="page"':''}>CONTACT</a></header>`}<main id="main-content"></main>${brandPages.includes(page)?brandBand():''}<footer class="legal-footer"><p>© 2026 Management Moritz Scholz</p><nav aria-label="Legal"><a href="${prefix}imprint/">Imprint</a><a href="${prefix}privacy/">Privacy Policy</a></nav></footer></div>`;
const main=document.querySelector('#main-content');
if(page==='home'){
 main.innerHTML=`<section class="landing"><p class="location">MUNICH AND BERLIN BASED</p><h1 class="wordmark" aria-label="Moritz Scholz"><img src="assets/moritz-wordmark-editorial.svg" alt="Moritz Scholz" width="338" height="202"><span class="discipline" aria-hidden="true">VIDEO &amp; PHOTOGRAPHY</span></h1><p class="availability">AVAILABLE WORLDWIDE</p><a class="work-button" href="work/">SEE MY WORK</a>${social()}</section>`;
 }else if(page==='about'){
 main.innerHTML=`<section class="about-page"><figure class="about-photo"><div class="about-portrait"><img src="${escape(asset('assets/moritz-profile.webp'))}" alt="Moritz Scholz holding his camera, leaning against a stone wall." width="854" height="1280" decoding="async"></div><figcaption class="portrait-credit">© Francesca Babbi</figcaption></figure><div class="about-copy"><p class="about-eyebrow">ABOUT ME</p><h1>MORITZ SCHOLZ</h1><p class="about-subtitle">Photographer &amp; Videographer</p><p>Based in Munich and Berlin, I capture people, fashion, street style and events through photography and film. My work combines natural, authentic moments with a precise, cinematic eye.</p><p>From international fashion weeks to brand events and cultural gatherings, I focus on the people, details and atmosphere that give each moment its character. Working with natural light and flash, I create images that feel immediate, expressive and true to their setting.</p><p>My photographs are featured in leading magazines worldwide, including Vogue, Harper’s Bazaar and ELLE. Alongside my photography, I produce short-form videos for social media and creative projects.</p><p>Available worldwide, I bring a flexible approach and a consistent visual perspective to every setting.</p><div class="about-links"><a href="../work/">SEE MY WORK ↗</a><a href="../contact/">GET IN TOUCH ↗</a></div></div></section>${social()}`;
 }else if(page==='contact'){
 main.innerHTML=`<section class="contact-page"><h1>CONTACT</h1><div class="contact-details"><p>${escape(c.name)}</p><a href="mailto:${escape(c.email)}">${escape(c.email)}</a></div><form class="contact-form"><label for="contact-name">NAME *</label><input id="contact-name" name="name" autocomplete="name" placeholder="Your name…" maxlength="150" required><label for="contact-email">EMAIL ADDRESS *</label><input id="contact-email" name="email" type="email" autocomplete="email" placeholder="Your email address…" maxlength="254" required><label for="contact-message">MESSAGE *</label><textarea id="contact-message" name="message" rows="7" placeholder="Your message…" maxlength="5000" required></textarea><p class="form-note">This form opens a draft in your email app. Your message is only sent when you send the email.</p><button class="work-button" type="submit">OPEN EMAIL</button><p class="form-status" role="status"></p></form></section>${social()}`;
 main.querySelector('form').addEventListener('submit',event=>{
  event.preventDefault();const form=event.currentTarget;
  const name=form.elements.name.value.trim(),email=form.elements.email.value.trim(),message=form.elements.message.value.trim();
  if(!name||!message){main.querySelector('.form-status').textContent='Please enter your name and message.';return;}
  const body=`Name: ${name}\nEmail: ${email}\n\n${message}`;
  window.location.href='mailto:'+c.email+'?subject='+encodeURIComponent('Portfolio enquiry — '+name)+'&body='+encodeURIComponent(body);
  main.querySelector('.form-status').textContent='Please send the draft in your email app. If no app opened, contact Moritz using the email address above. This website has not sent your message.';
 });
}else if(page==='imprint'||page==='privacy'){
 main.innerHTML=window.portfolioLegal[page];
}else if(page==='work'){
 main.innerHTML=`<section class="work-index" aria-label="My work"><div class="work-rows">${c.categories.map(cat=>`<a class="work-row ${cat.cover?'has-cover':''}" href="../${cat.slug}/">${cat.cover?`<img class="category-cover" src="${escape(asset(cat.cover))}" style="--cover-position:${escape(cat.coverPosition||'50% 50%')};--cover-position-mobile:${escape(cat.coverPositionMobile||cat.coverPosition||'50% 50%')}" alt="">`:""}<span class="row-title">${escape(cat.title.toUpperCase())}</span></a>`).join('')}</div></section>${social()}`;
}else{
 const cat=c.categories.find(cat=>cat.slug===page);
 if(!cat)throw new Error('Unknown portfolio category');
 main.innerHTML=`<section class="gallery"><a class="back-link" href="../work/">← All work</a><div class="gallery-head"><h1>${escape(cat.title)}</h1></div><div class="grid"></div></section>${social()}`;
 const grid=main.querySelector('.grid');
 if(!cat.media.length){grid.classList.add('empty-gallery');grid.innerHTML='<p>Coming soon</p>';}
 else if(cat.slug==='videography'){
 grid.classList.add('video-grid');
 grid.innerHTML=cat.media.map(videoCard).join('');

 }else{
 const photoTile=(photo,i)=>`<button class="image-tile ${photo.publication?'publication':''} ${photo.width>photo.height?'landscape':''}" data-photo="${i}" aria-label="${escape(photo.alt)} - open image"><img loading="lazy" src="${escape(asset(photo.thumb||photo.src))}" alt="${escape(photo.alt)}" width="${photo.width||1336}" height="${photo.height||2000}" decoding="async"></button>`;
 const photoBlocks=[];
 for(let i=0;i<cat.media.length;i++){
  const photo=cat.media[i];
  if(photo.type==='video'){photoBlocks.push(videoCard(photo));}
  else if(photo.series){
   let tiles=photoTile(photo,i);
   while(i+1<cat.media.length&&cat.media[i+1].series===photo.series){i++;tiles+=photoTile(cat.media[i],i);}
   photoBlocks.push(`<div class="photo-series" aria-label="Photo series">${tiles}</div>`);
  }else if(cat.slug==='recent-work'){
   photoBlocks.push(`<figure class="recent-card">${photoTile(photo,i)}<figcaption><span>${escape(photo.title)}</span><a class="video-instagram" href="${escape(photo.instagram)}" target="_blank" rel="noopener noreferrer">VIEW ON INSTAGRAM ↗</a></figcaption></figure>`);
  }else photoBlocks.push(photoTile(photo,i));
 }
 grid.innerHTML=photoBlocks.join('');
 main.insertAdjacentHTML('beforeend','<dialog class="lightbox" aria-label="Image viewer"><button class="close">Close ×</button><img alt=""><p></p></dialog>');
 const dialog=main.querySelector('dialog');let last;
 grid.querySelectorAll('[data-photo]').forEach(button=>button.addEventListener('click',()=>{last=button;const photo=cat.media[Number(button.dataset.photo)];dialog.querySelector('img').src=asset(photo.src);dialog.querySelector('img').alt=photo.alt;dialog.querySelector('p').textContent=photo.caption||'';dialog.showModal();}));
 dialog.querySelector('button').addEventListener('click',()=>dialog.close());dialog.addEventListener('close',()=>last?.focus());
 }
}

const hover=matchMedia('(hover: hover) and (pointer: fine)'),reduce=matchMedia('(prefers-reduced-motion: reduce)');
const allVideos=main.querySelectorAll('video');
allVideos.forEach(video=>{
 const card=video.closest('.video-card'),button=card.querySelector('.video-play'),progress=card.querySelector('.video-progress');
 const toggle=()=>{if(video.paused){video.muted=true;video.play().catch(()=>{});}else video.pause();};
 button.addEventListener('click',toggle);video.addEventListener('click',toggle);
 if(hover.matches&&!reduce.matches){card.addEventListener('pointerenter',()=>{video.muted=true;video.play().catch(()=>{});});card.addEventListener('pointerleave',()=>video.pause());}
 video.addEventListener('play',()=>{allVideos.forEach(other=>{if(other!==video)other.pause();});button.textContent='Ⅱ';button.setAttribute('aria-label','Pause '+video.getAttribute('aria-label'));});
 video.addEventListener('pause',()=>{button.textContent='▷';button.setAttribute('aria-label','Play '+video.getAttribute('aria-label'));});
 video.addEventListener('timeupdate',()=>{if(Number.isFinite(video.duration)&&video.duration>0)progress.value=video.currentTime/video.duration*100;});
 progress.addEventListener('input',()=>{if(Number.isFinite(video.duration))video.currentTime=Number(progress.value)/100*video.duration;});
 card.querySelector('.video-fullscreen').addEventListener('click',()=>{if(document.fullscreenElement)document.exitFullscreen?.();else card.querySelector('.video-stage').requestFullscreen?.().catch(()=>{});});
 new IntersectionObserver(entries=>{if(!entries[0].isIntersecting)video.pause();},{threshold:.15}).observe(video);
});
document.addEventListener('visibilitychange',()=>{if(document.hidden)allVideos.forEach(v=>v.pause());});
})();
