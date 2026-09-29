const root=document.documentElement;
const themeButton=document.getElementById("themeButton");
const menuButton=document.getElementById("menuButton");
const sidebar=document.getElementById("sidebar");
const searchInput=document.getElementById("searchInput");
const noResults=document.getElementById("noResults");

const savedTheme=localStorage.getItem("dador-theme");
if(savedTheme==="dark"||savedTheme==="light"){root.dataset.theme=savedTheme}

themeButton.addEventListener("click",()=>{
  const next=root.dataset.theme==="dark"?"light":"dark";
  root.dataset.theme=next;
  localStorage.setItem("dador-theme",next);
});

menuButton?.addEventListener("click",()=>sidebar.classList.toggle("open"));
sidebar.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>sidebar.classList.remove("open")));

document.querySelectorAll("pre").forEach(pre=>{
  const button=document.createElement("button");
  button.className="copy-button";
  button.type="button";
  button.textContent="Copiar";
  button.addEventListener("click",async()=>{
    const code=pre.querySelector("code")?.innerText||pre.innerText;
    try{
      await navigator.clipboard.writeText(code);
      button.textContent="Copiado";
      setTimeout(()=>button.textContent="Copiar",1200);
    }catch{
      button.textContent="No disponible";
    }
  });
  pre.appendChild(button);
});

const sections=[...document.querySelectorAll(".searchable")];
const navLinks=[...sidebar.querySelectorAll("a[href^='#']")];

const normalize=s=>(s||"").toLocaleLowerCase("es").normalize("NFD").replace(/[\u0300-\u036f]/g,"");

searchInput?.addEventListener("input",()=>{
  const q=normalize(searchInput.value.trim());
  let visible=0;
  sections.forEach(section=>{
    const match=!q||normalize(section.innerText).includes(q);
    section.hidden=!match;
    if(match)visible++;
  });
  noResults.hidden=visible!==0;
});

const observer=new IntersectionObserver(entries=>{
  const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
  if(!visible)return;
  navLinks.forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+visible.target.id));
},{rootMargin:"-18% 0px -70% 0px",threshold:[0,.1,.25,.5,1]});

document.querySelectorAll("section[id]").forEach(section=>observer.observe(section));
