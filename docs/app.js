const root=document.documentElement;
const themeButton=document.getElementById("themeButton");
const menuButton=document.getElementById("menuButton");
const sidebar=document.getElementById("sidebar");
const searchInput=document.getElementById("searchInput");
const noResults=document.getElementById("noResults");

const progress=document.createElement("div");
progress.className="scroll-progress";
document.body.prepend(progress);

const savedTheme=localStorage.getItem("dador-theme");
if(savedTheme==="dark"||savedTheme==="light"){
  root.dataset.theme=savedTheme;
}

function syncThemeButton(){
  themeButton.textContent=root.dataset.theme==="dark"?"☀":"◐";
  themeButton.setAttribute(
    "aria-label",
    root.dataset.theme==="dark"?"Cambiar a modo claro":"Cambiar a modo oscuro"
  );
}
syncThemeButton();

themeButton.addEventListener("click",()=>{
  const next=root.dataset.theme==="dark"?"light":"dark";
  root.dataset.theme=next;
  localStorage.setItem("dador-theme",next);
  syncThemeButton();
});

if(menuButton){
  menuButton.addEventListener("click",()=>{
    sidebar.classList.toggle("open");
  });
}

sidebar.querySelectorAll("a").forEach(a=>{
  a.addEventListener("click",()=>sidebar.classList.remove("open"));
});

document.querySelectorAll("pre").forEach(pre=>{
  const button=document.createElement("button");
  button.className="copy-button";
  button.type="button";
  button.textContent="Copiar";

  button.addEventListener("click",async()=>{
    const code=pre.querySelector("code")?.innerText||pre.innerText;

    try{
      await navigator.clipboard.writeText(code);
      button.textContent="✓ Copiado";
      setTimeout(()=>button.textContent="Copiar",1200);
    }
    catch{
      button.textContent="No disponible";
    }
  });

  pre.appendChild(button);
});

document.querySelectorAll(".button").forEach(button=>{
  button.addEventListener("pointermove",event=>{
    const rect=button.getBoundingClientRect();
    button.style.setProperty("--btn-x",(event.clientX-rect.left)+"px");
    button.style.setProperty("--btn-y",(event.clientY-rect.top)+"px");
  });

  button.addEventListener("click",event=>{
    const rect=button.getBoundingClientRect();
    const ripple=document.createElement("span");
    const size=Math.max(rect.width,rect.height)/2+"px";

    ripple.className="ripple";
    ripple.style.left=(event.clientX-rect.left)+"px";
    ripple.style.top=(event.clientY-rect.top)+"px";
    ripple.style.width=size;
    ripple.style.height=size;

    button.appendChild(ripple);
    setTimeout(()=>ripple.remove(),600);
  });
});

const sections=[...document.querySelectorAll(".searchable")];
const navLinks=[...sidebar.querySelectorAll("a[href^='#']")];

const normalize=s=>(s||"")
  .toLocaleLowerCase("es")
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g,"");

if(searchInput){
  searchInput.addEventListener("input",()=>{
    const q=normalize(searchInput.value.trim());
    let visible=0;

    sections.forEach(section=>{
      const match=!q||normalize(section.innerText).includes(q);
      section.hidden=!match;
      if(match) visible++;
    });

    noResults.hidden=visible!==0;
  });
}

const observer=new IntersectionObserver(entries=>{
  const visible=entries
    .filter(e=>e.isIntersecting)
    .sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];

  if(!visible) return;

  navLinks.forEach(a=>{
    a.classList.toggle(
      "active",
      a.getAttribute("href")==="#"+visible.target.id
    );
  });
},{
  rootMargin:"-18% 0px -70% 0px",
  threshold:[0,.1,.25,.5,1]
});

document.querySelectorAll("section[id]").forEach(section=>{
  observer.observe(section);
});

function updateProgress(){
  const max=document.documentElement.scrollHeight-window.innerHeight;
  const ratio=max>0?Math.min(1,Math.max(0,window.scrollY/max)):0;
  progress.style.width=(ratio*100)+"%";
}

updateProgress();
window.addEventListener("scroll",updateProgress,{passive:true});
window.addEventListener("resize",updateProgress);

document.addEventListener("click",event=>{
  if(
    window.innerWidth<=900
    && sidebar.classList.contains("open")
    && !sidebar.contains(event.target)
    && event.target!==menuButton
  ){
    sidebar.classList.remove("open");
  }
});
