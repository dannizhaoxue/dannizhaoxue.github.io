(()=>{
'use strict';
const root=document.documentElement;
const fonts=window.DanniType.fonts,chinese=window.DanniType.names;
function applyFonts(settings){
 const font=fonts[settings.en];
 if(font){root.style.setProperty('--font-display',font.family);root.style.setProperty('--display-weight',font.weight)}
 const name=chinese[settings.cn];if(name){root.style.setProperty('--font-chinese',name.family);root.style.setProperty('--name-weight',name.weight);root.style.setProperty('--name-spacing',name.spacing)}
}
let settings={};try{settings=JSON.parse(localStorage.getItem('danni-type-choice-poster-v3')||'{}')}catch{}
const query=new URLSearchParams(location.search);
if(fonts[query.get('font')])settings.en=query.get('font');
if(chinese[query.get('name')])settings.cn=query.get('name');
applyFonts(settings);
const projectFonts=window.DanniProjectType;
function applyProjectFont(id){const font=projectFonts[id];if(!font)return;root.style.setProperty('--project-font',font.family);root.style.setProperty('--project-title-weight',font.weight);root.style.setProperty('--project-tracking',font.tracking)}
let projectType='gill';try{const stored=localStorage.getItem('danni-project-type-v2');if(projectFonts[stored])projectType=stored}catch{}
if(projectFonts[query.get('projectFont')])projectType=query.get('projectFont');
applyProjectFont(projectType);
window.addEventListener('storage',event=>{if(event.key==='danni-project-type-v2')applyProjectFont(event.newValue||'gill')});
if(query.get('projectPreview')==='1')document.fonts.ready.then(()=>requestAnimationFrame(()=>document.querySelector('#work')?.scrollIntoView({block:'start',behavior:'instant'})));

const workTitleFonts=window.DanniWorkTitleFonts||{},workTitleKey='danni-work-title-v2';
function applyWorkTitle(id){const font=workTitleFonts[id];if(!font)return;root.style.setProperty('--work-title-font',font.family);root.style.setProperty('--work-title-weight',font.weight);root.style.setProperty('--work-title-spacing',font.spacing)}
let workTitle='eqNarrow';try{const saved=localStorage.getItem(workTitleKey);if(workTitleFonts[saved])workTitle=saved}catch{}
if(workTitleFonts[query.get('workTitleFont')])workTitle=query.get('workTitleFont');
applyWorkTitle(workTitle);
window.addEventListener('storage',event=>{if(event.key===workTitleKey)applyWorkTitle(event.newValue||'eqNarrow')});

function fitPoster(){
 const context=document.createElement('canvas').getContext('2d');
 document.querySelectorAll('.poster-row').forEach(row=>{
  const style=getComputedStyle(row),parts=[...row.querySelectorAll('.poster-big')],note=row.querySelector('.poster-note');
  const maximum=innerWidth<650?78:200;
  const available=row.clientWidth-(note?note.getBoundingClientRect().width:0)-parseFloat(style.columnGap)*(row.children.length-1);
  const glyphStyle=getComputedStyle(parts[0]);
  const fits=size=>{context.font=`${glyphStyle.fontWeight} ${size}px ${glyphStyle.fontFamily}`;return parts.reduce((sum,el)=>sum+context.measureText(el.textContent).width+(el.textContent.length-1)*size*(-.02),0)<=available};
  let lo=12,hi=maximum;for(let i=0;i<15;i++){const mid=(lo+hi)/2;if(fits(mid))lo=mid;else hi=mid}row.style.fontSize=`${lo}px`;
 });
}
if(document.querySelector('.poster')){fitPoster();document.fonts.ready.then(fitPoster);new ResizeObserver(fitPoster).observe(document.querySelector('.poster'));}
let view='grid' ;try{view=localStorage.getItem('danni-project-view')==='list'?'list':'grid'}catch{}
function applyView(){document.body.dataset.projectView=view;document.querySelectorAll('[data-view]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.view===view)))}
applyView();document.querySelectorAll('[data-view]').forEach(button=>button.addEventListener('click',()=>{view=button.dataset.view;applyView();try{localStorage.setItem('danni-project-view',view)}catch{}}));
window.addEventListener('storage',e=>{if(e.key==='danni-type-choice-poster-v3')try{applyFonts(JSON.parse(e.newValue||'{}'));fitPoster()}catch{}});

})();

// Local-file previews open YouTube; web pages play films without distorting their format.
function projectFilmFrame(link){
 const frame=document.createElement('iframe');
 const source=new URL(`https://www.youtube-nocookie.com/embed/${link.dataset.filmId}`);
 source.searchParams.set('autoplay','1');source.searchParams.set('playsinline','1');source.searchParams.set('rel','0');source.searchParams.set('enablejsapi','1');
 frame.src=source.href;frame.title=link.dataset.filmTitle||'Vesscape — complete audiovisual realization with synchronized score';
 frame.allow='autoplay; encrypted-media; picture-in-picture; fullscreen';frame.allowFullscreen=true;frame.referrerPolicy='strict-origin-when-cross-origin';
 return frame;
}
document.querySelectorAll('[data-film-id]').forEach(link=>{
 if(!['http:','https:'].includes(location.protocol))return;
 link.addEventListener('click',event=>{
  if(event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
  event.preventDefault();
  document.querySelectorAll('iframe[src*="youtube-nocookie.com"]').forEach(player=>player.contentWindow?.postMessage(JSON.stringify({event:'command',func:'pauseVideo',args:[]}),'https://www.youtube-nocookie.com'));
  const frame=projectFilmFrame(link);
  if(link.dataset.filmDialog==='portrait'){
   const viewer=document.createElement('dialog');viewer.className='work-film-viewer';viewer.setAttribute('aria-label',frame.title);
   viewer.innerHTML='<div class="media-viewer-toolbar"><span>Score video</span><button type="button" autofocus aria-label="Close score video">Close</button></div><div class="portrait-film-frame"></div>';
   viewer.querySelector('.portrait-film-frame').append(frame);document.body.append(viewer);
   viewer.querySelector('button').addEventListener('click',()=>viewer.close());
   viewer.addEventListener('click',event=>{if(event.target===viewer)viewer.close()});
   viewer.addEventListener('close',()=>{viewer.remove();link.focus({preventScroll:true})},{once:true});
   viewer.showModal();return;
  }
  link.replaceWith(frame);frame.focus();
 });
});

// Cover thumbnails scroll by touch/trackpad, keyboard, or explicit desktop controls.
document.querySelectorAll('[data-thumbnail-gallery]').forEach(gallery=>{
 const track=gallery.querySelector('.project-thumbnail-track');
 const previous=gallery.querySelector('.thumbnail-previous'),next=gallery.querySelector('.thumbnail-next');
 const update=()=>{
  const maximum=track.scrollWidth-track.clientWidth;
  previous.hidden=maximum<2||track.scrollLeft<2;
  next.hidden=maximum<2||track.scrollLeft>=maximum-2;
 };
 gallery.querySelectorAll('[data-thumbnail-scroll]').forEach(button=>button.addEventListener('click',()=>{
  track.scrollBy({left:Number(button.dataset.thumbnailScroll)*track.clientWidth,behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth'});
 }));
 track.addEventListener('scroll',update,{passive:true});
 new ResizeObserver(update).observe(track);
 update();
});

// Keep the original figures, with a themed full-size view for this page.
(()=>{
 const links=[...document.querySelectorAll('[data-media-theme]')];if(!links.length)return;
 const viewer=document.createElement('dialog');viewer.className='work-media-viewer';viewer.setAttribute('aria-label','Project image viewer');
 viewer.innerHTML='<div class="media-viewer-toolbar"><span id="media-viewer-title"></span><button type="button" autofocus aria-label="Close image viewer">Close</button></div><img alt="">';
 document.body.append(viewer);const image=viewer.querySelector('img'),label=viewer.querySelector('span');let trigger=null;
 links.forEach(link=>link.addEventListener('click',event=>{
  if(event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
  event.preventDefault();trigger=link;label.textContent=link.dataset.mediaLabel||'Project image';image.alt=label.textContent;
  image.className=({pointcloud:'pointcloud-media',workflow:'workflow-media'})[link.dataset.mediaTheme]||'';image.src=link.href;viewer.showModal();
 }));
 viewer.querySelector('button').addEventListener('click',()=>viewer.close());
 viewer.addEventListener('click',event=>{if(event.target===viewer)viewer.close()});
 viewer.addEventListener('close',()=>trigger?.focus({preventScroll:true}));
})();

(()=>{
 const stage=document.querySelector('.portrait-stage');if(!stage)return;
 const reduced=matchMedia('(prefers-reduced-motion:reduce)');let frame=0,pointer={x:0,y:0};
 function setPosition(x,y){
  for(const [layer,dx,dy] of [['portrait',7,4],['back',-10,-5],['front',17,7]]){
   stage.style.setProperty(`--${layer}-x`,`${(x*dx).toFixed(2)}px`);stage.style.setProperty(`--${layer}-y`,`${(y*dy).toFixed(2)}px`);
  }
 }
 function reset(){cancelAnimationFrame(frame);frame=0;setPosition(0,0)}
 stage.addEventListener('pointermove',event=>{
  if(event.pointerType!=='mouse'||reduced.matches)return;
  pointer={x:event.clientX,y:event.clientY};if(frame)return;
  frame=requestAnimationFrame(()=>{frame=0;const r=stage.getBoundingClientRect();setPosition(Math.max(-1,Math.min(1,(pointer.x-r.left)/r.width*2-1)),Math.max(-1,Math.min(1,(pointer.y-r.top)/r.height*2-1)))});
 },{passive:true});
 stage.addEventListener('pointerleave',reset);stage.addEventListener('pointercancel',reset);window.addEventListener('blur',reset);reduced.addEventListener('change',reset);
})();

// Show only artist-supplied Chinese, preserving an uninterrupted English default.
document.querySelectorAll('[data-translation-toggle]').forEach(button=>{button.addEventListener('click',()=>{const block=button.closest('[data-translation-block]');const original=document.getElementById(button.getAttribute('aria-controls'));const expanded=button.getAttribute('aria-expanded')!=='true';const translated=button.dataset.translationKind==='translation';button.setAttribute('aria-expanded',String(expanded));original.hidden=!expanded;block.classList.toggle('translation-open',expanded);button.innerHTML=(expanded?'Hide Chinese':'Show Chinese')+(translated?'':' original')+' <span lang="zh-CN">'+(translated?'中文':'中文原文')+'</span>';});});

// Completed works: sound technology then pure acoustic; a final mixed ongoing section stays chronological.
(()=>{
 const filters=[...document.querySelectorAll('[data-work-filter]')],grid=document.getElementById('work-grid'),sort=document.querySelector('[data-work-sort]');
 if(!filters.length||!grid||!sort)return;
 const progress=document.querySelector('[data-work-progress]'),progressGrid=document.getElementById('work-progress-grid');
 const works=[...document.querySelectorAll('#work .project')],status=document.querySelector('.filter-status');
 const titleOrder=new Intl.Collator('en',{sensitivity:'base',numeric:true});
 const compareTitle=(a,b)=>titleOrder.compare(a.dataset.title,b.dataset.title);
 const compareGroup=(a,b)=>Number(a.dataset.soundGroup==='acoustic')-Number(b.dataset.soundGroup==='acoustic');
 const applySort=()=>{
  const ordered=[...grid.children].sort((a,b)=>compareGroup(a,b)||(sort.value==='title'?compareTitle(a,b):(b.dataset.created||'').localeCompare(a.dataset.created||'')||compareTitle(a,b)));
  grid.append(...ordered);
 };
 if(progressGrid)progressGrid.append(...[...progressGrid.children].sort((a,b)=>(b.dataset.created||'').localeCompare(a.dataset.created||'')||compareTitle(a,b)));
 sort.value='created';applySort();sort.addEventListener('change',applySort);
 const updateCount=()=>{
  status.textContent=works.filter(work=>!work.hidden).length+' works';
  if(progress)progress.hidden=![...progress.querySelectorAll('.project')].some(work=>!work.hidden);
  grid.hidden=![...grid.children].some(work=>!work.hidden);
 };
 filters.forEach(button=>button.addEventListener('click',()=>{
  const group=button.dataset.workFilter;
  filters.forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
  works.forEach(work=>work.hidden=group!=='all'&&work.dataset.soundGroup!==group);
  updateCount();
 }));
 updateCount();
})();

// The artist supplied both biography versions; show the reader's chosen language.
(()=>{
 const buttons=[...document.querySelectorAll('[data-bio-language]')];
 if(!buttons.length)return;
 buttons.forEach(button=>button.addEventListener('click',()=>{
  const language=button.dataset.bioLanguage;
  buttons.forEach(b=>{
   const active=b===button;
   b.setAttribute('aria-pressed',String(active));
   document.getElementById(b.getAttribute('aria-controls')).hidden=!active;
  });
  document.querySelectorAll('[data-bio-section]').forEach(link=>{
   link.href='#'+link.dataset.bioSection+'-'+language;
   link.textContent=language==='zh'?link.dataset.labelZh:link.dataset.labelEn;
   link.lang=language==='zh'?'zh-CN':'en';
  });
 }));
})();

// The biography's Chinese heading and body faces can be reviewed independently.
(()=>{
 const data=document.getElementById('biography-typefaces');if(!data)return;
 const faces=JSON.parse(data.textContent),selected=JSON.parse(document.getElementById('biography-typography').textContent),key='danni-biography-chinese-face-v3';
 const apply=id=>{const f=faces.find(f=>f.id===id)||selected;const root=document.documentElement;root.style.setProperty('--bio-cn-heading','"'+f.heading+'"');root.style.setProperty('--bio-cn-body','"'+f.body+'"');root.style.setProperty('--bio-cn-weight',f.weight);root.style.setProperty('--bio-cn-heading-weight',f.heading_weight||400);root.style.setProperty('--bio-cn-poster','"'+(f.poster||f.heading)+'"');root.style.setProperty('--bio-cn-poster-weight',f.poster_weight||f.heading_weight||400)};
 const bodyData=document.getElementById('biography-body-typefaces'),bodies=bodyData?JSON.parse(bodyData.textContent):[],bodyKey='danni-biography-chinese-body-v2';
 const applyBody=id=>{const f=bodies.find(f=>f.id===id);if(!f)return;document.documentElement.style.setProperty('--bio-cn-body','"'+f.body+'"');document.documentElement.style.setProperty('--bio-cn-weight',f.weight)};
 let saved,savedBody;try{saved=localStorage.getItem(key);savedBody=localStorage.getItem(bodyKey)}catch{}apply(saved);applyBody(savedBody);
 document.querySelectorAll('[data-bio-apply-face]').forEach(button=>button.addEventListener('click',()=>{
  try{localStorage.removeItem(bodyKey);localStorage.setItem(key,button.dataset.bioApplyFace)}catch{}
  location.href='about.html?language=zh';
 }));
 document.querySelectorAll('[data-bio-apply-body]').forEach(button=>button.addEventListener('click',()=>{try{localStorage.removeItem(key);localStorage.setItem(bodyKey,button.dataset.bioApplyBody)}catch{}location.href='about.html?language=zh'}));
 if(new URLSearchParams(location.search).get('language')==='zh')document.querySelector('[data-bio-language="zh"]')?.click();
})();
